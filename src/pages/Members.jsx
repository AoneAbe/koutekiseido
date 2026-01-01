import React, { useRef } from 'react';
import { Container, Section } from '../components/ui/Section';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Sphere } from '@react-three/drei';

const PageHero = ({ title, subtitle }) => (
  <section className="relative h-[30vh] md:h-[40vh] bg-background-secondary flex items-center justify-center overflow-hidden">
     <div className="absolute inset-0 bg-gradient-radial from-cyan-50 to-transparent opacity-50" />
     <Container className="relative z-10 text-center">
       <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2 font-en">{title}</h1>
       <p className="text-text-secondary text-lg font-bold">{subtitle}</p>
     </Container>
  </section>
);

// 光沢のある3Dリングオブジェクト
const GlossyRings = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t / 3) * 0.3;
    groupRef.current.rotation.y = t / 5;
  });

  const glossyMaterial = {
    color: "#FFFFFF",
    roughness: 0.05,
    metalness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    reflectivity: 1,
  };

  return (
    <group ref={groupRef}>
      {/* メインリング */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.5, 0.35, 64, 128]} />
        <meshPhysicalMaterial {...glossyMaterial} />
      </mesh>

      {/* 交差するリング */}
      <mesh rotation={[-Math.PI / 3.5, Math.PI / 2.2, 0]}>
        <torusGeometry args={[2, 0.28, 64, 128]} />
        <meshPhysicalMaterial
          {...glossyMaterial}
          color="#E0F2FE"
          metalness={0.3}
        />
      </mesh>

      {/* 小さなリング */}
      <mesh rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[1.5, 0.22, 64, 128]} />
        <meshPhysicalMaterial
          {...glossyMaterial}
          color="#BAE6FD"
          metalness={0.25}
        />
      </mesh>

      {/* 中央の球体 */}
      <Sphere args={[0.5, 32, 32]}>
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          transmission={0.3}
          thickness={2}
        />
      </Sphere>
    </group>
  );
};

// 浮遊する小さな球体
const FloatingOrbs = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={1} floatIntensity={1.5}>
          <Sphere args={[0.15 + Math.random() * 0.15, 32, 32]} position={[
            (Math.random() - 0.5) * 7,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 3
          ]}>
            <meshPhysicalMaterial
              color={i % 2 === 0 ? "#BAE6FD" : "#FFFFFF"}
              transparent
              opacity={0.7}
              roughness={0}
              metalness={0}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
};

const MissionScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={45} />
      <Environment preset="studio" />
      <ambientLight intensity={1.2} color="#ffffff" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#0ea5e9" />

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <GlossyRings />
      </Float>

      <FloatingOrbs />
    </>
  );
};

// Mission - ミッションセクション
const Mission = () => (
  <section className="relative w-full flex items-center justify-center overflow-hidden bg-white">
    {/* 右側に3Dオブジェクトを配置 */}
    <div className="absolute right-0 md:right-[-10%] top-0 bottom-0 w-full md:w-2/3 flex items-center justify-end pointer-events-none">
      <div className="w-full h-full opacity-80">
        <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
          <MissionScene />
        </Canvas>
      </div>
    </div>

    {/* グラデーションオーバーレイ */}
    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />

    <Container className="relative z-10 text-center py-20 lg:py-32">
      <div className="max-w-5xl mx-auto">
        <span className="block font-bold tracking-widest text-sm mb-6 font-en">MISSION</span>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12 text-text-primary">
          国民一人ひとりが<br />
          納税および社会保険制度に対する理解を深め、<br />
          適正な納付・制度活用を促進する
        </h2>
        <p className="text-lg leading-relaxed text-text-primary">
          私たちは、このミッションの実現に向けて、<br className="hidden md:block" />
          公正で持続可能な社会基盤の構築に貢献し続けます。
        </p>
      </div>
    </Container>
  </section>
);

