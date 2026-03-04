import type { IResult } from "@/utils/request/request"
import httpClient from "@/utils/request/request"

export interface RoleVO {
  id: number
  roleName: string
  roleKey: string
  isEnable: number
}

const roleService = {
  list(): Promise<IResult<RoleVO[]>> {
    return httpClient.get({ url: "/role/list" })
  },

  create(roleName: string, roleKey: string): Promise<IResult<number>> {
    return httpClient.post({ url: "/role/create", data: { roleName, roleKey } })
  },

  update(id: number, roleName: string, isEnable: number): Promise<IResult<void>> {
    return httpClient.put({ url: "/role/update", data: { id, roleName, isEnable } })
  },

  remove(id: number): Promise<IResult<void>> {
    return httpClient.delete({ url: "/role/delete", data: { id } })
  },
}

export default roleService
