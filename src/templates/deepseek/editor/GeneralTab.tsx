import type { TemplateProps } from '../../types'
import type { DeepSeekState, DeepSeekMode } from '../types'
import { Section, Field, InlineField, TextInput, Textarea, Select, Toggle } from './fields'

export function GeneralTab({ state, onChange }: TemplateProps<DeepSeekState>) {
  const update = (patch: Partial<DeepSeekState>) => onChange({ ...state, ...patch })
  const updateHeader = (patch: Partial<DeepSeekState['header']>) =>
    onChange({ ...state, header: { ...state.header, ...patch } })
  const updateInput = (patch: Partial<DeepSeekState['inputBar']>) =>
    onChange({ ...state, inputBar: { ...state.inputBar, ...patch } })

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
        <Field label="模式">
          <Select<DeepSeekMode>
            value={state.header.mode}
            onChange={(e) => updateHeader({ mode: e.target.value as DeepSeekMode })}
            options={[
              { value: 'fast', label: '快速模式' },
              { value: 'deep', label: '专家模式' },
              { value: 'none', label: '不显示' },
            ]}
            className="w-40"
          />
        </Field>
        <InlineField label="显示菜单按钮 (≡)">
          <Toggle
            checked={state.header.showMenu}
            onChange={(v) => updateHeader({ showMenu: v })}
          />
        </InlineField>
        <InlineField label="显示新对话按钮 (⊕)">
          <Toggle
            checked={state.header.showNewChat}
            onChange={(v) => updateHeader({ showNewChat: v })}
          />
        </InlineField>
        <InlineField
          label="显示「回答由 AI 生成，仅供参考」"
          hint="出现在顶栏正下方"
        >
          <Toggle
            checked={state.showAiHint}
            onChange={(v) => update({ showAiHint: v })}
          />
        </InlineField>
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
            placeholder="发消息或按住说话"
          />
        </Field>
        <InlineField label="显示「深度思考」胶囊">
          <Toggle
            checked={state.inputBar.showDeepThink}
            onChange={(v) => updateInput({ showDeepThink: v })}
          />
        </InlineField>
        {state.inputBar.showDeepThink && (
          <InlineField
            label="└ 激活状态"
            hint="开启=蓝色已激活样式；关闭=白底黑字未激活样式"
          >
            <Toggle
              checked={state.inputBar.deepThinkActive ?? true}
              onChange={(v) => updateInput({ deepThinkActive: v })}
            />
          </InlineField>
        )}
        <InlineField label="显示「智能搜索」胶囊">
          <Toggle
            checked={state.inputBar.showSmartSearch}
            onChange={(v) => updateInput({ showSmartSearch: v })}
          />
        </InlineField>
        {state.inputBar.showSmartSearch && (
          <InlineField
            label="└ 激活状态"
            hint="开启=蓝色已激活样式；关闭=白底黑字未激活样式"
          >
            <Toggle
              checked={state.inputBar.smartSearchActive ?? true}
              onChange={(v) => updateInput({ smartSearchActive: v })}
            />
          </InlineField>
        )}
      </Section>
    </div>
  )
}
