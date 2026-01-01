"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const plans = {
    pro: { name: "Pro", price: "₹415", priceUsd: "$5", features: ["Unlimited AI messages", "1-year analytics history", "Priority support", "Advanced insights"] },
    team: { name: "Team", price: "₹1,245", priceUsd: "$15", features: ["Everything in Pro", "Up to 5 team members", "Shared goals & streaks", "Team analytics dashboard"] },
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const plan = searchParams.get("plan") as "pro" | "team";
    const selectedPlan = plans[plan] || plans.pro;

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <Card className="relative z-10 w-full max-w-md p-8 bg-slate-800/90 border-slate-700 backdrop-blur-xl shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium mb-4">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                        Test Mode
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-2xl font-bold text-white">ClipFlow</span>
                    </div>
                    <p className="text-slate-400 text-sm">Secure Payment Gateway</p>
                </div>

                {/* Plan Details */}
                <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300">{selectedPlan.name} Plan</span>
                        <span className="text-white font-bold">{selectedPlan.price}/mo</span>
                    </div>
                    <p className="text-xs text-slate-400">{selectedPlan.priceUsd} USD • Billed monthly</p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-8">
                    {selectedPlan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {feature}
                        </div>
                    ))}
                </div>

                {/* Coming Soon Card */}
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl p-6 text-center mb-6">
                    <div className="text-4xl mb-3">🚀</div>
                    <h3 className="text-xl font-bold text-white mb-2">Coming Soon!</h3>
                    <p className="text-slate-300 text-sm">
                        Payment integration is currently in development.
                        Premium features will be available soon!
                    </p>
                </div>

                {/* Fake Payment Form (Disabled) */}
                <div className="space-y-4 opacity-50">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Card Number</label>
                        <input
                            type="text"
                            placeholder="4242 4242 4242 4242"
                            disabled
                            className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-slate-400 cursor-not-allowed"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Expiry</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                disabled
                                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-slate-400 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">CVV</label>
                            <input
                                type="text"
                                placeholder="123"
                                disabled
                                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-slate-400 cursor-not-allowed"
                            />
                        </div>
                    </div>
                    <Button disabled className="w-full py-6 text-lg cursor-not-allowed">
                        Pay {selectedPlan.price}
                    </Button>
                </div>

                {/* Back Button */}
                <div className="mt-6 text-center">
                    <Button variant="ghost" className="text-slate-400 hover:text-white" asChild>
                        <Link href="/pricing">← Back to Pricing</Link>
                    </Button>
                </div>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-slate-700 flex items-center justify-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        SSL Secured
                    </div>
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        Powered by Razorpay
                    </div>
                </div>
            </Card>
        </main>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full" />
            </main>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
