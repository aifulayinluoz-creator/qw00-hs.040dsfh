import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider, useApp } from './contexts/AppContext';
import Layout from './components/Layout';
import Feed from './components/Feed';
import Chat from './components/Chat';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import CookieBanner from './components/CookieBanner';
import NotFound from './components/NotFound';
import SettingsPage from './components/Settings';
import Auth from './components/Auth';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('feed');
  const { isLoggedIn } = useApp();

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // If not logged in, show auth page
  if (!isLoggedIn) {
    return <Auth onNavigate={navigate} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'feed':
        return <Feed />;
      case 'chat':
        return <Chat />;
      case 'create':
        return <CreatePost onNavigate={navigate} />;
      case 'profile':
        return <Profile onNavigate={navigate} />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <Terms />;
      case 'settings':
        return <SettingsPage onNavigate={navigate} />;
      default:
        return <NotFound onNavigate={navigate} />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={navigate}>
        {renderPage()}
      </Layout>
      <CookieBanner />
      
      {/* Footer links */}
      <footer className="hidden md:block border-t border-[#222] py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <p className="text-xs text-gray-700">© 2026 SketchShare. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('privacy')} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Privacidad
            </button>
            <button onClick={() => navigate('terms')} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Términos
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}
