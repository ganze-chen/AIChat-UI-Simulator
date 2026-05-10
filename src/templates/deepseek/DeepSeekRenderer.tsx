import type { RendererProps } from '../types'
import type { DeepSeekState } from './types'
import { DeepSeekStatusBar } from './DeepSeekStatusBar'
import { DeepSeekTopNav } from './DeepSeekTopNav'
import { DeepSeekUserMessage } from './DeepSeekUserMessage'
import { DeepSeekAssistantMessage } from './DeepSeekAssistantMessage'
import { DeepSeekInputBar } from './DeepSeekInputBar'

export function DeepSeekRenderer({ state }: RendererProps<DeepSeekState>) {
  return (
    <div
      style={{
        width: 390,
        background: '#fff',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif',
        color: '#111',
      }}
    >
      <DeepSeekStatusBar time={state.statusBar.time} />
      <DeepSeekTopNav
        title={state.header.title}
        mode={state.header.mode}
        showMenu={state.header.showMenu}
        showNewChat={state.header.showNewChat}
      />

      {state.showAiHint && (
        <div
          style={{
            textAlign: 'center',
            color: '#9aa0a6',
            fontSize: 13,
            padding: '4px 16px 14px',
          }}
        >
          回答由 AI 生成，仅供参考
        </div>
      )}

      <div>
        {state.messages.map((m) => {
          if (m.role === 'user') {
            return <DeepSeekUserMessage key={m.id} content={m.content} />
          }
          return <DeepSeekAssistantMessage key={m.id} message={m} />
        })}
      </div>

      {state.inputBar.visible && (
        <DeepSeekInputBar
          placeholder={state.inputBar.placeholder}
          showDeepThink={state.inputBar.showDeepThink}
          deepThinkActive={state.inputBar.deepThinkActive ?? true}
          showSmartSearch={state.inputBar.showSmartSearch}
          smartSearchActive={state.inputBar.smartSearchActive ?? true}
        />
      )}
    </div>
  )
}
