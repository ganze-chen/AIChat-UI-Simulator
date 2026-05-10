import { useState } from 'react'
import { useStore, getActiveDraft } from '@/store/useStore'
import { getTemplate } from '@/templates/registry'
import { ExportButton } from './ExportButton'

export function PreviewArea() {
  const draft = useStore(getActiveDraft)
  const zoom = useStore((s) => s.zoom)
  const setZoom = useStore((s) => s.setZoom)
  const renameDraft = useStore((s) => s.renameDraft)
  const [editing, setEditing] = useState(false)
  const [tempName, setTempName] = useState('')

  if (!draft) {
    return (
      <main className="flex-1 grid place-items-center text-gray-400 bg-[#f5f5f7]">
        <div className="text-center">
          <div className="text-lg mb-2">没有正在编辑的草稿</div>
          <div className="text-sm">在左侧选择一个平台新建草稿开始</div>
        </div>
      </main>
    )
  }

  const tpl = getTemplate(draft.platformId)
  const Renderer = tpl.Renderer

  return (
    <main className="flex-1 flex flex-col bg-[#f5f5f7] min-w-0">
      <div className="h-12 shrink-0 flex items-center px-4 gap-3 border-b border-gray-200 bg-white">
        {editing ? (
          <input
            autoFocus
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={() => {
              const next = tempName.trim()
              if (next) renameDraft(draft.id, next)
              setEditing(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const next = tempName.trim()
                if (next) renameDraft(draft.id, next)
                setEditing(false)
              } else if (e.key === 'Escape') {
                setEditing(false)
              }
            }}
            className="text-sm text-gray-800 font-medium px-1.5 py-0.5 border border-blue-300 rounded outline-none w-[220px]"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setTempName(draft.name)
              setEditing(true)
            }}
            title="点击重命名"
            className="text-sm text-gray-700 font-medium truncate hover:bg-gray-100 px-1.5 py-0.5 rounded -ml-1.5"
          >
            {draft.name}
          </button>
        )}
        <div className="text-xs text-gray-400">·</div>
        <div className="text-xs text-gray-500 shrink-0">{tpl.name}</div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 mr-1">缩放</span>
            {[0.5, 0.75, 1, 1.25].map((z) => (
              <button
                key={z}
                onClick={() => setZoom(z)}
                className={`text-xs px-2 py-1 rounded ${
                  Math.abs(zoom - z) < 0.001
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {Math.round(z * 100)}%
              </button>
            ))}
          </div>
          <div className="h-5 w-px bg-gray-200" />
          <ExportButton />
        </div>
      </div>

      <div className="flex-1 overflow-auto scroll-thin py-8 px-4 grid place-items-start justify-center">
        <div
          style={{
            width: tpl.exportWidth * zoom,
          }}
        >
          <div
            id="preview-export-root"
            style={{
              width: tpl.exportWidth,
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <Renderer state={draft.state} />
          </div>
        </div>
      </div>
    </main>
  )
}
