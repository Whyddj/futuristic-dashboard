"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  CircleOff,
  Command,
  Cpu,
  Database,
  Download,
  Globe,
  HardDrive,
  Hexagon,
  LineChart,
  Lock,
  type LucideIcon,
  MessageSquare,
  Mic,
  Moon,
  Radio,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sun,
  Terminal,
  Wifi,
  Zap,
  ArrowRight,
  Flame,
  Target,
  Video,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { VideoPlayer } from "@/components/VideoPlayer"
import SmokeRemovalModule from "@/components/SmokeRemovalModule"

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [systemStatus, setSystemStatus] = useState(85)
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [securityLevel, setSecurityLevel] = useState(75)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("background")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
      setSystemStatus(Math.floor(Math.random() * 10) + 80)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

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
        const red = Math.floor(Math.random() * 100) + 150  // 150-250
        const green = Math.floor(Math.random() * 50) + 50  // 50-100
        const blue = Math.floor(Math.random() * 30) + 20   // 20-50
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

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100">
      <div className="flex flex-col h-screen">
        {/* Top navigation */}
        <div className="h-16 bg-slate-800/30 border-b border-slate-700/50 backdrop-blur-sm px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              火灾场景目标检测系统
            </h1>
            <p className="text-sm text-slate-400">基于去烟和双模态的目标检测解决方案</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="flex space-x-2 bg-transparent">
              <TabsTrigger 
                value="background" 
                className="flex items-center gap-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
              >
                <Flame className="h-4 w-4" />
                项目背景
              </TabsTrigger>
              <TabsTrigger 
                value="smoke" 
                className="flex items-center gap-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
              >
                <Video className="h-4 w-4" />
                去烟模块
              </TabsTrigger>
              <TabsTrigger 
                value="detection" 
                className="flex items-center gap-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
              >
                <Target className="h-4 w-4" />
                目标检测
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
            <TabsContent value="background">
              <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="border-b border-slate-700/50 pb-4">
                  <CardTitle className="text-slate-100">火灾救援中的视觉挑战</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-6">
                    {/* 上方文字区域 */}
                    <div className="space-y-6">
                      {/* 数据卡片 */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
                          <div className="text-2xl font-bold text-orange-500 mb-2">78%</div>
                          <div className="text-sm text-slate-300">火灾现场能见度小于5米占比</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
                          <div className="text-2xl font-bold text-orange-500 mb-2">320%</div>
                          <div className="text-sm text-slate-300">烟雾导致识别错误率提升</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
                          <div className="text-2xl font-bold text-orange-500 mb-2">42%</div>
                          <div className="text-sm text-slate-300">热成像盲区覆盖率</div>
                        </div>
                      </div>

                      {/* 说明文字 */}
                      <div className="space-y-4">
                        <p className="text-slate-100 leading-relaxed">
                          在火灾救援现场，浓烟和高温环境严重影响了救援人员的视觉能力。传统的可见光成像系统在烟雾环境下性能显著下降，导致目标识别困难，延误救援时机。
                        </p>
                        <p className="text-slate-100 leading-relaxed">
                          热成像技术虽然能够穿透烟雾，但在高温环境下存在盲区，且难以提供目标的细节信息。单一模态的视觉系统难以满足火灾救援的复杂需求。
                        </p>
                        <p className="text-slate-100 leading-relaxed">
                          因此，开发一个能够有效去除烟雾干扰，并融合可见光和红外双模态信息的智能视觉系统，对于提高火灾救援效率、保障救援人员安全具有重要的实际意义。
                        </p>
                      </div>
                    </div>

                    {/* 下方可视化区域 */}
                    <div className="h-[800px]">
                      <div className="relative h-full w-full overflow-hidden rounded-lg">
                        <div className="absolute inset-0 z-10">
                          <VideoPlayer
                            src="/videos/test1.mp4"
                            title="烟雾遮挡效果"
                            isComparison={true}
                            comparisonSrc="/videos/test2.mp4"
                          />
                        </div>
                        <canvas
                          ref={canvasRef}
                          className="absolute inset-0 w-full h-full"
                          style={{ zIndex: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="smoke">
              <SmokeRemovalModule />
            </TabsContent>

            <TabsContent value="detection">
              <div className="grid grid-cols-1 gap-6">
                {/* Top row - dual modal inputs with fusion indicator */}
                <div className="grid grid-cols-5 gap-6">
                  {/* Left side - Visible light video */}
                  <Card className="col-span-2 bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700/50 pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-slate-100 text-sm">可见光视频输入</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Sun className="h-4 w-4 text-slate-300" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="relative aspect-video bg-slate-900 rounded-md overflow-hidden">
                        <video src="/videos/visible-input.mp4" className="w-full h-full object-cover" loop autoPlay muted />
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">白平衡</span>
                          <span className="text-slate-300">自动</span>
                        </div>
                        <Slider
                          defaultValue={[65]}
                          max={100}
                          step={1}
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Middle - Fusion indicator */}
                  <Card className="col-span-1 bg-slate-800/30 border-slate-700/50 backdrop-blur-sm flex flex-col items-center justify-center">
                    <CardContent className="p-3 flex flex-col items-center justify-center h-full">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {/* Background circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#1e293b"
                            strokeWidth="10"
                          />
                          {/* Progress circle - 87% complete */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="10"
                            strokeDasharray="282.7"
                            strokeDashoffset="36.8" // 282.7 * (1 - 0.87)
                            transform="rotate(-90 50 50)"
                          />
                          {/* Gradient definition */}
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ff8a4c" />
                              <stop offset="100%" stopColor="#ff4c4c" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-3xl font-bold text-slate-100">87%</div>
                          <div className="text-xs text-slate-400">同步率</div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="text-sm font-medium text-slate-200">实时融合度</div>
                        <div className="text-xs text-slate-400 mt-1">数据流延迟: 12ms</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Right side - Thermal video */}
                  <Card className="col-span-2 bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700/50 pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-slate-100 text-sm">热成像视频输入</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Zap className="h-4 w-4 text-slate-300" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="relative aspect-video bg-slate-900 rounded-md overflow-hidden">
                        <video src="/videos/thermal-input.mp4" className="w-full h-full object-cover" loop autoPlay muted />
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">伪彩色</span>
                          <span className="text-slate-300">热力图</span>
                        </div>
                        <div className="mt-1 w-full h-6 rounded-md overflow-hidden bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 flex">
                          {['铁红', '彩虹', '热力图', '灰度'].map((label, i) => (
                            <div
                              key={i}
                              className={`flex-1 flex items-center justify-center text-[10px] font-medium ${i === 2 ? 'bg-slate-900/30 text-white' : 'text-slate-900'}`}
                            >
                              {label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bottom row - detection result and metrics */}
                <div className="grid grid-cols-4 gap-6">
                  {/* Left & middle - Fused detection result (larger size) */}
                  <Card className="col-span-2 bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700/50 pb-2">
                      <CardTitle className="text-slate-100 text-sm">融合目标检测结果</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="relative bg-slate-900 rounded-md overflow-hidden">
                        <div style={{ width: '100%', maxWidth: '100%', position: 'relative', paddingBottom: '60%' }}>
                          <video 
                            src="/videos/detection-output.mp4" 
                            className="absolute inset-0 w-full h-full object-cover" 
                            style={{ transform: 'scale(1.1)' }}
                            loop 
                            autoPlay 
                            muted 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Right side - Detection metrics */}
                  <Card className="col-span-2 bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-slate-700/50 pb-2">
                      <CardTitle className="text-slate-100 text-sm">智能分析</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <MetricCard
                          title="人员检测"
                          value={3}
                          icon={Activity}
                          trend="stable"
                          color="blue"
                          detail="救援人员 2 名，被困人员 1 名"
                          unit="人"
                        />
                        <MetricCard
                          title="设备检测"
                          value={5}
                          icon={Cpu}
                          trend="up"
                          color="purple"
                          detail="救援装备 3 件，环境设备 2 件"
                          unit="件"
                        />
                        <MetricCard
                          title="火源检测"
                          value={2}
                          icon={Flame}
                          trend="down"
                          color="orange"
                          detail="主火源 1 处，余火 1 处"
                          unit="处"
                        />
                      </div>

                      {/* Detection confidence */}
                      <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-slate-300">置信度分布</div>
                          <div className="text-xs text-slate-400">平均: 86.4%</div>
                        </div>
                        <div className="h-20 w-full" style={{ position: 'relative' }}>
                          {/* Simulated confidence chart */}
                          <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                            {Array.from({ length: 12 }).map((_, i) => {
                              // Simulate different heights for the bars
                              const heights = [65, 72, 83, 90, 96, 88, 77, 92, 85, 79, 94, 87];
                              return (
                                <div
                                  key={i}
                                  className="flex-1 mx-0.5 bg-gradient-to-t from-orange-500 to-red-500 rounded-t-sm"
                                  style={{ height: `${heights[i]}%` }}
                                />
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                          <div>人员</div>
                          <div>设备</div>
                          <div>火源</div>
                        </div>
                      </div>

                      {/* Alerts history */}
                      <div className="bg-slate-800/50 rounded-lg p-3 max-h-36 overflow-y-auto">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-slate-300">警报历史</div>
                          <div className="text-xs text-slate-400">实时更新</div>
                        </div>
                        <div className="space-y-2">
                          {[
                            { time: '12:42:15', message: '检测到新火源', level: 'error' },
                            { time: '12:41:03', message: '失去人员目标追踪', level: 'warning' },
                            { time: '12:40:55', message: '识别出被困人员', level: 'info' },
                            { time: '12:39:27', message: '融合精度下降', level: 'warning' },
                            { time: '12:38:10', message: '烟雾密度增加', level: 'info' }
                          ].map((alert, i) => (
                            <div key={i} className="flex items-center text-xs">
                              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                alert.level === 'error' ? 'bg-red-500' : 
                                alert.level === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                              }`} />
                              <div className="text-slate-400 w-16">{alert.time}</div>
                              <div className="text-slate-300">{alert.message}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  unit,
}: {
  title: string
  value: number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  unit: string
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
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
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {value} {unit}
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
    </div>
  )
}

// Performance chart component
function PerformanceChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">100%</div>
        <div className="text-xs text-slate-500">75%</div>
        <div className="text-xs text-slate-500">50%</div>
        <div className="text-xs text-slate-500">25%</div>
        <div className="text-xs text-slate-500">0%</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* Chart bars */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 24 }).map((_, i) => {
          const cpuHeight = Math.floor(Math.random() * 60) + 20
          const memHeight = Math.floor(Math.random() * 40) + 40
          const netHeight = Math.floor(Math.random() * 30) + 30

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                style={{ height: `${cpuHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                style={{ height: `${memHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                style={{ height: `${netHeight}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">00:00</div>
        <div className="text-xs text-slate-500">06:00</div>
        <div className="text-xs text-slate-500">12:00</div>
        <div className="text-xs text-slate-500">18:00</div>
        <div className="text-xs text-slate-500">24:00</div>
      </div>
    </div>
  )
}

// Process row component
function ProcessRow({
  pid,
  name,
  user,
  cpu,
  memory,
  status,
}: {
  pid: string
  name: string
  user: string
  cpu: number
  memory: number
  status: string
}) {
  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-1 text-slate-500">{pid}</div>
      <div className="col-span-4 text-slate-300">{name}</div>
      <div className="col-span-2 text-slate-400">{user}</div>
      <div className="col-span-2 text-cyan-400">{cpu}%</div>
      <div className="col-span-2 text-purple-400">{memory} MB</div>
      <div className="col-span-1">
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
          {status}
        </Badge>
      </div>
    </div>
  )
}

// Storage item component
function StorageItem({
  name,
  total,
  used,
  type,
}: {
  name: string
  total: number
  used: number
  type: string
}) {
  const percentage = Math.round((used / total) * 100)

  return (
    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">{name}</div>
        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
          {type}
        </Badge>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-slate-500">
            {used} GB / {total} GB
          </div>
          <div className="text-xs text-slate-400">{percentage}%</div>
        </div>
        <Progress value={percentage} className="h-1.5 bg-slate-700">
          <div
            className={`h-full rounded-full ${
              percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-amber-500" : "bg-cyan-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="text-slate-500">Free: {total - used} GB</div>
        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-slate-400 hover:text-slate-100">
          Details
        </Button>
      </div>
    </div>
  )
}

// Alert item component
function AlertItem({
  title,
  time,
  description,
  type,
}: {
  title: string
  time: string
  description: string
  type: "info" | "warning" | "error" | "success" | "update"
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "info":
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      case "warning":
        return { icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      case "error":
        return { icon: AlertCircle, color: "text-red-500 bg-red-500/10 border-red-500/30" }
      case "success":
        return { icon: Check, color: "text-green-500 bg-green-500/10 border-green-500/30" }
      case "update":
        return { icon: Download, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30" }
      default:
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
    }
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div className="text-sm font-medium text-slate-200">{title}</div>
          <div className="ml-2 text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
    </div>
  )
}

// Communication item component
function CommunicationItem({
  sender,
  time,
  message,
  avatar,
  unread,
}: {
  sender: string
  time: string
  message: string
  avatar: string
  unread?: boolean
}) {
  return (
    <div className={`flex space-x-3 p-2 rounded-md ${unread ? "bg-slate-800/50 border border-slate-700/50" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt={sender} />
        <AvatarFallback className="bg-slate-700 text-cyan-500">{sender.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-200">{sender}</div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{message}</div>
      </div>
      {unread && (
        <div className="flex-shrink-0 self-center">
          <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
        </div>
      )}
    </div>
  )
}

// Action button component
function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-cyan-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}

// Add missing imports
function Info(props: React.ComponentProps<typeof AlertCircle>) {
  return <AlertCircle {...props} />
}

function Check(props: React.ComponentProps<typeof Shield>) {
  return <Shield {...props} />
}

