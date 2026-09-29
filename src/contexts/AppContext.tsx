import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  posts: Post[];
  savedPosts: string[];
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  image: string;
  description: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  createdAt: Date;
  tags: string[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: Date;
  read: boolean;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  online: boolean;
  unread: number;
}

const sampleUsers: ChatUser[] = [
  { id: '2', name: 'María Arte', avatar: '', lastMessage: '¡Me encanta tu último dibujo!', lastMessageTime: new Date(Date.now() - 300000), online: true, unread: 2 },
  { id: '3', name: 'Carlos Sketch', avatar: '', lastMessage: '¿Quieres colaborar en un proyecto?', lastMessageTime: new Date(Date.now() - 3600000), online: true, unread: 0 },
  { id: '4', name: 'Ana Dibuja', avatar: '', lastMessage: 'Gracias por el feedback!', lastMessageTime: new Date(Date.now() - 7200000), online: false, unread: 0 },
  { id: '5', name: 'Pedro Ilustra', avatar: '', lastMessage: 'Nuevo tutorial disponible', lastMessageTime: new Date(Date.now() - 86400000), online: false, unread: 1 },
];

const samplePosts: Post[] = [
  {
    id: '1', userId: '2', username: 'María Arte', userAvatar: '',
    image: '', description: 'Estudio de luz y sombra con grafito ✏️', likes: 42, liked: false,
    comments: [
      { id: 'c1', userId: '3', username: 'Carlos Sketch', userAvatar: '', text: '¡Increíble trabajo con las sombras!', createdAt: new Date(Date.now() - 1800000) }
    ],
    createdAt: new Date(Date.now() - 3600000), tags: ['grafito', 'retrato', 'sombras']
  },
  {
    id: '2', userId: '3', username: 'Carlos Sketch', userAvatar: '',
    image: '', description: 'Paisaje urbano en tinta china 🏙️', likes: 87, liked: true,
    comments: [
      { id: 'c2', userId: '2', username: 'María Arte', userAvatar: '', text: 'Los detalles son impresionantes', createdAt: new Date(Date.now() - 900000) },
      { id: 'c3', userId: '4', username: 'Ana Dibuja', userAvatar: '', text: '¿Qué plumilla usaste?', createdAt: new Date(Date.now() - 600000) }
    ],
    createdAt: new Date(Date.now() - 7200000), tags: ['tinta', 'paisaje', 'urbano']
  },
  {
    id: '3', userId: '4', username: 'Ana Dibuja', userAvatar: '',
    image: '', description: 'Serie de acuarelas botánicas 🌿', likes: 156, liked: false,
    comments: [],
    createdAt: new Date(Date.now() - 14400000), tags: ['acuarela', 'botánica', 'naturaleza']
  },
  {
    id: '4', userId: '5', username: 'Pedro Ilustra', userAvatar: '',
    image: '', description: 'Diseño de personaje para mi nuevo cómic 🎨', likes: 203, liked: false,
    comments: [
      { id: 'c4', userId: '2', username: 'María Arte', userAvatar: '', text: '¡El diseño es genial! ¿Cuándo sale?', createdAt: new Date(Date.now() - 300000) }
    ],
    createdAt: new Date(Date.now() - 28800000), tags: ['cómic', 'personaje', 'diseño']
  },
  {
    id: '5', userId: '2', username: 'María Arte', userAvatar: '',
    image: '', description: 'Retrato digital - práctica de anatomía facial', likes: 67, liked: false,
    comments: [],
    createdAt: new Date(Date.now() - 43200000), tags: ['digital', 'retrato', 'anatomía']
  },
  {
    id: '6', userId: '3', username: 'Carlos Sketch', userAvatar: '',
    image: '', description: 'Boceto rápido de 30 minutos - café artístico ☕', likes: 34, liked: true,
    comments: [],
    createdAt: new Date(Date.now() - 86400000), tags: ['boceto', 'rápido', 'café']
  },
];

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  posts: Post[];
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  savePost: (postId: string) => void;
  chatUsers: ChatUser[];
  messages: Record<string, ChatMessage[]>;
  sendMessage: (receiverId: string, text: string) => void;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('sketchshare-logged') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    username: 'artista_demo',
    name: 'Artista Demo',
    email: 'demo@sketchshare.app',
    bio: 'Apasionado por el arte y el dibujo. Compartiendo mi creatividad con el mundo 🎨',
    avatar: '',
    followers: 234,
    following: 156,
    posts: [],
    savedPosts: [],
  });

  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [chatUsers] = useState<ChatUser[]>(sampleUsers);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    '2': [
      { id: 'm1', senderId: '2', receiverId: '1', text: '¡Hola! Vi tu último dibujo y me encantó', createdAt: new Date(Date.now() - 600000), read: true },
      { id: 'm2', senderId: '1', receiverId: '2', text: '¡Gracias María! Estoy practicando mucho', createdAt: new Date(Date.now() - 500000), read: true },
      { id: 'm3', senderId: '2', receiverId: '1', text: '¡Me encanta tu último dibujo!', createdAt: new Date(Date.now() - 300000), read: false },
    ],
    '3': [
      { id: 'm4', senderId: '3', receiverId: '1', text: '¿Quieres colaborar en un proyecto?', createdAt: new Date(Date.now() - 3600000), read: false },
    ],
  });

  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  const addComment = (postId: string, comment: Comment) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, comment] };
      }
      return p;
    }));
  };

  const savePost = (postId: string) => {
    setCurrentUser(prev => {
      const saved = prev.savedPosts.includes(postId)
        ? prev.savedPosts.filter(id => id !== postId)
        : [...prev.savedPosts, postId];
      return { ...prev, savedPosts: saved };
    });
  };

  const sendMessage = (receiverId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      text,
      createdAt: new Date(),
      read: false,
    };
    setMessages(prev => ({
      ...prev,
      [receiverId]: [...(prev[receiverId] || []), newMsg],
    }));
  };

  const login = (_email: string, _password: string): boolean => {
    setIsLoggedIn(true);
    localStorage.setItem('sketchshare-logged', 'true');
    return true;
  };

  const register = (_username: string, _email: string, _password: string): boolean => {
    setIsLoggedIn(true);
    localStorage.setItem('sketchshare-logged', 'true');
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('sketchshare-logged');
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser, posts, addPost, likePost, addComment, savePost,
      chatUsers, messages, sendMessage, isLoggedIn, login, register, logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
