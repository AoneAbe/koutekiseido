import React from 'react';
import { Container } from '../ui/Section';
import { Logo } from '../ui/Logo';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ href, children, className }) => {
  const isHash = href.startsWith('#');
  const isHome = useLocation().pathname === '/';

  const target = isHash && !isHome ? `/${href}` : href;
  const Component = isHash && isHome ? 'a' : Link;
  const props = isHash && isHome ? { href } : { to: target };

  return (
    <Component {...props} className={className}>
      {children}
    </Component>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-text-primary text-white pt-16 pb-8 relative z-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_0.9fr_0.9fr_0.9fr_1.5fr] gap-8 lg:gap-2 mb-12">
          {/* Column 1: Info */}
          <div className="space-y-6 lg:pr-8 lg:mr-4">
            <Link to="/">
              <Logo className="text-white" textClassName="text-white" src={`${import.meta.env.BASE_URL}shadanhouzin/logo-09.svg`} />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              国民一人ひとりが納税および社会保険制度に対する理解を深め、
              適正な納付・制度活用を促進する社会の実現を目指しています。
            </p>
            {/* <div className="flex gap-4">
              {[Twitter, Facebook, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Column 2: Home */}
          <div>
            <NavLink href="/" className="font-bold text-lg mb-6 block hover:text-primary transition-colors">Home</NavLink>
            <ul className="space-y-4">
              <li><NavLink href="/#about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />私たちについて</NavLink></li>
              <li><NavLink href="/#business" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />サービス</NavLink></li>
              <li><NavLink href="/#reasons" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />選ばれる理由</NavLink></li>
              <li><NavLink href="/#news" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />お知らせ</NavLink></li>
              <li><NavLink href="/#access" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />アクセス</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Members */}
          <div>
            <NavLink href="/members" className="font-bold text-lg mb-6 block hover:text-primary transition-colors">Members</NavLink>
            <ul className="space-y-4">
              <li><NavLink href="/members" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />ミッション</NavLink></li>
              <li><NavLink href="/members#BigProfile" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />代表理事</NavLink></li>
              <li><NavLink href="/members#Organization" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />組織概要</NavLink></li>
            </ul>
          </div>

          {/* Column 4: Info */}
          <div>
            <NavLink href="/info" className="font-bold text-lg mb-6 block hover:text-primary transition-colors">Info</NavLink>
            <ul className="space-y-4">
              <li><NavLink href="/info" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />お知らせ一覧</NavLink></li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <NavLink href="/contact" className="font-bold text-lg mb-6 block hover:text-primary transition-colors">お問い合わせ</NavLink>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-1 text-primary shrink-0" />
                <span>〒105-0011<br />東京都港区芝公園4-2-8</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="break-all">support@koutekiseido-japan.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} P.E.S.A - Public Education & Social Awareness Association, JAPAN. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
