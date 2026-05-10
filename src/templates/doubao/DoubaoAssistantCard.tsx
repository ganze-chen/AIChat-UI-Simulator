import type { DoubaoAssistantMessage } from './types'
import { DeepSeekMarkdown } from '../deepseek/markdown'
import { DoubaoActionRow } from './DoubaoActionRow'

interface Props {
  message: DoubaoAssistantMessage
}

export function DoubaoAssistantCard({ message }: Props) {
  return (
    <div style={{ padding: '6px 16px 8px' }}>
      <div
        style={{
          background: '#F7F7F7',
          borderRadius: 16,
          padding: 16,
        }}
      >
        <DeepSeekMarkdown content={message.content} />
        {message.showActions && <DoubaoActionRow />}
      </div>
    </div>
  )
}
