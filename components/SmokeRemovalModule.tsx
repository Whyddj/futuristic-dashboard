"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipForward, Maximize2, Minimize2, Gauge, Zap, Clock, BarChart3, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageCompare } from "@/components/ImageCompare"

interface VideoFrameProps {
  title: string
  isProcessing?: boolean
  onPlayPause: () => void
  onStepForward: () => void
  onROISelect: () => void
  isPlaying: boolean
}

const VideoFrame = ({
  title,
  isProcessing = false,
  onPlayPause,
  onStepForward,
  onROISelect,
  isPlaying,
}: VideoFrameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isProcessing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      canvasWidth: number
      canvasHeight: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.x = Math.random() * this.canvasWidth
        this.y = Math.random() * this.canvasHeight
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        const red = Math.floor(Math.random() * 100) + 150
        const green = Math.floor(Math.random() * 50) + 50
        const blue = Math.floor(Math.random() * 30) + 20
        this.color = `rgba(${red}, ${green}, ${blue}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > this.canvasWidth) this.x = 0
        if (this.x < 0) this.x = this.canvasWidth
        if (this.y > this.canvasHeight) this.y = 0
        if (this.y < 0) this.y = this.canvasHeight
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup animation if needed
    }
  }, [isProcessing])

  return (
    <div className="relative w-full h-auto aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      <div className="absolute top-4 left-4 text-sm font-medium text-slate-200">
        {title}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPlayPause}
              className="text-slate-200 hover:text-slate-100"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onStepForward}
              className="text-slate-200 hover:text-slate-100"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onROISelect}
              className="text-slate-200 hover:text-slate-100"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProcessingArrow = () => {
  return (
    <div className="relative w-48 h-24">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative w-full h-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-8 flex items-center justify-center">
              <div className="w-full h-1 bg-gradient-to-r from-orange-500/20 via-orange-500 to-orange-500/20 animate-pulse" />
              <div className="absolute right-0 w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-orange-500 border-b-[8px] border-b-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  unit = "%",
}: {
  title: string
  value: number | string
  icon: React.ElementType
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  unit?: string
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      case "orange":
        return "from-orange-500 to-red-500 border-orange-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      default:
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
    }
  }

  const getIconColor = () => {
    switch (color) {
      case "cyan":
        return "text-cyan-500"
      case "orange":
        return "text-orange-500"
      case "green":
        return "text-green-500"
      case "blue":
        return "text-blue-500"
      case "purple":
        return "text-purple-500"
      default:
        return "text-cyan-500"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-amber-500" />
      case "down":
        return <BarChart3 className="h-4 w-4 rotate-180 text-green-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">{title}</div>
        <Icon className={`h-5 w-5 ${getIconColor()}`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {value}{unit}
      </div>
      <div className="text-xs text-slate-400">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-orange-500 to-red-500"></div>
    </div>
  )
}

export default function SmokeRemovalModule() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("aod-net")
  const [enhancementLevel, setEnhancementLevel] = useState(75)
  const [selectedResolution, setSelectedResolution] = useState("720p")
  const [isProcessing, setIsProcessing] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [algorithm, setAlgorithm] = useState("default")
  const [smokeDensity, setSmokeDensity] = useState(65)
  const [detailEnhancement, setDetailEnhancement] = useState(50)
  const [comparisonMode, setComparisonMode] = useState("side-by-side")
  const [smokeStrength, setSmokeStrength] = useState(0)
  const [fps, setFps] = useState(0)
  const [latency, setLatency] = useState(0)
  const [processingLoad, setProcessingLoad] = useState(0)

  useEffect(() => {
    if (!isProcessing) return;
    
    const interval = setInterval(() => {
      // Randomly adjust values within reasonable ranges
      setSmokeStrength(Math.floor(Math.random() * 10) + 60) // 60-70%
      setFps(Math.floor(Math.random() * 5) + 28) // 28-33 fps
      setLatency(Math.floor(Math.random() * 40) + 160) // 160-200ms
      setProcessingLoad(Math.floor(Math.random() * 15) + 35) // 35-50%
    }, 3000)

    return () => clearInterval(interval)
  }, [isProcessing])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    setIsProcessing(!isPlaying)
  }

  const handleStepForward = () => {
    // Implement frame step forward logic
  }

  const handleROISelect = () => {
    // Implement ROI selection logic
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* 去烟算法效果模块 */}
      <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-700/50 pb-4">
          <CardTitle className="text-slate-100">去烟算法效果</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <p className="text-slate-300 mb-4">
                本项目采用改进的多尺度特征融合去烟网络，能够有效去除烟雾干扰，保留图像细节信息，提高后续目标检测的准确率。
                通过下方的对比拖动条，可以直观查看去烟前后的效果对比。
              </p>
            </div>
            
            <div className="md:col-span-3">
              <ImageCompare 
                beforeSrc="/images/smoke_before.jpg" 
                afterSrc="/images/smoke_after.jpg"
                title="去烟效果对比"
              />
            </div>
            
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                  title="峰值信噪比"
                  value={28.6}
                  icon={Gauge}
                  trend="up"
                  color="blue"
                  detail="比传统算法提升约3.2dB"
                  unit="dB"
                />
                <MetricCard
                  title="处理速度"
                  value={12.4}
                  icon={Zap}
                  trend="up"
                  color="green"
                  detail="单帧处理时间，支持实时视频处理"
                  unit="ms"
                />
                <MetricCard
                  title="结构相似度"
                  value={0.94}
                  icon={BarChart3}
                  trend="up"
                  color="purple"
                  detail="较高的SSIM表明保留了更多图像结构信息"
                  unit=""
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 去烟增强模块演示 */}
      <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-700/50 pb-4">
          <CardTitle className="text-slate-100">去烟增强模块演示</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 overflow-hidden">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Left video - Smoke input */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-sm font-medium text-slate-200">带烟原始输入</div>
                <div className="w-full max-w-md mx-auto">
                  <VideoFrame
                    title="烟雾视频输入"
                    onPlayPause={handlePlayPause}
                    onStepForward={handleStepForward}
                    onROISelect={handleROISelect}
                    isPlaying={isPlaying}
                  />
                </div>
              </div>

              {/* Middle arrow */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <Select value={algorithm} onValueChange={setAlgorithm}>
                      <SelectTrigger className="w-[200px] bg-slate-800 border-slate-700 text-slate-100">
                        <SelectValue placeholder="选择去烟算法" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="default" className="text-slate-100 hover:bg-slate-700">基础去烟</SelectItem>
                        <SelectItem value="dehazenet" className="text-slate-100 hover:bg-slate-700">Cycle GAN去烟</SelectItem>
                        <SelectItem value="aod-net" className="text-slate-100 hover:bg-slate-700">AOD-Net增强</SelectItem>
                        <SelectItem value="physics" className="text-slate-100 hover:bg-slate-700">物理模型去烟</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <ProcessingArrow />
                  <div className="mt-4 flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border-orange-500/30" 
                      onClick={() => setIsProcessing(!isProcessing)}
                    >
                      {isProcessing ? "暂停处理" : "开始处理"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right video - Processed output */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-sm font-medium text-slate-200">去烟后输出</div>
                <div className="w-full max-w-md mx-auto">
                  <VideoFrame
                    title="去烟视频输出"
                    isProcessing={isProcessing}
                    onPlayPause={handlePlayPause}
                    onStepForward={handleStepForward}
                    onROISelect={handleROISelect}
                    isPlaying={isPlaying}
                  />
                </div>
              </div>
            </div>

            {/* Parameter controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-sm font-medium text-slate-200 mb-3">处理参数</div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="smoke-density" className="text-xs text-slate-300">烟雾密度估计</Label>
                        <span className="text-xs text-slate-300">{smokeDensity}%</span>
                      </div>
                      <Slider
                        id="smoke-density"
                        value={[smokeDensity]}
                        onValueChange={(value) => setSmokeDensity(value[0])}
                        max={100}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="detail-enhancement" className="text-xs text-slate-300">细节增强强度</Label>
                        <span className="text-xs text-slate-300">{detailEnhancement}%</span>
                      </div>
                      <Slider
                        id="detail-enhancement"
                        value={[detailEnhancement]}
                        onValueChange={(value) => setDetailEnhancement(value[0])}
                        max={100}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-sm font-medium text-slate-200 mb-3">显示选项</div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-300">对比模式</Label>
                      <ToggleGroup type="single" variant="outline" value={comparisonMode} onValueChange={(value) => value && setComparisonMode(value)} className="justify-start">
                        <ToggleGroupItem value="side-by-side" className="text-xs text-slate-100 bg-slate-700/50 data-[state=on]:bg-orange-500/40 data-[state=on]:text-white data-[state=on]:font-medium">
                          并排显示
                        </ToggleGroupItem>
                        <ToggleGroupItem value="split" className="text-xs text-slate-100 bg-slate-700/50 data-[state=on]:bg-orange-500/40 data-[state=on]:text-white data-[state=on]:font-medium">
                          分屏对比
                        </ToggleGroupItem>
                        <ToggleGroupItem value="overlay" className="text-xs text-slate-100 bg-slate-700/50 data-[state=on]:bg-orange-500/40 data-[state=on]:text-white data-[state=on]:font-medium">
                          叠加对比
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-sm font-medium text-slate-200 mb-3">性能指标</div>
                  <div className="grid grid-cols-2 gap-4">
                    <MetricCard
                      title="帧率"
                      value={isProcessing ? fps : "-"}
                      icon={Clock}
                      trend="stable"
                      color="blue"
                      detail={isProcessing ? "处理速度稳定" : "尚未开始处理"}
                      unit={isProcessing ? " FPS" : "%"}
                    />
                    <MetricCard
                      title="处理延迟"
                      value={isProcessing ? latency : "-"}
                      icon={Zap}
                      trend="down"
                      color="green"
                      detail={isProcessing ? "延迟降低 12%" : "尚未开始处理"}
                      unit={isProcessing ? " ms" : "%"}
                    />
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="text-sm font-medium text-slate-200 mb-3">去烟强度</div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-300">当前强度: {isProcessing ? `${smokeStrength}%` : "-%"}</span>
                      <span className="text-xs text-slate-300">处理负载: {isProcessing ? `${processingLoad}%` : "-%"}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        style={{ width: isProcessing ? `${smokeStrength}%` : "0%" }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>最低</span>
                      <span>适中</span>
                      <span>最高</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 