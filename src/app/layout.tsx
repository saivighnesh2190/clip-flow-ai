import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClipFlow - AI-Powered DSA Progress Tracking",
  description: "Track your coding journey across LeetCode, CodeChef, and Codeforces. Analyze performance, build consistency, and let AI guide your daily learning.",
  keywords: ["DSA", "LeetCode", "CodeChef", "Codeforces", "coding progress", "AI learning", "interview prep"],
  authors: [{ name: "ClipFlow" }],
  openGraph: {
    title: "ClipFlow - AI-Powered DSA Progress Tracking",
    description: "Track your coding journey across LeetCode, CodeChef, and Codeforces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
