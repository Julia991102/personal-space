'use client';

import { useState } from 'react';
import WelcomeLoader from './components/WelcomeLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Connect from './components/Connect';
import Garden from './components/Garden';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative w-full min-h-screen bg-[#F7F7F7]">
      
      {isLoading && <WelcomeLoader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <Navbar />}
      
      {/* 给每个区块加上 scroll-mt-32 (大约 128px 的防撞安全距离) */}
      <div id="home" className="scroll-mt-32">
        <Hero />
      </div>
      
      <div id="about-anchor" className="scroll-mt-32">
        <About />
      </div>
      
      <div id="works" className="scroll-mt-32">
        <Works />
      </div>
      
      <div id="connect" className="scroll-mt-32">
        <Connect />
      </div>
      
      <div id="garden" className="scroll-mt-32">
        <Garden />
      </div>
      
    </main>
  );
}