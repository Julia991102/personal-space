'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// 主舞台项目数据 (001 - 005)
// ==========================================
const projects = [
  {
    id: '001',
    title: 'Dramashorts Go Japan',
    keywords: 'Cross-Border Collaboration, APAC Expansion',
    date: '2025-04',
    images: [
      '/works/001-1.png'
    ],
    desc: 'Serving as the event lead, I managed the end-to-end execution of this high-stakes workshop in collaboration with a Japanese agency to capitalize on high-growth potential within a fast-paced app vertical. I designed a strategic matchmaking component that facilitated deep collaboration among media and entertainment (M&E) partners across the APAC region, delivering an exceptional 4.6/5 average user satisfaction rating.'
  },
  {
    id: '002',
    title: 'Annual Gathering',
    keywords: 'High-value Partner Retention, Brand Influence',
    date: '2022 — 2025', // 【完美主义微调】：精简长日期，使其在卡片内部保持完美单行，不再臃肿堆叠
    images: [
      '/works/002-1.png', '/works/002-2.png', '/works/002-3.png',
      '/works/002-4.png', '/works/002-5.png', '/works/002-6.png',
      '/works/002-7.png', '/works/002-8.png', '/works/002-9.png',
      '/works/002-10.png', '/works/002-11.png', '/works/002-12.png',
      '/works/002-13.png', '/works/002-14.png', '/works/002-15.png',
      '/works/002-16.png', '/works/002-17.png'
    ],
    desc: 'Orchestrated the end-to-end management of this flagship annual event series for four consecutive years, leading comprehensive execution across creative brand design, content development, booth production, and complex logistics. By seamlessly integrating high-value industry content, prestigious awarding ceremonies, interactive product showcases, and curated networking environments, the initiative successfully amplified the brand’s market leadership and solidified long-term engagement with key ecosystem partners.'
  },
  {
    id: '003',
    title: 'CHINA IMMERSION',
    keywords: 'Project Management, Strategic Investment',
    date: '2023-2025',
    images: [
      '/works/003-1.png', 
      '/works/003-2.png'
    ],
    desc: 'Functioning as the Project Manager, I led the China Immersion Program tailored specifically for global executives. I orchestrated the cross-functional initiative to deliver critical market insights, effectively enabling leadership to make data-driven decisions regarding strategic regional investments.'
  },
  {
    id: '004',
    title: 'Level Up Promotion',
    keywords: 'Integrated Marketing',
    date: '2026-04',
    images: [
      '/works/004-1.png', 
      '/works/004-2.png', 
      '/works/004-3.png'
    ],
    desc: 'Leading the ongoing regional marketing for this flagship Google Play Games initiative across the Greater China Region (GCR). Our team orchestrate an integrated campaign combining premium offline partner summits, social media operations, and a localized KOL matrix to drive program awareness and accelerate cross-platform developer acquisition.'
  },
  {
    id: '005',
    title: 'NFT Lab Initiative',
    keywords: 'Market Research, Interactive Prototyping',
    date: '2022-11',
    images: [
      '/works/005-1.png'
    ],
    desc: 'I spearheaded competitive research into popular Web3 and NFT gaming trends, synthesizing high-level market intelligence into a comprehensive 37-page English analysis report. Furthermore, I partnered directly with the development engineering team to translate these insights into a live, interactive NFT game demo page.'
  }
];

// 抽屉收纳的 4 个高阶案例数据 (006 - 009)
const archiveProjects = [
  {
    id: '006',
    title: 'Community Events',
    keywords: 'Developer Community',
    date: '2024/2025',
    images: ['/works/006-1.png'],
    desc: 'Working as the Project Manager, I partnered closely with the Community Lead to organize impact-driven offline events. These initiatives successfully balanced the dual goals of introducing new products and services while strengthening localized community ties, ultimately driving an outstanding product adoption rate of over 80%.'
  },
  {
    id: '007',
    title: 'Shopify Commerce Next',
    keywords: 'Merchant Acquisition, CXO Networking',
    date: '2025',
    images: ['/works/007-1.png'],
    desc: 'Serving as Co-Manager, I helped orchestrate a high-impact, 200-attendee in-real-life (IRL) merchant acquisition event designed to accelerate market growth. The project featured strategic stage programming, interactive product showcases, and exclusive CXO networking sessions that successfully expanded the platform commercial footprint.'
  },
  {
    id: '008',
    title: 'Series Webinar',
    keywords: 'Policy Education, Feature Adoption',
    date: '2022-2026',
    images: ['/works/008-1.png'],
    desc: 'Organized a recurring series of digital webinars annually to drive developer enablement and ecosystem growth. I oversaw the complete operational workflow to reach over 2,000 cumulative attendees, successfully accelerating platform policy education and new feature promotion across the region.'
  },
  {
    id: '009',
    title: 'WeChat Operation',
    keywords: 'Content Operations',
    date: '2022',
    images: ['/works/009-1.png'],
    desc: 'I supported the end-to-end operation of a prominent Android-focused WeChat Official Account. My contributions focused on technical article editing, and managing daily community engagement to maintain an active, thriving developer ecosystem.'
  },
];

