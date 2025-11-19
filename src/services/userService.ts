import httpClient from "@/config/request.ts"

interface LoginParams {
  username: string
  password: string
}

export const userService = {
  login: (data: LoginParams) => {
    return httpClient.post<LoginParams, null>({
      url: '/user/login',
      data,
    })
  }
}