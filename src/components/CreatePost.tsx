import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { Image, X, Tag, Sparkles } from 'lucide-react';

interface CreatePostProps {
  onNavigate: (page: string) => void;
}

export default function CreatePost({ onNavigate }: CreatePostProps) {
  const { t } = useLanguage();
  const { addPost, currentUser } = useApp();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim()) && tags.length < 5) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePublish = () => {
    if (!description.trim()) return;
    setIsPublishing(true);

    setTimeout(() => {
      const newPost = {
        id: `user-${Date.now()}`,
        userId: currentUser.id,
        username: currentUser.username,
        userAvatar: currentUser.avatar,
        image: imagePreview || '',
        description: description.trim(),
        likes: 0,
        liked: false,
        comments: [],
        createdAt: new Date(),
        tags,
      };

      addPost(newPost);
      setIsPublishing(false);
      onNavigate('feed');
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{t('create.title')}</h1>

      <div className="bg-[#111] rounded-2xl border border-[#222] overflow-hidden">
        {/* Image Upload Area */}
        <div className="relative">
          {imagePreview ? (
            <div className="relative aspect-square">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setImagePreview(null)}
                className="absolute top-3 right-3 p-2 bg-black/70 rounded-full text-white hover:bg-black transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-[#333] hover:border-[#555] transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#222] transition-colors">
                <Image size={28} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
                  {t('create.upload')}
                </p>
                <p className="text-xs text-gray-600 mt-1">PNG, JPG, WEBP</p>
              </div>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        {/* Description */}
        <div className="p-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              {t('create.description')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('create.placeholder')}
              rows={4}
              maxLength={500}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#555] transition-colors resize-none"
            />
            <p className="text-xs text-gray-600 text-right mt-1">{description.length}/500</p>
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag size={12} />
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-xs text-gray-300"
                >
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="text-gray-500 hover:text-white">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            {tags.length < 5 && (
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Añadir tag + Enter"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#555] transition-colors"
                maxLength={30}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onNavigate('feed')}
              className="flex-1 px-4 py-3 border border-[#333] rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:border-[#555] transition-all"
            >
              {t('create.cancel')}
            </button>
            <button
              onClick={handlePublish}
              disabled={!description.trim() || isPublishing}
              className="flex-1 px-4 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 disabled:bg-[#333] disabled:text-gray-600 transition-all flex items-center justify-center gap-2"
            >
              {isPublishing ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              {t('create.publish')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
