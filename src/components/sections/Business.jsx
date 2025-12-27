import React, { useState } from 'react';
import { Section, Container } from '../ui/Section';
import { BookOpen, Building2, FileText, UserCheck, Smartphone, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const BusinessCard = ({ icon: Icon, title, desc, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-full"
    >
      {/* Background with Glassmorphism and Glow */}
      <div className={clsx(
        "absolute inset-0 rounded-2xl transition-all duration-500",
        isHovered ? "bg-gradient-primary opacity-5 blur-xl" : "opacity-0"
      )} />
      
      <div className="relative h-full bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
        {/* Numbering Background */}
        <span className="absolute top-4 right-6 text-6xl font-black text-gray-100/50 font-en select-none transition-colors group-hover:text-blue-50/80">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div className="relative z-10 w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Bottom Line Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
};

export const Business = () => {
  const items = [
    {
      icon: BookOpen,
      title: "教育研修・セミナー",
      desc: "個人・企業向けの実践的な講座を全国で開催。基礎から応用まで、ニーズに合わせたカリキュラムを提供します。"
    },
    {
      icon: Building2,
      title: "行政・企業連携",
      desc: "官民一体となった啓発活動を推進し、社会全体での意識向上を図ります。"
    },
    {
      icon: FileText,
      title: "教材・コンテンツ制作",
      desc: "わかりやすい教材・動画・出版物を制作し、学習のハードルを下げます。"
    },
    {
      icon: UserCheck,
      title: "講師育成・認定",
      desc: "質の高い専門講師を育成し、全国どこでも均質な教育を提供します。"
    },
    {
      icon: Smartphone,
      title: "デジタル学習",
      desc: "いつでもどこでも学べるオンラインプログラムとアプリの開発。"
    },
    {
      icon: Briefcase,
      title: "コンサルティング",
      desc: "企業・団体への専門的なアドバイスを行い、制度活用の最適化を支援。"
    }
  ];

  return (
    <Section id="business" background="gray">
      <Container>
        <div className="mb-16 text-center md:text-left relative z-10">
          <span className="block text-text-tertiary font-bold tracking-widest text-sm mb-4 font-en">WHAT WE DO</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">私たちの事業</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {items.map((item, index) => (
            <BusinessCard key={index} {...item} index={index} />
          ))}
        </div>
      </Container>
      
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 overflow-hidden pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-float-slow" />
           <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-100/40 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-float-slow animation-delay-2000" />
      </div>
    </Section>
  );
};
