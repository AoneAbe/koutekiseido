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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Info */}
          <div className="space-y-6">
            <Link to="/">
              <Logo className="text-white" textClassName="text-white" />
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

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">コンテンツ</h3>
            <ul className="space-y-4">
              <li><NavLink href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />ホーム</NavLink></li>
              <li><NavLink href="/#about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />私たちについて</NavLink></li>
              <li><NavLink href="/#business" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />サービス</NavLink></li>
              <li><NavLink href="/#reasons" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />選ばれる理由</NavLink></li>
              <li><NavLink href="/members" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />役職員一覧</NavLink></li>
              <li><NavLink href="/info" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />お知らせ</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Business */}
          <div>
            <h3 className="font-bold text-lg mb-6">事業案内</h3>
            <ul className="space-y-4">
              {['教育研修・セミナー', '行政・企業連携', '教材・コンテンツ制作', '講師育成・認定', 'デジタル学習', 'コンサルティング'].map((item) => (
                <li key={item}>
                  <NavLink href="/#business" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">お問い合わせ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 text-primary shrink-0" />
                <span>〒105-0011<br />東京都港区芝公園4-2-8</span>
              </li>
              {/* <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>03-0000-0000</span>
              </li> */}
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@koutekiseido-japan.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} P.E.S.A - Public Education & Social Awareness Association, JAPAN. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
};
