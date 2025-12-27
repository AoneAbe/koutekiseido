import React from 'react';
import { Section, Container } from '../ui/Section';
import { Button } from '../ui/Button';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SeminarCard = ({ type, date, title, location, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ translateY: -6 }}
    className="bg-white rounded-2xl shadow-medium hover:shadow-large transition-all duration-300 p-6 flex flex-col h-full border border-transparent hover:border-border-medium"
  >
    <div className="flex justify-between items-start mb-4">
      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${type === 'Online' ? 'bg-cyan' : 'bg-emerald'}`}>
        {type === 'Online' ? 'オンライン' : 'オフライン'}
      </span>
      <span className="text-primary font-bold text-lg font-en">{date}</span>
    </div>
    
    <h3 className="text-xl font-bold text-text-primary mb-4 flex-grow line-clamp-2">{title}</h3>
    
    <div className="space-y-2 mb-6 text-sm text-text-secondary">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-text-tertiary" />
        <span>{location}</span>
      </div>
    </div>

    <a href="#" className="flex items-center text-primary font-bold text-sm group mt-auto">
      詳細を見る
      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
    </a>
  </motion.div>
);

export const Seminars = () => {
  const seminars = [
    {
      type: 'Online',
      date: '2025.10.15',
      title: 'はじめての社会保険制度：基礎から学ぶ安心の仕組み',
      location: 'Zoomウェビナー'
    },
    {
      type: 'Offline',
      date: '2025.10.22',
      title: '個人事業主のための確定申告準備セミナー',
      location: '東京都港区 協会セミナールーム'
    },
    {
      type: 'Online',
      date: '2025.11.05',
      title: '年末調整の実務ポイント解説【企業人事担当者向け】',
      location: 'Zoomウェビナー'
    }
  ];

  return (
    <Section id="seminar" background="gray" className="relative">
       {/* Decor Blob */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-100/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="block text-text-tertiary font-bold tracking-widest text-sm mb-4 font-en">UPCOMING EVENTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">開催予定のセミナー</h2>
          </div>
          <Button variant="ghost" href="#" className="hidden md:inline-flex group">
            すべてのセミナーを見る
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seminars.map((seminar, index) => (
            <SeminarCard key={index} {...seminar} delay={index * 0.1} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="ghost" href="#" className="group">
            すべてのセミナーを見る
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Container>
    </Section>
  );
};




