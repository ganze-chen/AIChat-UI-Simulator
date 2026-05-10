import type { RendererProps } from '../types'
import type { DoubaoState } from './types'
import { DeepSeekStatusBar } from '../deepseek/DeepSeekStatusBar'
import { DoubaoTopNav } from './DoubaoTopNav'
import { DoubaoUserMessage } from './DoubaoUserMessage'
import { DoubaoAssistantCard } from './DoubaoAssistantCard'
import { DoubaoFollowUpList } from './DoubaoFollowUpList'
import { DoubaoBottomToolbar } from './DoubaoBottomToolbar'
import { DoubaoInputBar } from './DoubaoInputBar'

export function DoubaoRenderer({ state }: RendererProps<DoubaoState>) {
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
      <DoubaoTopNav
        title={state.header.title}
        titleChevron={state.header.titleChevron}
        subtitle={state.header.subtitle}
        showMenu={state.header.showMenu}
        showPhone={state.header.showPhone}
        showSpeaker={state.header.showSpeaker}
      />

      <div>
        {state.messages.map((m) => {
          if (m.role === 'user') {
            return <DoubaoUserMessage key={m.id} content={m.content} />
          }
          return (
            <div key={m.id}>
              <DoubaoAssistantCard message={m} />
              <DoubaoFollowUpList items={m.followUps} />
            </div>
          )
        })}
      </div>

      {state.bottomToolbar.visible && (
        <DoubaoBottomToolbar pills={state.bottomToolbar.pills} />
      )}

      {state.inputBar.visible && (
        <DoubaoInputBar placeholder={state.inputBar.placeholder} />
      )}
    </div>
  )
}
