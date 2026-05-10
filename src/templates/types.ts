import type { ComponentType, ReactNode } from 'react'
import type { PlatformId } from '@/types'

export interface TemplateProps<S> {
  state: S
  onChange: (next: S) => void
}

export interface RendererProps<S> {
  state: S
}

export interface Template<S = unknown> {
  id: PlatformId
  name: string
  icon: ReactNode
  status: 'ready' | 'soon'
  defaultState: () => S
  Renderer: ComponentType<RendererProps<S>>
  Editor: ComponentType<TemplateProps<S>>
  exportWidth: number
}
