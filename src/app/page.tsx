import Link from "next/link";
import {
  Bot,
  BookOpen,
  Play,
  Trophy,
  Code2,
  Cpu,
  ArrowRight,
  GraduationCap,
  Zap,
  Eye,
  Gamepad2,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "体系化课程",
    desc: "从 PID 控制到强化学习，循序渐进的轮足机器人课程体系",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
  },
  {
    icon: Play,
    title: "在线仿真",
    desc: "浏览器内 3D 物理仿真，实时观察轮足机器人运动效果",
    color: "text-cyber-green",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Code2,
    title: "在线编程",
    desc: "内置 Python 编辑器，编写控制算法即刻运行验证",
    color: "text-cyber-blue",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Trophy,
    title: "竞赛挑战",
    desc: "过斜坡、越障碍、自主导航，排行榜实时对战",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Eye,
    title: "AI 视觉",
    desc: "集成视觉感知、目标检测、SLAM 导航等 AI 能力",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Gamepad2,
    title: "实机对接",
    desc: "仿真验证后一键导出代码，部署到真实轮足机器人",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
];

const levels = [
  {
    level: "Level 1",
    title: "基础控制",
    topics: ["运动学建模", "PID 控制", "状态空间", "直线行走"],
    color: "border-emerald-500/50",
    tag: "入门",
    tagColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    level: "Level 2",
    title: "进阶控制",
    topics: ["MPC 预测控制", "轮腿切换", "地形自适应", "爬坡过坎"],
    color: "border-brand-500/50",
    tag: "进阶",
    tagColor: "bg-brand-500/10 text-brand-400",
  },
  {
    level: "Level 3",
    title: "AI 与自主",
    topics: ["强化学习(PPO/SAC)", "视觉感知", "SLAM 导航", "自主探索"],
    color: "border-purple-500/50",
    tag: "高级",
    tagColor: "bg-purple-500/10 text-purple-400",
  },
  {
    level: "Level 4",
    title: "综合挑战",
    topics: ["竞赛任务", "搜救场景", "多机协同", "开放课题"],
    color: "border-amber-500/50",
    tag: "专家",
    tagColor: "bg-amber-500/10 text-amber-400",
  },
];

const stats = [
  { value: "4", label: "课程等级" },
  { value: "20+", label: "仿真场景" },
  { value: "50+", label: "编程挑战" },
  { value: "∞", label: "学习可能" },
];

export default function HomePage() {
  return (
    <div className="grid-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-brand-600/20 blur-[120px]" />
          <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-cyber-green/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="text-center">
            {/* 标签 */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
              <Zap className="h-3.5 w-3.5" />
              面向高校与高中生的轮足机器人教育
            </div>

            {/* 标题 */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">学会控制</span>
              <span className="gradient-text block mt-2">轮足机器人</span>
            </h1>

            {/* 副标题 */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
              从 PID 到强化学习，从仿真到实机。在线编写控制算法，
              <br className="hidden sm:block" />
              实时 3D 仿真验证，挑战排行榜竞技。
            </p>

            {/* CTA */}
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white hover:bg-brand-500 transition-all hover:scale-105 shadow-lg shadow-brand-600/25"
              >
                开始学习
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/simulator"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all"
              >
                <Play className="h-4 w-4" />
                体验仿真
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-lg mx-auto sm:max-w-2xl">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            为什么选择 <span className="text-brand-400">RoboLearn</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl mx-auto">
            一站式轮足机器人学习平台，理论与实践无缝衔接
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 hover:bg-white/[0.06] transition-all"
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${f.bg}`}
              >
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Path */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <GraduationCap className="inline h-8 w-8 mr-2 text-brand-400" />
            学习路径
          </h2>
          <p className="mt-3 text-gray-400">
            四个等级，从零基础到独立研发
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((l) => (
            <div
              key={l.level}
              className={`rounded-xl border ${l.color} bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-all`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-gray-500">
                  {l.level}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${l.tagColor}`}
                >
                  {l.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-3">{l.title}</h3>
              <ul className="space-y-1.5">
                {l.topics.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1 w-1 rounded-full bg-gray-600" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-600/20 to-purple-600/10 p-8 sm:p-12 text-center">
          <div className="absolute inset-0">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-500/10 blur-[80px]" />
          </div>
          <div className="relative">
            <Bot className="mx-auto h-12 w-12 text-brand-400 mb-4" />
            <h2 className="text-2xl font-bold sm:text-3xl">
              开始你的轮足机器人之旅
            </h2>
            <p className="mt-3 text-gray-400 max-w-md mx-auto">
              免费注册，立即体验在线仿真和编程实验
            </p>
            <Link
              href="/auth/signin"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-base font-semibold text-white hover:bg-brand-500 transition-all hover:scale-105 shadow-lg shadow-brand-600/25"
            >
              免费注册
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-brand-400" />
            <span className="text-sm text-gray-500">
              RoboLearn © 2026 轮足机器人研发教育平台
            </span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-white transition-colors">
              关于我们
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              联系我们
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
