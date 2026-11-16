"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { 
  Terminal, 
  Sparkles, 
  Github, 
  LayoutDashboard, 
  User as UserIcon, 
  Menu, 
  X,
  Layers,
  BarChart3,
  Flame,
  ArrowRight
} from "lucide-react";

const publicNavLinks = [
  { label: "Architecture", href: "#features" },
  { label: "Interactive Diagnostic", href: "#diagnostic-demo" },
  { label: "Pipeline", href: "#how-it-works" },
  { label: "Benchmark", href: "#comparison" },
  { label: "FAQ", href: "#faq" },
];

const authNavLinks = [
  { label: "Command Center", href: "/dashboard" },
  { label: "Deep Analytics", href: "/analytics" },
  { label: "Profile", href: "/profile" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (e) {
        console.error("Auth check failed:", e);
      } finally {
        setLoading(false);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const navLinks = user ? authNavLinks : publicNavLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 pointer-events-none">
      <nav className="max-w-6xl mx-auto rounded-full apple-island-dock pointer-events-auto px-4 sm:px-6 py-2 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/20 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  ClipFlow
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium apple-glass-pill text-muted-foreground">
                  v2.4
                </span>
              </div>
            </Link>

            {/* Platform Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>APIs Nominal</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.04] dark:bg-white/[0.04] border border-white/[0.08] rounded-full p-1 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-all rounded-full hover:bg-white/10 dark:hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs & Utilities */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="https://github.com/saivighnesh2190/clip-flow-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full apple-glass-pill transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">GitHub</span>
            </a>

            <ThemeToggle />

            {loading ? (
              <div className="w-20 h-8 apple-glass-pill animate-pulse rounded-full" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Button size="sm" className="h-8 text-xs font-medium apple-button-prominent" asChild>
                  <Link href="/dashboard" className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Console
                  </Link>
                </Button>
                <Link
                  href="/profile"
                  className="w-8 h-8 rounded-full apple-glass-pill flex items-center justify-center text-xs font-semibold text-foreground hover:border-primary transition-all shadow-xs"
                  aria-label="Profile Settings"
                >
                  {user.email?.charAt(0).toUpperCase() || <UserIcon className="w-3.5 h-3.5" />}
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground rounded-full" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" className="h-8 text-xs font-medium apple-button-prominent" asChild>
                  <Link href="/signup" className="flex items-center gap-1">
                    Connect Free
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground apple-glass-pill transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-2">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {user ? (
                <>
                  <Button size="sm" className="w-full text-xs font-medium apple-button-prominent" asChild>
                    <Link href="/dashboard">Open Command Center</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs font-medium apple-glass-pill" asChild>
                    <Link href="/profile">Account Settings</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="w-full text-xs font-medium apple-glass-pill" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button size="sm" className="w-full text-xs font-medium apple-button-prominent" asChild>
                    <Link href="/signup">Get Started Free</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
