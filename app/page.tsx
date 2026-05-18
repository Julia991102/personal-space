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
      
      {/* 核心修复：
        1. 删掉了所有带有 scroll-mt-32 的 div 包装，防止与 GSAP 的滚动逻辑发生不必要的冲突。
        2. 删掉了 <Works /> 和 <Connect /> 的外层 div 包装，因为组件内部已经自带了完美的 id="works" 和 id="connect"，去掉了 HTML ID 重复的隐患。
      */}
      
      <Hero />
      
      <div id="about-anchor">
        <About />
      </div>
      
      <Works />
      
      <Connect />
      
      <div id="garden">
        <Garden />
      </div>
      
    </main>
  );
}