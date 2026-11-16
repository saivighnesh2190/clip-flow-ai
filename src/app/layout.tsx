import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClipFlow — The High-Craft DSA Progress Intelligence Platform",
  description: "Unified telemetry across LeetCode, Codeforces, and CodeChef. Automated pattern-gap diagnostics, real-time rating tracking, and zero-spoiler AI drills.",
  keywords: ["DSA", "LeetCode", "Codeforces", "CodeChef", "algorithmic interview", "AI DSA tracker", "competitive programming"],
  authors: [{ name: "N Sai Vighnesh" }],
  openGraph: {
    title: "ClipFlow — The High-Craft DSA Progress Intelligence Platform",
    description: "Unified telemetry across LeetCode, Codeforces, and CodeChef. Automated pattern-gap diagnostics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased apple-canvas-ambient text-foreground min-h-screen selection:bg-blue-500/20 selection:text-blue-400`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
