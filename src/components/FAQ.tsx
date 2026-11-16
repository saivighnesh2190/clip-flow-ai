"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Terminal } from "lucide-react";

const faqs = [
  {
    id: "faq-1",
    question: "How does ClipFlow sync progress without requiring my passwords?",
    answer: "ClipFlow only requires your public usernames for LeetCode and Codeforces. It queries the platforms' public APIs and GraphQL endpoints to retrieve your publicly visible solved list, submission counts, and contest rating history. We never ask for, collect, or store your passwords.",
  },
  {
    id: "faq-2",
    question: "How does the Gemini diagnostic engine analyze my weaknesses?",
    answer: "ClipFlow categorizes your solved problems into 14 foundational algorithmic patterns (e.g. Monotonic Stack, Disjoint Set Union, 2D State DP). The Gemini engine evaluates your distribution and timeout logs to detect where you are over-relying on brute-force O(N²) approaches or under-practicing core patterns.",
  },
  {
    id: "faq-3",
    question: "What makes the 'Zero-Spoiler' hint mode different from regular AI bots?",
    answer: "Generic LLMs often output the entire solution or code on the first prompt, ruining the learning process. ClipFlow enforces a strict 3-tier disclosure ladder: Level 1 provides the mathematical invariant; Level 2 provides the target time/space complexity; Level 3 provides pseudo-code architecture. You preserve the problem-solving struggle.",
  },
  {
    id: "faq-4",
    question: "Is ClipFlow genuinely free for engineering students?",
    answer: "Yes. All core capabilities—multi-platform telemetry, unified solved matrix, pattern gap diagnostics, and daily drills—are completely free and open-source. Optional pro team tiers for university clubs and mentor cohorts are planned for future releases.",
  },
  {
    id: "faq-5",
    question: "Which platforms are supported right now?",
    answer: "LeetCode and Codeforces are fully supported and live today with real-time sync. CodeChef integration is in active development and scheduled for the next release.",
  },
  {
    id: "faq-6",
    question: "Can I use ClipFlow for campus placement and off-campus FAANG prep?",
    answer: "Yes, specifically. The curriculum ladders are indexed against the 70 highest-frequency interview patterns asked during technical screenings at Google, Amazon, Microsoft, Uber, and top-tier product startups.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 border-b border-border/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-mono text-muted-foreground mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>Technical FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Frequently asked questions.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Everything you need to know about the telemetry engine, privacy model, and AI diagnostics.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="obsidian-card rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={faq.id}
                  className="w-full px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between text-left hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-foreground" : ""
                    }`}
                  />
                </button>

                <div
                  id={faq.id}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Question Fallback */}
        <div className="text-center mt-12 text-xs font-mono text-muted-foreground">
          Need custom university cohort support?{" "}
          <a href="mailto:nsaivighnesh@zohomail.in" className="text-foreground underline underline-offset-4 hover:text-indigo-400 transition-colors">
            Contact engineering
          </a>
        </div>
      </div>
    </section>
  );
}
