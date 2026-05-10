export type PlatformId = 'deepseek' | 'doubao' | 'qwen' | 'kimi'

export interface DraftMeta {
  id: string
  name: string
  platformId: PlatformId
  createdAt: number
  updatedAt: number
}

export interface Draft<S = unknown> extends DraftMeta {
  state: S
}
