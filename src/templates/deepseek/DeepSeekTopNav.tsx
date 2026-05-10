import type { DeepSeekMode } from './types'
import { HamburgerIcon, NewChatIcon, LightningFastIcon, DiamondExpertIcon } from './icons'

interface Props {
  title: string
  mode: DeepSeekMode
  showMenu: boolean
  showNewChat: boolean
}

const MODE_LABEL: Record<DeepSeekMode, string | null> = {
  fast: '快速模式',
  deep: '专家模式',
  none: null,
}

export function DeepSeekTopNav({ title, mode, showMenu, showNewChat }: Props) {
  return (
    <div
      style={{
        height: 56,
        padding: '0 16px',
        display: 'grid',
        gridTemplateColumns: '40px 1fr 40px',
        alignItems: 'center',
        background: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {showMenu && (
          <span style={{ color: '#222' }}>
            <HamburgerIcon />
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: '#111',
            lineHeight: 1.2,
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </div>
        {MODE_LABEL[mode] && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              marginTop: 2,
              fontSize: 12,
              lineHeight: 1.2,
            }}
          >
            <span style={{ color: '#3F70FF', display: 'inline-flex' }}>
              {mode === 'deep' ? <DiamondExpertIcon /> : <LightningFastIcon />}
            </span>
            <span style={{ color: '#7E7F84' }}>{MODE_LABEL[mode]}</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {showNewChat && (
          <span style={{ color: '#222' }}>
            <NewChatIcon />
          </span>
        )}
      </div>
    </div>
  )
}
