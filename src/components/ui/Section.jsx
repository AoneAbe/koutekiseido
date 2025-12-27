import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Section = ({ 
  children, 
  className, 
  id,
  background = 'white' // 'white', 'gray', 'primary'
}) => {
  const backgrounds = {
    white: 'bg-background-primary',
    gray: 'bg-background-secondary',
    primary: 'bg-gradient-primary',
    dark: 'bg-text-primary'
  };

  return (
    <section 
      id={id}
      className={twMerge(
        'relative w-full py-16 md:py-20 lg:py-32 overflow-hidden',
        backgrounds[background],
        className
      )}
    >
      {children}
    </section>
  );
};

export const Container = ({ children, className }) => {
  return (
    <div className={twMerge('w-full max-w-[1280px] mx-auto px-4 md:px-8', className)}>
      {children}
    </div>
  );
};




