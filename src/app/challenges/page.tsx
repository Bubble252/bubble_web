import Link from "next/link";
import {
  Trophy,
  Clock,
  Users,
  Flame,
  ArrowRight,
  Medal,
  Target,
  Mountain,
  Navigation,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const challenges = [
  {
    id: "1",
    title: "直线冲刺",
    description: "控制轮足机器人以最快速度直线行走 10 米",
    difficulty: "入门",
    diffVariant: "success" as const,
    icon: Zap,
    participants: 128,
    topScore: "4.2s",
    status: "进行中",
  },
  {
    id: "2",
    title: "8字轨迹跟踪",
    description: "精确跟踪8字形轨迹，误差越小得分越高",
    difficulty: "入门",
    diffVariant: "success" as const,
    icon: Target,
    participants: 96,
    topScore: "95分",
    status: "进行中",
  },
  {
    id: "3",
    title: "斜坡征服者",
    description: "控制机器人爬上 30° 斜坡并安全抵达顶部",
    difficulty: "进阶",
    diffVariant: "info" as const,
    icon: Mountain,
    participants: 64,
    topScore: "8.7s",
    status: "进行中",
  },
  {
    id: "4",
    title: "障碍赛",
    description: "穿越包含台阶、沟壑、碎石的复杂地形",
    difficulty: "高级",
    diffVariant: "warning" as const,
    icon: Flame,
    participants: 42,
    topScore: "32.1s",
    status: "进行中",
  },
  {
    id: "5",
    title: "自主导航挑战",
    description: "在未知环境中自主探索并到达指定目标点",
    difficulty: "高级",
    diffVariant: "warning" as const,
    icon: Navigation,
    participants: 28,
    topScore: "87分",
    status: "即将开始",
  },
  {
    id: "6",
    title: "搜救机器人",
    description: "在模拟灾后环境中搜索并标记生存者位置",
    difficulty: "专家",
    diffVariant: "danger" as const,
    icon: Medal,
    participants: 0,
    topScore: "-",
    status: "即将开始",
  },
];

// Mock 排行榜
const leaderboard = [
  { rank: 1, name: "张同学", school: "清华大学", score: "4.2s", challenge: "直线冲刺" },
  { rank: 2, name: "李同学", school: "浙江大学", score: "4.5s", challenge: "直线冲刺" },
  { rank: 3, name: "王同学", school: "北京大学", score: "4.8s", challenge: "直线冲刺" },
  { rank: 4, name: "赵同学", school: "上海交大", score: "5.1s", challenge: "直线冲刺" },
  { rank: 5, name: "Chen", school: "深圳中学", score: "5.3s", challenge: "直线冲刺" },
];

export default function ChallengesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <Trophy className="inline h-7 w-7 mr-2 text-amber-400" />
          挑战赛
        </h1>
        <p className="mt-2 text-gray-400">
          用你的控制算法挑战各种任务，与全国高校/高中生竞技
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Challenge List */}
        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {challenges.map((ch) => (
              <Link
                key={ch.id}
                href={`/simulator?challenge=${ch.id}`}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-brand-500/40 hover:bg-white/[0.06] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                    <ch.icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={ch.diffVariant}>{ch.difficulty}</Badge>
                    {ch.status === "即将开始" && (
                      <Badge variant="default">即将开始</Badge>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-semibold group-hover:text-brand-300 transition-colors">
                  {ch.title}
                </h3>
                <p className="mt-1.5 text-sm text-gray-400 line-clamp-2">
                  {ch.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {ch.participants}人
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3.5 w-3.5" />
                      最佳: {ch.topScore}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Medal className="h-5 w-5 text-amber-400" />
            排行榜
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10">
              <select className="bg-transparent text-sm text-gray-300 focus:outline-none">
                <option>直线冲刺</option>
                <option>8字轨迹跟踪</option>
                <option>斜坡征服者</option>
              </select>
            </div>
            <div className="divide-y divide-white/5">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      entry.rank === 1
                        ? "bg-amber-500/20 text-amber-400"
                        : entry.rank === 2
                        ? "bg-gray-400/20 text-gray-300"
                        : entry.rank === 3
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {entry.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {entry.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {entry.school}
                    </div>
                  </div>
                  <div className="text-sm font-mono text-brand-400">
                    {entry.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
