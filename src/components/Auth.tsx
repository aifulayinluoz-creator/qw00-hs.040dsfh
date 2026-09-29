import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface AuthProps {
  onNavigate: (page: string) => void;
}

export default function Auth({ onNavigate }: AuthProps) {
  const { t } = useLanguage();
  const { login, register } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = t('form.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('form.email.invalid');
    }

    if (!password.trim()) {
      newErrors.password = t('form.required');
    } else if (password.length < 6) {
      newErrors.password = t('form.password.min');
    }

    if (!isLogin && !username.trim()) {
      newErrors.username = t('form.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      if (isLogin) {
        login(email, password);
      } else {
        register(username, email, password);
      }
      setIsLoading(false);
      onNavigate('feed');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20L8 4L12 14L16 8L20 20" />
              <circle cx="16" cy="5" r="2" fill="black" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">SketchShare</h1>
          <p className="text-sm text-gray-500 mt-1">Comunidad para amantes del dibujo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#111] border border-[#222] rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-center mb-2">
            {isLogin ? t('auth.login') : t('auth.register')}
          </h2>

          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
                {t('auth.username')}
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setErrors(prev => ({ ...prev, username: '' })); }}
                  className={`w-full bg-[#1a1a1a] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors ${
                    errors.username ? 'border-red-500/50' : 'border-[#333] focus:border-[#555]'
                  }`}
                  placeholder="tu_usuario"
                  maxLength={30}
                />
              </div>
              {errors.username && <p className="text-xs text-red-400 mt-1">{errors.username}</p>}
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
                className={`w-full bg-[#1a1a1a] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors ${
                  errors.email ? 'border-red-500/50' : 'border-[#333] focus:border-[#555]'
                }`}
                placeholder="correo@ejemplo.com"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }}
                className={`w-full bg-[#1a1a1a] border rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors ${
                  errors.password ? 'border-red-500/50' : 'border-[#333] focus:border-[#555]'
                }`}
                placeholder="••••••••"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              isLogin ? t('auth.login') : t('auth.register')
            )}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button
            onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
            className="text-white font-medium ml-1 hover:underline"
          >
            {isLogin ? t('auth.register') : t('auth.login')}
          </button>
        </p>

        {/* Footer links */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => onNavigate('privacy')} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            {t('privacy.title')}
          </button>
          <span className="text-gray-800">·</span>
          <button onClick={() => onNavigate('terms')} className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            {t('terms.title')}
          </button>
        </div>
      </div>
    </div>
  );
}
