import type { PlatformId } from '@/types'
import type { Template } from './types'
import { deepseekTemplate } from './deepseek'
import { doubaoTemplate } from './doubao'

const registry: Record<PlatformId, Template<any>> = {
  deepseek: deepseekTemplate as Template<any>,
  doubao: doubaoTemplate as Template<any>,
  qwen: {
    id: 'qwen',
    name: '通义千问',
    status: 'soon',
    icon: null,
    defaultState: () => ({}),
    Renderer: () => null,
    Editor: () => null,
    exportWidth: 390,
  },
  kimi: {
    id: 'kimi',
    name: 'Kimi',
    status: 'soon',
    icon: null,
    defaultState: () => ({}),
    Renderer: () => null,
    Editor: () => null,
    exportWidth: 390,
  },
}

export function getTemplate(id: PlatformId): Template<any> {
  return registry[id]
}

export function listTemplates(): Template<any>[] {
  return Object.values(registry)
}
