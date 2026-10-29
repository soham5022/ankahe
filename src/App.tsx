import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CommunityProvider } from './context/CommunityContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Public Phase 1 Teaser
import { Home } from './pages/Home';

// Public Informational & Auth Pages
import { AboutPage } from './pages/AboutPage';
import { PrinciplesPage } from './pages/PrinciplesPage';
import { AuthLoginPage } from './pages/AuthLoginPage';
import { AuthSignupPage } from './pages/AuthSignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';

// Community Pages
import { CommunityHome } from './pages/CommunityHome';
import { Discover } from './pages/Discover';
import { WriteStudio } from './pages/WriteStudio';
import { UnsentLettersPage } from './pages/UnsentLettersPage';
import { QuietCornerPage } from './pages/QuietCornerPage';
import { MySpacePage } from './pages/MySpacePage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { WritingDetailPage } from './pages/WritingDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <CommunityProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/principles" element={<PrinciplesPage />} />
            <Route path="/login" element={<AuthLoginPage />} />
            <Route path="/signup" element={<AuthSignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />

            {/* Public Discovery / Reading Routes */}
            <Route path="/home" element={<CommunityHome />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/unsent-letters" element={<UnsentLettersPage />} />
            <Route path="/quiet-corner" element={<QuietCornerPage />} />
            <Route path="/writing/:id" element={<WritingDetailPage />} />

            {/* Protected Personal Routes */}
            <Route
              path="/write"
              element={
                <ProtectedRoute>
                  <WriteStudio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-space"
              element={
                <ProtectedRoute>
                  <MySpacePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CommunityProvider>
    </AuthProvider>
  );
}

export default App;
