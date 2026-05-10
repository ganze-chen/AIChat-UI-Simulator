import { useState } from 'react'
import type { TemplateProps } from '../types'
import type { DeepSeekState } from './types'
import { GeneralTab } from './editor/GeneralTab'
import { MessagesTab } from './editor/MessagesTab'

type TabId = 'general' | 'messages'

const TABS: { id: TabId; label: string }[] = [
  { id: 'general', label: '通用' },
  { id: 'messages', label: '消息' },
]

export function DeepSeekEditor(props: TemplateProps<DeepSeekState>) {
  const [tab, setTab] = useState<TabId>('messages')

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 px-2 pt-2 flex gap-1 shrink-0">
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 text-sm rounded-t border-b-2 -mb-px ${
                active
                  ? 'border-blue-500 text-blue-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <div className="flex-1 overflow-y-auto scroll-thin">
        {tab === 'general' && <GeneralTab {...props} />}
        {tab === 'messages' && <MessagesTab {...props} />}
      </div>
    </div>
  )
}
