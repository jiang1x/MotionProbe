import type {
  CaseDefinition,
  CaseRecord,
  ExperimentDraft,
  ParticipantMetadata,
} from '../types'

const PARTICIPANT_KEY = 'motionprobe:participant'
const ACTIVE_CASE_KEY = 'motionprobe:active-case-index'
const CASE_PREFIX = 'motionprobe:case'

function caseStorageKey(participantId: string, caseId: string): string {
  return `${CASE_PREFIX}:${participantId}:${caseId}`
}

export function saveParticipant(metadata: ParticipantMetadata): void {
  localStorage.setItem(PARTICIPANT_KEY, JSON.stringify(metadata))
}

export function loadParticipant(): ParticipantMetadata | null {
  const raw = localStorage.getItem(PARTICIPANT_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as ParticipantMetadata
  } catch {
    return null
  }
}

export function clearActiveParticipant(): void {
  localStorage.removeItem(PARTICIPANT_KEY)
  localStorage.removeItem(ACTIVE_CASE_KEY)
}

export function saveActiveCaseIndex(index: number): void {
  localStorage.setItem(ACTIVE_CASE_KEY, String(index))
}

export function loadActiveCaseIndex(maxIndex: number): number {
  const parsed = Number(localStorage.getItem(ACTIVE_CASE_KEY) ?? '0')
  if (!Number.isInteger(parsed)) return 0
  return Math.min(Math.max(parsed, 0), maxIndex)
}

export function createEmptyCaseRecord(
  participantId: string,
  caseDefinition: CaseDefinition,
): CaseRecord {
  return {
    participantId,
    caseId: caseDefinition.caseId,
    caseTitle: caseDefinition.title,
    categoryCode: caseDefinition.categoryCode,
    category: caseDefinition.category,
    originalPrompt: caseDefinition.originalPrompt,
    taskText: caseDefinition.taskText,
    startImage: caseDefinition.startImage,
    textOnlyVideo: caseDefinition.textOnlyVideo,
    internalNote: caseDefinition.internalNote,
    userPromptAddition: '',
    usedInputTypes: [],
    annotations: [],
    canvasObjects: [],
    canvasBackgroundMode: 'start-image',
    difficulty: 3,
    sketchHelpfulness: '',
    userComment: '',
    stages: [],
    timeSpentSeconds: 0,
    savedAt: new Date().toISOString(),
  }
}

export function saveCaseRecord(record: CaseRecord): void {
  localStorage.setItem(
    caseStorageKey(record.participantId, record.caseId),
    JSON.stringify(record),
  )
}

export function loadCaseRecord(
  participantId: string,
  caseDefinition: CaseDefinition,
): CaseRecord {
  const raw = localStorage.getItem(
    caseStorageKey(participantId, caseDefinition.caseId),
  )

  if (!raw) return createEmptyCaseRecord(participantId, caseDefinition)

  try {
    const parsed = JSON.parse(raw) as Partial<CaseRecord>
    return {
      ...createEmptyCaseRecord(participantId, caseDefinition),
      ...parsed,
      participantId,
      caseId: caseDefinition.caseId,
      caseTitle: caseDefinition.title,
      categoryCode: caseDefinition.categoryCode,
      category: caseDefinition.category,
      originalPrompt: caseDefinition.originalPrompt,
      taskText: caseDefinition.taskText,
      startImage: caseDefinition.startImage,
      textOnlyVideo: caseDefinition.textOnlyVideo,
      internalNote: caseDefinition.internalNote,
    }
  } catch {
    return createEmptyCaseRecord(participantId, caseDefinition)
  }
}

export function draftFromRecord(record: CaseRecord): ExperimentDraft {
  return {
    userPromptAddition: record.userPromptAddition,
    usedInputTypes: record.usedInputTypes,
    annotations: record.annotations,
    canvasObjects: record.canvasObjects,
    canvasBackgroundMode: record.canvasBackgroundMode,
    difficulty: record.difficulty,
    sketchHelpfulness: record.sketchHelpfulness,
    userComment: record.userComment,
    stages: record.stages,
  }
}

export function getAllCaseRecords(
  participantId: string,
  caseDefinitions: CaseDefinition[],
): CaseRecord[] {
  return caseDefinitions.map((caseDefinition) =>
    loadCaseRecord(participantId, caseDefinition),
  )
}
