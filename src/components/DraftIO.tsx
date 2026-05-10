import { useRef, useState } from 'react'
import { useStore } from '@/store/useStore'
import { exportAllDraftsAsJson, readDraftsBundle } from '@/utils/storage'
import type { Draft } from '@/types'

export function DraftIO() {
  const drafts = useStore((s) => s.drafts)
  const draftOrder = useStore((s) => s.draftOrder)
  const importDrafts = useStore((s) => s.importDrafts)

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [pending, setPending] = useState<Draft[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onExport = () => {
    if (draftOrder.length === 0) {
      setError('当前没有草稿可导出')
      setTimeout(() => setError(null), 1800)
      return
    }
    const ordered = draftOrder.map((id) => drafts[id]).filter(Boolean)
    exportAllDraftsAsJson(ordered)
  }

  const onPickFile = () => fileRef.current?.click()

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const incoming = await readDraftsBundle(file)
      setPending(incoming)
    } catch (err) {
      setError((err as Error).message)
      setTimeout(() => setError(null), 2400)
    }
  }

  const confirm = (mode: 'merge' | 'replace') => {
    if (!pending) return
    importDrafts(pending, mode)
    setPending(null)
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <button
          type="button"
          title="导出全部草稿（JSON）"
          onClick={onExport}
          className="text-gray-400 hover:text-white text-sm w-6 h-6 grid place-items-center rounded hover:bg-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 2 V11 M4 7.5 L8 11 L12 7.5 M3 13 H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
        <button
          type="button"
          title="导入草稿（JSON）"
          onClick={onPickFile}
          className="text-gray-400 hover:text-white text-sm w-6 h-6 grid place-items-center rounded hover:bg-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 11 V2 M4 5.5 L8 2 L12 5.5 M3 13 H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-red-600 text-white text-sm rounded shadow">
          {error}
        </div>
      )}

      {pending && (
        <ImportConfirmModal
          count={pending.length}
          existing={Object.keys(drafts).length}
          onCancel={() => setPending(null)}
          onMerge={() => confirm('merge')}
          onReplace={() => confirm('replace')}
        />
      )}
    </>
  )
}

function ImportConfirmModal({
  count,
  existing,
  onCancel,
  onMerge,
  onReplace,
}: {
  count: number
  existing: number
  onCancel: () => void
  onMerge: () => void
  onReplace: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg p-5 w-[380px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-base font-medium mb-2 text-gray-900">导入 {count} 个草稿</div>
        <div className="text-sm text-gray-600 mb-4 leading-relaxed">
          当前已有 {existing} 个草稿，请选择处理方式：
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium text-gray-800">合并</span>
              ：保留现有草稿，追加导入内容；id 冲突时自动重命名为「xxx (导入)」
            </li>
            <li>
              <span className="font-medium text-red-600">覆盖</span>
              ：清空现有所有草稿，仅保留导入内容（不可恢复）
            </li>
          </ul>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-3 h-8 text-sm rounded border border-gray-200 hover:bg-gray-50"
          >
            取消
          </button>
          <button
            onClick={onMerge}
            className="px-3 h-8 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            合并
          </button>
          <button
            onClick={() => {
              if (confirm('确定要清空当前所有草稿并替换为导入内容吗？此操作不可恢复。')) {
                onReplace()
              }
            }}
            className="px-3 h-8 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
          >
            覆盖
          </button>
        </div>
      </div>
    </div>
  )
}
