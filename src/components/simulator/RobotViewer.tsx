"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// 简化的轮足机器人模型（后续替换为 URDF 加载）
function WheelLegRobot({ animating = true }: { animating?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const legRefs = useRef<THREE.Mesh[]>([]);
  const wheelRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!animating || !groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // 机体轻微起伏
    groupRef.current.position.y = Math.sin(t * 2) * 0.02 + 0.45;

    // 腿部摆动
    legRefs.current.forEach((leg, i) => {
      if (leg) {
        const phase = i < 2 ? 0 : Math.PI; // 对角步态
        const offset = i % 2 === 0 ? 0 : Math.PI;
        leg.rotation.x = Math.sin(t * 3 + phase + offset) * 0.15;
      }
    });

    // 轮子旋转
    wheelRefs.current.forEach((wheel) => {
      if (wheel) {
        wheel.rotation.x += 0.05;
      }
    });
  });

  const bodyColor = "#4338ca";
  const legColor = "#6366f1";
  const wheelColor = "#1e1b4b";
  const accentColor = "#00ff88";

  // 腿的位置配置 [x, z]
  const legPositions = [
    [-0.25, 0.2], // 左前
    [0.25, 0.2], // 右前
    [-0.25, -0.2], // 左后
    [0.25, -0.2], // 右后
  ];

  return (
    <group ref={groupRef} position={[0, 0.45, 0]}>
      {/* 机体 */}
      <mesh castShadow>
        <boxGeometry args={[0.4, 0.12, 0.3]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* 顶部传感器模块 */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.15, 0.06, 0.15]} />
        <meshStandardMaterial color="#312e81" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 前方摄像头/LiDAR */}
      <mesh position={[0, 0.05, 0.17]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 状态指示灯 */}
      <mesh position={[0, 0.13, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={2}
        />
      </mesh>

      {/* 四条腿 + 轮子 */}
      {legPositions.map((pos, i) => (
        <group key={i} position={[pos[0], -0.06, pos[1]]}>
          {/* 上腿 */}
          <mesh
            ref={(el) => { if (el) legRefs.current[i] = el; }}
            castShadow
          >
            <boxGeometry args={[0.04, 0.2, 0.04]} />
            <meshStandardMaterial
              color={legColor}
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>

          {/* 下腿 */}
          <mesh position={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.03, 0.16, 0.03]} />
            <meshStandardMaterial
              color={legColor}
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>

          {/* 关节 */}
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial
              color="#818cf8"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* 轮子 */}
          <mesh
            ref={(el) => { if (el) wheelRefs.current[i] = el; }}
            position={[0, -0.28, 0]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.06, 0.06, 0.03, 24]} />
            <meshStandardMaterial
              color={wheelColor}
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>

          {/* 轮子轮廓线 */}
          <mesh
            position={[0, -0.28, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[0.06, 0.005, 8, 24]} />
            <meshStandardMaterial
              color="#4338ca"
              emissive="#4338ca"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Scene({ animating = true }: { animating?: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[1.2, 0.8, 1.2]} fov={45} />
      <OrbitControls
        enablePan={false}
        minDistance={1}
        maxDistance={4}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2 - 0.1}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* 光照 */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#818cf8" />

      {/* 地面网格 */}
      <Grid
        args={[10, 10]}
        cellSize={0.2}
        cellThickness={0.5}
        cellColor="#1e1b4b"
        sectionSize={1}
        sectionThickness={1}
        sectionColor="#312e81"
        fadeDistance={8}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />

      {/* 机器人 */}
      <WheelLegRobot animating={animating} />
    </>
  );
}

interface RobotViewerProps {
  className?: string;
  animating?: boolean;
}

export default function RobotViewer({
  className = "",
  animating = true,
}: RobotViewerProps) {
  return (
    <div className={`simulation-canvas ${className}`}>
      <Canvas shadows>
        <Scene animating={animating} />
      </Canvas>
    </div>
  );
}
