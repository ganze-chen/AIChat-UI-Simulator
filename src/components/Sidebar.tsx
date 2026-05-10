import { useState } from 'react'
import { useStore } from '@/store/useStore'
import { listTemplates, getTemplate } from '@/templates/registry'
import type { PlatformId } from '@/types'
import { DraftIO } from './DraftIO'

export function Sidebar() {
  const drafts = useStore((s) => s.drafts)
  const draftOrder = useStore((s) => s.draftOrder)
  const activeDraftId = useStore((s) => s.activeDraftId)
  const createDraft = useStore((s) => s.createDraft)
  const duplicateDraft = useStore((s) => s.duplicateDraft)
  const renameDraft = useStore((s) => s.renameDraft)
  const deleteDraft = useStore((s) => s.deleteDraft)
  const setActiveDraft = useStore((s) => s.setActiveDraft)

  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameVal, setRenameVal] = useState('')

  const templates = listTemplates()

  const handleNewDraft = (platformId: PlatformId) => {
    const tpl = getTemplate(platformId)
    if (tpl.status !== 'ready') return
    createDraft(platformId)
  }

  const activeDraft = activeDraftId ? drafts[activeDraftId] : null

  return (
    <aside className="w-[220px] shrink-0 bg-[#1f1f23] text-gray-200 h-full flex flex-col border-r border-black/30">
      <div className="px-4 pt-4 pb-2 text-xs uppercase tracking-wider text-gray-400">
        Platforms
      </div>
      <div className="flex-1 overflow-y-auto scroll-thin">
        <ul>
          {templates.map((tpl) => {
            const isActive = activeDraft?.platformId === tpl.id
            const disabled = tpl.status !== 'ready'
            return (
              <li key={tpl.id}>
                <button
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left ${
                    isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5'
                  } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                  onClick={() => !disabled && handleNewDraft(tpl.id)}
                  title={disabled ? '即将支持' : `新建 ${tpl.name} 草稿`}
                >
                  <span className="w-5 h-5 grid place-items-center text-gray-300">
                    {tpl.icon}
                  </span>
                  <span className="flex-1">{tpl.name}</span>
                  {disabled && <span className="text-[10px] text-gray-500">soon</span>}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-4 px-4 pt-2 pb-2 text-xs uppercase tracking-wider text-gray-400 flex items-center justify-between">
          <span>Drafts</span>
          <DraftIO />
        </div>
        <ul>
          {draftOrder.length === 0 && (
            <li className="px-4 py-2 text-xs text-gray-500">
              点击上方平台新建草稿
            </li>
          )}
          {draftOrder.map((id) => {
            const d = drafts[id]
            if (!d) return null
            const tpl = getTemplate(d.platformId)
            const active = id === activeDraftId
            const isRenaming = renamingId === id
            return (
              <li key={id}>
                <div
                  className={`group px-4 py-2 text-sm cursor-pointer flex items-center gap-2 ${
                    active ? 'bg-white/10 text-white' : 'hover:bg-white/5'
                  }`}
                  onClick={() => !isRenaming && setActiveDraft(id)}
                >
                  <span className="w-4 h-4 grid place-items-center text-gray-400 shrink-0">
                    {tpl.icon}
                  </span>
                  {isRenaming ? (
                    <input
                      autoFocus
                      className="flex-1 bg-black/40 px-1 py-0.5 text-xs rounded"
                      value={renameVal}
                      onChange={(e) => setRenameVal(e.target.value)}
                      onBlur={() => {
                        renameDraft(id, renameVal)
                        setRenamingId(null)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          renameDraft(id, renameVal)
                          setRenamingId(null)
                        } else if (e.key === 'Escape') {
                          setRenamingId(null)
                        }
                      }}
                    />
                  ) : (
                    <span className="flex-1 truncate">{d.name}</span>
                  )}
                  {!isRenaming && (
                    <span className="opacity-0 group-hover:opacity-100 flex gap-1 shrink-0">
                      <button
                        title="重命名"
                        className="text-gray-400 hover:text-white text-xs px-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          setRenamingId(id)
                          setRenameVal(d.name)
                        }}
                      >
                        ✎
                      </button>
                      <button
                        title="复制副本"
                        className="text-gray-400 hover:text-white text-xs px-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          duplicateDraft(id)
                        }}
                      >
                        ⎘
                      </button>
                      <button
                        title="删除"
                        className="text-gray-400 hover:text-red-400 text-xs px-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm(`删除草稿"${d.name}"？此操作不可恢复。`)) {
                            deleteDraft(id)
                          }
                        }}
                      >
                        ✕
                      </button>
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
