import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { Home, MessageCircle, PlusCircle, User, Globe, Menu, X, LogOut, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { t, language, setLanguage } = useLanguage();
  const { isLoggedIn, logout } = useApp();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const languages = [
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'pt' as const, name: 'Português', flag: '🇧🇷' },
    { code: 'de' as const, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja' as const, name: '日本語', flag: '🇯🇵' },
  ];

  const navItems = [
    { id: 'feed', icon: Home, label: t('nav.feed') },
    { id: 'chat', icon: MessageCircle, label: t('nav.chat') },
    { id: 'create', icon: PlusCircle, label: t('nav.create') },
    { id: 'profile', icon: User, label: t('nav.profile') },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#222]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate('feed')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20L8 4L12 14L16 8L20 20" />
                <circle cx="16" cy="5" r="2" fill="black" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block">SketchShare</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all text-sm"
                aria-label={t('lang.select')}
              >
                <Globe size={18} />
                <span className="hidden sm:inline text-xs uppercase">{language}</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl py-2 w-48 animate-fade-in z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        language === lang.code ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-[#222]'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all"
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-[#0a0a0a] border-t border-[#222] animate-slide-up">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setShowMobileMenu(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-white text-black'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => { onNavigate('settings'); setShowMobileMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all"
              >
                <Settings size={20} />
                <span>{t('settings.title')}</span>
              </button>
              {isLoggedIn && (
                <button
                  onClick={() => { logout(); setShowMobileMenu(false); onNavigate('feed'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-[#1a1a1a] transition-all"
                >
                  <LogOut size={20} />
                  <span>{t('auth.logout')}</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-14 pb-20 md:pb-4">
        {children}
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#222] z-50">
        <div className="flex items-center justify-around h-16">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px] ${
                currentPage === item.id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <item.icon size={22} strokeWidth={currentPage === item.id ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Click outside handler for language menu */}
      {showLangMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
      )}
    </div>
  );
}
