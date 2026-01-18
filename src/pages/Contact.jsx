import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import { Section, Container } from '../components/ui/Section';
import { Button } from '../components/ui/Button';

// Contact Form 7 のフォームID（WordPress管理画面で確認して設定）
const CF7_FORM_ID = '29'; // ← ここを実際のフォームIDに変更してください
const CF7_API_URL = `https://koutekiseido-japan.com/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`;

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

const ContactForm = () => {
  const [formData, setFormData] = useState({
    yourName: '',
    yourKana: '',
    yourEmail: '',
    yourSubject: '',
    yourMessage: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // FormDataオブジェクトを作成（Contact Form 7のフィールド名に合わせる）
    const form = new FormData();
    form.append('_wpcf7', CF7_FORM_ID);
    form.append('_wpcf7_version', '5.9.8');
    form.append('_wpcf7_locale', 'ja');
    form.append('_wpcf7_unit_tag', `wpcf7-f${CF7_FORM_ID}-o1`);
    form.append('your-name', formData.yourName);
    form.append('your-kana', formData.yourKana);
    form.append('your-email', formData.yourEmail);
    form.append('your-subject', formData.yourSubject);
    form.append('your-message', formData.yourMessage);

    try {
      const response = await fetch(CF7_API_URL, {
        method: 'POST',
        body: form,
      });

      const result = await response.json();

      if (result.status === 'mail_sent') {
        setStatus('success');
        setFormData({
          yourName: '',
          yourKana: '',
          yourEmail: '',
          yourSubject: '',
          yourMessage: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(result.message || '送信に失敗しました。');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('通信エラーが発生しました。');
    }
  };

  // 送信完了画面
  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-4">送信完了</h3>
        <p className="text-text-secondary mb-8">
          お問い合わせありがとうございます。<br />
          内容を確認の上、担当者よりご連絡いたします。
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-primary font-bold hover:underline"
        >
          新しいお問い合わせを送る
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">お名前 <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="yourName"
            value={formData.yourName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="山田 太郎"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-primary mb-2">フリガナ <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="yourKana"
            value={formData.yourKana}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="ヤマダ タロウ"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">メールアドレス <span className="text-red-500">*</span></label>
        <input
          type="email"
          name="yourEmail"
          value={formData.yourEmail}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">お問い合わせ種別 <span className="text-red-500">*</span></label>
        <select
          name="yourSubject"
          value={formData.yourSubject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
        >
          <option value="">選択してください</option>
          <option value="セミナーについて">セミナーについて</option>
          <option value="入会について">入会について</option>
          <option value="取材・講演依頼">取材・講演依頼</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-text-primary mb-2">お問い合わせ内容 <span className="text-red-500">*</span></label>
        <textarea
          name="yourMessage"
          value={formData.yourMessage}
          onChange={handleChange}
          required
          rows="6"
          className="w-full px-4 py-3 rounded-lg border border-border-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="ご自由にご記入ください"
        ></textarea>
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="text-center pt-4">
        <Button
          type="submit"
          variant="primary"
          className="w-full md:w-auto min-w-[200px]"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? '送信中...' : '送信する'}
        </Button>
      </div>
    </form>
  );
};

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




