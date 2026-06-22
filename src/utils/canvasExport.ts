import type {
  CanvasObject,
  CaseDefinition,
  CaseRecord,
} from '../types'

const WIDTH = 768
const HEIGHT = 432

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = () => resolve(null)
    image.src = src
  })
}

function drawPolyline(
  context: CanvasRenderingContext2D,
  points: number[],
  isCurve: boolean,
): void {
  if (points.length < 4) return

  context.beginPath()
  context.moveTo(points[0], points[1])

  if (!isCurve || points.length < 6) {
    for (let index = 2; index < points.length; index += 2) {
      context.lineTo(points[index], points[index + 1])
    }
    context.stroke()
    return
  }

  for (let index = 2; index < points.length - 2; index += 2) {
    const controlX = points[index]
    const controlY = points[index + 1]
    const endX = (points[index] + points[index + 2]) / 2
    const endY = (points[index + 1] + points[index + 3]) / 2
    context.quadraticCurveTo(controlX, controlY, endX, endY)
  }

  const lastIndex = points.length - 2
  context.lineTo(points[lastIndex], points[lastIndex + 1])
  context.stroke()
}

function drawArrow(
  context: CanvasRenderingContext2D,
  points: [number, number, number, number],
  strokeWidth: number,
): void {
  const [x1, y1, x2, y2] = points
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const headLength = Math.max(10, strokeWidth * 4)

  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()

  context.beginPath()
  context.moveTo(x2, y2)
  context.lineTo(
    x2 - headLength * Math.cos(angle - Math.PI / 6),
    y2 - headLength * Math.sin(angle - Math.PI / 6),
  )
  context.lineTo(
    x2 - headLength * Math.cos(angle + Math.PI / 6),
    y2 - headLength * Math.sin(angle + Math.PI / 6),
  )
  context.closePath()
  context.fill()
}

function drawObject(
  context: CanvasRenderingContext2D,
  object: CanvasObject,
): void {
  context.save()
  context.strokeStyle = object.color
  context.fillStyle = object.color
  context.lineWidth = object.strokeWidth
  context.lineCap = 'round'
  context.lineJoin = 'round'

  switch (object.type) {
    case 'brush':
      drawPolyline(context, object.points, false)
      break
    case 'curve':
      drawPolyline(context, object.points, true)
      break
    case 'arrow':
      drawArrow(context, object.points, object.strokeWidth)
      break
    case 'rect':
      context.strokeRect(object.x, object.y, object.width, object.height)
      break
    case 'text':
      context.font = `600 ${object.fontSize}px system-ui, sans-serif`
      context.textBaseline = 'top'
      context.fillText(object.text, object.x, object.y)
      break
  }

  context.restore()
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('无法生成画布 PNG。'))
    }, 'image/png')
  })
}

export async function renderCaseCanvasPng(
  record: CaseRecord,
  caseDefinition: CaseDefinition,
): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT

  const context = canvas.getContext('2d')
  if (!context) throw new Error('浏览器不支持 Canvas 2D。')

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, WIDTH, HEIGHT)

  if (record.canvasBackgroundMode === 'start-image') {
    const image = await loadImage(caseDefinition.startImage)
    if (image) {
      context.drawImage(image, 0, 0, WIDTH, HEIGHT)
    }
  }

  record.canvasObjects.forEach((object) => drawObject(context, object))
  return canvasToBlob(canvas)
}
