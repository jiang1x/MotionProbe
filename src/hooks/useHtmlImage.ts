import { useEffect, useState } from 'react'

export type ImageLoadState = 'idle' | 'loading' | 'loaded' | 'error'

export function useHtmlImage(
  src: string,
): [HTMLImageElement | null, ImageLoadState] {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [state, setState] = useState<ImageLoadState>('idle')

  useEffect(() => {
    if (!src) {
      setImage(null)
      setState('idle')
      return
    }

    let active = true
    const nextImage = new Image()
    nextImage.crossOrigin = 'anonymous'
    setState('loading')

    nextImage.onload = () => {
      if (!active) return
      setImage(nextImage)
      setState('loaded')
    }

    nextImage.onerror = () => {
      if (!active) return
      setImage(null)
      setState('error')
    }

    nextImage.src = src

    return () => {
      active = false
    }
  }, [src])

  return [image, state]
}
