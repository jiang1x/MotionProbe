import {
  Database,
  Download,
  FlaskConical,
  LogOut,
  Save,
} from 'lucide-react'

interface ExperimentHeaderProps {
  participantId: string
  currentIndex: number
  totalCases: number
  isExporting: boolean
  onSave: () => void
  onExport: () => void
  onExit: () => void
}

export function ExperimentHeader({
  participantId,
  currentIndex,
  totalCases,
  isExporting,
  onSave,
  onExport,
  onExit,
}: ExperimentHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-w-[1420px] items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
            <FlaskConical size={20} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight text-slate-950">
                MotionProbe
              </h1>
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                HCI Research Tool
              </span>
            </div>
            <p className="text-xs text-slate-500">文生视频输入层探针系统</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <Database size={15} className="text-slate-400" />
            <span className="text-slate-500">参与者</span>
            <strong className="font-mono text-slate-800">{participantId}</strong>
          </div>

          <div className="min-w-44">
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-semibold text-slate-500">任务进度</span>
              <span className="font-bold text-slate-800">
                {currentIndex + 1} / {totalCases}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{
                  width: `${((currentIndex + 1) / totalCases) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="secondary-button" onClick={onSave}>
              <Save size={16} />
              保存当前案例
            </button>
            <button
              className="primary-button"
              onClick={onExport}
              disabled={isExporting}
            >
              <Download size={16} />
              {isExporting ? '正在导出…' : '导出全部数据'}
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={onExit}
              title="更换参与者"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
