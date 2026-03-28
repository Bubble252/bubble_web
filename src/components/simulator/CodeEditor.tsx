"use client";

import { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const DEFAULT_CODE = `# 轮足机器人控制 - PID 示例
# robot 对象提供以下 API:
#   robot.get_position() -> (x, y, z)
#   robot.get_velocity() -> (vx, vy, vz)
#   robot.get_orientation() -> (roll, pitch, yaw)
#   robot.set_wheel_speed(left, right)  # -1.0 ~ 1.0
#   robot.set_leg_angle(leg_id, angle)  # 弧度
#   robot.get_time() -> float  # 仿真时间

class PIDController:
    def __init__(self, kp=1.0, ki=0.0, kd=0.0):
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.prev_error = 0
        self.integral = 0
    
    def update(self, error, dt):
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt if dt > 0 else 0
        output = self.kp * error + self.ki * self.integral + self.kd * derivative
        self.prev_error = error
        return output

# === 在这里编写你的控制逻辑 ===

# 目标：让机器人直线行走到 x=5.0 的位置
target_x = 5.0
pid = PIDController(kp=2.0, ki=0.1, kd=0.5)

def control_step(robot, dt):
    """每个仿真时间步调用一次"""
    x, y, z = robot.get_position()
    
    # 计算误差
    error = target_x - x
    
    # PID 计算
    output = pid.update(error, dt)
    
    # 限制输出范围
    output = max(-1.0, min(1.0, output))
    
    # 设置轮速
    robot.set_wheel_speed(output, output)
    
    # 返回当前状态用于可视化
    return {
        "position": x,
        "error": error,
        "output": output,
    }
`;

interface CodeEditorProps {
  initialCode?: string;
  onRun?: (code: string) => void;
  onReset?: () => void;
  running?: boolean;
  className?: string;
}

export default function CodeEditor({
  initialCode = DEFAULT_CODE,
  onRun,
  onReset,
  running = false,
  className = "",
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  const handleRun = useCallback(() => {
    onRun?.(code);
  }, [code, onRun]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    onReset?.();
  }, [initialCode, onReset]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className={`code-editor-container flex flex-col ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#1e1e2e] px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <span className="ml-2 text-xs text-gray-500 font-mono">
            control.py
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-500 hover:text-white transition-colors"
            title="复制代码"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-3.5 w-3.5" />
            重置
          </Button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={running}
            className={running ? "animate-pulse" : ""}
          >
            <Play className="h-3.5 w-3.5" />
            {running ? "运行中..." : "运行"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-[400px]">
        <Editor
          height="100%"
          language="python"
          theme="vs-dark"
          value={code}
          onChange={(val) => setCode(val || "")}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 12 },
            lineNumbers: "on",
            wordWrap: "on",
            tabSize: 4,
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>
    </div>
  );
}
