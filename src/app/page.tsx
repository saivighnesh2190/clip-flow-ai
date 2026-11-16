import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import LiveDiagnosticDemo from "@/components/LiveDiagnosticDemo";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Comparison from "@/components/Comparison";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-indigo-500/20 selection:text-indigo-400">
      <Navbar />
      <Hero />
      <SocialProof />
      <LiveDiagnosticDemo />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Comparison />
      <FAQ />
      <Footer />
    </main>
  );
}
