import { useState } from 'react'
import { ArrowRight, FlaskConical, ShieldCheck } from 'lucide-react'
import type { ParticipantMetadata, YesNo } from '../types'

interface ParticipantFormProps {
  existingParticipant: ParticipantMetadata | null
  onStart: (metadata: ParticipantMetadata) => void
}

export function ParticipantForm({
  existingParticipant,
  onStart,
}: ParticipantFormProps) {
  const [participantId, setParticipantId] = useState(
    existingParticipant?.participantId ?? '',
  )
  const [hasDrawingBackground, setHasDrawingBackground] = useState<YesNo>(
    existingParticipant?.hasDrawingBackground ?? 'no',
  )
  const [hasUsedAiVideoTools, setHasUsedAiVideoTools] = useState<YesNo>(
    existingParticipant?.hasUsedAiVideoTools ?? 'no',
  )
  const [error, setError] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedId = participantId.trim()

    if (!normalizedId) {
      setError('请输入参与者编号。')
      return
    }

    onStart({
      participantId: normalizedId,
      hasDrawingBackground,
      hasUsedAiVideoTools,
      startedAt:
        existingParticipant?.participantId === normalizedId
          ? existingParticipant.startedAt
          : new Date().toISOString(),
      protocolVersion: '1.1.0',
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="grid w-full max-w-5xl grid-cols-[1.05fr_0.95fr] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
        <div className="bg-slate-950 px-12 py-14 text-white">
          <div className="mb-16 inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500">
              <FlaskConical size={22} />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">MotionProbe</h1>
              <p className="text-xs text-slate-400">文生视频输入层探针系统</p>
            </div>
          </div>

          <h2 className="max-w-md text-3xl font-semibold leading-tight">
            记录你如何表达
            <span className="text-indigo-300">运动与物理意图</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
            本平台不是视频生成器。你可以只补充文字、只在图上标注，
            也可以将两者结合。没有必要强行使用草图。
          </p>

          <div className="mt-12 space-y-5 text-sm text-slate-300">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 text-indigo-300" size={18} />
              <p>数据仅保存在当前浏览器，可随时导出为 ZIP。</p>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 text-indigo-300" size={18} />
              <p>实验过程中可反复修改，刷新页面后内容不会丢失。</p>
            </div>
          </div>
        </div>

        <form className="px-12 py-14" onSubmit={handleSubmit}>
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Participant Setup
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              参与者信息
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              请在开始实验前完成以下基本信息。
            </p>
          </div>

          <div className="space-y-7">
            <label className="block">
              <span className="field-label">参与者编号</span>
              <input
                className="field-control"
                value={participantId}
                onChange={(event) => {
                  setParticipantId(event.target.value)
                  setError('')
                }}
                placeholder="例如：P001"
                autoFocus
              />
              {error && <span className="mt-2 block text-xs text-red-600">{error}</span>}
            </label>

            <fieldset>
              <legend className="field-label">是否有绘画基础？</legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['yes', '有'],
                  ['no', '没有'],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${
                      hasDrawingBackground === value
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      value={value}
                      checked={hasDrawingBackground === value}
                      onChange={() => setHasDrawingBackground(value as YesNo)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="field-label">
                是否使用过 AI 视频生成工具？
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['yes', '使用过'],
                  ['no', '没有使用过'],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${
                      hasUsedAiVideoTools === value
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      value={value}
                      checked={hasUsedAiVideoTools === value}
                      onChange={() => setHasUsedAiVideoTools(value as YesNo)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <button className="primary-button mt-10 w-full py-3" type="submit">
            {existingParticipant ? '继续实验' : '开始实验'}
            <ArrowRight size={17} />
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-slate-400">
            点击开始即表示进入实验任务流程；本页面不会上传任何数据。
          </p>
        </form>
      </section>
    </main>
  )
}
