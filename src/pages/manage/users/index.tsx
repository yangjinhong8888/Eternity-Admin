import { type FC, useEffect, useState } from "react"
import { Table, Button, Modal, Select, message, Tag } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { userService, type UserVO } from "@/services/userService"
import roleService, { type RoleVO } from "@/services/roleService"

const UserManagePage: FC = () => {
  const [users, setUsers] = useState<UserVO[]>([])
  const [roles, setRoles] = useState<RoleVO[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserVO | null>(null)
  const [selectedRoles, setSelectedRoles] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const loadUsers = async (p: number) => {
    setLoading(true)
    const res = await userService.list(p, 10)
    if (res?.data) {
      setUsers(res.data.records)
      setTotal(res.data.total)
    }
    setLoading(false)
  }

  const loadRoles = async () => {
    const res = await roleService.list()
    if (res?.data) setRoles(res.data)
  }

  useEffect(() => {
    loadUsers(1)
    loadRoles()
  }, [])

  const handleAssignRoles = (user: UserVO) => {
    setCurrentUser(user)
    setSelectedRoles(user.roles.map(r => r.id))
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    if (!currentUser) return
    await userService.assignRoles(currentUser.id, selectedRoles)
    message.success("分配成功")
    setModalOpen(false)
    loadUsers(page)
  }

  return (
    <div style={{ padding: 24 }}>
      <Table
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          current: page,
          total,
          pageSize: 10,
          onChange: (p) => {
            setPage(p)
            loadUsers(p)
          },
        }}
        columns={[
          { title: "用户名", dataIndex: "username" },
          {
            title: "角色",
            dataIndex: "roles",
            render: (roles: RoleVO[]) =>
              roles.map(r => <Tag key={r.id}>{r.roleName}</Tag>),
          },
          {
            title: "操作",
            render: (_, record) => (
              <Button size="small" icon={<UserOutlined />} onClick={() => handleAssignRoles(record)}>
                分配角色
              </Button>
            ),
          },
        ]}
      />

      <Modal
        title="分配角色"
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="选择角色"
          value={selectedRoles}
          onChange={setSelectedRoles}
          options={roles.map(r => ({ label: r.roleName, value: r.id }))}
        />
      </Modal>
    </div>
  )
}

export default UserManagePage

