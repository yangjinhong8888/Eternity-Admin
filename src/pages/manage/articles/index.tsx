import { type FC, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import {
  Table,
  Tag,
  Button,
  Space,
  Popconfirm,
  message,
  Badge,
  Image,
  type TableColumnsType,
} from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import articleService, { type ArticleListVO } from "@/services/articleService"

const STATUS_MAP: Record<
  number,
  { label: string; status: "processing" | "success" | "error" }
> = {
  10: { label: "草稿", status: "processing" },
  20: { label: "已发布", status: "success" },
  30: { label: "已删除", status: "error" },
}

const ArticlesPage: FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<ArticleListVO[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const fetchArticles = async (page = 1, size = 10) => {
    setLoading(true)
    try {
      const res = await articleService.list(page, size)
      if (res?.data) {
        setData(res.data.records)
        setPagination(prev => ({
          ...prev,
          current: page,
          total: Number(res.data!.total),
        }))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleDelete = async (id: number) => {
    await articleService.remove(id)
    message.success("删除成功")
    fetchArticles(pagination.current, pagination.pageSize)
  }

  const columns: TableColumnsType<ArticleListVO> = [
    {
      title: "封面",
      dataIndex: "coverImage",
      width: 80,
      render: (url: string) =>
        url ? (
          <Image
            src={url}
            width={60}
            height={40}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          <div
            style={{
              width: 60,
              height: 40,
              background: "#f0f2f5",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#bfbfbf",
              fontSize: 12,
            }}
          >
            无封面
          </div>
        ),
    },
    {
      title: "标题",
      dataIndex: "title",
      render: (title: string, record) => (
        <a onClick={() => navigate(`/create?id=${record.id}`)}>{title}</a>
      ),
    },
    {
      title: "标签",
      dataIndex: "tags",
      width: 200,
      render: (tags: ArticleListVO["tags"]) =>
        tags?.map(t => (
          <Tag key={t.id} color="blue">
            {t.tagName}
          </Tag>
        )),
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      render: (status: number) => {
        const s = STATUS_MAP[status]
        return s ? <Badge status={s.status} text={s.label} /> : status
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: 180,
      render: (t: number) => new Date(t).toLocaleString("zh-CN"),
      sorter: (a, b) => a.createTime - b.createTime,
    },
    {
      title: "操作",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate(`/create?id=${record.id}`)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除该文章？"
            okText="确认"
            cancelText="取消"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ background: "#fff", borderRadius: 8, padding: 16 }}>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600 }}>文章管理</span>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/create")}
        >
          写文章
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: total => `共 ${total} 篇`,
          onChange: (page, size) => fetchArticles(page, size),
        }}
      />
    </div>
  )
}

export default ArticlesPage
