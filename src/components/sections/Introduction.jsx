import React, { useRef } from 'react';
import { Section, Container } from '../ui/Section';
import { ShieldCheck, Monitor, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';

// 圧倒的なスケールの幾何学構造
const ArchitecturalStructure = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // 巨大な構造物がゆっくりと旋回する
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.z = Math.sin(t * 0.05) * 0.05;
  });

  const materialProps = {
    color: "#ffffff",
    roughness: 0.1, // ツルッとした未来的な質感
    metalness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  };

  return (
    <group ref={groupRef} rotation={[0.5, 0, 0]}>
      {/* 巨大なメインリング */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.5, 0.4, 64, 256]} />
        <meshPhysicalMaterial {...materialProps} />
      </mesh>

      {/* 交差するリング */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.2, 64, 256]} />
        <meshPhysicalMaterial {...materialProps} color="#e0f2fe" />
      </mesh>

      {/* 中心に浮遊する抽象核 */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial 
            color="#2563EB" 
            roughness={0.2} 
            metalness={0.8}
            emissive="#2563EB"
            emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
      
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <ArchitecturalStructure />
      </Float>
    </>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-white border border-blue-100 flex items-center justify-center mb-6 shadow-sm">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-xl font-bold text-text-primary mb-3 font-en">{title}</h3>
    <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export const Introduction = () => {
  return (
    <section id="about" className="relative w-full py-20 lg:py-32 overflow-hidden bg-gray-50">
      
      {/* 3D Background Layer - 全画面に配置して「枠」をなくす */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* 右側に寄せて配置 */}
        <div className="absolute top-0 right-[-20%] w-[140%] h-full opacity-60 pointer-events-none md:opacity-100 md:w-full md:right-[-25%]">
            <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
              <Scene />
            </Canvas>
        </div>
        {/* グラデーションオーバーレイで馴染ませる */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent pointer-events-none" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="block text-primary font-bold tracking-widest text-sm mb-4 font-en">ABOUT US</span>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-8 leading-tight tracking-tight">
              社会の「仕組み」を<br />
              デザインする。
            </h2>
            <div className="space-y-6 text-text-secondary leading-relaxed text-lg font-medium">
              <p>
                日本が誇る社会保障制度。その複雑なメカニズムを、
                私たちはテクノロジーとデザインの力で解き明かします。
              </p>
              <p>
                「わからない」を「武器」に変える。
                誰もが公正に制度を活用できる、透明な社会インフラを構築することが、
                私たちの使命です。
              </p>
            </div>
          </motion.div>
          
          {/* 右側は3D背景が見えるように空けておく */}
          <div className="hidden lg:block" />
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <FeatureCard 
            icon={ShieldCheck}
            title="専門家"
            desc="第一線で活躍する専門家監修による、信頼と実績のカリキュラム。"
            delay={0.2}
          />
          <FeatureCard 
            icon={Monitor}
            title="技術力"
            desc="AIとデータ解析を活用した、最適化された学習体験の提供。"
            delay={0.3}
          />
          <FeatureCard 
            icon={Users}
            title="ネットワーク"
            desc="産官学の強力な連携による、持続可能な教育エコシステム。"
            delay={0.4}
          />
        </div>
      </Container>
    </section>
  );
};
