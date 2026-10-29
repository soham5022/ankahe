import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { CommunityWritingCard } from '../components/community/CommunityWritingCard';
import { AuthProvider } from '../context/AuthContext';
import { CommunityProvider } from '../context/CommunityContext';
import type { WritingItem } from '../types';

describe('UI & Accessibility Component Tests', () => {
  it('renders NotFoundPage with proper 404 message and navigation links', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/A road that hasn't been written/i)).toBeInTheDocument();
    expect(screen.getByText(/Community Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Public Teaser/i)).toBeInTheDocument();
  });

  it('renders Urdu writing card with rtl direction attribute and proper typography', async () => {
    const urduItem: WritingItem = {
      id: 'urdu-1',
      title: 'خاموشی',
      content: 'خاموش رات اور ہوا کا چلنا',
      author: 'ज़िया',
      type: 'Sher & Shayari',
      language: 'Urdu',
      category: 'loneliness',
      visibility: 'public',
    };

    render(
      <AuthProvider>
        <CommunityProvider>
          <BrowserRouter>
            <CommunityWritingCard item={urduItem} />
          </BrowserRouter>
        </CommunityProvider>
      </AuthProvider>
    );

    const contentEl = await screen.findByText('خاموش رات اور ہوا کا چلنا');
    expect(contentEl).toBeInTheDocument();
    expect(contentEl).toHaveAttribute('dir', 'rtl');
    expect(contentEl).toHaveClass('poetry-urdu');
  });

  it('renders Devanagari writing card with ltr direction and devanagari typography', async () => {
    const hindiItem: WritingItem = {
      id: 'hindi-1',
      title: 'ख़ामोशी',
      content: 'ज़रूरी नहीं हर ख़ामोशी में कोई उदासी ही छुपी हो।',
      author: 'काफ़िर',
      type: 'Sher & Shayari',
      language: 'Hindi',
      category: 'peace',
      visibility: 'public',
    };

    render(
      <AuthProvider>
        <CommunityProvider>
          <BrowserRouter>
            <CommunityWritingCard item={hindiItem} />
          </BrowserRouter>
        </CommunityProvider>
      </AuthProvider>
    );

    const contentEl = await screen.findByText('ज़रूरी नहीं हर ख़ामोशी में कोई उदासी ही छुपी हो।');
    expect(contentEl).toBeInTheDocument();
    expect(contentEl).toHaveAttribute('dir', 'ltr');
    expect(contentEl).toHaveClass('poetry-devanagari');
  });
});
