"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  BarChart3,
  Terminal,
  Maximize2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// 动态加载 3D 和代码编辑器组件（避免 SSR 问题）
const RobotViewer = dynamic(
  () => import("@/components/simulator/RobotViewer"),
  { ssr: false, loading: () => <ViewerPlaceholder /> }
);
const CodeEditor = dynamic(
  () => import("@/components/simulator/CodeEditor"),
  { ssr: false, loading: () => <EditorPlaceholder /> }
);

function ViewerPlaceholder() {
  return (
    <div className="h-full bg-[#0a0a1a] rounded-lg flex items-center justify-center">
      <div className="text-gray-600 text-sm">加载 3D 引擎...</div>
    </div>
  );
}

function EditorPlaceholder() {
  return (
    <div className="h-full bg-[#1e1e2e] rounded-lg flex items-center justify-center">
      <div className="text-gray-600 text-sm">加载编辑器...</div>
    </div>
  );
}

// 仿真输出日志
interface LogEntry {
  time: string;
  type: "info" | "success" | "error" | "data";
  message: string;
}

export default function SimulatorPage() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: "00:00", type: "info", message: "仿真环境已就绪" },
    { time: "00:00", type: "info", message: "机器人模型: wheel_leg_bot v1.0" },
    { time: "00:00", type: "info", message: "场景: flat_ground" },
    {
      time: "00:00",
      type: "info",
      message: '点击 "运行" 开始仿真...',
    },
  ]);
  const [activeTab, setActiveTab] = useState<"console" | "chart">("console");

  const handleRun = useCallback((code: string) => {
    setRunning(true);
    setLogs((prev) => [
      ...prev,
      { time: new Date().toLocaleTimeString(), type: "info", message: "编译代码..." },
      {
        time: new Date().toLocaleTimeString(),
        type: "success",
        message: "代码编译成功，开始仿真",
      },
    ]);

    // 模拟仿真运行
    const interval = setInterval(() => {
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          type: "data",
          message: `pos=(${(Math.random() * 5).toFixed(2)}, 0.00, 0.00) vel=${(Math.random() * 2).toFixed(2)} m/s`,
        },
      ]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setRunning(false);
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          type: "success",
          message: "仿真完成! 得分: 85/100",
        },
      ]);
    }, 5000);
  }, []);

  const handleReset = useCallback(() => {
    setRunning(false);
    setLogs([
      { time: "00:00", type: "info", message: "仿真环境已重置" },
    ]);
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0a0a0a] px-4 py-2">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold">在线仿真实验室</h1>
          <Badge variant="info">PID 直线行走</Badge>
          {running && (
            <Badge variant="success" className="animate-pulse">
              仿真中
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
            设置
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Left: 3D Viewer + Console */}
        <div className="flex-1 flex flex-col border-r border-white/10 min-w-0">
          {/* 3D Scene */}
          <div className="flex-1 relative min-h-0">
            <RobotViewer
              className="h-full w-full"
              animating={running}
            />

            {/* 仿真控制覆盖层 */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    running ? setRunning(false) : handleRun("")
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-500 transition-colors"
                >
                  {running ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">
                FPS: 60 | t=0.00s
              </div>
            </div>
          </div>

          {/* Console / Chart */}
          <div className="h-48 border-t border-white/10 flex flex-col">
            <div className="flex items-center border-b border-white/10 px-2">
              <button
                onClick={() => setActiveTab("console")}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs border-b-2 transition-colors ${
                  activeTab === "console"
                    ? "border-brand-500 text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                <Terminal className="h-3.5 w-3.5" />
                控制台
              </button>
              <button
                onClick={() => setActiveTab("chart")}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs border-b-2 transition-colors ${
                  activeTab === "chart"
                    ? "border-brand-500 text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                数据图表
              </button>
            </div>
            <div className="flex-1 overflow-auto p-3 font-mono text-xs bg-[#0a0a0a]">
              {activeTab === "console" ? (
                <div className="space-y-0.5">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-gray-600 shrink-0">
                        [{log.time}]
                      </span>
                      <span
                        className={
                          log.type === "error"
                            ? "text-red-400"
                            : log.type === "success"
                            ? "text-emerald-400"
                            : log.type === "data"
                            ? "text-cyan-400"
                            : "text-gray-400"
                        }
                      >
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-600">
                  运行仿真后显示数据图表
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="w-[45%] min-w-[400px] flex flex-col min-h-0">
          <CodeEditor
            className="h-full"
            onRun={handleRun}
            onReset={handleReset}
            running={running}
          />
        </div>
      </div>
    </div>
  );
}
