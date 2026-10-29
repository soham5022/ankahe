import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { CommunityProvider } from '../context/CommunityContext';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

import { Home } from '../pages/Home';
import { AboutPage } from '../pages/AboutPage';
import { PrinciplesPage } from '../pages/PrinciplesPage';
import { AuthLoginPage } from '../pages/AuthLoginPage';
import { AuthSignupPage } from '../pages/AuthSignupPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { CommunityHome } from '../pages/CommunityHome';
import { Discover } from '../pages/Discover';
import { UnsentLettersPage } from '../pages/UnsentLettersPage';
import { QuietCornerPage } from '../pages/QuietCornerPage';
import { WritingDetailPage } from '../pages/WritingDetailPage';
import { MySpacePage } from '../pages/MySpacePage';
import { WriteStudio } from '../pages/WriteStudio';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

function renderWithRoute(route: string) {
  return render(
    <AuthProvider>
      <CommunityProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/principles" element={<PrinciplesPage />} />
            <Route path="/login" element={<AuthLoginPage />} />
            <Route path="/signup" element={<AuthSignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/home" element={<CommunityHome />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/unsent-letters" element={<UnsentLettersPage />} />
            <Route path="/quiet-corner" element={<QuietCornerPage />} />
            <Route path="/writing/:id" element={<WritingDetailPage />} />
            <Route path="/my-space" element={<ProtectedRoute><MySpacePage /></ProtectedRoute>} />
            <Route path="/write" element={<ProtectedRoute><WriteStudio /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </CommunityProvider>
    </AuthProvider>
  );
}

describe('Full Application Routes & Navigation Test Suite', () => {
  it('renders public teaser on /', async () => {
    renderWithRoute('/');
    expect(await screen.findByText(/Kabhi kuch kehna tha/i)).toBeInTheDocument();
  });

  it('renders About page on /about', async () => {
    renderWithRoute('/about');
    expect(await screen.findByText(/A place for the words we keep inside/i)).toBeInTheDocument();
  });

  it('renders Principles page on /principles', async () => {
    renderWithRoute('/principles');
    expect(await screen.findByText(/Community Principles/i)).toBeInTheDocument();
  });

  it('renders Login page on /login', async () => {
    renderWithRoute('/login');
    expect(await screen.findByText(/Welcome back to the circle/i)).toBeInTheDocument();
  });

  it('renders Signup page on /signup', async () => {
    renderWithRoute('/signup');
    expect(await screen.findByText(/Choose how you are known/i)).toBeInTheDocument();
  });

  it('renders Forgot Password page on /forgot-password', async () => {
    renderWithRoute('/forgot-password');
    expect(await screen.findByText(/Recover your sanctuary/i)).toBeInTheDocument();
  });

  it('renders Reset Password page on /reset-password', async () => {
    renderWithRoute('/reset-password');
    expect(await screen.findByText(/Choose a new password/i)).toBeInTheDocument();
  });

  it('renders Community Home on /home', async () => {
    renderWithRoute('/home');
    expect(await screen.findByText(/Welcome to ANKAHE/i)).toBeInTheDocument();
  });

  it('renders Discover on /discover', async () => {
    renderWithRoute('/discover');
    expect(await screen.findByText(/Discover words that resonate/i)).toBeInTheDocument();
  });

  it('renders Unsent Letters on /unsent-letters', async () => {
    renderWithRoute('/unsent-letters');
    expect(await screen.findByText(/For the words that never found their way/i)).toBeInTheDocument();
  });

  it('renders Quiet Corner on /quiet-corner', async () => {
    renderWithRoute('/quiet-corner');
    expect(await screen.findByText(/Quiet Corner/i)).toBeInTheDocument();
  });

  it('redirects unauthenticated user to login when accessing protected /my-space', async () => {
    renderWithRoute('/my-space');
    // Because user is null, ProtectedRoute navigates to /login
    expect(await screen.findByText(/Welcome back to the circle/i)).toBeInTheDocument();
  });

  it('renders 404 NotFoundPage on unknown route', async () => {
    renderWithRoute('/some/non-existent/route');
    expect(await screen.findByText(/A road that hasn't been written/i)).toBeInTheDocument();
  });
});
