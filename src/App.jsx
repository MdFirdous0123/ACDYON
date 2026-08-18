import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import DashboardPage from './components/DashboardPage';
import useScrollReveal from './hooks/useScrollReveal';
import useDarkMode from './hooks/useDarkMode';

/* ── Konami Code Easter Egg ── */
const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

function useKonamiCode() {
  const [triggered, setTriggered] = useState(false);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (key === KONAMI[pos]) {
        const next = pos + 1;
        if (next === KONAMI.length) {
          setTriggered(true);
          setPos(0);
        } else {
          setPos(next);
        }
      } else {
        setPos(0);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pos]);

  const dismiss = useCallback(() => setTriggered(false), []);
  return [triggered, dismiss];
}

export default function App() {
  const [authModal, setAuthModal] = useState({ open: false, mode: 'signin' });
  const [user, setUser] = useState(null);
  const [dark, toggleDark] = useDarkMode();
  const [easterEgg, dismissEgg] = useKonamiCode();
  const scrollRef = useScrollReveal();

  const openAuth = (mode) => setAuthModal({ open: true, mode });
  const closeAuth = () => setAuthModal({ open: false, mode: 'signin' });

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setAuthModal({ open: false, mode: 'signin' });
  };

  const handleSignOut = () => {
    setUser(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dashboard view after login
  if (user) {
    return <DashboardPage user={user} onSignOut={handleSignOut} />;
  }

  return (
    <div id="top" className="min-h-screen" ref={scrollRef}>
      <Navbar
        onSignIn={() => openAuth('signin')}
        onSignUp={() => openAuth('signup')}
        dark={dark}
        toggleDark={toggleDark}
      />
      <main>
        <Hero onGetStarted={() => openAuth('signup')} />
        <Dashboard />
        <Features />
        <HowItWorks />
        <FinalCTA onGetStarted={() => openAuth('signup')} />
      </main>
      <Footer />
      <AuthModal
        isOpen={authModal.open}
        onClose={closeAuth}
        initialMode={authModal.mode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Easter Egg Modal – triggered by Konami Code */}
      {easterEgg && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center modal-overlay animate-fade-in" onClick={dismissEgg}>
          <div
            className="bg-white dark:bg-navy-light rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-5xl mb-4">🎮</p>
            <h3 className="text-xl font-bold text-navy mb-2">You found it!</h3>
            <p className="text-gray-600 text-sm mb-1">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Nothing unlocked — but you've got great instincts. We should probably hire you.
            </p>
            <button
              type="button"
              onClick={dismissEgg}
              className="bg-gradient-to-r from-primary to-primary-dark text-white font-medium px-6 py-2.5 rounded-xl cursor-pointer hover:shadow-lg transition-all"
            >
              Nice 🤝
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
