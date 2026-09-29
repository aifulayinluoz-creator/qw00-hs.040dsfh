import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Home } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (page: string) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="relative mb-8">
          <h1 className="text-8xl font-black text-white/5">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🎨</div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-3">{t('404.title')}</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">{t('404.message')}</p>
        <button
          onClick={() => onNavigate('feed')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
        >
          <Home size={18} />
          {t('404.back')}
        </button>
      </div>
    </div>
  );
}
