import { ChevronDown, Layers3, Plus, Trash2 } from 'lucide-react'
import type { StageDescription } from '../types'
import { createId } from '../utils/id'

interface StagePanelProps {
  stages: StageDescription[]
  onChange: (stages: StageDescription[]) => void
}

export function StagePanel({ stages, onChange }: StagePanelProps) {
  function addStage() {
    const stageNumber = stages.length + 1
    onChange([
      ...stages,
      {
        id: createId('stage'),
        name: `阶段 ${stageNumber}`,
        description: '',
        note: '',
      },
    ])
  }

  function updateStage(id: string, patch: Partial<StageDescription>) {
    onChange(
      stages.map((stage) =>
        stage.id === id ? { ...stage, ...patch } : stage,
      ),
    )
  }

  function removeStage(id: string) {
    onChange(stages.filter((stage) => stage.id !== id))
  }

  return (
    <section className="panel overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
            <Layers3 size={16} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800">阶段描述</h2>
            <p className="text-[11px] text-slate-400">
              仅在运动包含明显先后阶段时使用。
            </p>
          </div>
        </div>
        <button className="secondary-button !py-1.5" onClick={addStage}>
          <Plus size={14} />
          添加阶段
        </button>
      </div>

      {stages.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50/70 p-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {stages.map((stage, index) => (
              <article
                key={stage.id}
                className="w-80 shrink-0 rounded-xl border border-slate-200 bg-white p-3"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <button
                    className="text-slate-400 hover:text-red-600"
                    onClick={() => removeStage(stage.id)}
                    title="删除阶段"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="space-y-2">
                  <input
                    className="field-control !py-2"
                    value={stage.name}
                    onChange={(event) =>
                      updateStage(stage.id, { name: event.target.value })
                    }
                    placeholder="阶段名称"
                  />
                  <textarea
                    className="field-control min-h-16 resize-y !py-2"
                    value={stage.description}
                    onChange={(event) =>
                      updateStage(stage.id, {
                        description: event.target.value,
                      })
                    }
                    placeholder="阶段描述"
                  />
                  <input
                    className="field-control !py-2"
                    value={stage.note}
                    onChange={(event) =>
                      updateStage(stage.id, { note: event.target.value })
                    }
                    placeholder="该阶段备注"
                  />
                </div>
              </article>
            ))}
            <button
              className="flex w-32 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 text-xs font-semibold text-slate-400 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
              onClick={addStage}
            >
              <Plus size={18} />
              <span className="mt-2">继续添加</span>
            </button>
          </div>
        </div>
      )}

      {stages.length === 0 && (
        <button
          className="flex w-full items-center justify-center gap-2 border-t border-slate-100 py-2 text-[11px] text-slate-400 hover:bg-slate-50"
          onClick={addStage}
        >
          <ChevronDown size={13} />
          当前没有阶段卡片
        </button>
      )}
    </section>
  )
}
