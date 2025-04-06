"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

interface VideoPlayerProps {
  src: string
  title: string
  isComparison?: boolean
  comparisonSrc?: string
}

export function VideoPlayer({ src, title, isComparison, comparisonSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const comparisonVideoRef = useRef<HTMLVideoElement>(null)
  const [position, setPosition] = useState(50)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const comparisonVideo = comparisonVideoRef.current
    if (!video || !comparisonVideo) return

    if (isPlaying) {
      video.play()
      comparisonVideo.play()
    } else {
      video.pause()
      comparisonVideo.pause()
    }
  }, [isPlaying])

  const handlePositionChange = (value: number[]) => {
    setPosition(value[0])
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm h-full flex flex-col">
      <CardHeader className="border-b border-slate-700/50 pb-4">
        <CardTitle className="text-slate-100">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="relative flex-1 w-full overflow-hidden rounded-lg">
          {isComparison && comparisonSrc ? (
            <>
              <video
                ref={videoRef}
                src={src}
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                loop
                muted
              />
              <video
                ref={comparisonVideoRef}
                src={comparisonSrc}
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ clipPath: `inset(0 0 0 ${position}%)` }}
                loop
                muted
              />
              <div
                className="absolute top-0 bottom-0 w-1 bg-orange-500 cursor-ew-resize"
                style={{ left: `${position}%` }}
              />
            </>
          ) : (
            <video
              ref={videoRef}
              src={src}
              className="w-full h-full object-cover"
              loop
              muted
            />
          )}
        </div>
        {isComparison && (
          <div className="space-y-6 mt-6">
            <div className="relative w-full h-4">
              <div
                className="absolute top-0 bottom-0 w-1 bg-orange-500"
                style={{ left: `${position}%` }}
              />
              <Slider
                value={[position]}
                onValueChange={handlePositionChange}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={togglePlay}
                variant="outline"
                className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-slate-100 h-10 px-6"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    暂停
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    播放
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 