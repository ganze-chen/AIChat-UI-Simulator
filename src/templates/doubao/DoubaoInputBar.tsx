import { CameraIcon, InputMicIcon, InputPlusIcon } from './icons'

interface Props {
  placeholder: string
}

export function DoubaoInputBar({ placeholder }: Props) {
  return (
    <div
      data-doubao-input-bar
      style={{
        background: '#fff',
        padding: '8px 12px 14px',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '14px 14px 14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 6px 16px rgba(15, 23, 42, 0.08)',
        }}
      >
        <span style={{ color: '#1A1A1A', display: 'inline-flex', flexShrink: 0 }}>
          <CameraIcon />
        </span>
        <div
          style={{
            flex: 1,
            fontSize: 16,
            color: '#B5B7BB',
            lineHeight: 1.5,
            minHeight: 22,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {placeholder}
        </div>
        <span style={{ color: '#1A1A1A', display: 'inline-flex', flexShrink: 0 }}>
          <InputMicIcon />
        </span>
        <span style={{ color: '#1A1A1A', display: 'inline-flex', flexShrink: 0 }}>
          <InputPlusIcon />
        </span>
      </div>
    </div>
  )
}
