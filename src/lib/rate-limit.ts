/**
 * Simple in-memory rate limiter
 * For production, use Redis-based rate limiting
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store (resets on server restart)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
if (typeof setInterval !== "undefined") {
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of rateLimitStore.entries()) {
            if (now > entry.resetTime) {
                rateLimitStore.delete(key);
            }
        }
    }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetTime: number;
}

/**
 * Check if request is allowed under rate limit
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = { maxRequests: 20, windowMs: 60 * 60 * 1000 } // 20 requests per hour
): RateLimitResult {
    const now = Date.now();
    const key = identifier;

    let entry = rateLimitStore.get(key);

    // Create new entry if none exists or window has expired
    if (!entry || now > entry.resetTime) {
        entry = {
            count: 0,
            resetTime: now + config.windowMs,
        };
        rateLimitStore.set(key, entry);
    }

    // Check if limit exceeded
    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: entry.resetTime,
        };
    }

    // Increment counter
    entry.count++;

    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetTime: entry.resetTime,
    };
}

/**
 * Rate limit middleware helper
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
    return {
        "X-RateLimit-Remaining": result.remaining.toString(),
        "X-RateLimit-Reset": new Date(result.resetTime).toISOString(),
    };
}

/**
 * Create rate limit error response
 */
export function rateLimitExceededResponse(): Response {
    return new Response(
        JSON.stringify({
            success: false,
            error: "Rate limit exceeded. Please try again later.",
        }),
        {
            status: 429,
            headers: {
                "Content-Type": "application/json",
                "Retry-After": "3600",
            },
        }
    );
}
