import CryptoJS from 'crypto-js';

// Use a secret key from environment variable for encryption
// In production, this should be a secure random string stored in env
const getSecretKey = (): string => {
    // For client-side, we'll use a combination of user-specific data
    // This provides basic encryption - for production, consider server-side encryption
    return process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'clipflow-default-key-change-in-production';
};

/**
 * Encrypt a string using AES-256
 */
export function encrypt(text: string): string {
    if (!text) return '';
    const encrypted = CryptoJS.AES.encrypt(text, getSecretKey()).toString();
    return encrypted;
}

/**
 * Decrypt an AES-256 encrypted string
 */
export function decrypt(encryptedText: string): string {
    if (!encryptedText) return '';
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, getSecretKey());
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted;
    } catch {
        console.error('Decryption failed');
        return '';
    }
}

/**
 * Hash a string using SHA256 (one-way, for verification)
 */
export function hash(text: string): string {
    return CryptoJS.SHA256(text).toString();
}
