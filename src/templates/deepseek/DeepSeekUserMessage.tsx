interface Props {
  content: string
}

export function DeepSeekUserMessage({ content }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '8px 16px',
      }}
    >
      <div
        style={{
          maxWidth: '78%',
          background: '#EEF3FF',
          borderRadius: '18px 18px 6px 18px',
          padding: '11px 16px',
          fontSize: 16,
          lineHeight: 1.5,
          color: '#111',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {content}
      </div>
    </div>
  )
}