// BigProfile - 代表理事を大きく表示
const BigProfile = () => (
  <section id="BigProfile" className="relative w-full py-20 bg-white overflow-hidden">
    <Container>
      <div className="flex flex-wrap">
        {/* 左側50% - 画像 */}
        <div className="w-full md:w-1/2 px-4 md:px-8">
          <img
            src={`${import.meta.env.BASE_URL}shadanhouzin/boardmember/takumisawa.JPG`}
            alt="澤 拓実"
            className="w-full object-cover"
          />
        </div>

        {/* 右側25% - プロフィール情報 */}
        <div className="w-full md:w-1/4 px-4 md:px-8 pt-8 md:pt-28">
          <div className="mb-8 pb-8 border-b-2 border-text-primary">
            <div className="font-bold text-text-primary mb-2 font-en" style={{ fontSize: '90px', lineHeight: '1' }}>Takumi Sawa</div>
            <div className="text-text-tertiary mb-2" style={{ fontSize: '17px' }}>代表理事</div>
            <div className="font-bold text-text-primary" style={{ fontSize: '22px' }}>澤 拓実</div>
          </div>
          <div className="text-text-secondary leading-relaxed" style={{ fontSize: '15px' }}>
            <p>
              現代社会において、公的制度の理解は単なる知識にとどまらず、自分自身と家族を守るための必須の教養となっています。しかし、制度の複雑さや情報の非対称性により、多くの人々が適切な恩恵を受けられていない現状があります。私たちは、教育と啓発を通じてこの課題に取り組み、誰もが安心して暮らせる社会の実現を目指します。
            </p>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

// ProfileCard - 小さめのプロフィールカード
const ProfileCard = ({ nameEn, nameJp, role, img, description, paddingTop }) => (
  <div className="w-full md:w-1/3 px-4 md:px-8" style={{ paddingTop: paddingTop }}>
    <div
      className="w-full aspect-[3/4] bg-cover bg-center mb-4"
      style={{ backgroundImage: `url(${img})` }}
    />
    <div className="pb-4 mb-4 border-b-2 border-text-primary">
      <div className="font-bold text-text-primary mb-1 font-en" style={{ fontSize: '35px', lineHeight: '1.2' }}>{nameEn}</div>
      <div className="text-text-tertiary mb-2" style={{ fontSize: '12px' }}>{role}</div>
      <div className="font-bold text-text-primary" style={{ fontSize: '18px' }}>{nameJp}</div>
    </div>
    <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
  </div>
);

// ProfileHolder - 残りのメンバーを3カラムで表示
const ProfileHolder = () => (
  <section id="ProfileHolder" className="relative w-full py-20 bg-gray-50 overflow-hidden">
    <Container>
      <div className="flex flex-wrap">
        <ProfileCard
          nameEn="Ginji Saito"
          nameJp="齋藤 銀次"
          role="理事"
          img={`${import.meta.env.BASE_URL}shadanhouzin/boardmember/ginji_saito.JPG`}
          description="教育現場との架け橋となります。"
          paddingTop="3rem"
        />
        <ProfileCard
          nameEn="Yukinori Ozaki"
          nameJp="尾崎 幸紀"
          role="理事"
          img={`${import.meta.env.BASE_URL}shadanhouzin/boardmember/yukinoriozaki.JPG`}
          description="女性の視点から制度活用を提案します。"
          paddingTop="6rem"
        />
        <ProfileCard
          nameEn="Example Name"
          nameJp="例 太郎"
          role="理事"
          img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
          description="公正な社会の実現に尽力します。"
          paddingTop="1.5rem"
        />
      </div>
    </Container>
  </section>
);

const Organization = () => (
  <Section id="Organization" background="gray">
    <Container>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-primary">組織概要</h2>
      </div>
      <div className="bg-white rounded-2xl border border-border-light overflow-hidden max-w-3xl mx-auto">
        {[
          ['法人名', '一般社団法人 公的制度教育推進協会'],
          ['英語表記', 'Public Education & Social Security Awareness Association, JAPAN'],
          ['設立日', '2023年4月1日'],
          ['所在地', '東京都港区...'],
          ['代表理事', '澤 拓実'],
          ['事業内容', '1. 納税・社会保険に関する教育研修\n2. 啓発活動\n3. 教材制作\n4. 講師育成']
        ].map(([label, value], i) => (
          <div key={i} className="flex flex-col md:flex-row border-b border-border-light last:border-0 p-6 md:px-10">
            <div className="w-full md:w-1/3 font-bold text-text-primary mb-2 md:mb-0">{label}</div>
            <div className="w-full md:w-2/3 text-text-secondary whitespace-pre-wrap">{value}</div>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);

export const Members = () => {
  return (
    <>
      <PageHero title="Members" subtitle="役職員一覧" />
      <Mission />
      <BigProfile />
      <ProfileHolder />
      <Organization />
    </>
  );
};
