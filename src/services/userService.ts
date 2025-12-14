import httpClient from "@/utils/request/request"

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
}
