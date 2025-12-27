import React from 'react';
import { clsx } from 'clsx';

export const Logo = ({ className, textClassName }) => {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <img
        src={`${import.meta.env.BASE_URL}stella-logo.png`}
        alt="Stella Logo"
        className="h-8 md:h-10 w-auto drop-shadow-sm"
      />
    </div>
  );
};
