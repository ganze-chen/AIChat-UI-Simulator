import type { DeepSeekAssistantMessage as Msg } from './types'
import { DeepSeekMarkdown } from './markdown'
import { DeepSeekThinkingBlock } from './DeepSeekThinkingBlock'
import { DeepSeekActionRow } from './DeepSeekActionRow'

interface Props {
  message: Msg
}

export function DeepSeekAssistantMessage({ message }: Props) {
  return (
    <div style={{ padding: '6px 16px 14px' }}>
      <DeepSeekThinkingBlock thinking={message.thinking} />
      <DeepSeekMarkdown content={message.content} />
      {message.showActions && <DeepSeekActionRow />}
    </div>
  )
}
