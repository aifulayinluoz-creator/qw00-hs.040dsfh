import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Bell, Shield, FileText, Moon } from 'lucide-react';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

export default function SettingsPage({ onNavigate }: SettingsProps) {
  const { t, language, setLanguage } = useLanguage();

  const languages = [
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'pt' as const, name: 'Português', flag: '🇧🇷' },
    { code: 'de' as const, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja' as const, name: '日本語', flag: '🇯🇵' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{t('settings.title')}</h1>

      <div className="space-y-4">
        {/* Language */}
        <section className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1a1a1a] rounded-xl">
              <Globe size={18} className="text-gray-400" />
            </div>
            <h2 className="text-sm font-bold">{t('settings.language')}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  language === lang.code
                    ? 'bg-white text-black font-medium'
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#222] border border-[#222]'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1a1a1a] rounded-xl">
              <Bell size={18} className="text-gray-400" />
            </div>
            <h2 className="text-sm font-bold">{t('settings.notifications')}</h2>
          </div>
          <div className="space-y-3">
            {['Nuevos seguidores', 'Comentarios en tus posts', 'Me gusta en tus posts', 'Mensajes nuevos'].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">{item}</span>
                <div className="w-10 h-6 bg-white rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Legal */}
        <section className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1a1a1a] rounded-xl">
              <Shield size={18} className="text-gray-400" />
            </div>
            <h2 className="text-sm font-bold">Legal</h2>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => onNavigate('privacy')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-[#222] rounded-xl text-sm text-gray-400 hover:text-white hover:border-[#333] transition-all"
            >
              <FileText size={16} />
              {t('privacy.title')}
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border border-[#222] rounded-xl text-sm text-gray-400 hover:text-white hover:border-[#333] transition-all"
            >
              <FileText size={16} />
              {t('terms.title')}
            </button>
          </div>
        </section>

        {/* Theme */}
        <section className="bg-[#111] border border-[#222] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#1a1a1a] rounded-xl">
              <Moon size={18} className="text-gray-400" />
            </div>
            <h2 className="text-sm font-bold">{t('settings.theme')}</h2>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-xl text-sm font-medium">
              <Moon size={16} />
              Oscuro
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-[#333] text-gray-400 rounded-xl text-sm font-medium">
              ☀️
              Claro
            </button>
          </div>
        </section>

        {/* App Info */}
        <div className="text-center py-6">
          <p className="text-xs text-gray-600">SketchShare v1.0.0</p>
          <p className="text-xs text-gray-700 mt-1">© 2026 SketchShare. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
