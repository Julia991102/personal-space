'use client';
import Image from 'next/image';
// 终极精调微雕猫咪：耳朵变钝且分开，胡须变短变细，完美匹配原字体比例
const CatDotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" overflow="visible" className={className}>
    {/* 1. 基础黑圈：与原字体的句号尺寸完美咬合 */}
    <circle cx="50" cy="50" r="50" fill="#111" />
    
    {/* 2. 精细眼睛：悬停时淡入 */}
    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
      <circle cx="32" cy="42" r="7" fill="#f7f7f7" />
      <circle cx="68" cy="42" r="7" fill="#f7f7f7" />
    </g>
    
    {/* 3. 经典 W 小嘴：悬停时淡入 */}
    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
      <path 
        d="M38,62 Q44,72 50,62 Q56,72 62,62" 
        fill="none" 
        stroke="#f7f7f7" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </g>
    
    {/* 4. 微调耳朵：不再那么尖，分得更开。使用 path 并加了圆角描边使耳尖变钝 */}
    <g className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-6 group-hover:translate-y-0" fill="#111" stroke="#111" strokeWidth="5" strokeLinejoin="round">
      {/* 左耳：向左倾斜 */}
      <path d="M 26 18 L 12 -8 L 42 8 Z" />
      {/* 右耳：向右倾斜 */}
      <path d="M 74 18 L 88 -8 L 58 8 Z" />
    </g>
    
    {/* 5. 微调俏皮胡须：变细 (strokeWidth="3")，变短，向左右两边弹射而出 */}
    <g className="opacity-0 group-hover:opacity-100 transition-all duration-300" stroke="#111" strokeWidth="3" strokeLinecap="round">
      {/* 左侧胡须 */}
      <g className="origin-right -translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
        <line x1="-2" y1="44" x2="-20" y2="39" />
        <line x1="-5" y1="52" x2="-23" y2="52" />
        <line x1="-2" y1="60" x2="-20" y2="65" />
      </g>
      {/* 右侧胡须 */}
      <g className="origin-left translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
        <line x1="102" y1="44" x2="120" y2="39" />
        <line x1="105" y1="52" x2="123" y2="52" />
        <line x1="102" y1="60" x2="120" y2="65" />
      </g>
    </g>
  </svg>
);

export default function Hero() {
  return (
    <>

      {/* 高级灰白背景 bg-[#f7f7f7] */}
      <section className="relative w-full h-screen min-h-[700px] bg-[#f7f7f7] text-[#111] overflow-hidden selection:bg-[#111] selection:text-[#f7f7f7] z-10 px-4 pt-28 pb-4">
        {/* ================= 1. 先锋海报画框 ================= */}
        <div className="absolute inset-4 border border-black/20 pointer-events-none z-40 hidden md:block"></div>

        {/* ================= 2. 解构版人像 ================= */}
        <div className="absolute left-[10%] lg:left-[25%] top-[23%] lg:top-[26%] w-[65%] md:w-[40%] lg:w-[26%] h-[55vh] lg:h-[65vh] z-10">
        <Image 
            src="/portfolio.jpg" 
            alt="Sonia Ma" 
            fill
            priority // 最高优先级加载，消灭首屏白屏
            sizes="(max-width: 768px) 65vw, (max-width: 1024px) 40vw, 26vw" // 告诉浏览器不同屏幕下的图片缩放尺寸，加载速度再提速
            className="object-cover grayscale contrast-[1.2] brightness-90 shadow-2xl"
        />
        </div>

        {/* ================= 3. 巨型解构文本 ================= */}
        {/* SONIA */}
        <h1 className="absolute top-[8%] left-[2%] lg:left-[8%] text-[25vw] lg:text-[18vw] font-bodoni font-black leading-none uppercase tracking-tighter mix-blend-difference text-white z-20 pointer-events-none">
          SONIA
        </h1>

        {/* MA. (极致排版修复版) */}
        <h1 className="absolute bottom-[4%] right-[5%] lg:right-[8%] text-[25vw] lg:text-[18vw] font-bodoni font-black leading-none uppercase tracking-tighter text-outline z-20 pointer-events-none">
          {/* 这里去掉了 MA 和句号之间的所有空格、换行和 margin，确保字距原汁原味 */}
          MA<span className="relative cursor-pointer group pointer-events-auto" style={{ WebkitTextStroke: '0px', color: '#111' }}>
            {/* 原生句号：承担绝对排版位置的基石 */}
            <span className="transition-opacity duration-300 group-hover:opacity-0">.</span>
            
            {/* 精雕微型 SVG：悬浮在原生句号正中央 */}
            <CatDotIcon className="absolute left-1/2 -translate-x-1/2 bottom-[0.12em] w-[0.16em] h-[0.16em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </span>
        </h1>

        {/* ================= 4. 左下角：重型网格斜杠排版 ================= */}
        <div className="absolute bottom-[8%] left-[8%] z-30 flex flex-col gap-5 lg:gap-6">
          {[
            "High-Stakes\nProject Governance",
            "Business-Centric\nGrowth Strategy",
            "Global Brand &\nStakeholder Influence"
          ].map((title, idx) => (
            <div key={idx} className="flex items-start gap-3 md:gap-4 group cursor-default">
              
              <span className="font-space text-[10px] md:text-[12px] font-bold text-black/30 mt-[2px]">
                /
              </span>
              
              <h3 className="font-inter font-black text-[12px] md:text-[14px] lg:text-[15px] leading-[1.1] tracking-tight uppercase text-[#111] whitespace-pre-line group-hover:opacity-60 transition-opacity">
                {title}
              </h3>
              
            </div>
          ))}
        </div>

        {/* ================= 5. 破坏性线条 ================= */}
        <div className="absolute top-[35%] left-[-2%] w-[25%] h-[1px] bg-black/40 z-30 hidden lg:block"></div>
        <div className="absolute bottom-[25%] right-[10%] w-[15%] h-[1px] bg-black/40 z-30 hidden lg:block"></div>

      </section>
    </>
  );
}