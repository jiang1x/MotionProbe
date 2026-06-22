import JSZip from 'jszip'
import type {
  CaseDefinition,
  CaseRecord,
  ParticipantMetadata,
} from '../types'
import { renderCaseCanvasPng } from './canvasExport'

function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export async function exportExperimentZip(
  participant: ParticipantMetadata,
  caseDefinitions: CaseDefinition[],
  records: CaseRecord[],
): Promise<void> {
  const zip = new JSZip()
  const exportedAt = new Date().toISOString()

  zip.file(
    'participant_metadata.json',
    JSON.stringify(
      {
        ...participant,
        exportedAt,
        totalCases: caseDefinitions.length,
      },
      null,
      2,
    ),
  )

  for (const caseDefinition of caseDefinitions) {
    const record = records.find(
      (candidate) => candidate.caseId === caseDefinition.caseId,
    )
    if (!record) continue

    zip.file(
      `${caseDefinition.caseId}.json`,
      JSON.stringify(record, null, 2),
    )

    const pngBlob = await renderCaseCanvasPng(record, caseDefinition)
    zip.file(`${caseDefinition.caseId}_canvas.png`, pngBlob)
  }

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })

  downloadBlob(
    zipBlob,
    `${participant.participantId}_motionprobe_export.zip`,
  )
}
