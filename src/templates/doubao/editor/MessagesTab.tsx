import type { TemplateProps } from '../../types'
import type { DoubaoState, DoubaoMessage } from '../types'
import { newId } from '../defaults'
import { MessageCard } from './MessageCard'
import { PrimaryButton, GhostButton } from '../../deepseek/editor/fields'

export function MessagesTab({ state, onChange }: TemplateProps<DoubaoState>) {
  const setMessages = (next: DoubaoMessage[]) => onChange({ ...state, messages: next })

  const addUser = () => {
    setMessages([
      ...state.messages,
      { id: newId('u'), role: 'user', content: '' },
    ])
  }

  const addAssistant = () => {
    setMessages([
      ...state.messages,
      {
        id: newId('a'),
        role: 'assistant',
        content: '',
        showActions: true,
        followUps: [],
      },
    ])
  }

  const updateMessage = (id: string, next: DoubaoMessage) => {
    setMessages(state.messages.map((m) => (m.id === id ? next : m)))
  }

  const deleteMessage = (id: string) => {
    setMessages(state.messages.filter((m) => m.id !== id))
  }

  const moveMessage = (id: string, delta: -1 | 1) => {
    const idx = state.messages.findIndex((m) => m.id === id)
    if (idx < 0) return
    const next = [...state.messages]
    const target = idx + delta
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setMessages(next)
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <PrimaryButton onClick={addUser}>+ 用户消息</PrimaryButton>
        <PrimaryButton onClick={addAssistant}>+ AI 消息</PrimaryButton>
        <span className="ml-auto text-xs text-gray-400">
          共 {state.messages.length} 条
        </span>
      </div>

      <div className="px-4 py-3 flex flex-col gap-3">
        {state.messages.length === 0 && (
          <div className="text-sm text-gray-400 text-center py-12">
            还没有消息，点击上方按钮添加
          </div>
        )}
        {state.messages.map((m, i) => (
          <MessageCard
            key={m.id}
            message={m}
            index={i}
            total={state.messages.length}
            onChange={(next) => updateMessage(m.id, next)}
            onDelete={() => deleteMessage(m.id)}
            onMove={(delta) => moveMessage(m.id, delta)}
          />
        ))}
        {state.messages.length > 0 && (
          <div className="pt-2">
            <GhostButton onClick={() => {
              if (confirm('清空全部消息？此操作不可恢复。')) setMessages([])
            }} danger>
              清空全部
            </GhostButton>
          </div>
        )}
      </div>
    </div>
  )
}
