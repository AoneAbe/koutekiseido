import React, { useRef } from 'react';
import { Container } from '../ui/Section';
import { Button } from '../ui/Button';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// 循環と繋がりを表すリング
const ConnectingRings = (props) => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // 全体をゆっくり回転させる
    groupRef.current.rotation.x = Math.sin(t / 4) * 0.2;
    groupRef.current.rotation.y = t / 6;
  });

  return (
    <group ref={groupRef} {...props}>
      {/* リング1: 白いセラミック質感（循環） */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2, 0.3, 64, 128]} />
        <meshPhysicalMaterial 
          color="#FFFFFF"
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>

      {/* リング2: 交差するリング（繋がり） */}
      <mesh rotation={[-Math.PI / 3, Math.PI / 2, 0]}>
        <torusGeometry args={[1.5, 0.25, 64, 128]} />
        <meshPhysicalMaterial 
          color="#E0F2FE" // 非常に薄いブルー
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          reflectivity={1}
        />
      </mesh>
    </group>
  );
};

// 周囲を浮遊するパーティクル（透明性）
const FloatingParticles = () => {
  const count = 8;
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[0.15 + Math.random() * 0.2, 32, 32]} position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4
          ]}>
            <meshPhysicalMaterial 
              color="#BAE6FD"
              transparent
              opacity={0.6}
              roughness={0}
              metalness={0}
              transmission={0.5}
              thickness={2}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      
      {/* 明るいスタジオライティング */}
      <Environment preset="studio" />
      <ambientLight intensity={1} color="#ffffff" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#0ea5e9" />

      {/* オブジェクトを右側に寄せる (position={[2.5, 0, 0]}) */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[2.5, 0, 0]}>
          <ConnectingRings />
        </group>
      </Float>

      <FloatingParticles />

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.2} far={10} color="#0891B2" />
    </>
  );
};

export const Hero = () => {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex items-center bg-white overflow-hidden">
      
      {/* 3D Background / Visual Area - 全画面化 */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      {/* Background Gradients for blending */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-radial from-cyan-50/80 to-transparent blur-3xl opacity-50" />
      </div>

      <Container className="relative z-10 h-full pointer-events-none">
        <div className="grid lg:grid-cols-2 h-full items-center">
          
          {/* Text Content */}
          <div className="pointer-events-auto text-center lg:text-left pt-20 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-text-primary leading-[1.05] mb-6">
                知る人が、<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                  強くなる。
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-text-secondary text-lg md:text-xl font-medium max-w-[540px] mx-auto lg:mx-0 leading-relaxed mb-10"
            >
              納税・社会保険制度の理解は、あなたの人生を守る最強の盾になる。<br className="hidden lg:block"/>
              テクノロジーと教育の融合で、誰もが「社会の仕組み」を<br className="hidden lg:block"/>
              直感的に学べる未来へ。
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="primary" href='/contact' className="group shadow-glow text-lg px-8 py-4">
                協会加入はこちら
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" href="#about" className="text-lg px-8 py-4">
                協会について
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-primary gap-2 pointer-events-none"
      >
        <span className="text-xs font-bold tracking-[0.2em] font-en">SCROLL</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
};
