'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Connect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(topRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
      }
    );

    gsap.fromTo(nameRef.current,
      { y: 100, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power4.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 60%' }
      }
    );
  }, []);

  return (
    <section id="connect" ref={containerRef} className="relative z-20 w-full min-h-screen bg-[#F7F7F7] text-[#111] flex flex-col justify-between pt-28 md:pt-32 pb-4 px-6 md:px-12">
      
      <div ref={topRef} className="flex flex-col md:flex-row justify-between items-start w-full gap-8 z-10 flex-grow">
        
        <div className="flex flex-col gap-8 md:gap-10 w-full md:w-1/3">
          
          <div className="font-mono text-[11px] leading-[2] uppercase tracking-[0.1em] opacity-60 max-w-[320px]">
            <p className="mb-4">
              With 5 years of experience in marketing, I've successfully managed over 30+ end-to-end projects, including flagship events with budgets up to $400,000.
            </p>
            <p>
              I consistently achieve a 100% completion rate.
            </p>
          </div>

          <div className="relative w-36 h-36 md:w-40 md:h-40 group current-vinyl-container">
            <div className="absolute inset-2 z-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-25 grayscale group-hover:opacity-95 group-hover:grayscale-0 group-hover:translate-x-20 group-hover:-translate-y-4 group-hover:rotate-[45deg]">
              <div className="w-full h-full overflow-hidden p-2 bg-transparent">
                <img 
                  src="/wechat-qr.png" 
                  alt="WeChat QR" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end w-full md:w-2/3">
          <a href="tel:+8617852843329" className="font-inter-black text-[10vw] md:text-[5.5vw] leading-[0.9] tracking-tighter hover:opacity-50 transition-opacity whitespace-nowrap">
            +86 178 5284 3329
          </a>
          <a href="mailto:jma1999112@gmail.com" className="font-inter-black text-[6.5vw] md:text-[3.5vw] leading-[1.2] tracking-tighter hover:opacity-50 transition-opacity whitespace-nowrap mt-1 md:mt-2">
          jma1999112@gmail.com
          </a>

          <div className="flex flex-wrap gap-8 md:gap-12 mt-8 font-mono text-[11px] tracking-[0.2em] uppercase font-bold">
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-between items-center w-full px-8 mt-8 mb-2 font-mono text-[10px] tracking-[0.3em] opacity-30 z-10">
        <span>[ B2B STRATEGY ]</span>
        <span>[ DEVREL ]</span>
        <span>[ PROJECT MGMT ]</span>
      </div>

      <div className="w-full flex justify-center items-end mt-12 md:mt-0 z-10">
        <h2 ref={nameRef} className="font-inter-black text-[15.5vw] md:text-[23.5vw] leading-[0.75] tracking-[-0.04em] text-[#111] uppercase select-none whitespace-nowrap">
          SONIA MA
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full font-mono text-[8px] md:text-[9px] tracking-[0.2em] uppercase opacity-40 mt-4 md:mt-6 pt-2 z-10">
        <span className="mb-2 md:mb-0">BEIJING, CHINA: (UTC+8)</span>
        <span className="mb-2 md:mb-0 hidden md:block tracking-[0.3em]">DEVELOPMENT - VIBE CODING</span>
        <span className="text-left md:text-right leading-[1.5]">
          2026 All Right Reserved. Sonia Ma.<br/>
          Any Reproduction Without Permission Is Prohibited.
        </span>
      </div>

    </section>
  );
}