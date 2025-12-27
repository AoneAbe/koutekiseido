import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import { Section, Container } from '../components/ui/Section';
import { Button } from '../components/ui/Button';

const PageHero = ({ title, subtitle }) => (
  <section className="relative h-[30vh] bg-background-secondary flex items-center justify-center overflow-hidden">
     <div className="absolute inset-0 bg-gradient-radial from-cyan-50 to-transparent opacity-50" />
     <Container className="relative z-10 text-center">
       <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 font-en">{title}</h1>
       <p className="text-text-secondary font-bold">{subtitle}</p>
     </Container>
  </section>
);

// 入れ子構造のドーナツ型オブジェクト
const NestedRings = () => {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 全体をゆっくり回転
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t / 4) * 0.2;
      groupRef.current.rotation.y = t / 6;
    }

    // 各リングを個別に回転
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t / 3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t / 4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t / 2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 外側のリング（一番大きい） */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2, 0.3, 64, 128]} />
        <meshPhysicalMaterial
          color="#0891b2"
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>

      {/* 中間のリング */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 2, 0]}>
        <torusGeometry args={[1.5, 0.25, 64, 128]} />
        <meshPhysicalMaterial
          color="#BAE6FD"
          roughness={0.1}
          metalness={0.3}
          clearcoat={1}
          reflectivity={1}
        />
      </mesh>

      {/* 中心のオブジェクト（球体） */}
      <mesh ref={ring3Ref}>
        <Sphere args={[0.5, 32, 32]}>
          <meshPhysicalMaterial
            color="#E0F2FE"
            roughness={0.05}
            metalness={0.1}
            clearcoat={1}
            transmission={0.3}
            thickness={1}
          />
        </Sphere>
      </mesh>
    </group>
  );
};

// 3D背景シーン
const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={1} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#0ea5e9" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <NestedRings />
      </Float>
    </>
  );
};

const ContactForm = () => (
  <form className="space-y-6">
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">お名前 <span className="text-red-500">*</span></label>
        <input type="text" className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="山田 太郎" />
      </div>
      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">フリガナ <span className="text-red-500">*</span></label>
        <input type="text" className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="ヤマダ タロウ" />
      </div>
    </div>
    
    <div>
      <label className="block text-sm font-bold text-text-primary mb-2">メールアドレス <span className="text-red-500">*</span></label>
      <input type="email" className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="example@email.com" />
    </div>

    <div>
      <label className="block text-sm font-bold text-text-primary mb-2">お問い合わせ種別 <span className="text-red-500">*</span></label>
      <select className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white">
        <option>選択してください</option>
        <option>セミナーについて</option>
        <option>入会について</option>
        <option>取材・講演依頼</option>
        <option>その他</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-bold text-text-primary mb-2">お問い合わせ内容 <span className="text-red-500">*</span></label>
      <textarea rows="6" className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="ご自由にご記入ください"></textarea>
    </div>

    <div className="text-center pt-4">
      <Button variant="primary" className="w-full md:w-auto min-w-[200px]">
        送信する
      </Button>
    </div>
  </form>
);

export const Contact = () => {
  return (
    <>
      <PageHero title="Contact" subtitle="お問い合わせ" />
      <Section background="white" className="relative overflow-hidden">
        {/* 3D背景 - 左側（スクロールで消える） */}
        <div className="absolute left-0 top-20 w-1/3 h-96 pointer-events-none hidden lg:block z-0">
          <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }}>
            <Scene3D />
          </Canvas>
        </div>

        {/* グラデーション背景 */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-cyan-50/40 to-transparent blur-3xl opacity-50" />
        </div>

        <Container className="relative z-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-text-secondary leading-relaxed">
                セミナーや協会に関するご質問、取材のご依頼など、<br />
                お気軽にお問い合わせください。
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-large border border-border-light p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};




