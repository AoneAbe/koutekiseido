import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Link, useLocation } from 'react-router-dom';

export const Button = ({
  children,
  variant = 'primary',
  className,
  href,
  onClick,
  ...props
}) => {
  const location = useLocation();
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gradient-primary text-white shadow-lg hover:shadow-glow hover:translate-y-[-2px]",
    secondary: "bg-white border-2 border-primary text-primary hover:bg-primary-pale",
    ghost: "bg-transparent text-primary hover:bg-primary-pale/50",
    white: "bg-white text-primary hover:bg-gray-100 shadow-md",
    outlineWhite: "bg-transparent border-2 border-white text-white hover:bg-white/10"
  };

  const sizes = "px-6 py-3.5 text-sm md:text-base md:px-8 md:py-4";

  const classes = twMerge(
    baseStyles,
    variants[variant],
    sizes,
    className
  );

  if (href) {
    const isHash = href.startsWith('#');
    const isHome = location.pathname === '/';

    const target = isHash && !isHome ? `/${href}` : href;
    const Component = isHash && isHome ? 'a' : Link;
    const linkProps = isHash && isHome ? { href } : { to: target };

    return (
      <Component {...linkProps} className={classes} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};




