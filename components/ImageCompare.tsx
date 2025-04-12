"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { AlertCircle } from "lucide-react"

interface ImageCompareProps {
  beforeSrc: string
  afterSrc: string
  title: string
}

export function ImageCompare({ beforeSrc, afterSrc, title }: ImageCompareProps) {
  const [position, setPosition] = useState(50)
  const [beforeLoaded, setBeforeLoaded] = useState(false)
  const [afterLoaded, setAfterLoaded] = useState(false)
  
  // Preload images to check if they exist
  useEffect(() => {
    const beforeImg = new Image()
    beforeImg.onload = () => setBeforeLoaded(true)
    beforeImg.onerror = () => setBeforeLoaded(false)
    beforeImg.src = beforeSrc
    
    const afterImg = new Image()
    afterImg.onload = () => setAfterLoaded(true)
    afterImg.onerror = () => setAfterLoaded(false)
    afterImg.src = afterSrc
  }, [beforeSrc, afterSrc])

  const handlePositionChange = (value: number[]) => {
    setPosition(value[0])
  }

  // Placeholder colors for demo mode when images are not available
  const beforeColor = "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), linear-gradient(to right, #ff4800, #ff6f00)"
  const afterColor = "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), linear-gradient(to right, #ff4800, #ff6f00)"

  return (
    <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm w-full">
      <CardHeader className="border-b border-slate-700/50 pb-4">
        <CardTitle className="text-slate-100">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full aspect-video overflow-hidden rounded-lg relative">
          {(!beforeLoaded || !afterLoaded) && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 z-30">
              <div className="bg-slate-800 p-4 rounded-lg max-w-md text-center">
                <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-slate-200 mb-2">示例图像未加载</h3>
                <p className="text-sm text-slate-400">
                  请将示例图像 (smoke_before.jpg 和 smoke_after.jpg) 放置在 public/images/ 目录下，
                  或查看 public/images/placeholder-info.txt 获取临时图像链接。
                </p>
                <div className="mt-3 text-xs text-slate-500">
                  此处显示的是演示占位效果。
                </div>
              </div>
            </div>
          )}
          
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-10"
            style={{ 
              backgroundImage: beforeLoaded ? `url(${beforeSrc})` : beforeColor, 
              clipPath: `inset(0 ${100 - position}% 0 0)` 
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: afterLoaded ? `url(${afterSrc})` : afterColor, 
              clipPath: `inset(0 0 0 ${position}%)` 
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-1 bg-orange-500 cursor-ew-resize z-20"
            style={{ left: `${position}%` }}
          />
          
          {/* Labels */}
          <div className="absolute top-3 left-3 bg-slate-900/70 px-3 py-1 rounded-md text-sm text-slate-200 z-20">
            烟雾环境
          </div>
          <div className="absolute top-3 right-3 bg-slate-900/70 px-3 py-1 rounded-md text-sm text-slate-200 z-20">
            去烟后
          </div>
        </div>
        <div className="space-y-2 mt-6">
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
          <div className="flex justify-between text-xs text-slate-400">
            <span>原始图像</span>
            <span>拖动滑块比较效果</span>
            <span>去烟结果</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 