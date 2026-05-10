import type { Draft, PlatformId } from '@/types'

export interface DraftsBundle {
  version: 1
  exportedAt: string
  drafts: Draft[]
}

export function exportAllDraftsAsJson(drafts: Draft[]) {
  const bundle: DraftsBundle = {
    version: 1,
    exportedAt: new Date().toISOString(),
    drafts,
  }
  const json = JSON.stringify(bundle, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  a.href = url
  a.download = `aichat_render_drafts_${yyyy}${mm}${dd}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function readDraftsBundle(file: File): Promise<Draft[]> {
  const text = await file.text()
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('文件不是合法的 JSON')
  }
  const obj = parsed as Partial<DraftsBundle>
  if (!obj || typeof obj !== 'object') throw new Error('文件结构不正确')
  if (!Array.isArray(obj.drafts)) throw new Error('文件中找不到草稿数组')
  const validIds: PlatformId[] = ['deepseek', 'doubao', 'qwen', 'kimi']
  const drafts = obj.drafts.filter((d: any): d is Draft => {
    return (
      d &&
      typeof d.id === 'string' &&
      typeof d.name === 'string' &&
      validIds.includes(d.platformId) &&
      typeof d.state === 'object' &&
      d.state !== null
    )
  })
  if (drafts.length === 0) throw new Error('文件中没有可识别的草稿')
  return drafts
}
