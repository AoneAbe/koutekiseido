import React from 'react';
import { Section, Container } from '../components/ui/Section';
import { motion } from 'framer-motion';

const PageHero = ({ title, subtitle }) => (
  <section className="relative h-[30vh] md:h-[40vh] bg-background-secondary flex items-center justify-center overflow-hidden">
     <div className="absolute inset-0 bg-gradient-radial from-cyan-50 to-transparent opacity-50" />
     <Container className="relative z-10 text-center">
       <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2 font-en">{title}</h1>
       <p className="text-text-secondary text-lg font-bold">{subtitle}</p>
     </Container>
  </section>
);

const Mission = () => (
  <Section background="white">
    <Container className="text-center max-w-4xl">
       <span className="block text-primary font-bold tracking-widest text-sm mb-6 font-en">MISSION</span>
       <h2 className="text-3xl md:text-5xl font-bold text-text-primary leading-tight mb-12">
         国民一人ひとりが<br />
         納税および社会保険制度に対する理解を深め、<br />
         適正な納付・制度活用を促進する
       </h2>
       <p className="text-text-secondary text-lg leading-relaxed">
         私たちは、このミッションの実現に向けて、<br className="hidden md:block" />
         公正で持続可能な社会基盤の構築に貢献し続けます。
       </p>
    </Container>
  </Section>
);

const Message = () => (
  <Section background="gray">
    <Container>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <span className="block text-text-tertiary font-bold mb-2">代表理事</span>
          <h2 className="text-3xl font-bold text-text-primary mb-6">澤 拓実</h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              現代社会において、公的制度の理解は単なる知識にとどまらず、自分自身と家族を守るための必須の教養となっています。
            </p>
            <p>
              しかし、制度の複雑さや情報の非対称性により、多くの人々が適切な恩恵を受けられていない現状があります。
              私たちは、教育と啓発を通じてこの課題に取り組み、誰もが安心して暮らせる社会の実現を目指します。
            </p>
          </div>
          <div className="mt-8 font-serif italic text-lg text-text-primary">
            Takumi Sawa
          </div>
        </div>
        <div className="order-1 md:order-2">
           <img 
             src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" 
             alt="澤 拓実" 
             className="w-full aspect-[3/4] md:aspect-square object-cover rounded-2xl shadow-large"
           />
        </div>
      </div>
    </Container>
  </Section>
);

const OfficerCard = ({ name, role, img, msg }) => (
  <div className="bg-white p-8 rounded-2xl border border-border-light shadow-soft text-center">
    <img src={img} alt={name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
    <p className="text-sm text-text-tertiary mb-1">{role}</p>
    <h3 className="text-xl font-bold text-text-primary mb-4">{name}</h3>
    <p className="text-sm text-text-secondary">{msg}</p>
  </div>
);

const Officers = () => (
  <Section background="white">
    <Container>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-primary">役員紹介</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <OfficerCard 
          role="代表理事" 
          name="澤 拓実" 
          img="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400"
          msg="公正な社会の実現に尽力します。"
        />
        <OfficerCard 
          role="理事" 
          name="齋藤 吟史" 
          img="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=400"
          msg="教育現場との架け橋となります。"
        />
        <OfficerCard 
          role="理事" 
          name="尾崎 由紀" 
          img="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400"
          msg="女性の視点から制度活用を提案します。"
        />
      </div>
    </Container>
  </Section>
);

const Organization = () => (
  <Section background="gray">
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

export const About = () => {
  return (
    <>
      <PageHero title="About Us" subtitle="協会について" />
      <Mission />
      <Message />
      <Officers />
      <Organization />
    </>
  );
};




