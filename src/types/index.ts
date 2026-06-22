export type YesNo = 'yes' | 'no'
export type BackgroundMode = 'start-image' | 'blank'

export interface ParticipantMetadata {
  participantId: string
  hasDrawingBackground: YesNo
  hasUsedAiVideoTools: YesNo
  startedAt: string
  protocolVersion: string
}

export interface CaseDefinition {
  caseId: string
  title: string
  categoryCode: number
  category: string
  originalPrompt: string
  taskText: string
  startImage: string
  textOnlyVideo: string
  internalNote?: string
}

export type CanvasTool =
  | 'brush'
  | 'arrow'
  | 'curve'
  | 'rect'
  | 'text'
  | 'eraser'

interface CanvasObjectBase {
  id: string
  color: string
  strokeWidth: number
}

export interface FreehandObject extends CanvasObjectBase {
  type: 'brush' | 'curve'
  points: number[]
}

export interface ArrowObject extends CanvasObjectBase {
  type: 'arrow'
  points: [number, number, number, number]
}

export interface RectangleObject extends CanvasObjectBase {
  type: 'rect'
  x: number
  y: number
  width: number
  height: number
}

export interface TextObject extends CanvasObjectBase {
  type: 'text'
  x: number
  y: number
  text: string
  fontSize: number
}

export type CanvasObject =
  | FreehandObject
  | ArrowObject
  | RectangleObject
  | TextObject

export type InputType =
  | '文本补充'
  | '草图'
  | '箭头'
  | '区域框'
  | '文字标签'
  | '阶段图'
  | '没有修改'

export type AnnotationMeaning =
  | '运动方向'
  | '运动轨迹'
  | '速度变化'
  | '加速度'
  | '受力方向'
  | '重力'
  | '摩擦'
  | '碰撞点'
  | '形变区域'
  | '约束位置'
  | '阶段变化'
  | '其他'

export interface SemanticAnnotation {
  id: string
  symbolType: string
  meaning: AnnotationMeaning
  target: string
  description: string
}

export interface StageDescription {
  id: string
  name: string
  description: string
  note: string
}

export type SketchHelpfulness =
  | ''
  | '有帮助'
  | '一般'
  | '没有帮助'
  | '增加负担'

export interface CaseRecord {
  participantId: string
  caseId: string
  caseTitle: string
  categoryCode: number
  category: string
  originalPrompt: string
  taskText: string
  startImage: string
  textOnlyVideo: string
  internalNote?: string
  userPromptAddition: string
  usedInputTypes: InputType[]
  annotations: SemanticAnnotation[]
  canvasObjects: CanvasObject[]
  canvasBackgroundMode: BackgroundMode
  difficulty: number
  sketchHelpfulness: SketchHelpfulness
  userComment: string
  stages: StageDescription[]
  timeSpentSeconds: number
  savedAt: string
}

export interface ExperimentDraft {
  userPromptAddition: string
  usedInputTypes: InputType[]
  annotations: SemanticAnnotation[]
  canvasObjects: CanvasObject[]
  canvasBackgroundMode: BackgroundMode
  difficulty: number
  sketchHelpfulness: SketchHelpfulness
  userComment: string
  stages: StageDescription[]
}
