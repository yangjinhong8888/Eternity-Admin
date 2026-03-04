import { type FC, useEffect, useState, useCallback } from "react"
import { useSearchParams, useNavigate } from "react-router"
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Space,
  message,
  Spin,
  Divider,
} from "antd"
import { UploadOutlined, SaveOutlined, SendOutlined } from "@ant-design/icons"
import RichEditor from "@/components/RichEditor"
import articleService, { type TagVO } from "@/services/articleService"
import fileService from "@/services/fileService"
import "./create.less"

const { TextArea } = Input

interface FormValues {
  title: string
  content: string
  summary?: string
  coverImage?: string
  tagIds?: number[]
}

const CreatePage: FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [form] = Form.useForm<FormValues>()

  const articleId = searchParams.get("id")
    ? Number(searchParams.get("id"))
    : null
  const isEdit = articleId !== null

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [allTags, setAllTags] = useState<TagVO[]>([])
  const [content, setContent] = useState("")
  const [coverPreview, setCoverPreview] = useState("")

  // 加载标签列表
  useEffect(() => {
    articleService.tags().then(res => {
      if (res?.data) setAllTags(res.data)
    })
  }, [])

  // 编辑模式：加载文章详情
  useEffect(() => {
    if (!isEdit) return
    setLoading(true)
    articleService
      .detail(articleId)
      .then(res => {
        if (!res?.data) return
        const article = res.data
        form.setFieldsValue({
          title: article.title,
          summary: article.summary,
          coverImage: article.coverImage,
          tagIds: article.tags?.map(t => t.id),
        })
        setContent(article.content)
        if (article.coverImage) setCoverPreview(article.coverImage)
      })
      .finally(() => setLoading(false))
  }, [articleId, isEdit, form])

  const handleEditorChange = useCallback((html: string) => {
    setContent(html)
  }, [])

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const res = await fileService.uploadImage(file)
    if (res?.data?.url) {
      form.setFieldValue("coverImage", res.data.url)
      setCoverPreview(res.data.url)
    } else {
      message.error("封面上传失败")
    }
    e.target.value = ""
  }

  const getFormData = (status: number) => {
    const values = form.getFieldsValue()
    if (!values.title?.trim()) {
      message.warning("请填写文章标题")
      return null
    }
    if (!content || content === "<p></p>") {
      message.warning("请填写文章内容")
      return null
    }
    return {
      title: values.title.trim(),
      content,
      summary: values.summary,
      coverImage: values.coverImage,
      tagIds: values.tagIds,
      status,
    }
  }

  const handleSaveDraft = async () => {
    const data = getFormData(10)
    if (!data) return
    setSaving(true)
    try {
      if (isEdit) {
        await articleService.update({ id: articleId, ...data })
        message.success("草稿已保存")
      } else {
        const res = await articleService.create(data)
        if (res?.data) {
          message.success("草稿已保存")
          setTimeout(() => navigate(`/create?id=${res.data}`, { replace: true }), 0)
        }
      }
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    const data = getFormData(20)
    if (!data) return
    setPublishing(true)
    try {
      if (isEdit) {
        await articleService.update({ id: articleId, ...data, status: 20 })
        message.success("文章已发布")
      } else {
        const res = await articleService.create({ ...data, status: 20 })
        if (res?.data) {
          message.success("文章已发布")
          setTimeout(() => navigate("/manage/articles"), 0)
        }
      }
    } finally {
      setPublishing(false)
    }
  }

  return (
    <Spin spinning={loading}>
      <div className="create-page">
        {/* 主体区域 */}
        <div className="create-main">
          <Form form={form} layout="vertical">
            <Form.Item name="title">
              <Input
                placeholder="请输入文章标题..."
                className="title-input"
                maxLength={100}
                variant="borderless"
              />
            </Form.Item>
            <Divider style={{ margin: "0 0 16px" }} />
            <RichEditor
              value={content}
              onChange={handleEditorChange}
              placeholder="请输入文章内容..."
            />
          </Form>
        </div>

        {/* 右侧元信息面板 */}
        <div className="create-sidebar">
          <Card title="文章设置" size="small" variant="borderless">
            <Form form={form} layout="vertical">
              <Form.Item label="摘要" name="summary">
                <TextArea
                  placeholder="请输入摘要（不填则自动截取正文）"
                  rows={3}
                  maxLength={200}
                  showCount
                />
              </Form.Item>

              <Form.Item label="封面图" name="coverImage">
                <div>
                  {coverPreview && (
                    <img
                      src={coverPreview}
                      alt="封面预览"
                      className="cover-preview"
                    />
                  )}
                  <label className="cover-upload-btn">
                    <UploadOutlined /> {coverPreview ? "更换封面" : "上传封面"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      style={{ display: "none" }}
                      onChange={handleCoverUpload}
                    />
                  </label>
                </div>
              </Form.Item>

              <Form.Item label="标签" name="tagIds">
                <Select
                  mode="multiple"
                  placeholder="选择标签"
                  options={allTags.map(t => ({
                    label: t.tagName,
                    value: t.id,
                  }))}
                  maxTagCount={5}
                />
              </Form.Item>
            </Form>

            <Divider />

            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                block
                icon={<SaveOutlined />}
                loading={saving}
                onClick={handleSaveDraft}
              >
                保存草稿
              </Button>
              <Button
                block
                type="primary"
                icon={<SendOutlined />}
                loading={publishing}
                onClick={handlePublish}
              >
                {isEdit ? "保存并发布" : "发布文章"}
              </Button>
            </Space>
          </Card>
        </div>
      </div>
    </Spin>
  )
}

export default CreatePage
