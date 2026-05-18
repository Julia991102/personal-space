'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// 全新升级：繁茂的 ASCII 草甸 (28组高频散落的草与花)
// 形态不再过分复杂，但数量密集，营造真正的“数字丛林”氛围
// ==========================================
const asciiDecorations = [
  { top: '2%', left: '10%', art: ` \\|/ `, style: 'text-white/15 text-[10px]' },
  { top: '4%', right: '15%', art: `  . \n \\|/ `, style: 'text-white/20 text-[11px]' },
  { top: '8%', left: '20%', art: ` -o- \n /|\\ `, style: 'text-white/15 text-[9px]' },
  { top: '12%', right: '8%', art: ` \\|/ `, style: 'text-white/10 text-[12px]' },
  { top: '16%', left: '5%', art: ` .o. \n \\|/ `, style: 'text-white/20 text-[10px]' },
  { top: '19%', right: '22%', art: `  * \n \\|/ `, style: 'text-white/15 text-[10px]' },
  { top: '23%', left: '14%', art: ` \\|/  \\|/ `, style: 'text-white/10 text-[11px]' },
  { top: '27%', right: '12%', art: `  . \n \\|/ `, style: 'text-white/20 text-[10px]' },
  { top: '31%', left: '8%', art: ` \\|/ `, style: 'text-white/15 text-[9px]' },
  { top: '34%', right: '18%', art: ` -o- \n /|\\ `, style: 'text-white/10 text-[12px]' },
  { top: '38%', left: '22%', art: ` .o. \n \\|/ `, style: 'text-white/20 text-[10px]' },
  { top: '42%', right: '5%', art: `  * \n \\|/ `, style: 'text-white/15 text-[11px]' },
  { top: '46%', left: '12%', art: ` \\|/ `, style: 'text-white/10 text-[10px]' },
  { top: '49%', right: '24%', art: ` \\|/  \\|/ `, style: 'text-white/20 text-[9px]' },
  { top: '53%', left: '18%', art: `  . \n \\|/ `, style: 'text-white/15 text-[10px]' },
  { top: '57%', right: '10%', art: ` -o- \n /|\\ `, style: 'text-white/20 text-[11px]' },
  { top: '61%', left: '6%', art: ` \\|/ `, style: 'text-white/10 text-[12px]' },
  { top: '65%', right: '15%', art: ` .o. \n \\|/ `, style: 'text-white/15 text-[10px]' },
  { top: '69%', left: '24%', art: `  * \n \\|/ `, style: 'text-white/20 text-[9px]' },
  { top: '72%', right: '20%', art: ` \\|/ `, style: 'text-white/10 text-[11px]' },
  { top: '76%', left: '10%', art: ` \\|/  \\|/ `, style: 'text-white/15 text-[10px]' },
  { top: '80%', right: '6%', art: `  . \n \\|/ `, style: 'text-white/20 text-[10px]' },
  { top: '84%', left: '16%', art: ` -o- \n /|\\ `, style: 'text-white/15 text-[11px]' },
  { top: '87%', right: '14%', art: ` \\|/ `, style: 'text-white/10 text-[12px]' },
  { top: '91%', left: '22%', art: ` .o. \n \\|/ `, style: 'text-white/20 text-[9px]' },
  { top: '94%', right: '18%', art: `  * \n \\|/ `, style: 'text-white/15 text-[10px]' },
  { top: '97%', left: '12%', art: ` \\|/ `, style: 'text-white/20 text-[11px]' },
  { top: '99%', right: '8%', art: ` \\|/  \\|/ `, style: 'text-white/15 text-[10px]' },
];

const treeFrames = [
  `\n\n\n.`,
  `\n\n\n|\n|`,
  `\n\n\\|/\n-o-\n/|\\`,
  `\n  .o.  \n .oOo. \n  |||  \n  |||  `,
  `   .o00o.   \n .o000000o. \n.o00000000o.\n  \\ |||| /  \n    ||||    `,
  `       .o0000000o.       \n     .o00000000000o.     \n    .o00000000000000o.   \n    000000000000000000   \n     0000000000000000    \n      00000000000000     \n        \\  |||||  /      \n           |||||         \n           |||||         \n           |||||         \n     _____/|||||\\_____   `
];

const gardenNodes = [
  {
    id: '01',
    title: 'GENESIS // 缘起',
    status: 'BLOOMING',
    content: 'This entire digital space was co-authored with AI. It is not just a portfolio, but an ongoing experiment in "vibe-coding" — translating personal taste and design intuition directly into code through continuous dialogue.',
  },
  {
    id: '02',
    title: 'CULTIVATING // 培育',
    status: 'SEED PLANTED',
    content: 'A space reserved for off-duty thoughts, side projects, and digital fragments. The soil is ready, currently awaiting new seeds to be updated.',
  },
  {
    id: '03',
    title: 'UNTITLED // 待定',
    status: 'TO BE UPDATED',
    content: 'More non-professional attributes, photography, and personal curations will organically grow here over time.',
  }
];

