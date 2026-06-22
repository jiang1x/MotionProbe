import { useState } from 'react'
import type { ParticipantMetadata } from './types'
import {
  clearActiveParticipant,
  loadParticipant,
  saveParticipant,
} from './utils/storage'
import { ParticipantForm } from './components/ParticipantForm'
import { TaskPage } from './components/TaskPage'

export default function App() {
  const [participant, setParticipant] = useState<ParticipantMetadata | null>(
    () => loadParticipant(),
  )
  const [inExperiment, setInExperiment] = useState(() => Boolean(loadParticipant()))

  function handleStart(metadata: ParticipantMetadata) {
    saveParticipant(metadata)
    setParticipant(metadata)
    setInExperiment(true)
  }

  function handleExit() {
    clearActiveParticipant()
    setInExperiment(false)
    setParticipant(null)
  }

  if (!inExperiment || !participant) {
    return (
      <ParticipantForm
        existingParticipant={participant}
        onStart={handleStart}
      />
    )
  }

  return <TaskPage participant={participant} onExit={handleExit} />
}
