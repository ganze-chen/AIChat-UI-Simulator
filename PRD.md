# AI Chat Screenshot Renderer — PRD

## 1. 背景与目标

研究"AI 回复中的情感支持 ↔ 建设性社会行为"关系的在线实验，需要批量制作高保真的 AI 聊天截图作为刺激材料。当前处于预实验阶段，操纵检验需多轮迭代，对"修改速度"和"跨条件视觉一致性"要求高。

**目标**：本地工具，可在浏览器中编辑对话内容，实时预览各家 AI App 的移动端 UI，导出为可直接嵌入问卷的长截图（PNG）。

**非目标**：不做真实 API 调用、不做对话生成、不做桌面端 UI、不做视频导出、不做协作。

## 2. 用户与使用场景

- 单用户（研究者本人），本地运行
- 典型流程：
  1. 选择平台模板（如 DeepSeek）
  2. 编辑标题、用户提问、AI 回复（markdown）
  3. 调整状态栏时间、思考时长等元数据
  4. 实时预览，确认像素级保真后导出 PNG
  5. 在不同实验条件间复制草稿，仅改动操纵变量，保证其他元素一致
  6. 加载已保存草稿继续编辑

## 3. 技术栈

- **构建**：Vite + React 18 + TypeScript
- **样式**：Tailwind CSS（编辑器 UI）+ CSS Modules（模板像素级还原）
- **状态**：Zustand（简单、易持久化到 localStorage）
- **Markdown**：`react-markdown` + `remark-gfm`（GFM 列表、表格、删除线）
- **导出**：`html-to-image`，固定 viewport 宽 390px，pixelRatio = 3
- **字体**：使用系统中文字体栈（`-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`），在 Mac 上预览即与真机同字形

## 4. 总体布局

仿 ui-reference.jpeg 的三栏：

```
┌─ 左栏 220px ──┬─ 中栏 自适应 ────┬─ 右栏 380px ──┐
│ 平台列表       │ 工具条（缩放/导出）│ 编辑面板       │
│ ├ DeepSeek ●  │                   │ Tab: 通用       │
│ ├ Doubao      │  ┌─────────────┐ │ Tab: 消息       │
│ ├ Qwen        │  │  390px 宽   │ │ Tab: 导出       │
│ ├ Kimi        │  │  手机预览    │ │                │
│               │  │  (无外框)    │ │                │
│ 草稿列表       │  └─────────────┘ │                │
│ ├ 草稿 A ●    │                   │                │
│ ├ 草稿 B      │                   │                │
│ └ + 新建      │                   │                │
└──────────────┴───────────────────┴────────────────┘
```

- 中栏背景为浅灰，预览区为模板的真实背景色
- 工具条：缩放百分比（50/75/100/125%）、导出 PNG、复制为图片
- 编辑面板的"消息"Tab：消息列表（拖拽排序、删除、复制）+ 选中消息的详细编辑器

## 5. 数据模型

```ts
type Draft = {
  id: string
  name: string                   // 用户给的名字，e.g. "高情感支持-条件1"
  platformId: PlatformId
  createdAt: number
  updatedAt: number
  state: PlatformState           // 平台特定 state，由模板定义
}

type PlatformId = 'deepseek' | 'doubao' | 'qwen' | 'kimi'

// 各平台 state shape 由对应 Template 定义；DeepSeek 的形状见 §7
```

所有 Draft 持久化到 `localStorage` key `aichat_render.drafts.v1`，当前选中的 draftId 保存到 `aichat_render.activeDraft`。

## 6. 平台模板插件架构

每个模板是一个目录，导出统一接口：

```ts
interface Template<S = unknown> {
  id: PlatformId
  name: string                   // "DeepSeek"
  icon: ReactNode
  defaultState: () => S
  Renderer: FC<{ state: S }>     // 完整渲染（用于预览 + 导出）
  Editor: FC<{
    state: S
    onChange: (s: S) => void
  }>                             // 渲染右栏的"通用"+"消息"Tab 内容
  exportSize: (state: S) => { width: 390 }  // 高度由内容自适应
}
```

