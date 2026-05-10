import type { DoubaoMessage, DoubaoAssistantMessage } from '../types'
import {
  Field,
  InlineField,
  Textarea,
  Toggle,
  GhostButton,
} from '../../deepseek/editor/fields'

interface Props {
  message: DoubaoMessage
  index: number
  total: number
  onChange: (next: DoubaoMessage) => void
  onDelete: () => void
  onMove: (delta: -1 | 1) => void
}

export function MessageCard({ message, index, total, onChange, onDelete, onMove }: Props) {
  const isUser = message.role === 'user'
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
        <span
          className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
            isUser ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {isUser ? 'User' : 'AI'}
        </span>
        <span className="text-xs text-gray-500">#{index + 1}</span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(-1)}
            className="h-6 w-6 grid place-items-center text-gray-500 hover:bg-gray-200 rounded disabled:opacity-30"
            title="上移"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
            className="h-6 w-6 grid place-items-center text-gray-500 hover:bg-gray-200 rounded disabled:opacity-30"
            title="下移"
          >
            ↓
          </button>
          <GhostButton danger onClick={onDelete}>
            删除
          </GhostButton>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {isUser ? (
          <Field label="用户消息（纯文本）">
            <Textarea
              value={message.content}
              onChange={(e) => onChange({ ...message, content: e.target.value })}
              rows={3}
            />
          </Field>
        ) : (
          <AssistantEditor
            message={message as DoubaoAssistantMessage}
            onChange={(next) => onChange(next)}
          />
        )}
      </div>
    </div>
  )
}

function AssistantEditor({
  message,
  onChange,
}: {
  message: DoubaoAssistantMessage
  onChange: (next: DoubaoAssistantMessage) => void
}) {
  const followUpsText = message.followUps.join('\n')
  const setFollowUps = (raw: string) => {
    const items = raw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    onChange({ ...message, followUps: items })
  }

  return (
    <>
      <Field label="AI 回复（支持 markdown）">
        <Textarea
          value={message.content}
          onChange={(e) => onChange({ ...message, content: e.target.value })}
          rows={6}
        />
      </Field>

      <InlineField label="显示底部操作行（5 个图标）">
        <Toggle
          checked={message.showActions}
          onChange={(v) => onChange({ ...message, showActions: v })}
        />
      </InlineField>

      <Field
        label="推荐追问列表"
        hint="每行一个问题；为空则不显示"
      >
        <Textarea
          value={followUpsText}
          onChange={(e) => setFollowUps(e.target.value)}
          rows={4}
          placeholder={'每行一个问题\n例如：能否再用更简单的方式解释一遍？'}
        />
      </Field>
    </>
  )
}
