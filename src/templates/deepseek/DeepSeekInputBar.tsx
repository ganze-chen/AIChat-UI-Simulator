import type { ReactNode } from 'react'
import { AtomIcon, GlobeIcon, PlusCircleIcon, VoiceIcon } from './icons'

interface Props {
  placeholder: string
  showDeepThink: boolean
  deepThinkActive: boolean
  showSmartSearch: boolean
  smartSearchActive: boolean
}

function Pill({ active, children }: { active: boolean; children: ReactNode }) {
  const activeStyle = {
    background: '#EEF3FF',
    color: '#3F70FF',
    border: '1px solid transparent',
  }
  const inactiveStyle = {
    background: '#fff',
    color: '#1A1A1A',
    border: '1px solid #E5E7EB',
  }
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '6px 12px',
        borderRadius: 999,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1,
        ...(active ? activeStyle : inactiveStyle),
      }}
    >
      {children}
    </div>
  )
}

export function DeepSeekInputBar({
  placeholder,
  showDeepThink,
  deepThinkActive,
  showSmartSearch,
  smartSearchActive,
}: Props) {
  return (
    <div data-deepseek-input-bar style={{ background: '#fff', padding: '10px 12px 14px' }}>
      <div
        style={{
          background: '#fff',
          border: '1px solid #ECECEE',
          borderRadius: 22,
          padding: '12px 14px 12px 18px',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: '#B5B7BB',
            lineHeight: 1.5,
            paddingBottom: 12,
            minHeight: 22,
          }}
        >
          {placeholder}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {showDeepThink && (
            <Pill active={deepThinkActive}>
              <AtomIcon />
              <span>深度思考</span>
            </Pill>
          )}
          {showSmartSearch && (
            <Pill active={smartSearchActive}>
              <GlobeIcon />
              <span>智能搜索</span>
            </Pill>
          )}

          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#3a3a3c',
            }}
          >
            <PlusCircleIcon />
            <VoiceIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
