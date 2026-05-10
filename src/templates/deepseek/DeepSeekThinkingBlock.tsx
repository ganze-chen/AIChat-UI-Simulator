import type { DeepSeekThinking } from './types'
import { ChevronRight, ChevronDown } from './icons'

interface Props {
  thinking: DeepSeekThinking
}

export function DeepSeekThinkingBlock({ thinking }: Props) {
  if (!thinking.enabled) return null

  const expanded = thinking.expanded && thinking.content.trim().length > 0
  const paragraphs = thinking.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div style={{ margin: '4px 0 12px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          color: '#9aa0a6',
          fontSize: 15,
          lineHeight: 1.4,
          padding: '4px 0',
        }}
      >
        <span>已思考（用时 {thinking.seconds} 秒）</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 2 }}>
          {expanded ? <ChevronDown /> : <ChevronRight />}
        </span>
      </div>

      {expanded && (
        <div
          style={{
            color: '#9aa0a6',
            fontSize: 15,
            lineHeight: 1.65,
            paddingLeft: 0,
            marginTop: 6,
          }}
        >
          {paragraphs.map((para, idx) => {
            const isFirst = idx === 0
            return (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  paddingLeft: 22,
                  marginBottom: idx === paragraphs.length - 1 ? 0 : 14,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {isFirst && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 6,
                      top: 0,
                      fontSize: 14,
                      lineHeight: 1.65,
                    }}
                  >
                    •
                  </span>
                )}
                {para}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
