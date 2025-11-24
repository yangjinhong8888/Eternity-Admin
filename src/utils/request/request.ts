import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type Method,
  type ResponseType,
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from "axios"
import router from "@/routes/router.tsx"
import { message } from "antd"

/**
 * HTTP客户端配置接口
 * 用于配置axios实例的基本参数
 */
interface InstanceConfig {
  /**
   * 请求的基础URL地址
   */
  baseURL?: string
  /**
   * 请求超时时间（毫秒）
   */
  timeout?: number
}

/**
 * 统一响应数据结构接口
 * 定义了服务端返回数据的标准格式
 * @template T - 响应数据的具体类型
 */
interface IResult<T = unknown> {
  /**
   * 状态码，用于表示请求处理的结果
   */
  code: number
  /**
   * 实际的业务数据
   */
  data?: T
  /**
   * 描述信息或错误消息
   */
  message: string
}

/**
 * 请求参数接口
 * 定义发起HTTP请求时可配置的参数
 * @template T - 请求体数据或查询参数的类型
 */
interface ReqParameter<T = unknown, R = unknown> {
  /**
   * 请求的URL路径
   */
  url: string
  /**
   * 请求数据，GET请求时作为查询参数，其他请求作为请求体
   */
  data?: T
  /**
   * 加载提示信息，可以是字符串或布尔值
   */
  loading?: string | boolean
  /**
   * 单独设置的请求超时时间（覆盖全局配置）
   */
  timeout?: number
  /**
   * 请求确认提示信息，可以是字符串或布尔值
   */
  confirm?: string | boolean
  /**
   * 请求成功的回调函数
   * @param res - 响应结果数据
   */
  success?: (res: IResult<R>) => void
  /**
   * 请求失败的回调函数
   * @param err - 错误信息，可能是业务错误或网络错误
   */
  error?: (err: IResult<R> | AxiosError) => void
  /**
   * 响应数据类型设置
   */
  responseType?: ResponseType
  /**
   * 是否携带凭证信息（如cookies）
   * 设置为true时会在跨域请求中携带凭据
   */
  withCredentials?: boolean
}

/**
 * 自定义请求参数接口
 * 扩展基础请求参数，增加请求方法字段
 * @template T - 请求体数据或查询参数的类型
 */
interface ReqParameterCustom<T = unknown, R = unknown>
  extends ReqParameter<T, R> {
  /**
   * HTTP请求方法（GET/POST/PUT/DELETE等）
   */
  method: Method
}

/**
 * HTTP客户端类
 * 封装axios功能，提供统一的HTTP请求接口
 */
class HttpClient {
  /**
   * 单例模式实例
   */
  private static instance: HttpClient
  /**
   * axios实例对象
   */
  private readonly axiosInstance: AxiosInstance

