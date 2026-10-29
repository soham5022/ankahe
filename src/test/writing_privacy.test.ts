import { describe, it, expect } from 'vitest';
import { mapDatabaseWriting, formatWritingDate } from '../lib/writingsService';

describe('Writing & Privacy Integrity Tests', () => {
  const mockAnonymousRow = {
    id: 'w-anon-123',
    user_id: 'user-secret-999',
    title: 'A Secret Midnight Thought',
    content: 'Some words meant to float away into the night without a name attached.',
    content_type: 'Thought',
    language: 'Hindi',
    mood: 'nostalgia',
    visibility: 'anonymous',
    status: 'published',
    created_at: '2026-10-28T20:00:00Z',
    updated_at: '2026-10-28T20:00:00Z',
    profiles: {
      id: 'user-secret-999',
      username: 'private_author_do_not_leak',
      display_name: 'Real Pen Name',
      avatar_url: 'https://example.com/avatar.png',
    },
  };

  const mockPublicRow = {
    id: 'w-pub-456',
    user_id: 'user-visible-111',
    title: 'A Shared Horizon',
    content: 'We sat together and watched the dusk turn to blue.',
    content_type: 'Poetry',
    language: 'English',
    mood: 'peace',
    visibility: 'public',
    status: 'published',
    created_at: '2026-10-28T21:00:00Z',
    updated_at: '2026-10-28T21:00:00Z',
    profiles: {
      id: 'user-visible-111',
      username: 'quiet_poet',
      display_name: 'A Quiet Heart',
      avatar_url: 'https://example.com/avatar1.png',
    },
  };

  it('strictly scrubs author user_id and profile data for anonymous posts when viewed by other users', () => {
    // Non-author user viewing
    const otherUserId = 'user-viewer-888';
    const mapped = mapDatabaseWriting(mockAnonymousRow, otherUserId);

    expect(mapped.author).toBe('Anonymous');
    expect(mapped.userId).toBeUndefined(); // Never leak internal user_id
    expect(mapped.authorUsername).toBeUndefined(); // Never leak username
    expect(mapped.authorAvatar).toBeUndefined(); // Never leak avatar
    expect(mapped.isAnonymous).toBe(true);
  });

  it('strictly scrubs author user_id and profile data for anonymous posts when viewed unauthenticated', () => {
    // Unauthenticated visitor (currentUserId is undefined)
    const mapped = mapDatabaseWriting(mockAnonymousRow, undefined);

    expect(mapped.author).toBe('Anonymous');
    expect(mapped.userId).toBeUndefined();
    expect(mapped.authorUsername).toBeUndefined();
    expect(mapped.authorAvatar).toBeUndefined();
    expect(mapped.isAnonymous).toBe(true);
  });

  it('reminds the author that they posted anonymously when viewing their own anonymous piece', () => {
    const authorId = 'user-secret-999';
    const mapped = mapDatabaseWriting(mockAnonymousRow, authorId);

    expect(mapped.author).toBe('You (Posted Anonymously)');
    expect(mapped.userId).toBe('user-secret-999');
    expect(mapped.isAnonymous).toBe(true);
  });

  it('preserves public author identity for public writings', () => {
    const viewerId = 'user-viewer-888';
    const mapped = mapDatabaseWriting(mockPublicRow, viewerId);

    expect(mapped.author).toBe('A Quiet Heart');
    expect(mapped.authorUsername).toBe('quiet_poet');
    expect(mapped.authorAvatar).toBe('https://example.com/avatar1.png');
    expect(mapped.isAnonymous).toBe(false);
  });

  it('assigns correct typography script style based on language', () => {
    const hindi = mapDatabaseWriting({ ...mockPublicRow, language: 'Hindi' });
    expect(hindi.scriptStyle).toBe('devanagari');

    const marathi = mapDatabaseWriting({ ...mockPublicRow, language: 'Marathi' });
    expect(marathi.scriptStyle).toBe('devanagari');

    const urdu = mapDatabaseWriting({ ...mockPublicRow, language: 'Urdu' });
    expect(urdu.scriptStyle).toBe('nastaliq');

    const english = mapDatabaseWriting({ ...mockPublicRow, language: 'English' });
    expect(english.scriptStyle).toBe('serif');
  });

  it('formats dates into readable human approximations without raw seconds or leak', () => {
    const formatted = formatWritingDate('2026-10-28T12:00:00Z');
    expect(typeof formatted).toBe('string');
    expect(formatted.length).toBeGreaterThan(0);
    expect(formatted).not.toContain('T');
    expect(formatted).not.toContain('Z');

    // Handles missing date safely
    expect(formatWritingDate(undefined)).toBe('Moments ago');
    expect(formatWritingDate('invalid-date')).toBe('Recently');
  });
});

