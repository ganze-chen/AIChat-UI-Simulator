# AIChat UI Simulator

> A local tool for psychology / communication researchers to rapidly produce high-fidelity AI chat screenshots as stimuli for online experiments.

[简体中文](README.md) · **[English](README.en.md)**

![Overview](docs/screenshots/overview.png)

## Why this exists

This tool was built for an online experiment on *emotional support in AI responses ↔ constructive social behavior*. During pre-testing, every stimulus must remain visually consistent across experimental conditions while only the manipulated variable (e.g., level of emotional support) changes. Hand-editing screenshots in image software is slow and error-prone. This tool gives you:

- **In-browser WYSIWYG editing** of conversations on multiple mainstream AI mobile apps
- Live preview that exports as a **long screenshot**, ready to embed in survey platforms
- Draft duplication and JSON import/export for a *change-one-variable-at-a-time* workflow

See [PRD.md](PRD.md) for the full requirements doc and architecture (Chinese).

## Screenshots

<table>
  <tr>
    <td align="center">
      <b>DeepSeek template</b><br>
      <img src="docs/screenshots/deepseek-preview.png" width="280" alt="DeepSeek Preview">
    </td>
    <td align="center">
      <b>Doubao template</b><br>
      <img src="docs/screenshots/doubao-preview.png" width="280" alt="Doubao Preview">
    </td>
  </tr>
</table>

## Supported templates

| Platform | Status | Notes |
|---|---|---|
| DeepSeek | ✅ Ready | Fast / Expert modes, collapsible "已思考" thinking block |
| Doubao (豆包) | ✅ Ready | Fast mode, AI card, follow-up suggestions, bottom toolbar |
| Qwen (通义千问) | 🔜 | Planned |
| Kimi | 🔜 | Planned |

## Stack

Vite · React 18 · TypeScript · Tailwind CSS · Zustand · react-markdown · html-to-image

## Quick start

Requires Node.js 18+.

```bash
git clone https://github.com/ganze-chen/AIChat-UI-Simulator.git
cd AIChat-UI-Simulator
npm install
npm run dev
```

Your browser will open `http://localhost:5173/` automatically.

## Usage guide

### 1. Create a draft
In the left **PLATFORMS** section, click DeepSeek or Doubao. A draft is created and selected automatically.

### 2. Edit content
The right panel has two tabs:

- **通用 (General)**: status bar time, conversation title, mode, menu/+ toggles, input bar options, bottom toolbar pills (Doubao only), etc.
- **消息 (Messages)**: add / reorder / delete user and AI messages. AI messages support full markdown plus the collapsible thinking block (DeepSeek) and follow-up suggestions (Doubao).

All edits reflect instantly in the middle preview.

### 3. Zoom
Top toolbar zoom buttons toggle 50% / 75% / 100% / 125%. This affects display only, not export.

### 4. Export PNG
Top-right **导出 PNG** button:

- Defaults to 3× pixel ratio (Retina-friendly)
- The caret opens options: 2× / 3× / 4× density, hide-input-bar-on-export, copy-to-clipboard
- Filename: `deepseek_{draftName}_{YYYYMMDD-HHmm}.png`

### 5. Draft management (the controlled-experiment workflow)
The **DRAFTS** section in the left sidebar:

- Hover a draft to reveal ✎ rename, ⎘ duplicate, ✕ delete
- At the section header: ⤓ export all drafts as JSON, ⤒ import JSON (merge / replace modes)

> **Duplicate** is the key to the controlled-comparison workflow: copy a draft, then change *only* the manipulated field (e.g., swap in a "low-support" variant of the AI reply). Everything else stays byte-identical.

### 6. Markdown in AI messages

- `**bold**`, `*italic*`, `` `inline code` ``
- Headings `#` `##` `###`
- Unordered `- ` and ordered `1. ` lists
- Fenced code blocks, blockquotes `>`, GFM tables, links

## Project layout

```
src/
├── App.tsx                — three-column entry
├── components/            — Sidebar / PreviewArea / EditorPanel / export / draft IO
├── store/useStore.ts      — Zustand store + localStorage persistence
├── templates/
│   ├── types.ts           — Template interface (plugin architecture)
│   ├── registry.ts        — template registry
│   ├── deepseek/          — DeepSeek template (renderer + editor + icons)
│   └── doubao/            — Doubao template
└── utils/
    ├── export.ts          — html-to-image wrapper
    └── storage.ts         — drafts JSON I/O
```

Adding a new platform = create a new `templates/<platform>/` directory and register it in `registry.ts`.

## Roadmap

- [ ] Doubao thinking-mode variant
- [ ] Qwen and Kimi templates
- [ ] DeepSeek light / dark theme toggle
- [ ] Optional elements: user avatars, quote-reply, etc.

## License & usage constraints

Intended for academic research use only. The UI patterns mimic publicly visible interfaces of real AI apps — **do not use this tool for commercial impersonation, fraud, or deception**. Exported images used in published research should be clearly labeled as experimental stimuli.

## Feedback

Found a bug or want to add a new platform? Please open an [issue](https://github.com/ganze-chen/AIChat-UI-Simulator/issues) or PR.
