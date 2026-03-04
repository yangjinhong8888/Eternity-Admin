import httpClient from "@/utils/request/request"
import type { IResult } from "@/utils/request/request"
import type { RoleVO } from "./roleService"

interface LoginParams {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  userInfo: UserInfo
}

export interface UserInfo {
  username: string
}

export interface UserVO {
  id: number
  username: string
  avatar: string
  roles: RoleVO[]
  createTime: number
}

export interface PageResult<T> {
  records: T[]
  total: number
  current: number
  size: number
}

export const userService = {
  login: (data: LoginParams) => {
    return httpClient.post<LoginParams, LoginResponse>({
      url: "/user/login",
      data,
    })
  },
  getUserInfo: () => {
    return httpClient.post<void, UserInfo>({
      url: "/user/getUserInfo",
    })
  },
  list(page: number, size: number): Promise<IResult<PageResult<UserVO>>> {
    return httpClient.get({ url: "/user/list", data: { page, size } })
  },
  assignRoles(userId: number, roleIds: number[]): Promise<IResult<void>> {
    return httpClient.put({ url: `/user/assign-roles?userId=${userId}`, data: roleIds })
  },
}
