import type { IResult } from "@/utils/request/request"
import httpClient from "@/utils/request/request"

export interface TagVO {
  id: number
  tagName: string
  articleCount?: number
}

export interface ArticleListVO {
  id: number
  title: string
  summary: string
  coverImage: string
  status: number
  createTime: number
  tags: TagVO[]
}

export interface ArticleDetailVO {
  id: number
  title: string
  content: string
  summary: string
  coverImage: string
  viewCount: number
  status: number
  createTime: number
  updateTime: number
  tags: TagVO[]
}

export interface PageResult<T> {
  records: T[]
  total: number
  current: number
  size: number
}

export interface ArticleCreateParams {
  title: string
  content: string
  summary?: string
  coverImage?: string
  tagIds?: number[]
  status: number
}

export interface ArticleUpdateParams {
  id: number
  title: string
  content: string
  summary?: string
  coverImage?: string
  tagIds?: number[]
  status?: number
}

const articleService = {
  create(params: ArticleCreateParams): Promise<IResult<number>> {
    return httpClient.post({ url: "/article/create", data: params })
  },

  update(params: ArticleUpdateParams): Promise<IResult<void>> {
    return httpClient.put({ url: "/article/update", data: params })
  },

  detail(id: number): Promise<IResult<ArticleDetailVO>> {
    return httpClient.get({ url: "/article/detail", data: { id } })
  },

  list(
    page: number,
    size: number
  ): Promise<IResult<PageResult<ArticleListVO>>> {
    return httpClient.get({ url: "/article/list", data: { page, size } })
  },

  publish(id: number): Promise<IResult<void>> {
    return httpClient.put({ url: "/article/publish", data: { id } })
  },

  remove(id: number): Promise<IResult<void>> {
    return httpClient.put({ url: "/article/delete", data: { id } })
  },

  tags(): Promise<IResult<TagVO[]>> {
    return httpClient.get({ url: "/article/tags" })
  },
}

export default articleService
