interface Props {
  content: string
}

export function DoubaoUserMessage({ content }: Props) {
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
          maxWidth: '88%',
          background: '#025AE1',
          borderRadius: 18,
          padding: '11px 16px',
          fontSize: 16,
          lineHeight: 1.5,
          color: '#FFFFFF',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {content}
      </div>
    </div>
  )
}
