import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // 核心魔法：关闭 Vercel 的服务器端图片处理，直接用原图！
  },
};

export default nextConfig;