新增平台 = 新增一个目录 + 在 `templates/registry.ts` 注册。预览组件只关心当前模板，互不干扰。

## 7. DeepSeek 模板规格（一比一复刻）

### 7.1 视觉规格（基于 deepseek1/2.jpeg 测量）

- 背景：纯白 `#ffffff`
- 视口：390 × 自适应高度
- 状态栏：高度 ~44px，时间左对齐（13pt 系统字体粗体），右侧静态 SVG 图标组（蓝牙、振动、wifi、5G 信号、运营商信号、电量 85%+闪电）
- 顶栏：高度 ~56px，左侧 ≡ 菜单（24px），中间标题（17pt 中等字重）+ 副标题"⚡ 快速模式"或"⚡ 深度思考"（蓝色 `#4D6BFE` 或类似），右侧 ⊕ 新对话（24px，圆形描边）
- "回答由 AI 生成，仅供参考"：14px 灰 `#999`，居中，与顶栏间距 8px（**仅在第一条消息前显示**）
- 用户消息气泡：
  - 背景 `#F3F4F6`（浅灰）
  - 圆角 18px
  - 内边距 12px 16px
  - 字号 16px，行高 1.5，深灰 `#000` 或 `#111`
  - 右对齐，最大宽度约 viewport 75%
- AI 回复：
  - 无气泡，纯文本直接铺在白底
  - 字号 16px，行高 1.6
  - 加粗用同色更粗字重（不变色）
  - 列表项前用 `•`（U+2022）+ 12px 缩进
  - 段落间距 ~14px
- "已思考"折叠条：
  - 字号 15px，灰 `#999`
  - 文本格式：`已思考（用时 N 秒）` + chevron 图标
  - chevron 折叠态为 `>`（chevron-right），展开态为 `v`（chevron-down）
  - 展开后下方显示思考过程（参考 deepseek_thinking.jpeg）：
    - 首段前有一个小灰点 `•`，与文字间距约 12px
    - 后续段落（无 bullet）左侧与首段文字对齐（即整体缩进同首段文字）
    - 字号 ~15px（略小于主文 16px），颜色 `#999` 左右
    - 段落间距 ~14px
    - 行高约 1.6
- AI 消息底部操作行：
  - 5 个图标：复制、👍、👎、分享（前 4 个左对齐）+ 重新生成（最右）
  - 图标尺寸 22px，颜色 `#999`，间距 24px
  - 仅最后一条 AI 消息显示（与真机一致）
- 输入栏：
  - 高度自适应，padding 12px
  - 输入框：圆角 24px，浅灰背景，placeholder "发消息或按住说话"
  - 下方两个胶囊按钮："深度思考"（带原子 icon）、"智能搜索"（带地球 icon），蓝色描边浅色填充
  - 右侧 ⊕ 加号、🎙️ 录音按钮

### 7.2 可编辑元素

| 区域 | 字段 | 类型 |
|---|---|---|
| 状态栏 | 时间 | string，默认 `8:50` |
| 顶栏 | 标题 | string |
| 顶栏 | 模式 | `'fast' \| 'deep' \| 'none'` |
| 顶栏 | 显示菜单按钮 | bool，默认 true |
| 顶栏 | 显示新对话按钮 | bool，默认 true |
| 顶栏下 | 显示"AI 生成仅供参考"提示 | bool，默认 true |
| 消息列表 | user / assistant 消息 | 数组，可增删拖拽 |
| 用户消息 | 文本 | string（纯文本） |
| AI 消息 | 主体内容 | string（markdown） |
| AI 消息 | 思考块.启用 | bool |
| AI 消息 | 思考块.秒数 | number |
| AI 消息 | 思考块.内容 | string，可空（空则只显示折叠条） |
| AI 消息 | 思考块.展开 | bool |
| AI 消息 | 显示操作按钮 | bool（默认仅最后一条） |
| 输入栏 | 整体显示 | bool，默认 true |
| 输入栏 | 显示"深度思考"胶囊 | bool |
| 输入栏 | 显示"智能搜索"胶囊 | bool |
| 输入栏 | placeholder | string |

