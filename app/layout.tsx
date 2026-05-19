import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Julia Ma | Portfolio",
  description: "Personal Portfolio of Julia Ma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 1. 预连接字体服务器，提速加载 */}
        <link rel="preconnect" href="https://fonts.geekzu.org" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 2. 引入全量含可变轴参数的艺术字体包（国内极速响应，绝不阻塞首屏渲染） */}
        <link 
          href="https://fonts.geekzu.org/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,900;1,6..96,400&family=Inter:wght@300;400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}