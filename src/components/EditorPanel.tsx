import { useStore, getActiveDraft } from '@/store/useStore'
import { getTemplate } from '@/templates/registry'

export function EditorPanel() {
  const draft = useStore(getActiveDraft)
  const updateActiveState = useStore((s) => s.updateActiveState)

  if (!draft) {
    return (
      <aside className="w-[380px] shrink-0 border-l border-gray-200 bg-white" />
    )
  }

  const tpl = getTemplate(draft.platformId)
  const Editor = tpl.Editor

  return (
    <aside className="w-[380px] shrink-0 border-l border-gray-200 bg-white flex flex-col h-full">
      <div className="h-12 shrink-0 flex items-center px-4 border-b border-gray-200">
        <div className="text-sm font-medium text-gray-800">编辑</div>
        <div className="ml-auto text-xs text-gray-400">{tpl.name}</div>
      </div>
      <div className="flex-1 min-h-0">
        <Editor
          state={draft.state}
          onChange={(next) => updateActiveState(() => next)}
        />
      </div>
    </aside>
  )
}
