import { CopyIcon, ThumbUpIcon, ThumbDownIcon, ShareIcon, RefreshIcon } from './icons'

export function DeepSeekActionRow() {
  const color = '#9aa0a6'
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 14,
        color,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <CopyIcon />
        <ThumbUpIcon />
        <ThumbDownIcon />
        <ShareIcon />
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <RefreshIcon />
      </div>
    </div>
  )
}
