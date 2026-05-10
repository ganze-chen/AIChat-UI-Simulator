import type { Template } from '../types'
import type { DeepSeekState } from './types'
import { defaultDeepSeekState } from './defaults'
import { DeepSeekRenderer } from './DeepSeekRenderer'
import { DeepSeekEditor } from './DeepSeekEditor'

const Icon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M7 12c2.5 1.8 7.5 1.8 10 0"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

export const deepseekTemplate: Template<DeepSeekState> = {
  id: 'deepseek',
  name: 'DeepSeek',
  icon: <Icon />,
  status: 'ready',
  defaultState: defaultDeepSeekState,
  Renderer: DeepSeekRenderer,
  Editor: DeepSeekEditor,
  exportWidth: 390,
}
