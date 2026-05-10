import type { TemplateProps } from '../../types'
import type { DoubaoState, DoubaoToolbarPill } from '../types'
import {
  Section,
  Field,
  InlineField,
  TextInput,
  Textarea,
  Toggle,
  Select,
  GhostButton,
  PrimaryButton,
} from '../../deepseek/editor/fields'

const ICON_OPTIONS: { value: DoubaoToolbarPill['iconKey']; label: string }[] = [
  { value: 'fast', label: '⚡ 闪电' },
  { value: 'mic', label: '🎙️ 麦克风' },
  { value: 'sparkle', label: '✨ 星光' },
  { value: 'palette', label: '🎨 调色盘' },
  { value: 'image', label: '🖼️ 图片' },
  { value: 'custom', label: '— 无图标' },
]

export function GeneralTab({ state, onChange }: TemplateProps<DoubaoState>) {
  const update = (patch: Partial<DoubaoState>) => onChange({ ...state, ...patch })
  const updateHeader = (patch: Partial<DoubaoState['header']>) =>
    onChange({ ...state, header: { ...state.header, ...patch } })
  const updateInput = (patch: Partial<DoubaoState['inputBar']>) =>
    onChange({ ...state, inputBar: { ...state.inputBar, ...patch } })
  const updateToolbar = (patch: Partial<DoubaoState['bottomToolbar']>) =>
    onChange({ ...state, bottomToolbar: { ...state.bottomToolbar, ...patch } })

  const updatePill = (id: string, patch: Partial<DoubaoToolbarPill>) => {
    updateToolbar({
      pills: state.bottomToolbar.pills.map((p) =>
        p.id === id ? { ...p, ...patch } : p,
      ),
    })
  }
  const deletePill = (id: string) => {
    updateToolbar({ pills: state.bottomToolbar.pills.filter((p) => p.id !== id) })
  }
  const movePill = (id: string, delta: -1 | 1) => {
    const pills = [...state.bottomToolbar.pills]
    const idx = pills.findIndex((p) => p.id === id)
    const target = idx + delta
    if (idx < 0 || target < 0 || target >= pills.length) return
    ;[pills[idx], pills[target]] = [pills[target], pills[idx]]
    updateToolbar({ pills })
  }
  const addPill = () => {
    const id = `p_${Date.now().toString(36)}`
    updateToolbar({
      pills: [
        ...state.bottomToolbar.pills,
        { id, iconKey: 'custom', label: '新功能', trailingChevron: false, visible: true },
      ],
    })
  }

  return (
    <div className="flex flex-col">
      <Section title="状态栏">
        <Field label="时间">
          <TextInput
            value={state.statusBar.time}
            onChange={(e) =>
              update({ statusBar: { ...state.statusBar, time: e.target.value } })
            }
            placeholder="8:50"
            className="w-28"
          />
        </Field>
      </Section>

      <Section title="顶栏">
        <Field label="对话标题">
          <TextInput
            value={state.header.title}
            onChange={(e) => updateHeader({ title: e.target.value })}
          />
        </Field>
        <InlineField label="标题尾部显示「›」">
          <Toggle
            checked={state.header.titleChevron}
            onChange={(v) => updateHeader({ titleChevron: v })}
          />
        </InlineField>
        <Field label="副标题">
          <TextInput
            value={state.header.subtitle}
            onChange={(e) => updateHeader({ subtitle: e.target.value })}
            placeholder="内容由豆包 AI 生成"
          />
        </Field>
        <InlineField label="显示菜单按钮 (≡)">
          <Toggle
            checked={state.header.showMenu}
            onChange={(v) => updateHeader({ showMenu: v })}
          />
        </InlineField>
        <InlineField label="显示电话图标">
          <Toggle
            checked={state.header.showPhone}
            onChange={(v) => updateHeader({ showPhone: v })}
          />
        </InlineField>
        <InlineField label="显示喇叭图标">
          <Toggle
            checked={state.header.showSpeaker}
            onChange={(v) => updateHeader({ showSpeaker: v })}
          />
        </InlineField>
      </Section>

      <Section
        title="底部功能 toolbar"
        action={<PrimaryButton onClick={addPill}>+ 加 pill</PrimaryButton>}
      >
        <InlineField label="显示 toolbar">
          <Toggle
            checked={state.bottomToolbar.visible}
            onChange={(v) => updateToolbar({ visible: v })}
          />
        </InlineField>
        <div className="flex flex-col gap-2">
          {state.bottomToolbar.pills.map((p, i) => (
            <div
              key={p.id}
              className="border border-gray-200 rounded-md p-2 flex flex-col gap-2 bg-gray-50/40"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase">
                  #{i + 1}
                </span>
                <TextInput
                  value={p.label}
                  onChange={(e) => updatePill(p.id, { label: e.target.value })}
                  className="flex-1"
                />
                <Toggle
                  checked={p.visible}
                  onChange={(v) => updatePill(p.id, { visible: v })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={p.iconKey}
                  onChange={(e) =>
                    updatePill(p.id, { iconKey: e.target.value as DoubaoToolbarPill['iconKey'] })
                  }
                  options={ICON_OPTIONS}
                  className="flex-1"
                />
                <label className="flex items-center gap-1 text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={p.trailingChevron}
                    onChange={(e) => updatePill(p.id, { trailingChevron: e.target.checked })}
                    className="h-3.5 w-3.5 accent-blue-500"
                  />
                  尾部 ⌄
                </label>
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => movePill(p.id, -1)}
                  className="h-6 w-6 grid place-items-center text-gray-500 hover:bg-gray-200 rounded disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={i === state.bottomToolbar.pills.length - 1}
                  onClick={() => movePill(p.id, 1)}
                  className="h-6 w-6 grid place-items-center text-gray-500 hover:bg-gray-200 rounded disabled:opacity-30"
                >
                  ↓
                </button>
                <GhostButton danger onClick={() => deletePill(p.id)}>
                  删
                </GhostButton>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="输入栏">
        <InlineField label="显示输入栏">
          <Toggle
            checked={state.inputBar.visible}
            onChange={(v) => updateInput({ visible: v })}
          />
        </InlineField>
        <Field label="占位文本">
          <Textarea
            rows={2}
            value={state.inputBar.placeholder}
            onChange={(e) => updateInput({ placeholder: e.target.value })}
            placeholder="发消息或按住说话…"
          />
        </Field>
      </Section>
    </div>
  )
}
