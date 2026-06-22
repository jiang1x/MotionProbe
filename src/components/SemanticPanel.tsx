import { Plus, Trash2 } from 'lucide-react'
import type {
  AnnotationMeaning,
  ExperimentDraft,
  InputType,
  SemanticAnnotation,
  SketchHelpfulness,
} from '../types'
import { createId } from '../utils/id'

const inputTypes: InputType[] = [
  '文本补充',
  '草图',
  '箭头',
  '区域框',
  '文字标签',
  '阶段图',
  '没有修改',
]

const meaningOptions: AnnotationMeaning[] = [
  '运动方向',
  '运动轨迹',
  '速度变化',
  '加速度',
  '受力方向',
  '重力',
  '摩擦',
  '碰撞点',
  '形变区域',
  '约束位置',
  '阶段变化',
  '其他',
]

interface SemanticPanelProps {
  draft: ExperimentDraft
  onChange: (patch: Partial<ExperimentDraft>) => void
}

export function SemanticPanel({ draft, onChange }: SemanticPanelProps) {
  function toggleInputType(inputType: InputType) {
    let nextTypes: InputType[]

    if (inputType === '没有修改') {
      nextTypes = draft.usedInputTypes.includes(inputType)
        ? []
        : ['没有修改']
    } else {
      const withoutNone = draft.usedInputTypes.filter(
        (candidate) => candidate !== '没有修改',
      )
      nextTypes = withoutNone.includes(inputType)
        ? withoutNone.filter((candidate) => candidate !== inputType)
        : [...withoutNone, inputType]
    }

    onChange({ usedInputTypes: nextTypes })
  }

  function addAnnotation() {
    const next: SemanticAnnotation = {
      id: createId('annotation'),
      symbolType: '箭头',
      meaning: '运动方向',
      target: '',
      description: '',
    }
    onChange({ annotations: [...draft.annotations, next] })
  }

  function updateAnnotation(
    id: string,
    patch: Partial<SemanticAnnotation>,
  ) {
    onChange({
      annotations: draft.annotations.map((annotation) =>
        annotation.id === id ? { ...annotation, ...patch } : annotation,
      ),
    })
  }

  function removeAnnotation(id: string) {
    onChange({
      annotations: draft.annotations.filter(
        (annotation) => annotation.id !== id,
      ),
    })
  }

  return (
    <aside className="panel flex min-h-0 flex-col overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-base font-bold text-slate-900">语义说明</h2>
        <p className="mt-1 text-xs text-slate-500">
          说明你希望系统如何理解文字和图形。
        </p>
      </div>

      <div className="space-y-6 overflow-y-auto p-5">
        <section>
          <label className="field-label" htmlFor="prompt-addition">
            用户补充 Prompt
          </label>
          <textarea
            id="prompt-addition"
            className="field-control min-h-28 resize-y leading-6"
            value={draft.userPromptAddition}
            onChange={(event) =>
              onChange({ userPromptAddition: event.target.value })
            }
            placeholder="例如：小球第一次反弹较高，第二次明显降低；落地瞬间略有形变……"
          />
          <p className="mt-2 text-[11px] leading-5 text-slate-400">
            可只在此补充文字，不要求同时绘图。
          </p>
        </section>

        <section>
          <h3 className="field-label">我这次主要使用了什么方式</h3>
          <div className="grid grid-cols-2 gap-2">
            {inputTypes.map((inputType) => (
              <label
                key={inputType}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${
                  draft.usedInputTypes.includes(inputType)
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={draft.usedInputTypes.includes(inputType)}
                  onChange={() => toggleInputType(inputType)}
                />
                {inputType}
              </label>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="field-label !mb-0">当前符号含义列表</h3>
              <p className="mt-1 text-[11px] text-slate-400">
                将图上符号与具体意图对应起来。
              </p>
            </div>
            <button
              className="secondary-button !px-2.5 !py-1.5"
              onClick={addAnnotation}
            >
              <Plus size={14} />
              添加
            </button>
          </div>

          {draft.annotations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-center text-xs leading-5 text-slate-400">
              尚未添加符号说明。仅使用文字时可以留空。
            </div>
          ) : (
            <div className="space-y-3">
              {draft.annotations.map((annotation, index) => (
                <div
                  key={annotation.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-3"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">
                      符号 {index + 1}
                    </span>
                    <button
                      className="text-slate-400 hover:text-red-600"
                      onClick={() => removeAnnotation(annotation.id)}
                      title="删除"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="field-control !py-2"
                      value={annotation.symbolType}
                      onChange={(event) =>
                        updateAnnotation(annotation.id, {
                          symbolType: event.target.value,
                        })
                      }
                      placeholder="符号类型"
                    />
                    <select
                      className="field-control !py-2"
                      value={annotation.meaning}
                      onChange={(event) =>
                        updateAnnotation(annotation.id, {
                          meaning: event.target.value as AnnotationMeaning,
                        })
                      }
                    >
                      {meaningOptions.map((meaning) => (
                        <option key={meaning} value={meaning}>
                          {meaning}
                        </option>
                      ))}
                    </select>
                    <input
                      className="field-control col-span-2 !py-2"
                      value={annotation.target}
                      onChange={(event) =>
                        updateAnnotation(annotation.id, {
                          target: event.target.value,
                        })
                      }
                      placeholder="作用对象，例如：红色小球"
                    />
                    <textarea
                      className="field-control col-span-2 min-h-16 resize-y !py-2"
                      value={annotation.description}
                      onChange={(event) =>
                        updateAnnotation(annotation.id, {
                          description: event.target.value,
                        })
                      }
                      placeholder="补充说明"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="border-t border-slate-200 pt-5">
          <h3 className="mb-4 text-sm font-bold text-slate-800">案例反馈</h3>

          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="field-label !mb-0">表达难度</span>
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                {draft.difficulty} / 5
              </span>
            </div>
            <input
              className="w-full accent-indigo-600"
              type="range"
              min={1}
              max={5}
              step={1}
              value={draft.difficulty}
              onChange={(event) =>
                onChange({ difficulty: Number(event.target.value) })
              }
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-400">
              <span>很容易</span>
              <span>很困难</span>
            </div>
          </div>

          <label className="block">
            <span className="field-label">草图帮助程度</span>
            <select
              className="field-control"
              value={draft.sketchHelpfulness}
              onChange={(event) =>
                onChange({
                  sketchHelpfulness: event.target
                    .value as SketchHelpfulness,
                })
              }
            >
              <option value="">请选择</option>
              <option value="有帮助">有帮助</option>
              <option value="一般">一般</option>
              <option value="没有帮助">没有帮助</option>
              <option value="增加负担">增加负担</option>
            </select>
          </label>

          <label className="mt-4 block">
            <span className="field-label">用户备注</span>
            <textarea
              className="field-control min-h-24 resize-y"
              value={draft.userComment}
              onChange={(event) =>
                onChange({ userComment: event.target.value })
              }
              placeholder="可记录表达过程中遇到的问题、希望增加的功能等。"
            />
          </label>
        </section>
      </div>
    </aside>
  )
}
