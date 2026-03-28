import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/components/layout/AuthProvider";

export const metadata: Metadata = {
  title: "RoboLearn - 轮足机器人研发教育平台",
  description:
    "面向高校与高中生的轮足机器人控制与AI学习平台，在线仿真、实时编程、竞赛挑战",
  keywords: ["轮足机器人", "控制算法", "AI教育", "机器人仿真", "ROS2"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