  /**
   * 构造函数，初始化axios实例和拦截器
   * @param config - HTTP客户端配置参数
   */
  private constructor(config: InstanceConfig = {}) {
    // 环境变量类型安全处理
    const baseURL = config.baseURL || ""

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      timeout: config.timeout || 30000,
    })

    this.initInterceptors()
  }

  /**
   * 获取HttpClient单例实例
   * @param config - HTTP客户端配置参数
   * @returns HttpClient实例
   */
  public static getInstance(config?: InstanceConfig): HttpClient {
    if (!this.instance) {
      this.instance = new HttpClient(config)
    }
    return this.instance
  }

  /**
   * 初始化请求和响应拦截器
   * 处理请求前的准备工作和响应后的统一处理
   */
  private initInterceptors(): void {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 可在此添加认证token、全局loading等
        console.log(
          `🚀 发起请求: ${config.method?.toUpperCase()} ${config.url}`
        )
        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.data

        // 这里做一些基础的网络请求处理
        if (typeof res === "object" && res !== null && "code" in res) {
          const businessResult = res as IResult

          // 业务错误处理 自定义错误码)
          if (businessResult.code >= 1000 && businessResult.code < 6000) { /* empty */ }
        }
        // 直接返回响应体数据
        return res
      },
      async (error: AxiosError<IResult>) => {
        // 统一处理HTTP错误
        console.error("🌐 网络错误:", error.message)

        // 可以根据状态码进行特殊处理
        if (error.response) {
          switch (error.response.status) {
            case 400:
              message.error(error.response.data?.message);
              break;
            case 401:
              message.error(error.response.data?.message);
              await router.navigate("/login")
              break
            case 403:
              console.warn("权限不足")
              break
            case 404:
              console.warn("请求资源不存在")
              break
            case 500:
              console.error("服务器内部错误")
              break
            default:
              console.error(`HTTP错误: ${error.response.status}`)
          }
        } else if (error.request) {
          console.error("网络连接失败，请检查网络")
        }

        return Promise.reject(error)
      }
    )
  }

  /**
   * 通用请求方法
   * @template T - 请求数据类型
   * @param method - HTTP请求方法
   * @param params - 请求参数配置
   * @returns Promise<IResult<T>> - 返回axios响应Promise
   */
  private async request<T, R>(
    method: Method,
    params: ReqParameter<T, R>
  ): Promise<IResult<R>> {
    const config: AxiosRequestConfig = {
      method,
      url: params.url,
      responseType: params.responseType,
      timeout: params.timeout,
    }

    // 根据请求方法设置参数
    if (method.toLowerCase() === "get") {
      config.params = params.data
    } else {
      config.data = params.data
    }

    try {
      const res = await this.axiosInstance.request<R, IResult<R>>(config)
      params.success?.(res)
      return res
    } catch (error) {
      // 统一错误处理
      params.error?.(error as IResult<R> | AxiosError)
      throw error
    }
  }

  /**
   * GET请求方法
   * @template T - 请求数据类型
   * @param params - 请求参数配置
   * @returns Promise<IResult<T>>> - 返回axios响应Promise
   */
  public async get<T, R>(params: ReqParameter<T, R>): Promise<IResult<R>> {
    return this.request<T, R>("GET", params)
  }

  /**
   * POST请求方法
   * @template T - 请求数据类型
   * @param params - 请求参数配置
   * @returns Promise<IResult<T>> - 返回axios响应Promise
   */
  public async post<T, R>(params: ReqParameter<T, R>): Promise<IResult<R>> {
    return this.request<T, R>("POST", params)
  }

  /**
   * PUT请求方法
   * @template T - 请求数据类型
   * @param params - 请求参数配置
   * @returns Promise<IResult<T>> - 返回axios响应Promise
   */
  public async put<T, R>(params: ReqParameter<T, R>): Promise<IResult<R>> {
    return this.request<T, R>("PUT", params)
  }

  /**
   * DELETE请求方法
   * @template T - 请求数据类型
   * @param params - 请求参数配置
   * @returns Promise<IResult<T>> - 返回axios响应Promise
   */
  public async delete<T, R>(params: ReqParameter<T, R>): Promise<IResult<R>> {
    return this.request<T, R>("DELETE", params)
  }

  /**
   * PATCH请求方法
   * @template T - 请求数据类型
   * @param params - 请求参数配置
   * @returns Promise<IResult<T>> - 返回axios响应Promise
   */
  public async patch<T, R>(params: ReqParameter<T, R>): Promise<IResult<R>> {
    return this.request<T, R>("PATCH", params)
  }

  /**
   * 自定义请求方法（支持任意HTTP方法）
   * @template T - 请求数据类型
   * @param params - 自定义请求参数配置
   * @returns Promise<IResult<T>> - 返回axios响应Promise
   */
  public async custom<T, R>(
    params: ReqParameterCustom<T, R>
  ): Promise<IResult<R>> {
    return this.request<T, R>(params.method, params)
  }

  /**
   * 获取原始axios实例
   * 用于需要直接使用axios的特殊场景
   * @returns AxiosInstance - axios实例对象
   */
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }
}

// 创建默认实例
const httpClient = HttpClient.getInstance({
  baseURL: import.meta.env.ETERNITY_BASE_URL as string,
})

export default httpClient
export { HttpClient }
export type { IResult, ReqParameter, ReqParameterCustom }
