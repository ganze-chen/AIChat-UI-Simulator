import { useEffect, useRef } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { PreviewArea } from '@/components/PreviewArea'
import { EditorPanel } from '@/components/EditorPanel'
import { useStore } from '@/store/useStore'

export default function App() {
  const bootstrapped = useRef(false)

  useEffect(() => {
    if (bootstrapped.current) return
    bootstrapped.current = true
    const { draftOrder, activeDraftId, createDraft, setActiveDraft } =
      useStore.getState()
    if (draftOrder.length === 0) {
      createDraft('deepseek', 'DeepSeek 示例')
    } else if (!activeDraftId) {
      setActiveDraft(draftOrder[0])
    }
  }, [])

  return (
    <div className="h-full w-full flex bg-[#f5f5f7] overflow-hidden">
      <Sidebar />
      <PreviewArea />
      <EditorPanel />
    </div>
  )
}
