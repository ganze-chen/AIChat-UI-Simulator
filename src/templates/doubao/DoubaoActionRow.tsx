import type { ReactNode } from 'react'
import {
  CopyIcon,
  SoundReadIcon,
  BookmarkIcon,
  ShareIcon,
  RefreshIcon,
} from './icons'

function Chip({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: '#E8EDF7',
        color: '#0B66F3',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}

export function DoubaoActionRow() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Chip>
          <CopyIcon />
        </Chip>
        <Chip>
          <SoundReadIcon />
        </Chip>
        <Chip>
          <BookmarkIcon />
        </Chip>
        <Chip>
          <ShareIcon />
        </Chip>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <Chip>
          <RefreshIcon />
        </Chip>
      </div>
    </div>
  )
}
