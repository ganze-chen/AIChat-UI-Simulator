import type { ReactNode } from 'react'
import type { DoubaoToolbarPill } from './types'
import {
  FastBoltIcon,
  ToolbarMicIcon,
  SparkleIcon,
  PaletteImageIcon,
  ChevronDownSmall,
} from './icons'

const ICON_MAP: Record<DoubaoToolbarPill['iconKey'], (() => ReactNode) | null> = {
  fast: () => (
    <span style={{ color: '#1A1A1A', display: 'inline-flex' }}>
      <FastBoltIcon />
    </span>
  ),
  mic: () => (
    <span style={{ color: '#1A1A1A', display: 'inline-flex' }}>
      <ToolbarMicIcon />
    </span>
  ),
  sparkle: () => (
    <span style={{ color: '#1A1A1A', display: 'inline-flex' }}>
      <SparkleIcon />
    </span>
  ),
  palette: () => (
    <span style={{ color: '#1A1A1A', display: 'inline-flex' }}>
      <PaletteImageIcon />
    </span>
  ),
  image: () => (
    <span style={{ color: '#1A1A1A', display: 'inline-flex' }}>
      <PaletteImageIcon />
    </span>
  ),
  custom: null,
}

interface Props {
  pills: DoubaoToolbarPill[]
}

export function DoubaoBottomToolbar({ pills }: Props) {
  const visiblePills = pills.filter((p) => p.visible)
  if (visiblePills.length === 0) return null
  return (
    <div
      style={{
        background: '#fff',
        padding: '10px 12px',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {visiblePills.map((pill) => {
          const Icon = ICON_MAP[pill.iconKey]
          return (
            <div
              key={pill.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 999,
                background: '#fff',
                border: '1px solid #E5E7EB',
                color: '#1A1A1A',
                fontSize: 14,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {Icon && Icon()}
              <span>{pill.label}</span>
              {pill.trailingChevron && (
                <span style={{ color: '#9A9A9A', display: 'inline-flex' }}>
                  <ChevronDownSmall />
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
