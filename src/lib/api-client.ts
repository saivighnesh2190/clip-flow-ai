/**
 * API Client with retry logic and error handling
 */

interface FetchOptions extends RequestInit {
    retries?: number;
    retryDelay?: number;
}

const DEFAULT_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second

/**
 * Fetch with automatic retry on failure
 */
export async function fetchWithRetry(
    url: string,
    options: FetchOptions = {}
): Promise<Response> {
    const { retries = DEFAULT_RETRIES, retryDelay = DEFAULT_RETRY_DELAY, ...fetchOptions } = options;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, fetchOptions);

            // Don't retry on client errors (4xx), only on server errors (5xx) or network issues
            if (response.ok || (response.status >= 400 && response.status < 500)) {
                return response;
            }

            // Server error - throw to trigger retry
            throw new Error(`Server error: ${response.status}`);
        } catch (error) {
            lastError = error as Error;

            // Don't retry on the last attempt
            if (attempt < retries) {
                // Exponential backoff: 1s, 2s, 4s, ...
                const delay = retryDelay * Math.pow(2, attempt);
                console.log(`Retry attempt ${attempt + 1}/${retries} after ${delay}ms`);
                await sleep(delay);
            }
        }
    }

    throw lastError || new Error("Request failed after retries");
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safe JSON parse with fallback
 */
export async function safeJsonParse<T>(response: Response, fallback: T): Promise<T> {
    try {
        return await response.json();
    } catch {
        console.error("Failed to parse JSON response");
        return fallback;
    }
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Make API request with standard error handling
 */
export async function apiRequest<T>(
    url: string,
    options: FetchOptions = {}
): Promise<ApiResponse<T>> {
    try {
        const response = await fetchWithRetry(url, options);
        const data = await safeJsonParse<ApiResponse<T>>(response, {
            success: false,
            error: "Failed to parse response",
        });

        if (!response.ok) {
            return {
                success: false,
                error: data.error || `Request failed with status ${response.status}`,
            };
        }

        return data;
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
