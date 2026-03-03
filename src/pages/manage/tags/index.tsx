import { type FC, useEffect, useState } from "react"
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import tagService, { type TagVO } from "@/services/tagService"

const TagManagePage: FC = () => {
  const [tags, setTags] = useState<TagVO[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<TagVO | null>(null)
  const [form] = Form.useForm()

  const loadTags = async () => {
    setLoading(true)
    const res = await tagService.list()
    if (res?.data) setTags(res.data)
    setLoading(false)
  }

  useEffect(() => {
    loadTags()
  }, [])

  const handleCreate = () => {
    setEditingTag(null)
    form.resetFields()
    setModalOpen(true)
  }

  const handleEdit = (tag: TagVO) => {
    setEditingTag(tag)
    form.setFieldsValue({ tagName: tag.tagName })
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    await tagService.remove(id)
    message.success("删除成功")
    loadTags()
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    if (editingTag) {
      await tagService.update(editingTag.id, values.tagName)
      message.success("更新成功")
    } else {
      await tagService.create(values.tagName)
      message.success("创建成功")
    }
    setModalOpen(false)
    loadTags()
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新建标签
        </Button>
      </div>

      <Table
        dataSource={tags}
        loading={loading}
        rowKey="id"
        columns={[
          { title: "标签名称", dataIndex: "tagName" },
          { title: "文章数量", dataIndex: "articleCount" },
          {
            title: "操作",
            render: (_, record) => (
              <Space>
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                />
                <Popconfirm
                  title="确认删除？"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button size="small" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editingTag ? "编辑标签" : "新建标签"}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="tagName"
            label="标签名称"
            rules={[{ required: true, message: "请输入标签名称" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TagManagePage

