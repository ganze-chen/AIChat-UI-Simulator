import type { DoubaoState } from './types'

let counter = 0
export const newId = (prefix = 'm') => `${prefix}_${Date.now().toString(36)}_${(++counter).toString(36)}`

export const defaultDoubaoState = (): DoubaoState => ({
  statusBar: { time: '8:50' },
  header: {
    title: '示例对话',
    titleChevron: true,
    subtitle: '内容由豆包 AI 生成',
    showMenu: true,
    showPhone: true,
    showSpeaker: true,
  },
  messages: [
    {
      id: newId('u'),
      role: 'user',
      content: '在这里输入用户提出的问题，会显示在右侧蓝色气泡里。',
    },
    {
      id: newId('a'),
      role: 'assistant',
      content: `这是示例 AI 回答，整段会被包在浅灰色卡片里。

**示例小标题**

正文内容支持 markdown：**加粗**、*斜体*、行内 \`code\`。

1. 编号列表第一项，用来检查序号与正文的对齐方式。
2. 编号列表第二项，描述更长一些以验证折行情况。
3. 编号列表第三项收尾。

最后一段简短文字。`,
      showActions: true,
      followUps: [
        '能否再用更简单的方式解释一遍？',
        '有没有相反观点的视角？',
        '可以推荐进一步阅读的资料吗？',
      ],
    },
  ],
  bottomToolbar: {
    visible: true,
    pills: [
      { id: 'p1', iconKey: 'fast', label: '快速', trailingChevron: true, visible: true },
      { id: 'p2', iconKey: 'mic', label: '录音纪要', trailingChevron: false, visible: true },
      { id: 'p3', iconKey: 'sparkle', label: 'AI 创作', trailingChevron: false, visible: true },
      { id: 'p4', iconKey: 'image', label: '豆包 P 图', trailingChevron: false, visible: true },
    ],
  },
  inputBar: {
    visible: true,
    placeholder: '发消息或按住说话…',
  },
})
