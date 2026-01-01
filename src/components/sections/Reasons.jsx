import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Section, Container } from '../ui/Section';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 陸地データに基づいて粒子を生成するコンポーネント
const DottedEarth = () => {
  const pointsRef = useRef();
  const [hoverPoint, setHoverPoint] = useState(null);
  
  // 地球のテクスチャ
  const earthMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');

  const { positions, colors, originalPositions } = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 50;
    const context = canvas.getContext('2d');
    context.drawImage(earthMap.image, 0, 0, canvas.width, canvas.height);
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const pos = [];
    const col = [];
    const origPos = [];
    
    const baseColor = new THREE.Color("#2563EB");

    const r = 2;
    for (let lat = 0; lat < canvas.height; lat++) {
      for (let lng = 0; lng < canvas.width; lng++) {
        const index = (lat * canvas.width + lng) * 4;
        const brightness = data[index];

        if (brightness > 50) {
          const phi = (90 - (lat / canvas.height) * 180 - 0.5) * (Math.PI / 180);
          const theta = ((lng / canvas.width) * 360 - 180) * (Math.PI / 180) + Math.PI;

          const x = -r * Math.cos(phi) * Math.cos(theta);
          const y = r * Math.sin(phi);
          const z = r * Math.cos(phi) * Math.sin(theta);

          pos.push(x, y, z);
          origPos.push(x, y, z);

          col.push(baseColor.r, baseColor.g, baseColor.b);
        }
      }
    }

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
      originalPositions: new Float32Array(origPos)
    };
  }, [earthMap]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    const colorsArray = pointsRef.current.geometry.attributes.color.array;
    
    // 自転
    pointsRef.current.rotation.y += 0.002;

    const interactionRadius = 0.8; // インタラクション半径
    const repelStrength = 1.5; // 反発の強さ

    if (hoverPoint) {
      // ワールド座標からローカル座標へ逆変換
      const localHoverPoint = hoverPoint.clone().applyMatrix4(pointsRef.current.matrixWorld.invert());

      for (let i = 0; i < positionsArray.length / 3; i++) {
        const px = positionsArray[i * 3];
        const py = positionsArray[i * 3 + 1];
        const pz = positionsArray[i * 3 + 2];

        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // オリジナルの位置とマウスとの距離
        const dx = ox - localHoverPoint.x;
        const dy = oy - localHoverPoint.y;
        const dz = oz - localHoverPoint.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < interactionRadius) {
          // 反発: マウスから遠ざかる方向ベクトル
          // 距離が近いほど強く反発
          const force = (1 - dist / interactionRadius) * repelStrength;
          
          // ランダムなノイズを加えて「崩れる」感じを出す
          const noiseX = (Math.random() - 0.5) * 0.1;
          const noiseY = (Math.random() - 0.5) * 0.1;
          const noiseZ = (Math.random() - 0.5) * 0.1;

          // ターゲット位置（反発先）へ移動
          const tx = ox + (dx / dist) * force + noiseX;
          const ty = oy + (dy / dist) * force + noiseY;
          const tz = oz + (dz / dist) * force + noiseZ;

          // 補間移動（Lerp）で滑らかに
          positionsArray[i * 3] += (tx - px) * 0.1;
          positionsArray[i * 3 + 1] += (ty - py) * 0.1;
          positionsArray[i * 3 + 2] += (tz - pz) * 0.1;

          // 色の変化（白く発光）
          colorsArray[i * 3] = 1.0;
          colorsArray[i * 3 + 1] = 1.0;
          colorsArray[i * 3 + 2] = 1.0;

        } else {
          // 範囲外なら元の位置に戻る（強いバネで戻る）
          const returnSpeed = 0.08;
          positionsArray[i * 3] += (ox - px) * returnSpeed;
          positionsArray[i * 3 + 1] += (oy - py) * returnSpeed;
          positionsArray[i * 3 + 2] += (oz - pz) * returnSpeed;

          // 色を戻す
          const baseR = 0.145; // #25
          const baseG = 0.388; // #63
          const baseB = 0.921; // #EB
          
          colorsArray[i * 3] += (baseR - colorsArray[i * 3]) * returnSpeed;
          colorsArray[i * 3 + 1] += (baseG - colorsArray[i * 3 + 1]) * returnSpeed;
          colorsArray[i * 3 + 2] += (baseB - colorsArray[i * 3 + 2]) * returnSpeed;
        }
      }
    } else {
      // ホバーしていないときは全てリセット
       for (let i = 0; i < positionsArray.length / 3; i++) {
         const px = positionsArray[i * 3];
         const py = positionsArray[i * 3 + 1];
         const pz = positionsArray[i * 3 + 2];
         
         const ox = originalPositions[i * 3];
         const oy = originalPositions[i * 3 + 1];
         const oz = originalPositions[i * 3 + 2];

         // 呼吸アニメーション
         const breath = 1 + Math.sin(time * 2 + ox) * 0.005;
         const targetX = ox * breath;
         const targetY = oy * breath;
         const targetZ = oz * breath;

         positionsArray[i * 3] += (targetX - px) * 0.05;
         positionsArray[i * 3 + 1] += (targetY - py) * 0.05;
         positionsArray[i * 3 + 2] += (targetZ - pz) * 0.05;
       }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <>
      <points 
        ref={pointsRef} 
        onPointerMove={(e) => setHoverPoint(e.point)}
        onPointerOut={() => setHoverPoint(null)}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06} // 少し大きくして見栄え良く
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Globe Core - Transparent White */}
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.05} />
      </mesh>
    </>
  );
};

