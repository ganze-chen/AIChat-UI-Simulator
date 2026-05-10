interface Props {
  items: string[]
}

export function DoubaoFollowUpList({ items }: Props) {
  if (!items || items.length === 0) return null
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: '6px 16px 12px',
      }}
    >
      {items.map((q, i) => (
        <div
          key={i}
          style={{
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: 12,
            padding: '12px 16px',
            fontSize: 14,
            lineHeight: 1.5,
            color: '#1A1A1A',
          }}
        >
          {q}
        </div>
      ))}
    </div>
  )
}
