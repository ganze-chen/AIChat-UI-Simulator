import { ReactNode, TextareaHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react'

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="border-b border-gray-100 px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase">{title}</div>
        {action}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-gray-600">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
    </label>
  )
}

export function InlineField({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col">
        <span className="text-xs text-gray-700">{label}</span>
        {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
      </div>
      <div>{children}</div>
    </div>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        'h-8 px-2.5 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 ' +
        (props.className ?? '')
      }
    />
  )
}

export function NumberInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="number"
      {...props}
      className={
        'h-8 px-2.5 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 w-20 ' +
        (props.className ?? '')
      }
    />
  )
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={
        'min-h-[80px] px-2.5 py-2 text-sm border border-gray-200 rounded-md bg-white font-sans focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 leading-relaxed ' +
        (props.className ?? '')
      }
    />
  )
}

export function Select<T extends string>(props: SelectHTMLAttributes<HTMLSelectElement> & { options: { value: T; label: string }[] }) {
  const { options, ...rest } = props
  return (
    <select
      {...rest}
      className={
        'h-8 px-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 ' +
        (rest.className ?? '')
      }
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
        checked ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform mt-0.5 ${
          checked ? 'translate-x-[18px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

export function GhostButton({ children, onClick, danger }: { children: ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-7 px-2 text-xs rounded border transition-colors ${
        danger
          ? 'border-red-200 text-red-600 hover:bg-red-50'
          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )
}

export function PrimaryButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-7 px-3 text-xs rounded bg-blue-500 hover:bg-blue-600 text-white"
    >
      {children}
    </button>
  )
}
