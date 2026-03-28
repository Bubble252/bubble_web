"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  Bot,
  BookOpen,
  Trophy,
  Play,
  LogIn,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/courses", label: "课程中心", icon: BookOpen },
  { href: "/simulator", label: "在线仿真", icon: Play },
  { href: "/challenges", label: "挑战赛", icon: Trophy },
];

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 group-hover:bg-brand-500 transition-colors">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold">
            Robo<span className="text-brand-400">Learn</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <User className="h-4 w-4" />
                {session.user?.name || "我的"}
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              登录
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-300"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0a] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-2 mt-2">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5"
                >
                  <User className="h-4 w-4" />
                  我的学习
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5 w-full"
                >
                  <LogOut className="h-4 w-4" />
                  退出登录
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg bg-brand-600 px-3 py-2.5 text-sm text-white"
              >
                <LogIn className="h-4 w-4" />
                登录 / 注册
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
