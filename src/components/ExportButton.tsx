import { useState, useRef, useEffect } from 'react'
import { useStore, getActiveDraft } from '@/store/useStore'
import { getTemplate } from '@/templates/registry'
import {
  exportPreviewAsPng,
  copyPreviewToClipboard,
  buildExportFileName,
} from '@/utils/export'

export function ExportButton() {
  const draft = useStore(getActiveDraft)
  const exportOptions = useStore((s) => s.exportOptions)
  const setExportOptions = useStore((s) => s.setExportOptions)

  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState<null | 'png' | 'copy'>(null)
  const [toast, setToast] = useState<string | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1800)
    return () => clearTimeout(t)
  }, [toast])

  if (!draft) return null
  const tpl = getTemplate(draft.platformId)

  const getNode = (): HTMLElement | null =>
    document.getElementById('preview-export-root')

  const onExport = async () => {
    const node = getNode()
    if (!node) return
    setBusy('png')
    try {
      await exportPreviewAsPng(node, {
        pixelRatio: exportOptions.pixelRatio,
        hideInputBar: exportOptions.hideInputBar,
        fileName: buildExportFileName(tpl.id, draft.name),
      })
      setToast('已导出 PNG')
    } catch (e) {
      console.error(e)
      setToast('导出失败：' + (e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  const onCopy = async () => {
    const node = getNode()
    if (!node) return
    setBusy('copy')
    try {
      await copyPreviewToClipboard(node, {
        pixelRatio: exportOptions.pixelRatio,
        hideInputBar: exportOptions.hideInputBar,
      })
      setToast('已复制到剪贴板')
    } catch (e) {
      console.error(e)
      setToast('复制失败：' + (e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="relative flex items-center" ref={popoverRef}>
      <button
        type="button"
        onClick={onExport}
        disabled={busy !== null}
        className="h-8 px-3 text-sm rounded-l-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white border-r border-blue-700/40"
      >
        {busy === 'png' ? '导出中…' : '导出 PNG'}
      </button>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={busy !== null}
        className="h-8 px-2 text-sm rounded-r-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white"
        aria-label="导出选项"
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path
            d={open ? 'M3 10 L8 5 L13 10' : 'M3 6 L8 11 L13 6'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 w-72 bg-white border border-gray-200 rounded-md shadow-lg p-3 text-sm text-gray-800">
          <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">
            导出选项
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-xs text-gray-600 mb-1">像素密度</div>
              <div className="flex gap-1">
                {([2, 3, 4] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setExportOptions({ pixelRatio: r })}
                    className={`flex-1 text-xs h-7 rounded border ${
                      exportOptions.pixelRatio === r
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {r}x
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center justify-between">
              <span className="text-xs text-gray-700">导出时隐藏输入栏</span>
              <input
                type="checkbox"
                checked={exportOptions.hideInputBar}
                onChange={(e) => setExportOptions({ hideInputBar: e.target.checked })}
                className="h-4 w-4 accent-blue-600"
              />
            </label>
            <div className="border-t border-gray-100 mt-1 pt-2">
              <button
                onClick={() => {
                  setOpen(false)
                  onCopy()
                }}
                disabled={busy !== null}
                className="w-full h-8 text-xs rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-60"
              >
                {busy === 'copy' ? '复制中…' : '复制到剪贴板'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="absolute right-0 top-full mt-1 z-30 px-3 py-1.5 bg-gray-900 text-white text-xs rounded shadow">
          {toast}
        </div>
      )}
    </div>
  )
}
