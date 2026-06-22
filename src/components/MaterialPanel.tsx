import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  Film,
  ImageIcon,
  Info,
  Tag,
} from 'lucide-react'
import { experimentConfig } from '../config/experiment'
import type { CaseDefinition } from '../types'

interface MaterialPanelProps {
  caseDefinition: CaseDefinition
}

function VideoPreview({
  src,
  caseId,
}: {
  src: string
  caseId: string
}) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => setHasError(false), [src])

  return (
    <>
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-950">
        {hasError ? (
          <div className="flex aspect-video flex-col items-center justify-center px-5 text-center text-slate-300">
            <AlertTriangle size={25} />
            <p className="mt-2 text-xs font-semibold">视频文件尚未加载</p>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">
              请放置 {caseId}.mp4 后刷新页面
            </p>
          </div>
        ) : (
          <video
            key={src}
            className="aspect-video w-full"
            controls
            preload="metadata"
            onError={() => setHasError(true)}
            onLoadedMetadata={() => setHasError(false)}
          >
            <source src={src} type="video/mp4" />
            当前浏览器不支持视频播放。
          </video>
        )}
      </div>
      <p className="mt-1.5 break-all font-mono text-[10px] text-slate-400">
        {src}
      </p>
    </>
  )
}

function ImagePreview({
  src,
  title,
  caseId,
}: {
  src: string
  title: string
  caseId: string
}) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => setHasError(false), [src])

  return (
    <>
      <div className="aspect-video overflow-hidden rounded-xl border border-slate-200 bg-[linear-gradient(45deg,#f8fafc_25%,transparent_25%),linear-gradient(-45deg,#f8fafc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f8fafc_75%),linear-gradient(-45deg,transparent_75%,#f8fafc_75%)] bg-[length:16px_16px]">
        {hasError ? (
          <div className="flex h-full flex-col items-center justify-center px-5 text-center text-slate-400">
            <AlertTriangle size={25} />
            <p className="mt-2 text-xs font-semibold">首帧图尚未加载</p>
            <p className="mt-1 text-[11px] leading-5">
              请放置 {caseId}.png 后刷新页面
            </p>
          </div>
        ) : (
          <img
            key={src}
            className="h-full w-full object-cover"
            src={src}
            alt={`${title}首帧图`}
            onError={() => setHasError(true)}
            onLoad={() => setHasError(false)}
          />
        )}
      </div>
      <p className="mt-1.5 break-all font-mono text-[10px] text-slate-400">
        {src}
      </p>
    </>
  )
}

export function MaterialPanel({ caseDefinition }: MaterialPanelProps) {
  return (
    <aside className="panel flex min-h-0 flex-col overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-[11px] font-bold text-white">
            {caseDefinition.caseId}
          </span>
          {experimentConfig.showResearchCategory && (
            <span className="flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-700">
              <Tag size={11} />
              C{caseDefinition.categoryCode} · {caseDefinition.category}
            </span>
          )}
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          {caseDefinition.title}
        </h2>
      </div>

      <div className="space-y-5 overflow-y-auto p-5">
        <section>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            原始 Prompt（英文）
          </h3>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
            {caseDefinition.originalPrompt}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            中文任务文本
          </h3>
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-sm leading-6 text-slate-800">
            {caseDefinition.taskText}
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Film size={14} />
            Text-only 视频预览
          </div>
          <VideoPreview
            src={caseDefinition.textOnlyVideo}
            caseId={caseDefinition.caseId}
          />
        </section>

        <section>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <ImageIcon size={14} />
            首帧图
          </div>
          <ImagePreview
            src={caseDefinition.startImage}
            title={caseDefinition.title}
            caseId={caseDefinition.caseId}
          />
        </section>

        <section className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-indigo-700">
            <Info size={15} />
            任务说明
          </div>
          <p className="text-xs leading-6 text-slate-700">
            请根据你的创作意图，对 prompt 或画面进行补充，使系统更清楚地理解你希望的运动过程。你可以修改或补充文字，也可以在图上画草图、箭头、区域或文字标注。可以只使用文字、只使用图形，或采用图文结合；没有必要强行使用草图。
          </p>
        </section>

        {experimentConfig.showInternalNotes && caseDefinition.internalNote && (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="mb-2 text-xs font-bold text-amber-800">
              研究者内部备注
            </h3>
            <p className="text-xs leading-6 text-amber-900">
              {caseDefinition.internalNote}
            </p>
          </section>
        )}
      </div>
    </aside>
  )
}
