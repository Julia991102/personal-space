'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    setTimeout(() => ScrollTrigger.refresh(), 200);

    // ==========================================
    // 动画 1：白屏 ABOUT ME (改为无限触发)
    // ==========================================
    gsap.fromTo('.about-char', 
      { yPercent: 110 }, 
      {
        yPercent: 0,     
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.04,      
        scrollTrigger: {
          trigger: '.title-section',
          start: 'top 75%', 
          end: 'bottom 25%', // 添加离开点
          // 魔法指令：进入播放，离开倒放，滚回播放，滚顶倒放
          toggleActions: 'play reverse play reverse',
        }
      }
    );

    // ==========================================
    // 动画 2：黑屏全息精密对齐 (改为无限触发)
    // ==========================================
    gsap.fromTo('.line-mask', 
      {
        clipPath: "inset(0% 100% 0% 0%)", 
        x: -40,                 
        scale: 1.08,            
        letterSpacing: '0.08em', 
        filter: 'drop-shadow(0px 0px 15px rgba(247,247,247,0.8))' 
      },
      {
        clipPath: "inset(0% 0% 0% 0%)", 
        x: 0,                   
        scale: 1,               
        letterSpacing: '-0.02em', 
        filter: 'drop-shadow(0px 0px 0px rgba(247,247,247,0))', 
        stagger: 0.15,         
        duration: 1.4,          
        ease: 'expo.out',       
        scrollTrigger: {
          trigger: '.bio-section',
          start: 'top 50%',    
          end: 'bottom 40%', // 【关键增加】：告诉GSAP什么时候算“离开这一屏”
          // 【核心修改】：无论上下滑动，只要进入就精密对齐，离开就失焦消散！
          toggleActions: 'play reverse play reverse', 
        }
      }
    );

    // ==========================================
    // 动画 3：视差层叠覆盖转场 (保持原样，Scrub本身就是双向的)
    // ==========================================
    gsap.to('.bio-section', {
      yPercent: 20,  
      opacity: 0,  
      ease: 'none',
      scrollTrigger: {
        trigger: '.bio-section',
        start: 'bottom bottom', 
        end: 'bottom top',      
        scrub: true,
      }
    });

  }, { scope: containerRef }); 

  const aboutText = "ABOUT ME".split("");
  
  const lines = [
    "5 YEARS IN TECH MARKETING.",
    "SENIOR BY EXPERIENCE,",
    "A BUILDER BY HEART—",
    "CONSTANTLY PUSHING THE BOUNDARIES",
    "OF WHAT I CAN CREATE."
  ];

  return (
    <section ref={containerRef} className="w-full bg-[#f7f7f7] overflow-hidden z-0 relative">

      {/* 第一屏：白屏 */}
      <div className="title-section relative w-full h-[45vh] bg-[#f7f7f7] flex items-center justify-center pt-[5vh]">
        <h2 className="font-inter font-black text-[14vw] md:text-[11vw] lg:text-[9vw] uppercase text-[#111] leading-none flex items-center justify-center" style={{ letterSpacing: '-0.06em' }}>
          {aboutText.map((char, index) => (
            <span key={index} className="overflow-hidden inline-block pb-2 px-[2px]">
              <span className="about-char inline-block will-change-transform">
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </h2>
      </div>

      {/* 第二屏：黑屏全息对齐区 */}
      <div className="bio-section relative w-full h-[120vh] bg-[#111] text-[#f7f7f7] will-change-[transform,opacity]">
        
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24">
          <div className="bio-text-container max-w-[95vw] md:max-w-6xl w-full mx-auto text-center flex flex-col items-center gap-[1.5vw]">
            
            {lines.map((line, lineIndex) => (
              <div 
                key={lineIndex} 
                className="font-inter font-black text-[6.5vw] md:text-[5vw] lg:text-[4vw] uppercase relative flex justify-center leading-[1.2] whitespace-normal md:whitespace-nowrap px-4 md:px-0"
              >
                {/* 底层阴影 */}
                <div className="opacity-20 text-[#f7f7f7]" style={{ letterSpacing: '-0.02em' }}>
                  {line}
                </div>

                {/* 顶层高亮层 */}
                <div 
                  className={`line-mask absolute top-0 left-0 w-full h-full flex justify-center overflow-hidden will-change-[clip-path,transform,filter,letter-spacing] ${lineIndex === 2 ? 'text-[#f7f7f7]/60' : 'text-[#f7f7f7]'}`}
                >
                  {line}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
      
    </section>
  );
}