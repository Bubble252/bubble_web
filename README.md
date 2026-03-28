# RoboLearn — 轮足机器人研发教育平台

面向高校与高中生的轮足机器人控制与 AI 学习平台。

## 快速启动

### 1. 安装依赖

```bash
npm install
```

如果网络慢，使用国内镜像：
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

还需要额外安装 NextAuth 的 Prisma 适配器：
```bash
npm install @auth/prisma-adapter
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 设置你的 PostgreSQL 连接和 NextAuth 密钥
```

### 3. 初始化数据库

```bash
# 确保 PostgreSQL 在运行
npx prisma db push
npx prisma generate
```

### 4. 填充测试数据

```bash
npm run db:seed
```

测试账号：
- 管理员：`admin@robolearn.cn` / `admin123`
- 学生：`student@test.com` / `student123`

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── courses/           # 课程系统
│   │   ├── page.tsx       # 课程列表
│   │   └── [id]/page.tsx  # 课程详情
│   ├── simulator/         # 在线仿真实验室
│   ├── challenges/        # 挑战赛 + 排行榜
│   ├── dashboard/         # 学生仪表盘
│   ├── auth/signin/       # 登录/注册
│   └── api/               # API 路由
│       ├── auth/          # NextAuth
│       └── register/      # 用户注册
├── components/
│   ├── layout/            # 布局组件（导航栏等）
│   ├── ui/                # 通用 UI 组件
│   └── simulator/         # 仿真相关组件
│       ├── RobotViewer.tsx  # 3D 轮足机器人查看器
│       └── CodeEditor.tsx   # Python 代码编辑器
├── lib/
│   ├── prisma.ts          # Prisma 客户端
│   ├── auth.ts            # NextAuth 配置
│   └── utils.ts           # 工具函数
prisma/
├── schema.prisma          # 数据库模型
└── seed.ts                # 测试数据
```

## 技术栈

- **框架**: Next.js 14 (App Router) + TypeScript
- **样式**: TailwindCSS
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js
- **3D**: Three.js + React Three Fiber
- **编辑器**: Monaco Editor
- **图标**: Lucide React
