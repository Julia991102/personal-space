import type { Metadata } from "next";
import { Inter, Space_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";

// 1. 在 Vercel 打包时提前下载字体，彻底告别外部请求
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "900"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

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
      {/* 2. 将字体的 CSS 变量直接注入到 body，全局生效 */}
      <body className={`${inter.variable} ${spaceMono.variable} ${bodoniModa.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}