// 轮播组件
const ImageCarousel = ({ images, isHoverable = false }: { images: string[], isHoverable?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full bg-[#1a1a1a]">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt="visual"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } filter grayscale ${isHoverable ? 'group-hover:grayscale-0 transition-all duration-700' : ''}`}
        />
      ))}
    </div>
  );
};

const ProjectItem = ({ project, index, onClick }: { project: any, index: number, onClick: () => void }) => {
  const vinylRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    // 黑胶抽出时的空间间距增大
    gsap.to(spacerRef.current, { width: '7vw', duration: 0.7, ease: 'power3.out' });
    gsap.to(vinylRef.current, { x: '50%', rotation: 45, duration: 0.7, ease: 'power3.out' });
    gsap.to(textRef.current, { opacity: 1, duration: 0.7, ease: 'power3.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(spacerRef.current, { width: '0vw', duration: 0.7, ease: 'power3.out' });
    gsap.to(vinylRef.current, { x: 6, rotation: 0, duration: 0.7, ease: 'power3.out' });
    gsap.to(textRef.current, { opacity: 0.4, duration: 0.7, ease: 'power3.out' });
  };

  return (
    <div className="relative flex-shrink-0 flex flex-col group cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
      <div className="flex">
        {/* 【升级】：将尺寸从 16vw 调整为 14vw，完美释放每一个方块之间的横向呼吸度 */}
        <div className="relative w-[14vw] max-w-[230px] min-w-[150px] aspect-square">
          <div ref={vinylRef} className="absolute inset-0 rounded-full z-0 flex items-center justify-center vinyl-grooves" style={{ transform: 'translateX(6px)' }}>
            <div className="w-[40%] h-[40%] rounded-full overflow-hidden border-[3px] border-[#1a1a1a] bg-[#F7F7F7]">
              <ImageCarousel images={project.images} isHoverable={true} />
            </div>
          </div>
          <div className="absolute inset-0 bg-[#3A3A3A] z-10 border border-black/20 flex flex-col justify-between p-6 md:p-8">
            <div className="flex justify-between items-start font-mono text-[9px] tracking-widest text-[#F7F7F7]/60 uppercase">
              <span>{project.id}</span><span className="opacity-50">✦</span>
            </div>
            <div className="flex flex-col font-mono text-[9px] tracking-widest text-[#F7F7F7]/40 uppercase">
              <span>DATE</span><span>{project.date}</span>
            </div>
          </div>
        </div>
        <div ref={spacerRef} className="h-full w-0"></div>
      </div>
      
      {/* 【核心优化】：文本区块。主标题与副标题的最大宽度（max-w）锁死与上方的正方形宽度绝对对齐 */}
      <div ref={textRef} className="mt-5 flex flex-col items-start opacity-40 text-left">
        <h3 className="font-inter-black text-[1.5vw] md:text-lg uppercase text-[#111] leading-none mb-2.5 max-w-[14vw] min-w-[150px]" style={{ letterSpacing: '0.05em' }}>
          {project.title}
        </h3>
        {/* 【升级】：副标题字重由 opacity-40 的文本调整为稳固的 font-normal，色值使用更具实物印刷质感的中性炭灰，去除气虚感 */}
        <p className="font-mono font-normal text-[9px] md:text-[10px] text-neutral-600 uppercase max-w-[14vw] min-w-[150px]" style={{ letterSpacing: '0.05em' }}>
          {project.keywords}
        </p>
      </div>
    </div>
  );
};

export default function Works() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(scrollTrackRef.current, { y: 80, opacity: 0 }, { 
      y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
    });
  }, []);
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; }; // 组件卸载时恢复原状
  }, [selectedProject]);
  return (
    <section id="works" ref={containerRef} className={`relative w-full min-h-screen bg-[#F7F7F7] text-[#111] overflow-hidden pt-36 md:pt-48 pb-40 md:pb-56 flex flex-col justify-start ${selectedProject ? 'z-[999]' : 'z-20'}`}>
      <style dangerouslySetInnerHTML={{__html: `
        .font-inter-light { font-family: 'Inter', sans-serif; font-weight: 300; }
        .font-inter-black { font-family: 'Inter', sans-serif; font-weight: 900; }
        .vinyl-grooves { background-color: #050505; background-image: repeating-radial-gradient(#050505, #050505 2px, #111 3px, #111 4px); box-shadow: inset 0 0 15px rgba(255,255,255,0.05); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes modalFadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(8px); } }
        .animate-modal { animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      <div className="w-full flex flex-col h-full relative z-10">
        <div className="px-8 md:px-16 mb-20 md:mb-24">
        <h2 className="font-inter-black text-[12vw] leading-[0.9] md:text-7xl uppercase text-[#111] tracking-tighter md:leading-none whitespace-normal md:whitespace-nowrap break-words">SELECTED WORKS</h2>
        </div>
        
        <div className="relative w-full">
          {/* 参考水平线对齐位置同步更新 */}
          <div className="absolute left-0 w-full h-[1px] bg-[#111]/10 z-0" style={{ top: 'clamp(150px, 14vw, 230px)' }}></div>
          
          {/* 【升级】：gap 从原先的 gap-6 md:gap-[2vw] 显着放大拉开至 gap-12 md:gap-[4vw]，保持间距完全相同且极为通透 */}
          <div ref={scrollTrackRef} className="w-full px-8 md:px-16 flex flex-row gap-12 md:gap-[4vw] overflow-x-auto hide-scrollbar relative z-10 items-start">
            {projects.map((project, index) => (
              <ProjectItem key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 right-8 md:bottom-32 md:right-16 z-30 flex flex-col items-end">
        <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#111] text-[#F7F7F7] w-[280px] flex flex-col ${isDrawerOpen ? 'max-h-[500px] border border-black/10' : 'max-h-0'}`}>
          <div className="p-6">
            <span className="block font-mono text-[10px] opacity-50 mb-4 tracking-widest border-b border-white/20 pb-2">ARCHIVE INDEX</span>
            <div className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-wide">
              {archiveProjects.map((item) => (
                <button key={item.id} onClick={() => { setSelectedProject(item); setIsDrawerOpen(false); }} className="w-full text-left hover:text-white/50 cursor-pointer transition-colors flex justify-between items-center group py-1">
                  <span>{item.id} | {item.title}</span><span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </button>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10 text-[#F7F7F7]/30 text-[10px] italic">END OF RECORDS</div>
            </div>
          </div>
        </div>
        <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="mt-4 font-mono font-light text-[10px] md:text-xs tracking-[0.15em] uppercase border border-black/20 bg-transparent text-[#111] px-6 py-3 hover:bg-[#111] hover:text-[#F7F7F7] transition-all duration-500 flex items-center gap-2">
          {isDrawerOpen ? 'CLOSE' : 'OPEN'} ARCHIVES<span className={`transition-transform duration-500 ${isDrawerOpen ? 'rotate-180' : ''}`}>↗</span>
        </button>
      </div>

      {selectedProject && (
        // 1. z-index 提升至 110，彻底压制顶部导航栏 (z-100)
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12 animate-modal">
          <div className="absolute inset-0 bg-[#F7F7F7]/90 cursor-pointer" onClick={() => setSelectedProject(null)}></div>
          
          {/* 2. 核心修复：加入 max-h-[85vh] 和 overflow-y-auto，让内容过长时在内部优雅滑动 */}
          <div className="relative z-10 w-full max-w-6xl max-h-[85vh] overflow-y-auto hide-scrollbar bg-[#111] text-[#F7F7F7] flex flex-col md:flex-row shadow-2xl">
            
            {/* 3. 移动端专属关闭按钮：增加了黑色半透明背景、加大了点击面积，再也不怕和图片融为一体 */}
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-3 right-3 md:top-6 md:right-6 z-20 text-white md:text-white/50 hover:text-white font-mono text-[12px] tracking-[0.2em] bg-black/40 md:bg-transparent px-4 py-2 md:p-0 backdrop-blur-md md:backdrop-blur-none rounded-sm md:rounded-none"
            >
              [ X ]
            </button>
            
            {/* 保证图片的比例 */}
            <div className="w-full md:w-[60%] aspect-[3/2] bg-[#1a1a1a] relative overflow-hidden shrink-0">
              <ImageCarousel key={selectedProject.id} images={selectedProject.images} isHoverable={false} />
            </div>
            
            {/* 移动端减小一点内边距 (p-6) 让文本排版更紧凑 */}
            <div className="w-full md:w-[40%] p-6 md:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <span className="font-mono text-white/40 text-[10px] tracking-[0.3em] mb-4 block">CASE STUDY {selectedProject.id}</span>
                <h3 className="font-inter-black text-3xl md:text-5xl uppercase tracking-tighter mb-8 leading-[1]">{selectedProject.title}</h3>
                <div className="mb-6"><span className="block font-mono text-[9px] text-white/40 mb-1 tracking-widest">KEYWORDS</span><span className="font-inter-bold text-white uppercase tracking-wide text-sm">{selectedProject.keywords}</span></div>
                <div><span className="block font-mono text-[9px] text-white/40 mb-2 tracking-widest">OVERVIEW</span><p className="font-sans text-white/70 text-sm leading-relaxed max-w-sm">{selectedProject.desc}</p></div>
              </div>
              <div className="mt-12 pt-6 border-t border-white/20 flex justify-between font-mono text-[10px] text-white/40">
                <span>DATE: {selectedProject.date}</span>
                <span>STATUS: ARCHIVED</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}