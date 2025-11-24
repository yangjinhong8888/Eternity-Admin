import httpClient from "@/utils/request/request.ts"

interface LoginParams {
  username: string
  password: string
}

export interface UserInfo {
  username: string
}

export const userService = {
  login: (data: LoginParams) => {
    return httpClient.post<LoginParams, null>({
      url: "/user/login",
      data,
    })
  },
  getUserInfo: () => {
    return httpClient.post<LoginParams, UserInfo>({
      url: "/user/getUserInfo",
    })
  },
}
