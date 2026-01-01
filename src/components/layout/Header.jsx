import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Section';
import { Logo } from '../ui/Logo';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ href, children, mobile = false, onClick }) => {
  const isHash = href.startsWith('#');
  const isHome = useLocation().pathname === '/';
  
  const target = isHash && !isHome ? `/${href}` : href;
  const Component = isHash && isHome ? 'a' : Link;
  const props = isHash && isHome ? { href } : { to: target };

  return (
    <Component 
      {...props}
      onClick={onClick}
      className={`
        font-medium transition-colors duration-200 block font-sm tracking-wide
        ${mobile 
          ? 'text-2xl py-4 border-b border-gray-100 text-text-primary' 
          : 'text-text-secondary hover:text-primary'
        }
      `}
    >
      {children}
    </Component>
  );
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '私たちについて', href: '#about' },
    { label: 'サービス', href: '#business' },
    { label: '選ばれる理由', href: '#reasons' },
    { label: '役職員一覧', href: '/members' },
    { label: 'お知らせ', href: '/info' },
  ];

  return (
    <header 
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm h-[60px] md:h-[70px]' : 'bg-transparent h-[70px] md:h-[80px]'}
      `}
    >
      <Container className="h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="z-50 relative">
          <Logo textClassName="text-text-primary" src={`${import.meta.env.BASE_URL}shadanhouzin/logo-08.svg`} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map(item => (
            <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
          ))}
          <Button variant="primary" className="py-2 px-5 text-sm rounded-full shadow-none hover:shadow-lg" href="/contact">
            お問い合わせ
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6 text-text-primary" /> : <Menu className="w-6 h-6 text-text-primary" />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-white z-40 pt-24 px-6 flex flex-col h-screen"
            >
              <nav className="flex flex-col gap-2">
                {navItems.map(item => (
                  <NavLink key={item.label} href={item.href} mobile onClick={() => setIsOpen(false)}>
                    {item.label}
                  </NavLink>
                ))}
                <div className="mt-8">
                  <Button variant="primary" className="w-full justify-center rounded-full" href="/contact" onClick={() => setIsOpen(false)}>
                    お問い合わせ
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};
