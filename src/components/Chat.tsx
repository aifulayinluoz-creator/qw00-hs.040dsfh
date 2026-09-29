import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { Send, ArrowLeft, Search } from 'lucide-react';

export default function Chat() {
  const { t } = useLanguage();
  const { chatUsers, messages, sendMessage, currentUser } = useApp();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredUsers = chatUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedUser ? messages[selectedUser] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedUser) {
      sendMessage(selectedUser, messageText.trim());
      setMessageText('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const selectedUserData = chatUsers.find(u => u.id === selectedUser);

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-7.5rem)] md:h-[calc(100vh-4.5rem)] flex flex-col md:flex-row border-x border-[#222]">
      {/* Chat List */}
      <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-[#222]`}>
        {/* Search */}
        <div className="p-4 border-b border-[#222]">
          <h2 className="text-lg font-bold mb-3">{t('chat.title')}</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#555] transition-colors"
            />
          </div>
        </div>

        {/* Users list */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors border-b border-[#1a1a1a] ${
                selectedUser === user.id ? 'bg-[#1a1a1a]' : 'hover:bg-[#111]'
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#333] to-[#222] flex items-center justify-center text-sm font-bold border border-[#333]">
                  {user.name.charAt(0)}
                </div>
                {user.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <span className="text-[10px] text-gray-600">{formatTime(user.lastMessageTime)}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{user.lastMessage}</p>
              </div>
              {user.unread > 0 && (
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-black">{user.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${selectedUser ? 'flex' : 'hidden md:flex'} flex-col flex-1`}>
        {selectedUser && selectedUserData ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#222]">
              <button
                onClick={() => setSelectedUser(null)}
                className="md:hidden p-1 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#333] to-[#222] flex items-center justify-center text-sm font-bold border border-[#333]">
                  {selectedUserData.name.charAt(0)}
                </div>
                {selectedUserData.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">{selectedUserData.name}</p>
                <p className="text-xs text-gray-500">
                  {selectedUserData.online ? t('chat.online') : t('chat.offline')}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {currentMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.senderId === currentUser.id
                        ? 'bg-white text-black rounded-br-md'
                        : 'bg-[#1a1a1a] text-white border border-[#333] rounded-bl-md'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.senderId === currentUser.id ? 'text-gray-500' : 'text-gray-600'}`}>
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSend} className="px-4 py-3 border-t border-[#222]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#555] transition-colors"
                  maxLength={1000}
                />
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="p-2.5 bg-white text-black rounded-xl disabled:bg-[#333] disabled:text-gray-600 transition-all hover:scale-105 active:scale-95"
                  aria-label={t('post.send')}
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-gray-500 text-sm">{t('chat.title')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
