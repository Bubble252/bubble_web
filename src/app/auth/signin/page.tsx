"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bot, LogIn, UserPlus, ArrowLeft, Mail, Lock, User, School } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    school: "",
    role: "STUDENT",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
          setLoading(false);
          return;
        }
        // 注册成功后自动登录
      }

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      {/* 背景 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">
              {mode === "login" ? "登录 RoboLearn" : "注册 RoboLearn"}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {mode === "login"
                ? "开始你的轮足机器人学习之旅"
                : "创建账号，免费开始学习"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <Input
                  id="name"
                  label="姓名"
                  placeholder="你的姓名"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
                <Input
                  id="school"
                  label="学校（选填）"
                  placeholder="所在学校"
                  value={form.school}
                  onChange={(e) =>
                    setForm({ ...form, school: e.target.value })
                  }
                />
                {/* 角色选择 */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-300">
                    我是
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: "STUDENT", label: "学生" },
                      { value: "TEACHER", label: "教师" },
                    ].map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() =>
                          setForm({ ...form, role: r.value })
                        }
                        className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          form.role === r.value
                            ? "border-brand-500 bg-brand-500/10 text-brand-300"
                            : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Input
              id="email"
              label="邮箱"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
            <Input
              id="password"
              label="密码"
              type="password"
              placeholder="至少 6 位"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                "处理中..."
              ) : mode === "login" ? (
                <>
                  <LogIn className="h-4 w-4" />
                  登录
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  注册
                </>
              )}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center text-sm text-gray-400">
            {mode === "login" ? (
              <>
                还没有账号？{" "}
                <button
                  onClick={() => {
                    setMode("register");
                    setError("");
                  }}
                  className="text-brand-400 hover:text-brand-300"
                >
                  立即注册
                </button>
              </>
            ) : (
              <>
                已有账号？{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className="text-brand-400 hover:text-brand-300"
                >
                  去登录
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
