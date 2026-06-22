import { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import {
  Arrow,
  Image as KonvaImage,
  Layer,
  Line,
  Rect,
  Stage,
  Text,
} from 'react-konva'
import { ImageOff } from 'lucide-react'
import type {
  BackgroundMode,
  CanvasObject,
  CanvasTool,
} from '../types'
import { createId } from '../utils/id'
import { useHtmlImage } from '../hooks/useHtmlImage'
import { CanvasToolbar } from './CanvasToolbar'

const CANVAS_WIDTH = 768
const CANVAS_HEIGHT = 432

interface CanvasEditorProps {
  caseId: string
  startImage: string
  initialObjects: CanvasObject[]
  initialBackgroundMode: BackgroundMode
  onChange: (
    objects: CanvasObject[],
    backgroundMode: BackgroundMode,
  ) => void
}

export function CanvasEditor({
  caseId,
  startImage,
  initialObjects,
  initialBackgroundMode,
  onChange,
}: CanvasEditorProps) {
  const [objects, setObjects] = useState<CanvasObject[]>(initialObjects)
  const [backgroundMode, setBackgroundMode] =
    useState<BackgroundMode>(initialBackgroundMode)
  const [tool, setTool] = useState<CanvasTool>('brush')
  const [color, setColor] = useState('#ef4444')
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [history, setHistory] = useState<CanvasObject[][]>([initialObjects])
  const [historyIndex, setHistoryIndex] = useState(0)
  const activeObjectId = useRef<string | null>(null)
  const objectsRef = useRef(objects)
  const [backgroundImage, imageState] = useHtmlImage(startImage)

  useEffect(() => {
    objectsRef.current = objects
  }, [objects])

  useEffect(() => {
    setObjects(initialObjects)
    setBackgroundMode(initialBackgroundMode)
    setHistory([initialObjects])
    setHistoryIndex(0)
    activeObjectId.current = null
    // caseId is the intentional reset boundary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId])

  function publish(nextObjects: CanvasObject[], nextMode = backgroundMode) {
    objectsRef.current = nextObjects
    setObjects(nextObjects)
    onChange(nextObjects, nextMode)
  }

  function commit(nextObjects: CanvasObject[]) {
    const nextHistory = history.slice(0, historyIndex + 1)
    nextHistory.push(nextObjects)
    setHistory(nextHistory)
    setHistoryIndex(nextHistory.length - 1)
    publish(nextObjects)
  }

  function removeObject(id: string) {
    if (tool !== 'eraser') return
    commit(objectsRef.current.filter((object) => object.id !== id))
  }

  function pointerPosition(stage: Konva.Stage): { x: number; y: number } | null {
    const pointer = stage.getPointerPosition()
    if (!pointer) return null
    return {
      x: Math.min(Math.max(pointer.x, 0), CANVAS_WIDTH),
      y: Math.min(Math.max(pointer.y, 0), CANVAS_HEIGHT),
    }
  }

  function handlePointerDown(event: Konva.KonvaEventObject<MouseEvent | TouchEvent>) {
    const stage = event.target.getStage()
    if (!stage || tool === 'eraser') return

    const point = pointerPosition(stage)
    if (!point) return

    if (tool === 'text') {
      const text = window.prompt('请输入文字标签内容：')?.trim()
      if (!text) return
      commit([
        ...objectsRef.current,
        {
          id: createId('text'),
          type: 'text',
          x: point.x,
          y: point.y,
          text,
          fontSize: Math.max(16, strokeWidth * 4),
          color,
          strokeWidth,
        },
      ])
      return
    }

    const id = createId(tool)
    activeObjectId.current = id

    let nextObject: CanvasObject
    if (tool === 'rect') {
      nextObject = {
        id,
        type: 'rect',
        x: point.x,
        y: point.y,
        width: 0,
        height: 0,
        color,
        strokeWidth,
      }
    } else if (tool === 'arrow') {
      nextObject = {
        id,
        type: 'arrow',
        points: [point.x, point.y, point.x, point.y],
        color,
        strokeWidth,
      }
    } else {
      nextObject = {
        id,
        type: tool,
        points: [point.x, point.y],
        color,
        strokeWidth,
      }
    }

    publish([...objectsRef.current, nextObject])
  }

  function handlePointerMove(event: Konva.KonvaEventObject<MouseEvent | TouchEvent>) {
    if (!activeObjectId.current) return

    const stage = event.target.getStage()
    if (!stage) return
    const point = pointerPosition(stage)
    if (!point) return

    const nextObjects = objectsRef.current.map((object) => {
      if (object.id !== activeObjectId.current) return object

      if (object.type === 'rect') {
        return {
          ...object,
          width: point.x - object.x,
          height: point.y - object.y,
        }
      }

      if (object.type === 'arrow') {
        return {
          ...object,
          points: [
            object.points[0],
            object.points[1],
            point.x,
            point.y,
          ] as [number, number, number, number],
        }
      }

      if (object.type === 'brush' || object.type === 'curve') {
        return {
          ...object,
          points: [...object.points, point.x, point.y],
        }
      }

      return object
    })

    publish(nextObjects)
  }

  function handlePointerUp() {
    if (!activeObjectId.current) return
    activeObjectId.current = null

    const nextHistory = history.slice(0, historyIndex + 1)
    nextHistory.push(objectsRef.current)
    setHistory(nextHistory)
    setHistoryIndex(nextHistory.length - 1)
  }

  function undo() {
    if (historyIndex <= 0) return
    const nextIndex = historyIndex - 1
    setHistoryIndex(nextIndex)
    publish(history[nextIndex])
  }

  function redo() {
    if (historyIndex >= history.length - 1) return
    const nextIndex = historyIndex + 1
    setHistoryIndex(nextIndex)
    publish(history[nextIndex])
  }

  function clearCanvas() {
    if (objectsRef.current.length === 0) return
    if (!window.confirm('确定清空当前画布上的全部绘制对象吗？')) return
    commit([])
  }

  function changeBackgroundMode(nextMode: BackgroundMode) {
    setBackgroundMode(nextMode)
    onChange(objectsRef.current, nextMode)
  }

  const cursor =
    tool === 'eraser'
      ? 'cell'
      : tool === 'text'
        ? 'text'
        : 'crosshair'

  return (
    <section className="panel flex min-h-0 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">图形输入画布</h2>
          <p className="mt-1 text-xs text-slate-500">
            可以只改文字，也可以只画图，或将图文结合。
          </p>
        </div>
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
          {[
            ['start-image', '首帧背景'],
            ['blank', '空白画布'],
          ].map(([value, label]) => (
            <button
              key={value}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                backgroundMode === value
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              onClick={() => changeBackgroundMode(value as BackgroundMode)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <CanvasToolbar
        tool={tool}
        color={color}
        strokeWidth={strokeWidth}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onToolChange={setTool}
        onColorChange={setColor}
        onStrokeWidthChange={setStrokeWidth}
        onUndo={undo}
        onRedo={redo}
        onClear={clearCanvas}
      />

      <div className="flex flex-1 items-center justify-center overflow-auto bg-slate-100 p-5">
        <div
          className="relative overflow-hidden rounded-lg border border-slate-300 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.13)]"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, cursor }}
        >
          <Stage
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          >
            <Layer>
              <Rect
                x={0}
                y={0}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                fill="#ffffff"
                listening={false}
              />
              {backgroundMode === 'start-image' && backgroundImage && (
                <KonvaImage
                  image={backgroundImage}
                  x={0}
                  y={0}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  listening={false}
                />
              )}
              {backgroundMode === 'start-image' && imageState === 'error' && (
                <>
                  <Rect
                    x={0}
                    y={0}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    fill="#f8fafc"
                    listening={false}
                  />
                  <Text
                    x={0}
                    y={196}
                    width={CANVAS_WIDTH}
                    align="center"
                    text="首帧图尚未加载，请检查 public/cases 下的文件"
                    fontSize={14}
                    fill="#94a3b8"
                    listening={false}
                  />
                </>
              )}

              {objects.map((object) => {
                const commonProps = {
                  key: object.id,
                  stroke: object.color,
                  strokeWidth: object.strokeWidth,
                  lineCap: 'round' as const,
                  lineJoin: 'round' as const,
                  onClick: () => removeObject(object.id),
                  onTap: () => removeObject(object.id),
                }

                switch (object.type) {
                  case 'brush':
                    return (
                      <Line
                        {...commonProps}
                        points={object.points}
                        tension={0}
                      />
                    )
                  case 'curve':
                    return (
                      <Line
                        {...commonProps}
                        points={object.points}
                        tension={0.5}
                      />
                    )
                  case 'arrow':
                    return (
                      <Arrow
                        {...commonProps}
                        points={object.points}
                        fill={object.color}
                        pointerLength={Math.max(10, object.strokeWidth * 4)}
                        pointerWidth={Math.max(9, object.strokeWidth * 3)}
                      />
                    )
                  case 'rect':
                    return (
                      <Rect
                        {...commonProps}
                        x={object.x}
                        y={object.y}
                        width={object.width}
                        height={object.height}
                        fill="transparent"
                      />
                    )
                  case 'text':
                    return (
                      <Text
                        key={object.id}
                        x={object.x}
                        y={object.y}
                        text={object.text}
                        fontSize={object.fontSize}
                        fontStyle="bold"
                        fill={object.color}
                        onClick={() => removeObject(object.id)}
                        onTap={() => removeObject(object.id)}
                      />
                    )
                }
              })}
            </Layer>
          </Stage>

          {backgroundMode === 'start-image' && imageState === 'error' && (
            <div className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 text-slate-300">
              <ImageOff size={38} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-2.5 text-[11px] text-slate-400">
        <span>画布：768 × 432（16:9）</span>
        <span>对象数：{objects.length}</span>
      </div>
    </section>
  )
}
