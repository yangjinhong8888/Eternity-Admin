import httpClient from "@/utils/request/request"
import type { IResult } from "@/utils/request/request"

export interface UploadResult {
  url: string
}

const fileService = {
  /**
   * 上传图片，返回图片访问 URL
   */
  uploadImage(file: File): Promise<IResult<UploadResult>> {
    const formData = new FormData()
    formData.append("file", file)
    return httpClient.getAxiosInstance().post("/file/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
}

export default fileService
