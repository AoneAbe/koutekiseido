import React from 'react';
import { Section, Container } from '../ui/Section';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export const CTA = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-primary" />
      
      {/* Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white opacity-10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            あなたも、<br className="md:hidden" />
            学びの一歩を。
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-10">
            納税・社会保険の知識は、一生の財産になります。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button variant="white" href="#seminar" className="text-primary font-bold">
              無料セミナーに参加
            </Button> */}
            <Button variant="outlineWhite" href="/contact">
              協会加入のご相談はこちら
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};




