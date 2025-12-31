import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhoneMockup from "@/components/PhoneMockup";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Comparison from "@/components/Comparison";
import FAQ from "@/components/FAQ";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PhoneMockup />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Comparison />
      <FAQ />
      <SocialProof />
      <Footer />
    </main>
  );
}