## 8. 导出

- 触发：右栏"导出"Tab → "下载 PNG"按钮
- 实现：
  1. 临时把预览区缩放重置为 100%，去掉编辑器装饰（如选中态高亮）
  2. `htmlToImage.toPng(node, { pixelRatio: 3, cacheBust: true })`
  3. 触发下载，文件名 `{platformId}_{draftName}_{YYYYMMDD-HHmm}.png`
- 选项：
  - 隐藏输入栏（默认关，导出时若开启则临时隐藏）
  - 像素密度（2x/3x/4x，默认 3x）

## 9. 草稿管理

- 左栏底部"草稿"区：
  - 当前草稿高亮
  - 每个 item：草稿名 + 平台 icon + 更新时间（hover 显示删除/复制按钮）
  - "+ 新建草稿"：弹出小输入框 → 选平台 → 创建
  - 右键/操作菜单：重命名、复制为副本、删除
- 复制副本时保留所有 state，只改 id/name —— 这是"控制变量"工作流的关键
- **导出/导入 JSON**：
  - 左栏底部"草稿"区右上角提供 ⤓ 导出全部 / ⤒ 导入按钮
  - 导出：所有草稿打包为单个 JSON 文件，文件名 `aichat_render_drafts_{YYYYMMDD}.json`
  - 导入：选择 JSON 文件后弹出确认对话框（合并/覆盖二选一），合并时 id 冲突的草稿自动重命名（追加 ` (导入)`）

## 10. 开发计划（分阶段）

### Phase 1 — 脚手架与三栏布局（先跑通整体）
- Vite + React + TS + Tailwind 初始化
- 三栏布局壳子（占位）
- Zustand store + localStorage 持久化基础
- Template 接口与 registry
- 空 DeepSeek 模板（仅渲染 "Hello" 占位）

### Phase 2 — DeepSeek 渲染器（像素级还原，无编辑）
- 状态栏（时间可传入，其余静态 SVG）
- 顶栏（标题、模式、菜单、新对话按钮）
- "AI 生成仅供参考"提示
- 用户消息气泡
- AI 消息（markdown 渲染，含 `•` 列表自定义、加粗、行高）
- 思考块（折叠/展开两态）
- AI 消息操作按钮行
- 输入栏（含两个胶囊）
- **验收**：在预览中手填 deepseek1.jpeg 的内容，与原图截图肉眼对比无差异

### Phase 3 — 编辑面板
- 通用 Tab：状态栏时间、标题、模式、各开关
- 消息 Tab：列表（增删改、上下移动）、选中消息编辑器（含思考块设置）
- Markdown 编辑用 textarea + 字数提示（不引入富文本，复杂度太高）
- 双向绑定，所有改动实时反映到中栏

### Phase 4 — 导出
- `html-to-image` 集成
- 导出 Tab：选项 + 下载按钮
- 复制到剪贴板（用 Canvas + Clipboard API）

### Phase 5 — 草稿管理
- 草稿列表 UI
- 新建/重命名/复制/删除
- 切换草稿时保存当前

### Phase 6 — 第二个模板（豆包）
- 验证插件架构
- 实现 Doubao 渲染器（蓝色用户气泡 + AI 卡片 + 推荐追问 + 横向 toolbar）
- 通用编辑器抽出能复用部分

### Phase 7（可选）— Qwen / Kimi
- 按需追加

每个 Phase 结束有"可演示"产物，可在此暂停让你检查 → 我再继续。

## 11. 范围外（不做）

- 真实 LLM 调用
- 用户头像、群聊、图片消息（预实验材料用不到，加上反而增加变量）
- 桌面端 / iPad 适配
- 多语言（界面 UI 仅中文）
- 账号系统
