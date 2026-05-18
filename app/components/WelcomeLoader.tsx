'use client';

import { useState, useEffect, useRef } from 'react';

export default function WelcomeLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const ring1Text = "BETWEEN THE LINES BEYOND THE LABELS. ";
  const chars1 = ring1Text.split("");
  
  const ring2Text = "FEELING · VIBE · INSIGHTS · CODE · FEELING · VIBE · INSIGHTS · CODE · FEELING · VIBE · INSIGHTS · CODE · ";
  const chars2 = ring2Text.split("");

  const chars1Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const chars2Refs = useRef<(HTMLSpanElement | null)[]>([]);

  const radius = 185; 

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(timer);
        return 100;
      });
    }, 45); 
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let reqId: number;
    const startTime = performance.now();

    const customBezier = (t: number) => {
      return 3 * Math.pow(1 - t, 2) * t * 0.67 + 3 * (1 - t) * Math.pow(t, 2) * 0.67 + Math.pow(t, 3);
    };

    const animate = (time: number) => {
      const elapsed = time - startTime;

      const loop1 = 8000;
      const t1 = (elapsed % loop1) / loop1;
      const angle1 = (customBezier(t1) * 360) + Math.floor(elapsed / loop1) * 360;

      const loop2 = 12000;
      const t2 = (elapsed % loop2) / loop2;
      const angle2 = (customBezier(t2) * 360) + Math.floor(elapsed / loop2) * 360;

      chars1Refs.current.forEach((span, i) => {
        if (!span) return;
        const baseDeg = i * (360 / chars1.length);
        const currentDeg = baseDeg - angle1;
        
        let norm = currentDeg % 360;
        if (norm < 0) norm += 360;
        
        const cosVal = Math.cos(norm * Math.PI / 180);
        const opacity = 0.05 + ((cosVal + 1) / 2) * 0.95;

        span.style.transform = `translate(-50%, calc(-50% - 40px)) rotateY(${currentDeg}deg) translateZ(${radius}px) scaleX(0.65) scaleY(1.6)`;
        span.style.opacity = opacity.toFixed(2);
      });

      chars2Refs.current.forEach((span, i) => {
        if (!span) return;
        const baseDeg = i * (360 / chars2.length);
        const currentDeg = baseDeg - angle2;
        
        let norm = currentDeg % 360;
        if (norm < 0) norm += 360;
        
        const cosVal = Math.cos(norm * Math.PI / 180);
        const opacity = 0.05 + ((cosVal + 1) / 2) * 0.95;

        span.style.transform = `translate(-50%, calc(-50% + 55px)) rotateY(${currentDeg}deg) translateZ(${radius}px) scaleX(0.75) scaleY(1.25)`;
        span.style.opacity = opacity.toFixed(2);
      });

      reqId = requestAnimationFrame(animate);
    };

    reqId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqId);
  }, [chars1.length, chars2.length]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setFadeOut(true), 400); 
      setTimeout(onComplete, 1400); 
    }
  }, [progress, onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#f8f8f8] flex flex-col justify-center items-center transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] overflow-hidden ${fadeOut ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
      
      <div className="relative w-full h-[500px] flex justify-center items-center [perspective:1200px]">
        
        <div 
          className="absolute inset-0 flex justify-center items-center [transform-style:preserve-3d] transition-transform duration-100 ease-out"
          style={{ 
            // 核心微调：将 Z轴倾斜减缓至 -4deg，X轴仰角减缓至 -24deg
            transform: `rotateZ(-4deg) rotateX(${-24 + mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)` 
          }}
        >
          
          <div className="absolute w-full h-full [transform-style:preserve-3d]">
            {chars1.map((char, i) => (
              <span
                key={`r1-${i}`}
                ref={(el) => { chars1Refs.current[i] = el; }}
                className="absolute top-1/2 left-1/2 font-black text-[4rem] tracking-tighter text-black uppercase whitespace-nowrap will-change-transform opacity-0"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          <div className="absolute w-full h-full [transform-style:preserve-3d]">
            {chars2.map((char, i) => (
              <span
                key={`r2-${i}`}
                ref={(el) => { chars2Refs.current[i] = el; }}
                className="absolute top-1/2 left-1/2 font-medium text-[1.2rem] tracking-tighter text-black uppercase whitespace-nowrap will-change-transform opacity-0"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

        </div>
      </div>

      <div className="absolute bottom-24 flex flex-col items-center animate-fade-in-up">
        <span className="tabular-nums font-[900] text-2xl tracking-tighter text-black">
          {String(progress).padStart(2, '0')}%
        </span>
        <div className="w-[120px] h-[2px] bg-gray-200 mt-4 overflow-hidden">
           <div 
             className="h-full bg-black transition-all duration-75 ease-linear"
             style={{ width: `${progress}%` }}
           />
        </div>
      </div>
    </div>
  );
}