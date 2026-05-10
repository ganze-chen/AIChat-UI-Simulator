import type { Template } from '../types'
import type { DoubaoState } from './types'
import { defaultDoubaoState } from './defaults'
import { DoubaoRenderer } from './DoubaoRenderer'
import { DoubaoEditor } from './DoubaoEditor'

const Icon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="9" cy="11" r="1.4" fill="currentColor" />
    <circle cx="15" cy="11" r="1.4" fill="currentColor" />
    <path d="M9 15 C10.5 16.3 13.5 16.3 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
)

export const doubaoTemplate: Template<DoubaoState> = {
  id: 'doubao',
  name: '豆包',
  icon: <Icon />,
  status: 'ready',
  defaultState: defaultDoubaoState,
  Renderer: DoubaoRenderer,
  Editor: DoubaoEditor,
  exportWidth: 390,
}
