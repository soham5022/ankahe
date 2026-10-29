import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CommunityProvider } from '../context/CommunityContext';

import { Home } from '../pages/Home';
import { TeaserMultilingualSpectrum } from '../components/teaser/TeaserMultilingualSpectrum';
import { TeaserTheThingsWeKeep } from '../components/teaser/TeaserTheThingsWeKeep';
import { TeaserSanctuaryDual } from '../components/teaser/TeaserSanctuaryDual';
import { ambientSound } from '../lib/ambientSound';

describe('ANKAHE 2.0 — Cinematic Teaser Experience Suite', () => {
  it('renders the 5-scene cinematic teaser journey on Home', async () => {
    render(
      <AuthProvider>
        <CommunityProvider>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </CommunityProvider>
      </AuthProvider>
    );

    // Scene 1: Opening & Wordmark
    expect(await screen.findByText(/Some things are easier to write than to explain/i)).toBeInTheDocument();
    expect(await screen.findByText(/Kabhi kisi ko kuch kehna tha/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ANKAHE/i).length).toBeGreaterThan(0);

    // Scene 2: The Things We Keep
    expect(screen.getAllByText(/The Things We Keep/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Khata • Unsent Letter/i)).toBeInTheDocument();

    // Scene 3: Different Kinds of Words
    expect(screen.getByText(/ANKAHE is for more than heartbreak/i)).toBeInTheDocument();

    // Scene 4: Sanctuary Dual
    expect(screen.getByText(/Designed for two equal purposes/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Personal Writing Desk/i)).toBeInTheDocument();

    // Scene 5: Threshold Invitation
    expect(screen.getByText(/Tumhari bhi koi kahani hogi na/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Read the story again/i })).toBeInTheDocument();
  });

  it('switches multilingual tabs smoothly in Scene 3', () => {
    render(<TeaserMultilingualSpectrum />);

    // Default tab is Stillness & Peace
    expect(screen.getByText(/आईच्या हातचा चहा/i)).toBeInTheDocument();

    // Click Sher & Poetry tab
    const poetryTab = screen.getByRole('tab', { name: /Sher & Poetry/i });
    fireEvent.click(poetryTab);

    // Should display Urdu poetry
    expect(screen.getByText(/وہ جو بیان سے باہر ہے/i)).toBeInTheDocument();

    // Click A Little Hope tab
    const hopeTab = screen.getByRole('tab', { name: /A Little Hope/i });
    fireEvent.click(hopeTab);

    // Should display hope narrative
    expect(screen.getByText(/Hope doesn’t always announce itself with trumpet calls/i)).toBeInTheDocument();
  });

  it('provides tactile resonance interaction in Scene 2', () => {
    const mockToast = vi.fn();
    const mockOpenLetter = vi.fn();

    render(
      <TeaserTheThingsWeKeep
        onOpenLetter={mockOpenLetter}
        onShowToast={mockToast}
      />
    );

    const resonateBtn = screen.getByLabelText(/I have felt this too/i);
    expect(resonateBtn).toBeInTheDocument();
    fireEvent.click(resonateBtn);

    expect(mockToast).toHaveBeenCalledWith(
      expect.stringContaining('Softly held in the quiet')
    );
  });

  it('procedural ambient audio manager starts strictly muted by default', () => {
    expect(ambientSound.getIsPlaying()).toBe(false);
  });
});
