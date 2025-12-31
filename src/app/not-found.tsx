import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 gradient-purple opacity-20" />

            <div className="relative z-10 text-center max-w-lg">
                {/* 404 Text */}
                <h1 className="text-8xl md:text-9xl font-bold text-foreground mb-4">404</h1>

                {/* Message */}
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    Page not found
                </h2>
                <p className="text-muted-foreground mb-8">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="font-semibold">
                        <Link href="/">Go Home</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="font-semibold">
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mb-4">Or check out these pages:</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/features" className="text-primary hover:underline">Features</Link>
                        <Link href="/pricing" className="text-primary hover:underline">Pricing</Link>
                        <Link href="/use-cases" className="text-primary hover:underline">Use Cases</Link>
                        <Link href="/about" className="text-primary hover:underline">About</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