export default function Garden() {
  const containerRef = useRef<HTMLElement>(null);
  const transitionRoomRef = useRef<HTMLDivElement>(null); 
  const gardenRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    setTimeout(() => ScrollTrigger.refresh(), 200);

    const tlTree = gsap.timeline({
      scrollTrigger: {
        trigger: transitionRoomRef.current, 
        start: 'top top',    
        end: '+=4000',       
        scrub: 1,            
        pin: true,           
      }
    });

    tlTree.to('.tree-f1', { opacity: 0, duration: 1, delay: 0.5 }) 
          .to('.tree-f2', { opacity: 1, duration: 1 }, "<")
          .to('.tree-f2', { opacity: 0, duration: 1 }, "+=0.5") 
          .to('.tree-f3', { opacity: 1, duration: 1 }, "<")
          .to('.tree-f3', { opacity: 0, duration: 1 }, "+=0.5")
          .to('.tree-f4', { opacity: 1, duration: 1 }, "<")
          .to('.tree-f4', { opacity: 0, duration: 1 }, "+=0.5")
          .to('.tree-f5', { opacity: 1, duration: 1 }, "<")
          .to('.tree-f5', { opacity: 0, duration: 1 }, "+=0.5")
          .to('.tree-f6', { opacity: 1, duration: 1 }, "<")
          .to({}, { duration: 3 }); 

    if (pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: gardenRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1.5, 
        }
      });
    }

    nodesRef.current.forEach((node) => {
      if (!node) return;
      gsap.fromTo(node, 
        { y: 80, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    gsap.utils.toArray('.ascii-decor').forEach((decor: any) => {
      gsap.fromTo(decor, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 2.5, ease: 'power2.out',
          scrollTrigger: { trigger: decor, start: 'top 95%' }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] text-[#F7F7F7] overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        
        .garden-noise {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }
      `}} />

      {/* 黑屏转场暗房 */}
      <div ref={transitionRoomRef} className="w-full h-screen flex flex-col justify-center items-center relative z-20">
        <div className="garden-noise"></div>
        <div className="relative w-full h-[400px] flex items-end justify-center">
          {treeFrames.map((frame, index) => (
            <pre 
              key={index} 
              className={`tree-f${index + 1} absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-white/80 text-[10px] md:text-xs leading-[1.15] whitespace-pre text-center will-change-[opacity] ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
            >
              {frame}
            </pre>
          ))}
        </div>
        <div className="absolute bottom-12 font-mono text-[9px] text-white/30 tracking-[0.4em] uppercase animate-pulse">
          Scroll down to grow
        </div>
      </div>

      {/* 真实的花园区 */}
      <div ref={gardenRef} className="relative w-full min-h-[150vh] pt-40 md:pt-48 pb-40 z-10 border-t border-white/5">
        
        <div className="garden-noise"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 mb-32 md:mb-48 flex flex-col items-center text-center">
          <span className="font-mono text-white/40 text-[10px] tracking-[0.4em] uppercase mb-6 block">
            NON-PROFESSIONAL ATTRIBUTES
          </span>
          <h2 className="font-inter font-light text-5xl md:text-7xl tracking-tighter text-white/90 leading-none">
            THE GARDEN
          </h2>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent mt-12"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col relative">
          
          {/* 渲染 28 组繁密的花草 */}
          {asciiDecorations.map((decor, i) => (
            <pre 
              key={i} 
              className={`ascii-decor absolute font-mono leading-[1.1] whitespace-pre z-0 pointer-events-none opacity-0 ${decor.style}`}
              style={{ top: decor.top, left: decor.left, right: decor.right }}
            >
              {decor.art}
            </pre>
          ))}

          {/* SVG 幽幽小径 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] md:w-[400px] h-full pointer-events-none z-0">
            <svg viewBox="0 0 400 1000" preserveAspectRatio="none" className="w-full h-full opacity-20">
              <path 
                ref={pathRef}
                d="M 200 0 C 350 200, 50 400, 200 600 C 350 800, 50 1000, 200 1200" 
                fill="none" 
                stroke="#F7F7F7" 
                strokeWidth="1.5" 
                strokeDasharray="4 8"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col gap-32 md:gap-48 mt-12 pb-32">
            {gardenNodes.map((node, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={node.id}
                  ref={(el) => { nodesRef.current[index] = el; }}
                  className={`w-full md:w-[45%] flex flex-col ${isEven ? 'self-start md:pr-12' : 'self-end md:pl-12'}`}
                >
                  <div className="flex items-baseline gap-4 mb-4 border-b border-white/15 pb-4">
                    <span className="font-mono text-white/30 text-3xl md:text-4xl">{node.id}</span>
                    <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-white/50 uppercase">
                      [ {node.status} ]
                    </span>
                  </div>
                  <h3 className="font-inter font-bold text-xl md:text-2xl text-white/90 tracking-tight uppercase mb-4">
                    {node.title}
                  </h3>
                  <p className="font-sans text-white/60 text-sm md:text-base leading-relaxed font-light">
                    {node.content}
                  </p>
                  
                  {index !== 0 && (
                    <div className="mt-8 w-full h-[120px] border border-white/10 border-dashed flex items-center justify-center bg-white/[0.01]">
                      <span className="font-mono text-[10px] text-white/30 tracking-[0.2em]">WAITING FOR SUNLIGHT</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        <div className="relative z-10 w-full flex justify-center mt-20 opacity-40">
          <span className="w-2 h-2 rounded-full bg-[#F7F7F7]"></span>
        </div>

      </div>
    </section>
  );
}