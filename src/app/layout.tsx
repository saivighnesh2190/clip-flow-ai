import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClipFlow - AI-Powered DSA Progress Tracking",
  description: "Track your coding journey across LeetCode and Codeforces. Analyze performance, build consistency, and let AI guide your daily learning.",
  keywords: ["DSA", "LeetCode", "Codeforces", "coding progress", "AI learning", "interview prep"],
  authors: [{ name: "ClipFlow" }],
  openGraph: {
    title: "ClipFlow - AI-Powered DSA Progress Tracking",
    description: "Track your coding journey across LeetCode and Codeforces.",
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
      <body className={`${inter.variable} font-sans antialiased`}>
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
