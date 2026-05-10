import type { DeepSeekState } from './types'

let counter = 0
export const newId = (prefix = 'm') => `${prefix}_${Date.now().toString(36)}_${(++counter).toString(36)}`

export const defaultDeepSeekState = (): DeepSeekState => ({
  statusBar: { time: '8:50' },
  header: {
    title: '示例对话',
    mode: 'fast',
    showMenu: true,
    showNewChat: true,
  },
  showAiHint: true,
  messages: [
    {
      id: newId('u'),
      role: 'user',
      content: '在这里输入用户提出的问题，可以是多行文本，会显示在右侧灰色气泡里。',
    },
    {
      id: newId('a'),
      role: 'assistant',
      content: `这是一段示例 AI 回答，用来检查**加粗**、列表、行内 \`code\` 的渲染效果。

要点列表：

- **第一项要点**：这一项用于演示 bullet 与正文的对齐方式，以及在中文段落里的折行效果。
- **第二项要点**：在长文本中观察行高是否符合 1.65，并确认每一项之间的间距是否舒适。
- **第三项要点**：包含一段更长的描述，用来验证当一行容纳不下时，第二行是否相对 bullet 正确缩进，以及段落整体的视觉节奏。

需要我继续展开其中某一项吗？`,
      thinking: {
        enabled: true,
        seconds: 3,
        content: `先理解用户的真实意图，他想检查渲染样式是否与真机一致。这并不复杂，我应该用结构化的回答覆盖关键 markdown 元素。

可以从加粗、有序/无序列表、长段落折行三个角度切入，再以一个开放问句收尾，方便用户继续给反馈。`,
        expanded: false,
      },
      showActions: true,
    },
  ],
  inputBar: {
    visible: true,
    placeholder: '发消息或按住说话',
    showDeepThink: true,
    deepThinkActive: true,
    showSmartSearch: true,
    smartSearchActive: true,
  },
})
