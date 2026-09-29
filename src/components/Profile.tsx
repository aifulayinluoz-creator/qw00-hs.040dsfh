import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { Camera, Edit3, Grid, Bookmark, Settings, LogOut } from 'lucide-react';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  const { t } = useLanguage();
  const { currentUser, setCurrentUser, posts, logout } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editUsername, setEditUsername] = useState(currentUser.username);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  const handleSaveProfile = () => {
    setCurrentUser({
      ...currentUser,
      name: editName,
      bio: editBio,
      username: editUsername,
    });
    setIsEditing(false);
  };

  const userPosts = posts.filter(p => p.userId === currentUser.id);
  const savedPosts = posts.filter(p => currentUser.savedPosts.includes(p.id));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="bg-[#111] rounded-2xl border border-[#222] overflow-hidden mb-6">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] relative">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 128">
              <path d="M0,80 Q100,20 200,80 T400,80" fill="none" stroke="white" strokeWidth="0.5" />
              <path d="M0,100 Q100,40 200,100 T400,100" fill="none" stroke="white" strokeWidth="0.3" />
            </svg>
          </div>
        </div>

        {/* Avatar & Info */}
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="flex items-end gap-4 mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#333] to-[#1a1a1a] flex items-center justify-center text-2xl font-bold border-4 border-[#111]">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-1 right-1 p-1.5 bg-white rounded-full text-black hover:bg-gray-200 transition-colors">
                <Camera size={12} />
              </button>
            </div>
            <div className="flex-1 pt-14">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{currentUser.name}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all"
                >
                  <Edit3 size={14} />
                </button>
              </div>
              <p className="text-sm text-gray-500">@{currentUser.username}</p>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed mb-4">{currentUser.bio}</p>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-lg font-bold">{userPosts.length || posts.filter(p => p.userId === currentUser.id).length}</p>
              <p className="text-xs text-gray-500">{t('profile.posts')}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{currentUser.followers}</p>
              <p className="text-xs text-gray-500">{t('profile.followers')}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{currentUser.following}</p>
              <p className="text-xs text-gray-500">{t('profile.following')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#222] mb-6">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'posts' ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <Grid size={16} />
          {t('profile.posts')}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'saved' ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <Bookmark size={16} />
          {t('profile.saved')}
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {(activeTab === 'posts' ? userPosts : savedPosts).map(post => (
          <div key={post.id} className="aspect-square bg-[#1a1a1a] rounded-lg border border-[#222] flex items-center justify-center group cursor-pointer hover:border-[#444] transition-colors overflow-hidden">
            <div className="text-center">
              <div className="text-2xl mb-1">🎨</div>
              <p className="text-[10px] text-gray-600">#{post.id}</p>
            </div>
          </div>
        ))}
        {(activeTab === 'posts' ? userPosts : savedPosts).length === 0 && (
          <div className="col-span-3 py-12 text-center">
            <p className="text-gray-600 text-sm">{t('feed.empty')}</p>
          </div>
        )}
      </div>

      {/* Quick Settings */}
      <div className="mt-8 space-y-2">
        <button
          onClick={() => onNavigate('settings')}
          className="w-full flex items-center gap-3 px-4 py-3 bg-[#111] border border-[#222] rounded-xl text-sm text-gray-400 hover:text-white hover:border-[#333] transition-all"
        >
          <Settings size={18} />
          {t('settings.title')}
        </button>
        <button
          onClick={() => { logout(); onNavigate('feed'); }}
          className="w-full flex items-center gap-3 px-4 py-3 bg-[#111] border border-[#222] rounded-xl text-sm text-red-400 hover:text-red-300 hover:border-red-900/30 transition-all"
        >
          <LogOut size={18} />
          {t('auth.logout')}
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-[#222] rounded-2xl w-full max-w-md p-6 animate-fade-in">
            <h2 className="text-lg font-bold mb-6">{t('profile.edit')}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
                  {t('profile.name')}
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#555] transition-colors"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
                  {t('auth.username')}
                </label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#555] transition-colors"
                  maxLength={30}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
                  {t('profile.bio')}
                </label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#555] transition-colors resize-none"
                  maxLength={200}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2.5 border border-[#333] rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-all"
              >
                {t('create.cancel')}
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-4 py-2.5 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-all"
              >
                {t('profile.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
