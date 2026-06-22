import type { CaseRecord } from '../types'

export interface GeneratedVideoResult {
  videoUrl: string
  requestId: string
}

/**
 * 预留的视频生成入口。
 * 后续可在此处将 CaseRecord 转换成 API 请求，并接入真实服务。
 */
export async function generateVideoFromInputs(
  record: CaseRecord,
): Promise<GeneratedVideoResult> {
  // 保留结构化输入，接入 API 时可直接序列化 record。
  void record
  throw new Error('generateVideoFromInputs() 尚未接入视频生成 API。')
}
