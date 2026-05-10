import type { DeepSeekMessage, DeepSeekAssistantMessage } from '../types'
import { Field, InlineField, Textarea, Toggle, NumberInput, GhostButton } from './fields'

interface Props {
  message: DeepSeekMessage
  index: number
  total: number
  onChange: (next: DeepSeekMessage) => void
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
            className="h-6 w-6 grid place-items-center text-gray-500 hover:bg-gray-200 rounded disabled:opacity-30 disabled:hover:bg-transparent"
            title="上移"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
            className="h-6 w-6 grid place-items-center text-gray-500 hover:bg-gray-200 rounded disabled:opacity-30 disabled:hover:bg-transparent"
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
            message={message as DeepSeekAssistantMessage}
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
  message: DeepSeekAssistantMessage
  onChange: (next: DeepSeekAssistantMessage) => void
}) {
  const updateThinking = (patch: Partial<DeepSeekAssistantMessage['thinking']>) =>
    onChange({ ...message, thinking: { ...message.thinking, ...patch } })

  return (
    <>
      <Field label="AI 回复（支持 markdown）">
        <Textarea
          value={message.content}
          onChange={(e) => onChange({ ...message, content: e.target.value })}
          rows={6}
        />
      </Field>

      <div className="border border-gray-200 rounded-md bg-gray-50/50 p-3 flex flex-col gap-2.5">
        <InlineField label="启用「已思考」折叠条">
          <Toggle
            checked={message.thinking.enabled}
            onChange={(v) => updateThinking({ enabled: v })}
          />
        </InlineField>
        {message.thinking.enabled && (
          <>
            <InlineField label="思考用时（秒）">
              <NumberInput
                min={1}
                max={9999}
                value={message.thinking.seconds}
                onChange={(e) =>
                  updateThinking({ seconds: Math.max(1, Number(e.target.value) || 1) })
                }
              />
            </InlineField>
            <Field label="思考过程内容（空行分段）">
              <Textarea
                value={message.thinking.content}
                onChange={(e) => updateThinking({ content: e.target.value })}
                rows={4}
                placeholder="只有当此处非空且「展开」开启时才会渲染思考内容"
              />
            </Field>
            <InlineField label="默认展开">
              <Toggle
                checked={message.thinking.expanded}
                onChange={(v) => updateThinking({ expanded: v })}
              />
            </InlineField>
          </>
        )}
      </div>

      <InlineField label="显示底部操作按钮（复制/赞/踩/分享/重新生成）">
        <Toggle
          checked={message.showActions}
          onChange={(v) => onChange({ ...message, showActions: v })}
        />
      </InlineField>
    </>
  )
}
