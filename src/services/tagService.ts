import type { IResult } from "@/utils/request/request"
import httpClient from "@/utils/request/request"

export interface TagVO {
  id: number
  tagName: string
  articleCount?: number
}

const tagService = {
  list(): Promise<IResult<TagVO[]>> {
    return httpClient.get({ url: "/tag/list" })
  },

  create(tagName: string): Promise<IResult<number>> {
    return httpClient.post({ url: "/tag/create", data: { tagName } })
  },

  update(id: number, tagName: string): Promise<IResult<void>> {
    return httpClient.put({ url: "/tag/update", data: { id, tagName } })
  },

  remove(id: number): Promise<IResult<void>> {
    return httpClient.delete({ url: "/tag/delete", data: { id } })
  },
}

export default tagService
