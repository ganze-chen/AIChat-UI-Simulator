export interface DoubaoUserMessage {
  id: string
  role: 'user'
  content: string
}

export interface DoubaoAssistantMessage {
  id: string
  role: 'assistant'
  content: string
  showActions: boolean
  followUps: string[]
}

export type DoubaoMessage = DoubaoUserMessage | DoubaoAssistantMessage

export interface DoubaoToolbarPill {
  id: string
  iconKey: 'fast' | 'mic' | 'sparkle' | 'palette' | 'image' | 'custom'
  label: string
  trailingChevron: boolean
  visible: boolean
}

export interface DoubaoState {
  statusBar: {
    time: string
  }
  header: {
    title: string
    titleChevron: boolean
    subtitle: string
    showMenu: boolean
    showPhone: boolean
    showSpeaker: boolean
  }
  messages: DoubaoMessage[]
  bottomToolbar: {
    visible: boolean
    pills: DoubaoToolbarPill[]
  }
  inputBar: {
    visible: boolean
    placeholder: string
  }
}
