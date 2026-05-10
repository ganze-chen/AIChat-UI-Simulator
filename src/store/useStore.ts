import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Draft, PlatformId } from '@/types'
import { getTemplate } from '@/templates/registry'

export interface ExportOptions {
  pixelRatio: 2 | 3 | 4
  hideInputBar: boolean
}

interface StoreState {
  drafts: Record<string, Draft>
  draftOrder: string[]
  activeDraftId: string | null
  zoom: number
  exportOptions: ExportOptions
}

interface StoreActions {
  createDraft: (platformId: PlatformId, name?: string) => string
  duplicateDraft: (id: string) => string | null
  renameDraft: (id: string, name: string) => void
  deleteDraft: (id: string) => void
  setActiveDraft: (id: string) => void
  updateActiveState: (updater: (s: any) => any) => void
  importDrafts: (incoming: Draft[], mode: 'merge' | 'replace') => void
  setZoom: (z: number) => void
  setExportOptions: (patch: Partial<ExportOptions>) => void
}

const newDraftId = () =>
  `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`

export const useStore = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      drafts: {},
      draftOrder: [],
      activeDraftId: null,
      zoom: 0.75,
      exportOptions: {
        pixelRatio: 3,
        hideInputBar: false,
      },

      createDraft: (platformId, name) => {
        const tpl = getTemplate(platformId)
        if (tpl.status !== 'ready') return ''
        const id = newDraftId()
        const now = Date.now()
        const draft: Draft = {
          id,
          name: name?.trim() || `${tpl.name} 草稿`,
          platformId,
          createdAt: now,
          updatedAt: now,
          state: tpl.defaultState(),
        }
        set((s) => ({
          drafts: { ...s.drafts, [id]: draft },
          draftOrder: [id, ...s.draftOrder],
          activeDraftId: id,
        }))
        return id
      },

      duplicateDraft: (id) => {
        const src = get().drafts[id]
        if (!src) return null
        const newId = newDraftId()
        const now = Date.now()
        const copy: Draft = {
          ...src,
          id: newId,
          name: `${src.name} 副本`,
          createdAt: now,
          updatedAt: now,
          state: structuredClone(src.state),
        }
        set((s) => {
          const order = [...s.draftOrder]
          const idx = order.indexOf(id)
          if (idx >= 0) order.splice(idx + 1, 0, newId)
          else order.unshift(newId)
          return {
            drafts: { ...s.drafts, [newId]: copy },
            draftOrder: order,
            activeDraftId: newId,
          }
        })
        return newId
      },

      renameDraft: (id, name) => {
        set((s) => {
          const d = s.drafts[id]
          if (!d) return s
          return {
            drafts: {
              ...s.drafts,
              [id]: { ...d, name: name.trim() || d.name, updatedAt: Date.now() },
            },
          }
        })
      },

      deleteDraft: (id) => {
        set((s) => {
          const next = { ...s.drafts }
          delete next[id]
          const order = s.draftOrder.filter((x) => x !== id)
          let active = s.activeDraftId
          if (active === id) active = order[0] ?? null
          return { drafts: next, draftOrder: order, activeDraftId: active }
        })
      },

      setActiveDraft: (id) => set({ activeDraftId: id }),

      updateActiveState: (updater) => {
        set((s) => {
          const id = s.activeDraftId
          if (!id) return s
          const d = s.drafts[id]
          if (!d) return s
          return {
            drafts: {
              ...s.drafts,
              [id]: {
                ...d,
                state: updater(d.state),
                updatedAt: Date.now(),
              },
            },
          }
        })
      },

      importDrafts: (incoming, mode) => {
        set((s) => {
          if (mode === 'replace') {
            const drafts: Record<string, Draft> = {}
            const order: string[] = []
            for (const d of incoming) {
              drafts[d.id] = d
              order.push(d.id)
            }
            return {
              drafts,
              draftOrder: order,
              activeDraftId: order[0] ?? null,
            }
          }
          const drafts = { ...s.drafts }
          const order = [...s.draftOrder]
          for (const d of incoming) {
            let id = d.id
            if (drafts[id]) {
              id = newDraftId()
            }
            drafts[id] = { ...d, id, name: drafts[d.id] ? `${d.name} (导入)` : d.name }
            order.unshift(id)
          }
          return { drafts, draftOrder: order }
        })
      },

      setZoom: (z) => set({ zoom: z }),

      setExportOptions: (patch) =>
        set((s) => ({ exportOptions: { ...s.exportOptions, ...patch } })),
    }),
    {
      name: 'aichat_render.v1',
      version: 1,
    },
  ),
)

export function getActiveDraft(state: StoreState): Draft | null {
  if (!state.activeDraftId) return null
  return state.drafts[state.activeDraftId] ?? null
}
