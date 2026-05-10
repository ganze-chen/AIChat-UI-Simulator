import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

export const KeyIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="9" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M11.6 11.4 L20 3 M16 7 L18.5 9.5 M14 9 L16.5 11.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)

export const EyeIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M2 12c2.5-4.5 6-7 10-7s7.5 2.5 10 7c-2.5 4.5-6 7-10 7s-7.5-2.5-10-7Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

export const AlarmIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="13" r="7" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M12 9v4l2.5 2 M5 5l-2 2 M19 5l2 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)

export const BluetoothIcon = (p: P) => (
  <svg width="12" height="14" viewBox="0 0 16 20" fill="none" {...p}>
    <path
      d="M5 4.5 L11 10 L5 15.5 L5 4.5 L11 10 L5 15.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M3 7 L8 10 L3 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
)

export const VibrateIcon = (p: P) => (
  <svg width="20" height="14" viewBox="0 0 24 14" fill="none" {...p}>
    <path
      d="M2 7 L4 4 L6 10 L8 4 L10 10 L12 4 L14 10 L16 4 L18 10 L20 4 L22 7"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const WifiIcon = (p: P) => (
  <svg width="16" height="12" viewBox="0 0 20 14" fill="none" {...p}>
    <path d="M2 5.5 C5.5 2.5 14.5 2.5 18 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M5 8.5 C7 6.7 13 6.7 15 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="10" cy="11" r="1.2" fill="currentColor" />
  </svg>
)

export const SignalBarsIcon = ({ label = '', ...p }: P & { label?: string }) => (
  <svg width="22" height="12" viewBox="0 0 26 14" fill="none" {...p}>
    {label && (
      <text x="0" y="10" fontSize="8" fontWeight="600" fill="currentColor" fontFamily="-apple-system, sans-serif">
        {label}
      </text>
    )}
    {/* Bars at the right */}
    <rect x="11" y="9" width="2" height="4" rx="0.5" fill="currentColor" />
    <rect x="14" y="7" width="2" height="6" rx="0.5" fill="currentColor" />
    <rect x="17" y="5" width="2" height="8" rx="0.5" fill="currentColor" />
    <rect x="20" y="3" width="2" height="10" rx="0.5" fill="currentColor" />
  </svg>
)

export const SignalBarsPlain = (p: P) => (
  <svg width="14" height="12" viewBox="0 0 16 14" fill="none" {...p}>
    <rect x="1" y="9" width="2" height="4" rx="0.5" fill="currentColor" />
    <rect x="4" y="7" width="2" height="6" rx="0.5" fill="currentColor" />
    <rect x="7" y="5" width="2" height="8" rx="0.5" fill="currentColor" />
    <rect x="10" y="3" width="2" height="10" rx="0.5" fill="currentColor" />
    <rect x="13" y="1" width="2" height="12" rx="0.5" fill="currentColor" opacity="0.35" />
  </svg>
)

export const BatteryIcon = ({ percent = 85 }: { percent?: number }) => (
  <svg width="34" height="14" viewBox="0 0 38 16" fill="none">
    <rect x="0.5" y="1.5" width="32" height="13" rx="3" stroke="currentColor" strokeWidth="1" fill="none" />
    <rect x="33" y="5" width="2" height="6" rx="1" fill="currentColor" />
    <rect x="2.5" y="3.5" width={(28 * Math.min(100, Math.max(0, percent))) / 100} height="9" rx="1.5" fill="currentColor" />
    {/* Lightning bolt for charging */}
    <path
      d="M17.5 4 L13 9 H16 L14.5 13 L19 8 H16 L17.5 4 Z"
      fill="#fff"
    />
    {/* Percentage text overlay */}
    <text x="6" y="11" fontSize="7.5" fontWeight="700" fill="#fff" fontFamily="-apple-system, sans-serif">
      {percent}
    </text>
  </svg>
)

export const HamburgerIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 9 H20 M4 15 H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const NewChatIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M12 4 C7 4 3 7.5 3 11.8 C3 14 4 16 5.7 17.4 L4.6 20.5 L8.2 19.2 C9.4 19.7 10.7 20 12 20 C17 20 21 16.4 21 12 C21 7.6 17 4 12 4 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M12 9 V15 M9 12 H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const LightningFastIcon = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
    <path
      d="M9 1.5 L3 9 H7.5 L6.5 14.5 L13 7 H8.5 L9 1.5 Z"
      fill="currentColor"
    />
  </svg>
)

export const DiamondExpertIcon = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
    <path
      d="M3.5 5.5 L5.6 3 H10.4 L12.5 5.5 L8 13.5 Z"
      fill="currentColor"
    />
    <path
      d="M3.5 5.5 H12.5 M5.6 3 L8 5.5 L10.4 3"
      stroke="#fff"
      strokeWidth="0.7"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export const ChevronRight = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

export const ChevronDown = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M3 6 L8 11 L13 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

export const CopyIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="8" y="3" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M16 18 V19 C16 20.1 15.1 21 14 21 H5 C3.9 21 3 20.1 3 19 V10 C3 8.9 3.9 8 5 8 H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

export const ThumbUpIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M7 11 V20 H4 V11 Z M7 11 L10.5 4 C11 3 12 3 12.5 3.5 C13 4 13.2 4.7 13 5.5 L12 10 H18.5 C19.7 10 20.5 11 20.3 12 L18.7 19 C18.5 20 17.6 20.5 16.7 20.5 H7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export const ThumbDownIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M7 13 V4 H4 V13 Z M7 13 L10.5 20 C11 21 12 21 12.5 20.5 C13 20 13.2 19.3 13 18.5 L12 14 H18.5 C19.7 14 20.5 13 20.3 12 L18.7 5 C18.5 4 17.6 3.5 16.7 3.5 H7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export const ShareIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M5 12 L5 19 C5 20 6 21 7 21 L17 21 C18 21 19 20 19 19 L19 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M12 16 V4 M7 8 L12 3 L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

export const RefreshIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M20 12 A8 8 0 1 1 17.5 6.5 M20 4 V8 H16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export const AtomIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" {...p}>
    <ellipse cx="10" cy="10" rx="8" ry="3.2" stroke="currentColor" strokeWidth="1.4" />
    <ellipse cx="10" cy="10" rx="8" ry="3.2" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 10 10)" />
    <ellipse cx="10" cy="10" rx="8" ry="3.2" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 10 10)" />
    <circle cx="10" cy="10" r="1.4" fill="currentColor" />
  </svg>
)

export const GlobeIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" {...p}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4" />
    <ellipse cx="10" cy="10" rx="3.5" ry="8" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2 10 H18 M2 7 H18 M2 13 H18" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

export const PlusCircleIcon = (p: P) => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" {...p}>
    <circle cx="14" cy="14" r="12.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M14 9 V19 M9 14 H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const VoiceIcon = (p: P) => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" {...p}>
    <circle cx="14" cy="14" r="12.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path
      d="M9 11 C9 12.5 9 15.5 9 17 M11.5 9 C11.5 11 11.5 17 11.5 19 M14 11 C14 12.5 14 15.5 14 17 M16.5 13 V15 M19 11 C19 12.5 19 15.5 19 17"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
)
