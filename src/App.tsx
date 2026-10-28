import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CommunityProvider } from './context/CommunityContext';

// Public Phase 1 Teaser
import { Home } from './pages/Home';

// Public Informational & Auth Pages
import { AboutPage } from './pages/AboutPage';
import { PrinciplesPage } from './pages/PrinciplesPage';
import { AuthLoginPage } from './pages/AuthLoginPage';
import { AuthSignupPage } from './pages/AuthSignupPage';

// Community Phase 2 Pages
import { CommunityHome } from './pages/CommunityHome';
import { Discover } from './pages/Discover';
import { WriteStudio } from './pages/WriteStudio';
import { UnsentLettersPage } from './pages/UnsentLettersPage';
import { QuietCornerPage } from './pages/QuietCornerPage';
import { MySpacePage } from './pages/MySpacePage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  return (
    <CommunityProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/principles" element={<PrinciplesPage />} />
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/signup" element={<AuthSignupPage />} />

          {/* Community Routes */}
          <Route path="/home" element={<CommunityHome />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/write" element={<WriteStudio />} />
          <Route path="/unsent-letters" element={<UnsentLettersPage />} />
          <Route path="/quiet-corner" element={<QuietCornerPage />} />
          <Route path="/my-space" element={<MySpacePage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CommunityProvider>
  );
}

export default App;
