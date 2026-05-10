import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components: Components = {
  p: ({ children }) => <p className="ds-p">{children}</p>,
  strong: ({ children }) => <strong className="ds-strong">{children}</strong>,
  em: ({ children }) => <em className="ds-em">{children}</em>,
  h1: ({ children }) => <h1 className="ds-h1">{children}</h1>,
  h2: ({ children }) => <h2 className="ds-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="ds-h3">{children}</h3>,
  ul: ({ children }) => <ul className="ds-ul">{children}</ul>,
  ol: ({ children }) => <ol className="ds-ol">{children}</ol>,
  li: ({ children }) => <li className="ds-li">{children}</li>,
  a: ({ children, href }) => (
    <a className="ds-a" href={href} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  ),
  blockquote: ({ children }) => <blockquote className="ds-bq">{children}</blockquote>,
  hr: () => <hr className="ds-hr" />,
  pre: ({ children }) => <pre className="ds-pre">{children}</pre>,
  code: ({ className, children, ...rest }: any) => {
    const text = Array.isArray(children) ? children.join('') : String(children ?? '')
    const isBlock = text.includes('\n') || /^language-/.test(className ?? '')
    if (!isBlock) {
      return (
        <code className="ds-code-inline" {...rest}>
          {children}
        </code>
      )
    }
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    )
  },
  table: ({ children }) => (
    <div className="ds-table-wrap">
      <table className="ds-table">{children}</table>
    </div>
  ),
}

const STYLES = `
.deepseek-md { color: #111; font-size: 16px; line-height: 1.65; }
.deepseek-md > :first-child { margin-top: 0; }
.deepseek-md > :last-child { margin-bottom: 0; }

.deepseek-md .ds-p { margin: 0 0 14px 0; }
.deepseek-md .ds-strong { font-weight: 700; color: inherit; }
.deepseek-md .ds-em { font-style: italic; }

.deepseek-md .ds-h1 { font-size: 19px; font-weight: 700; margin: 14px 0 10px; line-height: 1.4; }
.deepseek-md .ds-h2 { font-size: 17px; font-weight: 700; margin: 14px 0 10px; line-height: 1.4; }
.deepseek-md .ds-h3 { font-size: 16px; font-weight: 700; margin: 12px 0 8px; line-height: 1.4; }

.deepseek-md .ds-ul,
.deepseek-md .ds-ol { padding-left: 0; margin: 0 0 14px 0; list-style: none; }
.deepseek-md .ds-ol { counter-reset: ds-counter; }
.deepseek-md .ds-li { position: relative; padding-left: 24px; margin-bottom: 6px; }
.deepseek-md .ds-ul > .ds-li::before {
  content: "•";
  position: absolute;
  left: 8px;
  top: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #111;
}
.deepseek-md .ds-ol > .ds-li {
  counter-increment: ds-counter;
  padding-left: 28px;
}
.deepseek-md .ds-ol > .ds-li::before {
  content: counter(ds-counter) ".";
  position: absolute;
  left: 0;
  top: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #111;
  font-variant-numeric: tabular-nums;
  min-width: 22px;
  text-align: left;
}
.deepseek-md .ds-li > .ds-p:last-child { margin-bottom: 0; }
.deepseek-md .ds-li .ds-ul,
.deepseek-md .ds-li .ds-ol { margin-top: 6px; }

.deepseek-md .ds-a { color: #4D6BFE; text-decoration: none; }

.deepseek-md .ds-bq {
  border-left: 3px solid #E5E7EB;
  padding-left: 12px;
  margin: 0 0 14px 0;
  color: #555;
}
.deepseek-md .ds-hr {
  border: none;
  border-top: 1px solid #E5E7EB;
  margin: 16px 0;
}

.deepseek-md .ds-code-inline {
  background: #F2F3F5;
  color: #111;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
.deepseek-md .ds-pre {
  background: #F6F7F9;
  color: #111;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.55;
  overflow-x: auto;
  margin: 0 0 14px 0;
}
.deepseek-md .ds-pre code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.deepseek-md .ds-table-wrap { overflow-x: auto; margin: 0 0 14px 0; }
.deepseek-md .ds-table { border-collapse: collapse; font-size: 15px; width: 100%; }
.deepseek-md .ds-table th,
.deepseek-md .ds-table td { border: 1px solid #E5E7EB; padding: 6px 10px; text-align: left; }
.deepseek-md .ds-table th { background: #F6F7F9; font-weight: 600; }
`

let injected = false
function injectStyles() {
  if (injected || typeof document === 'undefined') return
  const tag = document.createElement('style')
  tag.setAttribute('data-deepseek-md', '1')
  tag.textContent = STYLES
  document.head.appendChild(tag)
  injected = true
}

export function DeepSeekMarkdown({ content }: { content: string }) {
  injectStyles()
  return (
    <div className="deepseek-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
