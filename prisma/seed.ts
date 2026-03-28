import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 创建管理员
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@robolearn.cn" },
    update: {},
    create: {
      name: "管理员",
      email: "admin@robolearn.cn",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  // 创建测试学生
  const studentPassword = await bcrypt.hash("student123", 12);
  const student = await prisma.user.upsert({
    where: { email: "student@test.com" },
    update: {},
    create: {
      name: "测试同学",
      email: "student@test.com",
      passwordHash: studentPassword,
      role: "STUDENT",
      school: "测试大学",
    },
  });

  // 创建课程: 轮足机器人控制基础
  const course1 = await prisma.course.upsert({
    where: { slug: "control-basics" },
    update: {},
    create: {
      title: "轮足机器人控制基础",
      slug: "control-basics",
      description:
        "从运动学建模到 PID 控制，掌握轮足机器人的基础控制理论与实践。本课程结合理论讲解和在线仿真实验，让你在浏览器中直接编写控制算法并观察机器人运动效果。",
      level: "BEGINNER",
      category: "CONTROL",
      published: true,
      tags: ["PID", "运动学", "Python", "入门"],
    },
  });

  // 创建章节和课节
  const ch1 = await prisma.chapter.create({
    data: {
      title: "第一章：轮足机器人概述",
      order: 1,
      courseId: course1.id,
      lessons: {
        create: [
          {
            title: "什么是轮足机器人",
            slug: "what-is-wheel-leg-robot",
            order: 1,
            type: "VIDEO",
            content: "# 什么是轮足机器人\n\n轮足机器人是结合了轮式和腿式运动方式的混合型机器人...",
            duration: 15,
          },
          {
            title: "轮足机器人的应用场景",
            slug: "applications",
            order: 2,
            type: "ARTICLE",
            content: "# 应用场景\n\n1. 野外巡检\n2. 灾后搜救\n3. 星球探索...",
            duration: 10,
          },
        ],
      },
    },
  });

  const ch2 = await prisma.chapter.create({
    data: {
      title: "第二章：PID 控制入门",
      order: 2,
      courseId: course1.id,
      lessons: {
        create: [
          {
            title: "PID 控制原理",
            slug: "pid-theory",
            order: 1,
            type: "VIDEO",
            content: "# PID 控制原理\n\nPID 控制器是最经典的反馈控制算法...",
            duration: 20,
          },
          {
            title: "实验：PID 控制直线行走",
            slug: "pid-straight-line",
            order: 2,
            type: "SIMULATION",
            content: "# PID 直线行走实验\n\n在本实验中，你需要编写 PID 控制器...",
            duration: 40,
          },
        ],
      },
    },
  });

  // 创建仿真配置
  const simLesson = await prisma.lesson.findFirst({
    where: { slug: "pid-straight-line" },
  });

  if (simLesson) {
    await prisma.simulationConfig.create({
      data: {
        lessonId: simLesson.id,
        robotModel: "wheel_leg_bot",
        scene: "flat_ground",
        objective: "使用 PID 控制器让机器人从原点直线行走到 x=5.0 的位置，误差不超过 0.1m",
        templateCode: `# PID 直线行走
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

target_x = 5.0
pid = PIDController(kp=2.0, ki=0.1, kd=0.5)

def control_step(robot, dt):
    x, y, z = robot.get_position()
    error = target_x - x
    output = pid.update(error, dt)
    output = max(-1.0, min(1.0, output))
    robot.set_wheel_speed(output, output)
    return {"position": x, "error": error, "output": output}
`,
        testCases: JSON.stringify([
          { name: "到达目标", condition: "abs(final_x - 5.0) < 0.1", points: 60 },
          { name: "稳定性", condition: "overshoot < 0.5", points: 20 },
          { name: "速度", condition: "time < 10", points: 20 },
        ]),
        timeLimit: 30,
      },
    });
  }

  // 创建挑战
  await prisma.challenge.create({
    data: {
      title: "直线冲刺",
      description: "控制轮足机器人以最快速度直线行走 10 米",
      scene: "flat_ground",
      objective: "以最短时间让机器人从原点移动到 x=10.0",
      templateCode: `# 直线冲刺挑战
def control_step(robot, dt):
    x, y, z = robot.get_position()
    # 在这里编写你的控制逻辑
    robot.set_wheel_speed(1.0, 1.0)
    return {"position": x}
`,
      difficulty: "BEGINNER",
      published: true,
    },
  });

  console.log("✅ Seed 数据创建成功!");
  console.log(`   管理员: admin@robolearn.cn / admin123`);
  console.log(`   学生: student@test.com / student123`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
