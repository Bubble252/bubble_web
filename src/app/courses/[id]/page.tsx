import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Play,
  Code2,
  CheckCircle2,
  Circle,
  Lock,
  Trophy,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Mock 数据 — 后续改为从数据库/API 获取
const courseData = {
  title: "轮足机器人控制基础",
  description:
    "从运动学建模到 PID 控制，掌握轮足机器人的基础控制理论与实践。本课程结合理论讲解和在线仿真实验，让你在浏览器中直接编写控制算法并观察机器人运动效果。",
  level: "入门",
  duration: "10小时",
  lessons: 20,
  students: 256,
  chapters: [
    {
      title: "第一章：轮足机器人概述",
      lessons: [
        { title: "什么是轮足机器人", type: "VIDEO", duration: "15min", completed: true },
        { title: "轮足机器人的应用场景", type: "ARTICLE", duration: "10min", completed: true },
        { title: "平台环境搭建", type: "ARTICLE", duration: "20min", completed: false },
      ],
    },
    {
      title: "第二章：运动学基础",
      lessons: [
        { title: "坐标系与变换", type: "VIDEO", duration: "25min", completed: false },
        { title: "轮式运动学模型", type: "VIDEO", duration: "30min", completed: false },
        { title: "腿式运动学模型", type: "VIDEO", duration: "30min", completed: false },
        { title: "实验：正/逆运动学求解", type: "SIMULATION", duration: "45min", completed: false },
      ],
    },
    {
      title: "第三章：PID 控制入门",
      lessons: [
        { title: "PID 控制原理", type: "VIDEO", duration: "20min", completed: false },
        { title: "P/I/D 参数调节", type: "VIDEO", duration: "25min", completed: false },
        { title: "实验：PID 控制直线行走", type: "SIMULATION", duration: "40min", completed: false },
        { title: "实验：PID 控制转弯", type: "SIMULATION", duration: "40min", completed: false },
        { title: "挑战：8字轨迹跟踪", type: "CHALLENGE", duration: "30min", completed: false },
      ],
    },
    {
      title: "第四章：状态空间与线性控制",
      lessons: [
        { title: "状态空间表示", type: "VIDEO", duration: "25min", completed: false },
        { title: "LQR 控制器设计", type: "VIDEO", duration: "30min", completed: false },
        { title: "实验：LQR 平衡控制", type: "SIMULATION", duration: "45min", completed: false },
      ],
    },
    {
      title: "第五章：综合实验",
      lessons: [
        { title: "实验：平地高速行走", type: "SIMULATION", duration: "40min", completed: false },
        { title: "实验：轮腿模式切换", type: "SIMULATION", duration: "45min", completed: false },
        { title: "期末挑战：障碍赛", type: "CHALLENGE", duration: "60min", completed: false },
      ],
    },
  ],
};

const typeIcon: Record<string, typeof Play> = {
  VIDEO: Play,
  ARTICLE: BookOpen,
  SIMULATION: Code2,
  CHALLENGE: Trophy,
  QUIZ: CheckCircle2,
};

const typeLabel: Record<string, string> = {
  VIDEO: "视频",
  ARTICLE: "图文",
  SIMULATION: "仿真实验",
  CHALLENGE: "挑战",
  QUIZ: "测验",
};

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const totalLessons = courseData.chapters.reduce(
    (acc, ch) => acc + ch.lessons.length,
    0
  );
  const completedLessons = courseData.chapters.reduce(
    (acc, ch) => acc + ch.lessons.filter((l) => l.completed).length,
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Back */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        返回课程列表
      </Link>

      {/* Course Header */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="success">{courseData.level}</Badge>
            <Badge variant="info">控制理论</Badge>
          </div>
          <h1 className="text-3xl font-bold">{courseData.title}</h1>
          <p className="mt-3 text-gray-400 leading-relaxed">
            {courseData.description}
          </p>

          <div className="mt-5 flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {courseData.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {totalLessons} 节课
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {courseData.students} 人在学
            </span>
          </div>
        </div>

        {/* Sidebar Card */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="aspect-video rounded-lg bg-gradient-to-br from-brand-600/30 to-purple-600/20 flex items-center justify-center mb-4">
            <Play className="h-10 w-10 text-brand-400" />
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400">学习进度</span>
              <span className="text-white font-medium">
                {completedLessons}/{totalLessons}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{
                  width: `${(completedLessons / totalLessons) * 100}%`,
                }}
              />
            </div>
          </div>

          <Button className="w-full" size="lg">
            继续学习
          </Button>
        </div>
      </div>

      {/* Chapter List */}
      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-bold mb-4">课程目录</h2>
        {courseData.chapters.map((chapter, ci) => (
          <div
            key={ci}
            className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-semibold text-sm">{chapter.title}</h3>
              <span className="text-xs text-gray-500">
                {chapter.lessons.length} 节
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {chapter.lessons.map((lesson, li) => {
                const Icon = typeIcon[lesson.type] || Circle;
                return (
                  <div
                    key={li}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-600 shrink-0" />
                    )}
                    <Icon className="h-4 w-4 text-gray-500 shrink-0" />
                    <span className="flex-1 text-sm text-gray-300 group-hover:text-white transition-colors">
                      {lesson.title}
                    </span>
                    <span className="text-xs text-gray-600">
                      {typeLabel[lesson.type]}
                    </span>
                    <span className="text-xs text-gray-600">
                      {lesson.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
