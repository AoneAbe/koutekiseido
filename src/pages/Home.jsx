import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Introduction } from '../components/sections/Introduction';
import { Business } from '../components/sections/Business';
import { Reasons } from '../components/sections/Reasons';
import { Seminars } from '../components/sections/Seminars';
import { CTA } from '../components/sections/CTA';
import { News } from '../components/sections/News';
import { Access } from '../components/sections/Access';

export const Home = () => {
  return (
    <>
      <Hero />
      <Introduction />
      <Business />
      <Reasons />
      <CTA />
      <News />
      <Access />
    </>
  );
};
