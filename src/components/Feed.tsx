import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp, Post } from '../contexts/AppContext';
import { Heart, MessageCircle, Share2, Bookmark, Send, MoreHorizontal } from 'lucide-react';

export default function Feed() {
  const { t } = useLanguage();
  const { posts, likePost, addComment, savePost, currentUser } = useApp();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{t('feed.title')}</h1>
      
      <div className="space-y-6">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => likePost(post.id)}
            onComment={(text) => {
              const comment = {
                id: `c${Date.now()}`,
                userId: currentUser.id,
                username: currentUser.username,
                userAvatar: currentUser.avatar,
                text,
                createdAt: new Date(),
              };
              addComment(post.id, comment);
            }}
            onSave={() => savePost(post.id)}
            isSaved={currentUser.savedPosts.includes(post.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onComment: (text: string) => void;
  onSave: () => void;
  isSaved: boolean;
}

function PostCard({ post, onLike, onComment, onSave, isSaved }: PostCardProps) {
  const { t } = useLanguage();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showShareToast, setShowShareToast] = useState(false);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(commentText.trim());
      setCommentText('');
    }
  };

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  // Generate artistic placeholder images using SVG patterns
  const getArtPlaceholder = (id: string) => {
    const patterns = [
      { bg: '#1a1a2e', shapes: 'circles' },
      { bg: '#16213e', shapes: 'lines' },
      { bg: '#0f3460', shapes: 'waves' },
      { bg: '#1a1a1a', shapes: 'dots' },
      { bg: '#2d2d2d', shapes: 'triangles' },
      { bg: '#1e1e2e', shapes: 'grid' },
    ];
    const pattern = patterns[parseInt(id) % patterns.length];
    
    return (
      <div className="w-full aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200">
          {pattern.shapes === 'circles' && (
            <>
              <circle cx="60" cy="80" r="40" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="140" cy="120" r="30" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="100" cy="60" r="20" fill="none" stroke="white" strokeWidth="0.5" />
            </>
          )}
          {pattern.shapes === 'lines' && (
            <>
              <line x1="20" y1="180" x2="180" y2="20" stroke="white" strokeWidth="0.5" />
              <line x1="40" y1="180" x2="180" y2="40" stroke="white" strokeWidth="0.5" />
              <line x1="60" y1="180" x2="180" y2="60" stroke="white" strokeWidth="0.5" />
              <line x1="80" y1="180" x2="180" y2="80" stroke="white" strokeWidth="0.5" />
            </>
          )}
          {pattern.shapes === 'waves' && (
            <path d="M0,100 Q50,60 100,100 T200,100" fill="none" stroke="white" strokeWidth="1" />
          )}
          {pattern.shapes === 'dots' && (
            <>
              {Array.from({length: 25}).map((_, i) => (
                <circle key={i} cx={20 + (i % 5) * 40} cy={20 + Math.floor(i / 5) * 40} r="3" fill="white" opacity="0.5" />
              ))}
            </>
          )}
          {pattern.shapes === 'triangles' && (
            <>
              <polygon points="100,30 150,130 50,130" fill="none" stroke="white" strokeWidth="1" />
              <polygon points="100,60 130,110 70,110" fill="none" stroke="white" strokeWidth="0.5" />
            </>
          )}
          {pattern.shapes === 'grid' && (
            <>
              {Array.from({length: 5}).map((_, i) => (
                <React.Fragment key={i}>
                  <line x1={i * 50} y1="0" x2={i * 50} y2="200" stroke="white" strokeWidth="0.3" />
                  <line x1="0" y1={i * 50} x2="200" y2={i * 50} stroke="white" strokeWidth="0.3" />
                </React.Fragment>
              ))}
            </>
          )}
        </svg>
        <div className="relative z-10 text-center">
          <div className="text-4xl mb-2">🎨</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest">Artwork #{post.id}</div>
        </div>
      </div>
    );
  };

  return (
    <article className="bg-[#111] rounded-2xl border border-[#222] overflow-hidden animate-fade-in">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-sm font-bold border border-[#333]">
            {post.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold">{post.username}</p>
            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-[#1a1a1a]">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative">
        {getArtPlaceholder(post.id)}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={onLike}
              className={`flex items-center gap-2 transition-all ${post.liked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
              aria-label={t('post.like')}
            >
              <Heart size={22} fill={post.liked ? 'currentColor' : 'none'} strokeWidth={post.liked ? 0 : 1.5} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              aria-label={t('post.comment')}
            >
              <MessageCircle size={22} strokeWidth={1.5} />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              aria-label={t('post.share')}
            >
              <Share2 size={20} strokeWidth={1.5} />
            </button>
          </div>
          <button
            onClick={onSave}
            className={`transition-all ${isSaved ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            aria-label={t('post.save')}
          >
            <Bookmark size={22} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={isSaved ? 0 : 1.5} />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-200 leading-relaxed mb-2">
          <span className="font-semibold mr-2">{post.username}</span>
          {post.description}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* View comments link */}
        {post.comments.length > 0 && !showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            {t('post.comments')} ({post.comments.length})
          </button>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="mt-3 space-y-3 border-t border-[#222] pt-3">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  {comment.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-xs">
                    <span className="font-semibold mr-1">{comment.username}</span>
                    <span className="text-gray-300">{comment.text}</span>
                  </p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{timeAgo(comment.createdAt)}</p>
                </div>
              </div>
            ))}
            
            {/* Comment Input */}
            <form onSubmit={handleComment} className="flex items-center gap-2 pt-2 border-t border-[#1a1a1a]">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={t('post.writeComment')}
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none py-2"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="p-2 text-white disabled:text-gray-700 transition-colors hover:bg-[#1a1a1a] rounded-lg"
                aria-label={t('post.send')}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Share toast */}
      {showShareToast && (
        <div className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium animate-fade-in shadow-lg">
          {t('shared.success')}
        </div>
      )}
    </article>
  );
}
