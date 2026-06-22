import { useEffect, useRef, useState } from 'react'
import type {
  CaseRecord,
  ExperimentDraft,
  ParticipantMetadata,
} from '../types'
import { cases } from '../data/cases'
import {
  draftFromRecord,
  getAllCaseRecords,
  loadActiveCaseIndex,
  loadCaseRecord,
  saveActiveCaseIndex,
  saveCaseRecord,
} from '../utils/storage'
import { exportExperimentZip } from '../utils/exportData'
import { ExperimentHeader } from './ExperimentHeader'
import { MaterialPanel } from './MaterialPanel'
import { CanvasEditor } from './CanvasEditor'
import { SemanticPanel } from './SemanticPanel'
import { StagePanel } from './StagePanel'
import { TaskFooter } from './TaskFooter'
import { Toast } from './Toast'

interface TaskPageProps {
  participant: ParticipantMetadata
  onExit: () => void
}

export function TaskPage({ participant, onExit }: TaskPageProps) {
  const [currentIndex, setCurrentIndex] = useState(() =>
    loadActiveCaseIndex(cases.length - 1),
  )
  const currentCase = cases[currentIndex]
  const initialRecord = loadCaseRecord(participant.participantId, currentCase)
  const [draft, setDraft] = useState<ExperimentDraft>(() =>
    draftFromRecord(initialRecord),
  )
  const [isExporting, setIsExporting] = useState(false)
  const [toast, setToast] = useState('')
  const baseTimeRef = useRef(initialRecord.timeSpentSeconds)
  const enteredAtRef = useRef(Date.now())
  const draftRef = useRef(draft)

  useEffect(() => {
    draftRef.current = draft
  }, [draft])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      persistCurrent(false)
    }, 350)

    return () => window.clearTimeout(timer)
    // Persist whenever the draft changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft])

  useEffect(() => {
    const handleBeforeUnload = () => {
      persistCurrent(false)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])

  function elapsedSeconds(): number {
    return (
      baseTimeRef.current +
      Math.floor((Date.now() - enteredAtRef.current) / 1000)
    )
  }

  function buildCurrentRecord(): CaseRecord {
    return {
      participantId: participant.participantId,
      caseId: currentCase.caseId,
      caseTitle: currentCase.title,
      categoryCode: currentCase.categoryCode,
      category: currentCase.category,
      originalPrompt: currentCase.originalPrompt,
      taskText: currentCase.taskText,
      startImage: currentCase.startImage,
      textOnlyVideo: currentCase.textOnlyVideo,
      internalNote: currentCase.internalNote,
      ...draftRef.current,
      timeSpentSeconds: elapsedSeconds(),
      savedAt: new Date().toISOString(),
    }
  }

  function persistCurrent(resetTimer: boolean): CaseRecord {
    const record = buildCurrentRecord()
    saveCaseRecord(record)

    if (resetTimer) {
      baseTimeRef.current = record.timeSpentSeconds
      enteredAtRef.current = Date.now()
    }

    return record
  }

  function loadCase(index: number) {
    persistCurrent(true)
    const nextCase = cases[index]
    const nextRecord = loadCaseRecord(participant.participantId, nextCase)

    setCurrentIndex(index)
    saveActiveCaseIndex(index)
    setDraft(draftFromRecord(nextRecord))
    draftRef.current = draftFromRecord(nextRecord)
    baseTimeRef.current = nextRecord.timeSpentSeconds
    enteredAtRef.current = Date.now()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDraftChange(patch: Partial<ExperimentDraft>) {
    setDraft((current) => ({ ...current, ...patch }))
  }

  function handleCanvasChange(
    canvasObjects: ExperimentDraft['canvasObjects'],
    canvasBackgroundMode: ExperimentDraft['canvasBackgroundMode'],
  ) {
    handleDraftChange({ canvasObjects, canvasBackgroundMode })
  }

  function handleSave() {
    persistCurrent(true)
    setToast('当前案例已保存到浏览器')
    window.setTimeout(() => setToast(''), 2600)
  }

  async function handleExport() {
    setIsExporting(true)
    try {
      persistCurrent(true)
      const records = getAllCaseRecords(participant.participantId, cases)
      await exportExperimentZip(participant, cases, records)
      setToast('ZIP 已生成并开始下载')
      window.setTimeout(() => setToast(''), 3000)
    } catch (error) {
      console.error(error)
      window.alert(
        error instanceof Error ? error.message : '导出失败，请重试。',
      )
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <ExperimentHeader
        participantId={participant.participantId}
        currentIndex={currentIndex}
        totalCases={cases.length}
        isExporting={isExporting}
        onSave={handleSave}
        onExport={handleExport}
        onExit={() => {
          persistCurrent(true)
          onExit()
        }}
      />

      <main className="mx-auto min-w-[1420px] space-y-4 p-5">
        <div className="grid h-[calc(100vh-210px)] min-h-[650px] grid-cols-[330px_820px_1fr] gap-4">
          <MaterialPanel caseDefinition={currentCase} />
          <CanvasEditor
            caseId={currentCase.caseId}
            startImage={currentCase.startImage}
            initialObjects={draft.canvasObjects}
            initialBackgroundMode={draft.canvasBackgroundMode}
            onChange={handleCanvasChange}
          />
          <SemanticPanel draft={draft} onChange={handleDraftChange} />
        </div>

        <StagePanel
          stages={draft.stages}
          onChange={(stages) => handleDraftChange({ stages })}
        />

        <TaskFooter
          currentIndex={currentIndex}
          totalCases={cases.length}
          onPrevious={() => loadCase(currentIndex - 1)}
          onNext={() => loadCase(currentIndex + 1)}
        />
      </main>

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  )
}
