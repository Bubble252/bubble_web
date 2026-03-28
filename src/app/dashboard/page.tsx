"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Play,
  Trophy,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// Mock 数据
const enrolledCourses = [
  {
    title: "轮足机器人控制基础",
    progress: 35,
    lastLesson: "PID 控制原理",
    slug: "control-basics",
  },
  {
    title: "强化学习运动控制",
    progress: 10,
    lastLesson: "Gymnasium 环境介绍",
    slug: "rl-locomotion",
  },
];

const recentActivity = [
  { action: "完成课节", detail: "什么是轮足机器人", time: "2小时前" },
  { action: "提交代码", detail: "PID 直线行走实验", time: "昨天" },
  { action: "挑战排名", detail: "8字轨迹跟踪 - 第12名", time: "2天前" },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          欢迎回来, {session.user?.name || "同学"} 👋
        </h1>
        <p className="mt-1 text-gray-400">继续你的轮足机器人学习之旅</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          {
            icon: BookOpen,
            label: "在学课程",
            value: "2",
            color: "text-brand-400",
            bg: "bg-brand-500/10",
          },
          {
            icon: Clock,
            label: "学习时长",
            value: "12h",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            icon: Play,
            label: "仿真实验",
            value: "8",
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
          },
          {
            icon: Trophy,
            label: "挑战完成",
            value: "3",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">我的课程</h2>
            <Link
              href="/courses"
              className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1"
            >
              浏览更多 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {enrolledCourses.map((course) => (
            <Link key={course.slug} href={`/courses/${course.slug}`}>
              <Card hover className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{course.title}</h3>
                  <span className="text-sm text-brand-400">
                    {course.progress}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>上次学习: {course.lastLesson}</span>
                  <span className="flex items-center gap-1 text-brand-400">
                    继续学习 <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Link href="/simulator">
              <Card hover className="p-5 text-center">
                <Play className="h-8 w-8 mx-auto mb-2 text-cyber-green" />
                <div className="font-semibold text-sm">进入仿真</div>
                <div className="text-xs text-gray-500 mt-1">
                  在线实验室
                </div>
              </Card>
            </Link>
            <Link href="/challenges">
              <Card hover className="p-5 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                <div className="font-semibold text-sm">挑战赛</div>
                <div className="text-xs text-gray-500 mt-1">
                  排行榜竞技
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">最近动态</h2>
          <Card>
            <div className="divide-y divide-white/5">
              {recentActivity.map((activity, i) => (
                <div key={i} className="px-5 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{activity.action}</span>
                    <span className="text-xs text-gray-600">
                      {activity.time}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {activity.detail}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
