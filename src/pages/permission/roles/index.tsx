import { type FC, useEffect, useState } from "react"
import { Table, Button, Modal, Form, Input, Switch, message, Popconfirm, Space } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import roleService, { type RoleVO } from "@/services/roleService"

const RoleManagePage: FC = () => {
  const [roles, setRoles] = useState<RoleVO[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<RoleVO | null>(null)
  const [form] = Form.useForm()

  const loadRoles = async () => {
    setLoading(true)
    const res = await roleService.list()
    if (res?.data) setRoles(res.data)
    setLoading(false)
  }

  useEffect(() => {
    loadRoles()
  }, [])

  const handleCreate = () => {
    setEditingRole(null)
    form.resetFields()
    setModalOpen(true)
  }

  const handleEdit = (role: RoleVO) => {
    setEditingRole(role)
    form.setFieldsValue({ roleName: role.roleName, isEnable: role.isEnable === 1 })
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    await roleService.remove(id)
    message.success("删除成功")
    loadRoles()
  }

  const handleSubmit = async () => {
    const values = await form.validateFields()
    if (editingRole) {
      await roleService.update(editingRole.id, values.roleName, values.isEnable ? 1 : 0)
      message.success("更新成功")
    } else {
      await roleService.create(values.roleName, values.roleKey)
      message.success("创建成功")
    }
    setModalOpen(false)
    loadRoles()
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          新建角色
        </Button>
      </div>

      <Table
        dataSource={roles}
        loading={loading}
        rowKey="id"
        columns={[
          { title: "角色名称", dataIndex: "roleName" },
          { title: "角色标识", dataIndex: "roleKey" },
          {
            title: "状态",
            dataIndex: "isEnable",
            render: (val) => (val === 1 ? "启用" : "禁用"),
          },
          {
            title: "操作",
            render: (_, record) => (
              <Space>
                <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}>
                  <Button size="small" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editingRole ? "编辑角色" : "新建角色"}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="roleName" label="角色名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {!editingRole && (
            <Form.Item name="roleKey" label="角色标识" rules={[{ required: true }]}>
              <Input placeholder="如: admin, editor" />
            </Form.Item>
          )}
          {editingRole && (
            <Form.Item name="isEnable" label="启用" valuePropName="checked">
              <Switch />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default RoleManagePage

