import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'

interface TaskFooterProps {
  currentIndex: number
  totalCases: number
  onPrevious: () => void
  onNext: () => void
}

export function TaskFooter({
  currentIndex,
  totalCases,
  onPrevious,
  onNext,
}: TaskFooterProps) {
  const isLast = currentIndex === totalCases - 1

  return (
    <footer className="panel flex items-center justify-between px-5 py-3">
      <button
        className="secondary-button"
        onClick={onPrevious}
        disabled={currentIndex === 0}
      >
        <ArrowLeft size={16} />
        上一个案例
      </button>

      <p className="text-xs text-slate-400">
        切换案例时会自动保存当前填写内容。
      </p>

      <button
        className={isLast ? 'secondary-button' : 'primary-button'}
        onClick={onNext}
        disabled={isLast}
      >
        {isLast ? (
          <>
            <CheckCircle2 size={16} />
            已到最后一个案例
          </>
        ) : (
          <>
            下一个案例
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </footer>
  )
}
