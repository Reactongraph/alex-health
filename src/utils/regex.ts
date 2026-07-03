/**
 * Common, reusable regular expressions.
 * Generic validation patterns only — no app-specific rules.
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const URL_REGEX = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

// Digits, spaces, dashes, parentheses and an optional leading "+".
export const PHONE_REGEX = /^\+?[\d\s()-]{7,}$/;
