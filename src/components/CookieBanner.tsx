import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Cookie, X, Settings } from 'lucide-react';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('sketchshare-cookies');
    if (!consent) {
      setTimeout(() => setShow(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sketchshare-cookies', JSON.stringify({ essential: true, analytics: true, marketing: true }));
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem('sketchshare-cookies', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    setShow(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('sketchshare-cookies', JSON.stringify(preferences));
    setShow(false);
    setShowSettings(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50 animate-slide-up">
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-[#333] rounded-2xl p-5 shadow-2xl">
        {!showSettings ? (
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#222] rounded-xl flex-shrink-0">
              <Cookie size={20} className="text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {t('cookie.message')}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-gray-200 transition-all"
                >
                  {t('cookie.accept')}
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 border border-[#444] text-gray-400 rounded-lg text-xs font-medium hover:text-white hover:border-[#666] transition-all"
                >
                  {t('cookie.reject')}
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-300 text-xs font-medium transition-colors flex items-center gap-1"
                >
                  <Settings size={12} />
                  {t('cookie.settings')}
                </button>
              </div>
            </div>
            <button
              onClick={() => setShow(false)}
              className="p-1 text-gray-600 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold">{t('cookie.settings')}</h3>
              <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#222] rounded-xl">
                <div>
                  <p className="text-sm font-medium">Esenciales</p>
                  <p className="text-xs text-gray-500">Necesarias para el funcionamiento</p>
                </div>
                <div className="w-10 h-6 bg-white rounded-full relative cursor-not-allowed">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#222] rounded-xl">
                <div>
                  <p className="text-sm font-medium">Analíticas</p>
                  <p className="text-xs text-gray-500">Google Analytics GA4</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={`w-10 h-6 rounded-full relative transition-colors ${preferences.analytics ? 'bg-white' : 'bg-[#444]'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${preferences.analytics ? 'right-1 bg-black' : 'left-1 bg-gray-500'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#222] rounded-xl">
                <div>
                  <p className="text-sm font-medium">Marketing</p>
                  <p className="text-xs text-gray-500">Cookies publicitarias</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className={`w-10 h-6 rounded-full relative transition-colors ${preferences.marketing ? 'bg-white' : 'bg-[#444]'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${preferences.marketing ? 'right-1 bg-black' : 'left-1 bg-gray-500'}`} />
                </button>
              </div>
            </div>
            <button
              onClick={handleSavePreferences}
              className="w-full mt-4 px-4 py-2.5 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-all"
            >
              Guardar preferencias
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
