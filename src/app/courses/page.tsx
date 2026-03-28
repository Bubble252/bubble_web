import Link from "next/link";
import {
  BookOpen,
  Clock,
  Layers,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// Mock 数据 — 后续从数据库读取
const courses = [
  {
    id: "1",
    slug: "control-basics",
    title: "轮足机器人控制基础",
    description: "从运动学建模到 PID 控制，掌握轮足机器人的基础控制理论与实践",
    level: "BEGINNER" as const,
    category: "CONTROL" as const,
    coverImage: null,
    chapters: 5,
    lessons: 20,
    duration: "10小时",
    tags: ["PID", "运动学", "Python"],
  },
  {
    id: "2",
    slug: "advanced-control",
    title: "高级运动控制 — MPC 与自适应",
    description: "模型预测控制、轮腿模式切换、地形自适应控制策略",
    level: "INTERMEDIATE" as const,
    category: "CONTROL" as const,
    coverImage: null,
    chapters: 4,
    lessons: 16,
    duration: "12小时",
    tags: ["MPC", "状态空间", "最优控制"],
  },
  {
    id: "3",
    slug: "rl-locomotion",
    title: "强化学习运动控制",
    description: "用 PPO/SAC 训练轮足机器人行走、奔跑、爬坡的策略网络",
    level: "ADVANCED" as const,
    category: "RL" as const,
    coverImage: null,
    chapters: 6,
    lessons: 24,
    duration: "15小时",
    tags: ["PPO", "SAC", "Gymnasium", "PyTorch"],
  },
  {
    id: "4",
    slug: "ai-vision-nav",
    title: "AI 视觉与自主导航",
    description: "目标检测、深度估计、SLAM 建图与路径规划",
    level: "ADVANCED" as const,
    category: "AI_VISION" as const,
    coverImage: null,
    chapters: 5,
    lessons: 18,
    duration: "14小时",
    tags: ["YOLO", "SLAM", "ROS2", "导航"],
  },
  {
    id: "5",
    slug: "ros2-integration",
    title: "ROS2 机器人开发实战",
    description: "ROS2 节点编程、话题通信、动作服务器，完整机器人软件栈搭建",
    level: "INTERMEDIATE" as const,
    category: "ROS2" as const,
    coverImage: null,
    chapters: 6,
    lessons: 22,
    duration: "16小时",
    tags: ["ROS2", "C++", "Python", "通信"],
  },
  {
    id: "6",
    slug: "comprehensive-project",
    title: "综合项目：自主巡检机器人",
    description: "整合控制、感知、导航，打造一个完整的自主巡检轮足机器人系统",
    level: "EXPERT" as const,
    category: "COMPREHENSIVE" as const,
    coverImage: null,
    chapters: 8,
    lessons: 30,
    duration: "20小时",
    tags: ["综合", "项目制", "实战"],
  },
];

const levelConfig = {
  BEGINNER: { label: "入门", variant: "success" as const },
  INTERMEDIATE: { label: "进阶", variant: "info" as const },
  ADVANCED: { label: "高级", variant: "warning" as const },
  EXPERT: { label: "专家", variant: "danger" as const },
};

const categoryConfig: Record<string, string> = {
  CONTROL: "控制理论",
  AI_VISION: "AI视觉",
  SLAM_NAV: "SLAM导航",
  RL: "强化学习",
  ROS2: "ROS2",
  MECHANICAL: "机械设计",
  COMPREHENSIVE: "综合项目",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <BookOpen className="inline h-7 w-7 mr-2 text-brand-400" />
          课程中心
        </h1>
        <p className="mt-2 text-gray-400">
          系统化学习轮足机器人控制与 AI，从入门到精通
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="搜索课程..."
            className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["全部", "控制理论", "强化学习", "AI视觉", "ROS2", "综合项目"].map(
            (cat) => (
              <button
                key={cat}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="group rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-brand-500/40 hover:bg-white/[0.06] transition-all"
          >
            {/* Cover */}
            <div className="aspect-video bg-gradient-to-br from-brand-600/30 to-purple-600/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.1)_26%,rgba(99,102,241,0.1)_50%,transparent_51%,transparent_75%,rgba(99,102,241,0.1)_76%)] bg-[length:20px_20px]" />
              <BookOpen className="h-12 w-12 text-brand-400/50" />
              {/* Level Badge */}
              <div className="absolute top-3 right-3">
                <Badge variant={levelConfig[course.level].variant}>
                  {levelConfig[course.level].label}
                </Badge>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="text-xs text-gray-500 mb-1">
                {categoryConfig[course.category]}
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
                {course.title}
              </h3>
              <p className="mt-1.5 text-sm text-gray-400 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {course.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/5 px-2 py-0.5 text-xs text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5" />
                    {course.lessons} 节
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
