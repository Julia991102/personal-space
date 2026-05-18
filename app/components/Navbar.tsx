'use client';
import React from 'react';

interface NavbarProps {
  onNavigate?: (section: string) => void;
  activeSection?: string;
}

export default function Navbar({ 
  onNavigate = () => {}, 
  activeSection = 'home' 
}: NavbarProps) {
  
  // 定义导航按钮组件
  const NavItem = ({ section, label, targetId }: { section: string; label: string; targetId?: string }) => {
    return (
      <button 
        onClick={() => {
          onNavigate(section);
          
          // 修复锚点逻辑：所有按钮都会去寻找对应的 id 并平滑滚动
          setTimeout(() => {
            const elementId = targetId || section;
            const element = document.getElementById(elementId);
            
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (elementId === 'home') {
              // 兜底逻辑
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 50);
        }}
        className="group flex items-center justify-center cursor-pointer flex-shrink-0"
      >
        
        <span className="font-mono text-white transition-transform duration-500 text-[14px] group-hover:-translate-x-1.5">
          [
        </span>

        <div className="relative h-[24px] overflow-hidden mx-1 px-1">
          <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-[24px]">
            <span className="h-[24px] flex items-center justify-center text-[14px] font-mono tracking-[0.2em] text-white whitespace-nowrap">
              {label}
            </span>
            <span className="h-[24px] flex items-center justify-center text-[14px] font-mono tracking-[0.2em] text-white whitespace-nowrap">
              {label}
            </span>
          </div>
        </div>

        <span className="font-mono text-white transition-transform duration-500 text-[14px] group-hover:translate-x-1.5">
          ]
        </span>
        
      </button>
    );
  };

  return (
    // bg-transparent 和 mix-blend-difference 开启智能反色
    <nav className="fixed top-0 left-0 w-full z-[100] bg-transparent mix-blend-difference pointer-events-none">
      
      {/* 手机端完美适配：横向弹性布局 */}
      <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center pointer-events-auto">
        
        {/* 左侧 Logo */}
        <div className="flex-shrink-0 pr-4">
          <button 
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="group"
          >
            <span className="font-black text-lg md:text-xl tracking-[0.2em] text-white hover:opacity-60 transition-opacity uppercase whitespace-nowrap">
              Julia Ma
            </span>
          </button>
        </div>
        
        {/* 中间导航：移动端改为支持横向滑动的轨道，隐藏滚动条 */}
        <div className="flex flex-1 justify-end md:justify-center gap-6 md:gap-8 lg:gap-12 overflow-x-auto hide-scrollbar pl-4">
          <NavItem section="home" targetId="about-anchor" label="ABOUT ME" />
          <NavItem section="works" targetId="works" label="WORKS" />
          <NavItem section="connect" targetId="connect" label="CONNECT" />
          <NavItem section="garden" targetId="garden" label="GARDEN" />
        </div>
        
        {/* 右侧占位 (仅 PC 端显示，平衡 Logo) */}
        <div className="hidden md:flex w-[100px] justify-end opacity-0 pointer-events-none whitespace-nowrap">
          <span className="font-mono text-[14px] tracking-[0.2em] text-white">[ BALANCE ]</span>
        </div>
        
      </div>
    </nav>
  );
}