const ReasonItem = ({ title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex gap-4"
  >
    <div className="shrink-0">
      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-md mt-1">
        <CheckCircle2 className="w-5 h-5" />
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const Scene = ({ isMobile }) => {
  // スマホでは小さく表示
  const objectScale = isMobile ? 0.6 : 0.8;

  return (
    <>
      <ambientLight intensity={1} />
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <React.Suspense fallback={null}>
          <group scale={objectScale}>
            <DottedEarth />
          </group>
        </React.Suspense>
      </Float>
    </>
  );
};

export const Reasons = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reasons = [
    {
      title: "専門家による監修",
      desc: "税理士・社労士など各分野の専門家が教材・講座を監修し、正確で最新の情報を提供します。"
    },
    {
      title: "実践的なカリキュラム",
      desc: "単なる知識の暗記ではなく、実生活や実務ですぐに役立つ「使える知識」を体系的に学べます。"
    },
    {
      title: "柔軟な学習スタイル",
      desc: "オンライン・オフライン、個人・企業向けなど、ライフスタイルやニーズに合わせた多様な受講形式を用意。"
    },
    {
      title: "継続的なサポート",
      desc: "受講後も最新の制度改正情報の提供や、追加コンテンツによるフォローアップで学びをサポートします。"
    }
  ];

  return (
    <Section id="reasons" background="white" className="relative overflow-hidden">
      {/* スマホでは背景として表示 */}
      {isMobile && (
        <div className="absolute inset-0 w-full h-full z-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
            <Scene isMobile={isMobile} />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 pointer-events-none" />
        </div>
      )}

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual Content (3D) - デスクトップのみ表示 */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1 h-[400px] md:h-[500px] w-full cursor-pointer"
            >
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                <Scene isMobile={isMobile} />
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI * 0.75} />
              </Canvas>

              {/* Background Decoration */}
              <div className="absolute inset-0 -z-10 bg-gradient-radial from-blue-50/50 to-transparent opacity-50" />
            </motion.div>
          )}

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <span className="block text-text-tertiary font-bold tracking-widest text-sm mb-4 font-en">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-10">選ばれる理由</h2>

            <div className="space-y-8">
              {reasons.map((reason, index) => (
                <ReasonItem key={index} {...reason} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
