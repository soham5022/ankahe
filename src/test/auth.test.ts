import { describe, it, expect } from 'vitest';

describe('Authentication & Profile Validation Tests', () => {
  it('validates username format rules (3-30 characters, alphanumeric and underscore)', () => {
    const isValidUsername = (u: string) => {
      const clean = u.trim().toLowerCase();
      if (clean.length < 3 || clean.length > 30) return false;
      return /^[a-zA-Z0-9_]+$/.test(clean);
    };

    expect(isValidUsername('soham_magar')).toBe(true);
    expect(isValidUsername('a_quiet_heart')).toBe(true);
    expect(isValidUsername('kalam123')).toBe(true);

    // Invalid usernames
    expect(isValidUsername('ab')).toBe(false); // too short
    expect(isValidUsername('a'.repeat(31))).toBe(false); // too long
    expect(isValidUsername('user@name')).toBe(false); // special char @
    expect(isValidUsername('user name')).toBe(false); // spaces
    expect(isValidUsername('user-name')).toBe(false); // hyphen
  });

  it('validates password length rule (minimum 6 characters)', () => {
    const isValidPassword = (p: string) => p.length >= 6;

    expect(isValidPassword('short')).toBe(false);
    expect(isValidPassword('secret')).toBe(true);
    expect(isValidPassword('securePassword123!')).toBe(true);
  });

  it('handles email confirmation required scenarios properly', () => {
    // When Supabase returns user but null session, confirmation is needed
    const checkNeedsConfirmation = (user: { id: string } | null, session: unknown | null) => {
      return Boolean(user && !session);
    };

    expect(checkNeedsConfirmation({ id: 'u123' }, null)).toBe(true);
    expect(checkNeedsConfirmation({ id: 'u123' }, { access_token: 'xyz' })).toBe(false);
    expect(checkNeedsConfirmation(null, null)).toBe(false);
  });

  it('generates safe fallback username from UUID if user does not supply one', () => {
    const generateFallback = (uuid: string) => {
      return 'writer_' + uuid.replace(/-/g, '').substring(0, 8);
    };

    const uuid = '6a5002eb-caeb-4c9f-971f-206d304009e8';
    const fallback = generateFallback(uuid);
    expect(fallback).toBe('writer_6a5002eb');
    expect(fallback.length).toBeGreaterThanOrEqual(3);
    expect(/^[a-zA-Z0-9_]+$/.test(fallback)).toBe(true);
  });
});

