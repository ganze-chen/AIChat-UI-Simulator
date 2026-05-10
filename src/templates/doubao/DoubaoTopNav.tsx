import { HamburgerIcon, TitleChevronRight, PhoneIcon, SpeakerLoudIcon } from './icons'

interface Props {
  title: string
  titleChevron: boolean
  subtitle: string
  showMenu: boolean
  showPhone: boolean
  showSpeaker: boolean
}

export function DoubaoTopNav({
  title,
  titleChevron,
  subtitle,
  showMenu,
  showPhone,
  showSpeaker,
}: Props) {
  return (
    <div
      style={{
        height: 56,
        padding: '0 16px',
        display: 'grid',
        gridTemplateColumns: '40px 1fr 80px',
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 17,
            fontWeight: 500,
            color: '#111',
            lineHeight: 1.2,
            maxWidth: '100%',
          }}
        >
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 180,
            }}
          >
            {title}
          </span>
          {titleChevron && (
            <span style={{ color: '#9A9A9A', display: 'inline-flex' }}>
              <TitleChevronRight />
            </span>
          )}
        </div>
        {subtitle && (
          <div
            style={{
              marginTop: 2,
              fontSize: 12,
              color: '#9A9A9A',
              lineHeight: 1.2,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 12,
        }}
      >
        {showPhone && (
          <span style={{ color: '#1A1A1A', display: 'inline-flex' }}>
            <PhoneIcon />
          </span>
        )}
        {showSpeaker && (
          <span style={{ color: '#0066FF', display: 'inline-flex' }}>
            <SpeakerLoudIcon />
          </span>
        )}
      </div>
    </div>
  )
}
