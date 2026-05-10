import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

export const HamburgerIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 9 H20 M4 15 H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const TitleChevronRight = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

export const PhoneIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M5.5 4.5 C5.5 3.7 6.2 3 7 3 L9.5 3 C10.3 3 11 3.7 11 4.5 L11 6.7 C11 7.3 10.7 7.8 10.2 8.1 L8.7 9 C9.7 11.5 12 13.7 14.5 14.7 L15.4 13.2 C15.7 12.7 16.2 12.4 16.8 12.4 L19 12.4 C19.8 12.4 20.5 13.1 20.5 13.9 L20.5 16.4 C20.5 17.2 19.8 17.9 19 17.9 C11.5 17.9 5.5 11.9 5.5 4.5 Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export const SpeakerLoudIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4 9 H7.5 L12 5.5 L12 18.5 L7.5 15 H4 Z"
      fill="currentColor"
    />
    <path
      d="M15.5 8.5 C16.7 9.5 17.4 10.7 17.4 12 C17.4 13.3 16.7 14.5 15.5 15.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M18 6 C20 7.6 21 9.7 21 12 C21 14.3 20 16.4 18 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

export const ChevronDownSmall = (p: P) => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M3 6 L8 11 L13 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

// Action row icons (used inside #e8edf7 chip)

export const CopyIcon = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="8" y="3.5" width="12" height="12" rx="2.4" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path
      d="M16 17.5 V18.5 C16 19.6 15.1 20.5 14 20.5 H6 C4.9 20.5 4 19.6 4 18.5 V10.5 C4 9.4 4.9 8.5 6 8.5 H7"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

export const SoundReadIcon = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M5 9 H8 L12.5 5.5 V18.5 L8 15 H5 Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M15.5 9.5 C16.4 10.3 17 11.1 17 12 C17 12.9 16.4 13.7 15.5 14.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M18 7 C19.5 8.4 20.3 10.1 20.3 12 C20.3 13.9 19.5 15.6 18 17"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

export const BookmarkIcon = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M6.5 3.5 H17.5 V20 L12 16 L6.5 20 Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export const ShareIcon = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M5 12 L5 19 C5 20 6 21 7 21 L17 21 C18 21 19 20 19 19 L19 12"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M12 16 V4 M7 8 L12 3 L17 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

export const RefreshIcon = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M20 12 A8 8 0 1 1 17.5 6.5 M20 4 V8 H16"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

// Bottom toolbar pill icons

export const FastBoltIcon = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
    <path d="M9 1.5 L3 9 H7.5 L6.5 14.5 L13 7 H8.5 L9 1.5 Z" fill="currentColor" />
  </svg>
)

export const ToolbarMicIcon = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
    <rect x="6" y="2" width="4" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <path d="M3.5 8 C3.5 10.5 5.5 12 8 12 C10.5 12 12.5 10.5 12.5 8 M8 12 V14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
  </svg>
)

export const SparkleIcon = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
    <path
      d="M8 1.5 L9.5 6 L14 7.5 L9.5 9 L8 13.5 L6.5 9 L2 7.5 L6.5 6 Z"
      fill="currentColor"
    />
  </svg>
)

export const PaletteImageIcon = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" {...p}>
    <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
    <circle cx="6" cy="6" r="1.2" fill="currentColor" />
    <path d="M3 12 L7 8 L10 11 L12 9 L13.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

// Input bar icons

export const CameraIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M4 8 H7.5 L9 5.5 H15 L16.5 8 H20 C20.6 8 21 8.4 21 9 V18 C21 18.6 20.6 19 20 19 H4 C3.4 19 3 18.6 3 18 V9 C3 8.4 3.4 8 4 8 Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
)

export const InputMicIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path d="M5.5 12 C5.5 15.6 8.4 17.6 12 17.6 C15.6 17.6 18.5 15.6 18.5 12 M12 17.6 V21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
  </svg>
)

export const InputPlusIcon = (p: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
    <path d="M12 7 V17 M7 12 H17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)
