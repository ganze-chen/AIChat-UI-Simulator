import { EyeIcon, AlarmIcon, WifiIcon, SignalBarsIcon, BatteryIcon } from './icons'

interface Props {
  time: string
}

export function DeepSeekStatusBar({ time }: Props) {
  return (
    <div
      style={{
        height: 36,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        color: '#000',
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: 0.2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: '-apple-system, sans-serif', fontWeight: 600 }}>
          {time}
        </span>
        <EyeIcon />
        <AlarmIcon />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <WifiIcon />
        <SignalBarsIcon label="5G" />
        <BatteryIcon percent={85} />
      </div>
    </div>
  )
}
