import { toPng } from 'html-to-image'

export interface ExportOptions {
  pixelRatio: number
  hideInputBar: boolean
  fileName: string
}

const INPUT_BAR_SELECTOR = '[data-deepseek-input-bar]'

export async function exportPreviewAsPng(node: HTMLElement, opts: ExportOptions) {
  const originalTransform = node.style.transform
  const originalShadow = node.style.boxShadow
  node.style.transform = ''
  node.style.boxShadow = ''

  let hiddenInputBar: HTMLElement | null = null
  if (opts.hideInputBar) {
    hiddenInputBar = node.querySelector<HTMLElement>(INPUT_BAR_SELECTOR)
    if (hiddenInputBar) hiddenInputBar.style.display = 'none'
  }

  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

  try {
    const dataUrl = await toPng(node, {
      pixelRatio: opts.pixelRatio,
      cacheBust: true,
      backgroundColor: '#ffffff',
    })
    triggerDownload(dataUrl, opts.fileName)
  } finally {
    node.style.transform = originalTransform
    node.style.boxShadow = originalShadow
    if (hiddenInputBar) hiddenInputBar.style.display = ''
  }
}

export async function copyPreviewToClipboard(node: HTMLElement, opts: Omit<ExportOptions, 'fileName'>): Promise<void> {
  const originalTransform = node.style.transform
  const originalShadow = node.style.boxShadow
  node.style.transform = ''
  node.style.boxShadow = ''

  let hiddenInputBar: HTMLElement | null = null
  if (opts.hideInputBar) {
    hiddenInputBar = node.querySelector<HTMLElement>(INPUT_BAR_SELECTOR)
    if (hiddenInputBar) hiddenInputBar.style.display = 'none'
  }

  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))

  try {
    const dataUrl = await toPng(node, {
      pixelRatio: opts.pixelRatio,
      cacheBust: true,
      backgroundColor: '#ffffff',
    })
    const blob = await (await fetch(dataUrl)).blob()
    if (!('clipboard' in navigator) || !('write' in navigator.clipboard)) {
      throw new Error('当前浏览器不支持复制图片到剪贴板')
    }
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
  } finally {
    node.style.transform = originalTransform
    node.style.boxShadow = originalShadow
    if (hiddenInputBar) hiddenInputBar.style.display = ''
  }
}

function triggerDownload(dataUrl: string, fileName: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function buildExportFileName(platformId: string, draftName: string): string {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const hh = String(now.getHours()).padStart(2, '0')
  const mi = String(now.getMinutes()).padStart(2, '0')
  const safe = draftName.replace(/[\\/:*?"<>|]/g, '_').slice(0, 40) || 'draft'
  return `${platformId}_${safe}_${yyyy}${mm}${dd}-${hh}${mi}.png`
}
