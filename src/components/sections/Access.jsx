import React from 'react';
import { Section, Container } from '../ui/Section';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

export const Access = () => {
  return (
    <Section id="access" background="gray">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Info Side */}
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <span className="block text-text-tertiary font-bold tracking-widest text-sm mb-4 font-en">ACCESS</span>
              <h2 className="text-3xl font-bold text-text-primary mb-6">アクセス</h2>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-soft border border-border-light space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-pale flex items-center justify-center shrink-0 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">所在地</h3>
                  <p className="text-text-secondary">
                    〒105-0011<br />
                    東京都港区芝公園4-2-8<br />
                    東京タワー付近ビル 3F
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-pale flex items-center justify-center shrink-0 text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">営業時間</h3>
                  <p className="text-text-secondary">
                    平日 10:00 〜 18:00<br />
                    <span className="text-xs text-text-tertiary">※土日祝日は定休日となります</span>
                  </p>
                </div>
              </div>

              {/* <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-pale flex items-center justify-center shrink-0 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">お問い合わせ</h3>
                  <p className="text-text-secondary">03-0000-0000</p>
                </div>
              </div> */}
            </div>

            {/* <Button variant="outlineWhite" className="w-full justify-center border-primary text-primary hover:bg-primary hover:text-white">
              Google Mapsで見る
            </Button> */}
          </div>

          {/* Map Side */}
          <div className="order-1 lg:order-2 h-full min-h-[400px] relative rounded-3xl overflow-hidden shadow-medium border border-border-light group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479754683745!2d139.74285797678074!3d35.65858047259461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bbd9009ec09%3A0x481a93f0d2a409dd!2z5p2x5Lqs44K_44Ov44O8!5e0!3m2!1sja!2sjp!4v1709623839211!5m2!1sja!2sjp" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '400px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-500"
            ></iframe>
            
            {/* Custom Overlay (Only visible when grayscale to create branding effect) */}
            <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
          </div>

        </div>
      </Container>
    </Section>
  );
};


