import { CheckCircle2, X } from 'lucide-react'

interface ToastProps {
  message: string
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-xl">
      <CheckCircle2 size={18} className="text-emerald-600" />
      {message}
      <button className="ml-2 text-slate-400 hover:text-slate-700" onClick={onClose}>
        <X size={15} />
      </button>
    </div>
  )
}
