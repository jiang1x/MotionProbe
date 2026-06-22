import {
  ArrowUpRight,
  Brush,
  Eraser,
  Redo2,
  RotateCcw,
  Spline,
  Square,
  Trash2,
  Type,
  Undo2,
} from 'lucide-react'
import type { CanvasTool } from '../types'

const tools: Array<{
  value: CanvasTool
  label: string
  icon: typeof Brush
}> = [
  { value: 'brush', label: '画笔', icon: Brush },
  { value: 'arrow', label: '箭头', icon: ArrowUpRight },
  { value: 'curve', label: '曲线路径', icon: Spline },
  { value: 'rect', label: '矩形区域', icon: Square },
  { value: 'text', label: '文字标签', icon: Type },
  { value: 'eraser', label: '橡皮', icon: Eraser },
]

const colors = ['#ef4444', '#2563eb', '#16a34a', '#111827', '#f59e0b']

interface CanvasToolbarProps {
  tool: CanvasTool
  color: string
  strokeWidth: number
  canUndo: boolean
  canRedo: boolean
  onToolChange: (tool: CanvasTool) => void
  onColorChange: (color: string) => void
  onStrokeWidthChange: (width: number) => void
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
}

export function CanvasToolbar({
  tool,
  color,
  strokeWidth,
  canUndo,
  canRedo,
  onToolChange,
  onColorChange,
  onStrokeWidthChange,
  onUndo,
  onRedo,
  onClear,
}: CanvasToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-3">
      <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
        {tools.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            className={`flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-semibold transition ${
              tool === value
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => onToolChange(value)}
            title={label}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <span className="mx-1 h-7 w-px bg-slate-200" />

      <div className="flex items-center gap-1.5">
        {colors.map((candidate) => (
          <button
            key={candidate}
            aria-label={`选择颜色 ${candidate}`}
            className={`h-6 w-6 rounded-full border-2 transition ${
              color === candidate
                ? 'scale-110 border-slate-900'
                : 'border-white shadow-[0_0_0_1px_#cbd5e1]'
            }`}
            style={{ backgroundColor: candidate }}
            onClick={() => onColorChange(candidate)}
          />
        ))}
        <label className="relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border border-slate-300">
          <input
            className="absolute inset-0 h-10 w-10 -translate-x-1 -translate-y-1 cursor-pointer"
            type="color"
            value={color}
            onChange={(event) => onColorChange(event.target.value)}
            title="自定义颜色"
          />
        </label>
      </div>

      <label className="ml-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
        线宽
        <select
          className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700"
          value={strokeWidth}
          onChange={(event) => onStrokeWidthChange(Number(event.target.value))}
        >
          {[2, 4, 6, 10, 14].map((width) => (
            <option key={width} value={width}>
              {width}px
            </option>
          ))}
        </select>
      </label>

      <div className="ml-auto flex items-center gap-1">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-white disabled:opacity-30"
          onClick={onUndo}
          disabled={!canUndo}
          title="撤销"
        >
          <Undo2 size={16} />
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-white disabled:opacity-30"
          onClick={onRedo}
          disabled={!canRedo}
          title="重做"
        >
          <Redo2 size={16} />
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-white"
          onClick={() => {
            onToolChange('brush')
            onColorChange('#111827')
            onStrokeWidthChange(4)
          }}
          title="重置工具设置"
        >
          <RotateCcw size={15} />
        </button>
        <button
          className="flex h-8 items-center gap-1 rounded-md px-2 text-xs font-semibold text-red-600 hover:bg-red-50"
          onClick={onClear}
          title="清空画布对象"
        >
          <Trash2 size={15} />
          清空
        </button>
      </div>
    </div>
  )
}
