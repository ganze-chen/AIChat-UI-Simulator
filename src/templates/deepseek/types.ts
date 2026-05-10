export type DeepSeekMode = 'fast' | 'deep' | 'none'

export interface DeepSeekThinking {
  enabled: boolean
  seconds: number
  content: string
  expanded: boolean
}

export interface DeepSeekUserMessage {
  id: string
  role: 'user'
  content: string
}

export interface DeepSeekAssistantMessage {
  id: string
  role: 'assistant'
  content: string
  thinking: DeepSeekThinking
  showActions: boolean
}

export type DeepSeekMessage = DeepSeekUserMessage | DeepSeekAssistantMessage

export interface DeepSeekState {
  statusBar: {
    time: string
  }
  header: {
    title: string
    mode: DeepSeekMode
    showMenu: boolean
    showNewChat: boolean
  }
  showAiHint: boolean
  messages: DeepSeekMessage[]
  inputBar: {
    visible: boolean
    placeholder: string
    showDeepThink: boolean
    deepThinkActive: boolean
    showSmartSearch: boolean
    smartSearchActive: boolean
  }
}
