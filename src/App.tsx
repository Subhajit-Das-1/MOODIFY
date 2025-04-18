import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

type Mood = 'happy' | 'sad' | 'angry' | 'chill' | 'energetic' | 'peaceful';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
}

interface SpotifyRecommendationsResponse {
  tracks: Track[];
}

interface MoodLevel {
  before: number;
  after: number;
}

interface MoodLevels {
  [key: string]: MoodLevel;
}

interface MoodDecoration {
  symbols: string[];
  phrases: string[];
  color: string;
}

const moodQuotes = {
  happy: "Happiness is a choice, and today I choose to be happy!",
  sad: "It's okay to feel sad sometimes. Tomorrow will be better.",
  angry: "Take a deep breath. This too shall pass.",
  chill: "Life is better when you're relaxed.",
  energetic: "Let's turn up the energy and make things happen!",
  peaceful: "Find peace in the present moment."
};

const moodColors = {
  happy: 'bg-yellow-500',
  sad: 'bg-blue-600',
  angry: 'bg-red-500',
  chill: 'bg-purple-400',
  energetic: 'bg-pink-600',
  peaceful: 'bg-sky-600'
};

const moodParams = {
  happy: { valence: 0.8, energy: 0.8, limit: 50 },
  sad: { valence: 0.2, energy: 0.3, limit: 50 },
  angry: { valence: 0.2, energy: 0.8, limit: 50 },
  chill: { valence: 0.5, energy: 0.3, limit: 50 },
  energetic: { valence: 0.6, energy: 0.9, limit: 50 },
  peaceful: { valence: 0.7, energy: 0.2, limit: 50 }
};

// Import page components
const About = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold text-white mb-8">About Moodify</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-white/80">
            Moodify aims to create the perfect harmony between your emotions and music. 
            We believe that music has the power to enhance, transform, and reflect your mood.
          </p>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
          <ul className="text-white/80 space-y-3">
            <li>1. Select your current mood</li>
            <li>2. Rate your mood intensity</li>
            <li>3. Get personalized playlist recommendations</li>
            <li>4. Rate your mood after listening</li>
          </ul>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Technology</h2>
          <p className="text-white/80">
            Powered by advanced algorithms and the Spotify API, Moodify analyzes music characteristics 
            like valence, energy, and tempo to match songs with your emotional state.
          </p>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
          <p className="text-white/80">
            We're a passionate team of music lovers, developers, and psychology enthusiasts 
            working together to create the best mood-based music experience.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Features = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold text-white mb-8">Features</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
        <div className="text-3xl mb-4">🎯</div>
        <h3 className="text-xl font-bold text-white mb-2">Mood Detection</h3>
        <p className="text-white/80">
          Rate your mood and get instantly matched with the perfect playlist for your emotional state.
        </p>
      </div>
      <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
        <div className="text-3xl mb-4">🎵</div>
        <h3 className="text-xl font-bold text-white mb-2">Curated Playlists</h3>
        <p className="text-white/80">
          Access carefully curated playlists that match different moods and emotional intensities.
        </p>
      </div>
      <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
        <div className="text-3xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-white mb-2">Mood Tracking</h3>
        <p className="text-white/80">
          Track how your mood changes before and after listening to recommended music.
        </p>
      </div>
      <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
        <div className="text-3xl mb-4">🌓</div>
        <h3 className="text-xl font-bold text-white mb-2">Dark/Light Mode</h3>
        <p className="text-white/80">
          Customize your experience with beautiful dark and light themes.
        </p>
      </div>
      <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
        <div className="text-3xl mb-4">🔄</div>
        <h3 className="text-xl font-bold text-white mb-2">Spotify Integration</h3>
        <p className="text-white/80">
          Seamlessly connect with Spotify to access millions of tracks and playlists.
        </p>
      </div>
      <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
        <div className="text-3xl mb-4">📱</div>
        <h3 className="text-xl font-bold text-white mb-2">Responsive Design</h3>
        <p className="text-white/80">
          Enjoy a seamless experience across all your devices.
        </p>
      </div>
    </div>
  </div>
);

const Contact = () => {
  const [formStatus, setFormStatus] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Message sent! We\'ll get back to you soon.');
    setTimeout(() => setFormStatus(''), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white mb-2">Message</label>
                <textarea
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Send Message
              </button>
              {formStatus && (
                <div className="text-green-400 mt-2">{formStatus}</div>
              )}
            </form>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Connect With Us</h2>
            <div className="space-y-4">
              <a href="mailto:contact@moodify.com" className="flex items-center text-white/80 hover:text-white transition-colors">
                <span className="text-xl mr-2">📧</span> contact@moodify.com
              </a>
              <a href="https://twitter.com/moodify" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/80 hover:text-white transition-colors">
                <span className="text-xl mr-2">🐦</span> @moodify
              </a>
              <div className="flex items-center text-white/80">
                <span className="text-xl mr-2">📍</span> Music Valley, Harmony Street 123
              </div>
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
            <div className="space-y-4 text-white/80">
              <div>
                <h3 className="font-bold mb-1">Is Moodify free?</h3>
                <p>Yes, Moodify is completely free to use!</p>
              </div>
              <div>
                <h3 className="font-bold mb-1">Do I need a Spotify account?</h3>
                <p>While not required, a Spotify account enhances your experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock songs for when API fails
const getMockSongsForMood = (mood: Mood): Track[] => {
  const mockSongs: Record<Mood, Track[]> = {
    happy: [
      {
        id: '1',
        name: 'Happy mood songs 😄✨💕',
        artists: [{ name: 'Shreeraksha' }],
        album: { 
          name: 'Happy Hindi songs collection', 
          images: [{ url: 'https://static.vecteezy.com/system/resources/thumbnails/031/348/958/small/a-wooden-block-label-with-happy-smile-relax-face-good-feedback-customer-world-mental-health-day-concept-by-ai-generated-free-photo.jpg' }] 
        },
        external_urls: { 
          spotify: 'https://open.spotify.com/playlist/2gSHA2hK9utrPK6ldtJgws?si=Lh3Bv56mRF2zuLjinHTjpg' 
        }
      }
    ],
    sad: [
      {
        id: '3',
        name: 'Best of alone nights - Hindi Sad Songs',
        artists: [{ name: 'Sahabia Butt' }],
        album: { 
          name: 'Emotional and heartbreak hits', 
          images: [{ url: 'https://i.ytimg.com/vi/i_k3K772Zyk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB-jLWS-kX2WwiG2uaSDAjZjq7qAg' }] 
        },
        external_urls: { 
          spotify: 'https://open.spotify.com/playlist/7gXRobbR7oazZ4PHvWXW33?si=yuGWkWnKTSqfixZspbYFfA' 
        }
      }
    ],
    angry: [
      {
        id: '4',
        name: 'Angry mood songs🔥🔥',
        artists: [{ name: 'PRINCE' }],
        album: { 
          name: 'FEEL THAT YOU ARE IN COMBAT MODE⚔️💀', 
          images: [{ url: 'https://w0.peakpx.com/wallpaper/432/645/HD-wallpaper-sign-of-ui-goku-dragon-ball-legends-dragon-ball-super-god-kakarot-son-goku-ultra-instinct.jpg' }] 
        },
        external_urls: { 
          spotify: 'https://open.spotify.com/playlist/0a4Hr64HWlxekayZ8wnWqx?si=Wn4JKDxiRBCMJl7tZ5WZNQ' 
        }
      }
    ],
    chill: [
      {
        id: '5',
        name: 'Chill Mood Songs😎❤️✌️',
        artists: [{ name: 'Kamalika Kar' }],
        album: { 
          name: 'Relaxing Hindi Collection', 
          images: [{ url: 'https://images7.alphacoders.com/135/1354305.jpeg' }] 
        },
        external_urls: { 
          spotify: 'https://open.spotify.com/playlist/55PVuXcePN1SJUh8yczGuR?si=ZH7Idqf4TBec3JpPn0t6cA' 
        }
      }
    ],
    energetic: [
      {
        id: '6',
        name: 'Energetic Bollywood Songs',
        artists: [{ name: 'Harini' }],
        album: { 
          name: 'Bollywood Dance Hits', 
          images: [{ url: 'https://media.istockphoto.com/id/1179405499/photo/silhouette-happy-family-people-group-celebrate-jump-for-good-life-on-weekend-concept-for-win.jpg?s=612x612&w=0&k=20&c=k7MJ7LHfqbSGhujiA1hde-9Faz1SKpNc9CV42ORak30=' }] 
        },
        external_urls: { 
          spotify: 'https://open.spotify.com/playlist/3mSm688yR6UeaAJNf93Ydr?si=P097qbeUQjOgyYAfUgq5NA' 
        }
      }
    ],
    peaceful: [
      {
        id: '7',
        name: 'Peaceful & Soft Hindi Songs',
        artists: [{ name: 'Rainbow Vibes' }],
        album: { 
          name: 'Soft and Smooth Hindi Songs 💫 Magical Vibes🪄', 
          images: [{ url: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg' }] 
        },
        external_urls: { 
          spotify: 'https://open.spotify.com/playlist/02uXGKglrYZD67gcyxkvTd?si=V0lwjTBRTUWLUJk_T8STPQ' 
        }
      }
    ]
  };
  
  return mockSongs[mood];
};

const MoodSelector: React.FC<{ onMoodSelect: (mood: Mood) => void, darkMode: boolean }> = ({ onMoodSelect, darkMode }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: "🎵",
      title: "Mood-Based Playlists",
      description: "Get personalized playlists that match exactly how you feel"
    },
    {
      icon: "🎯",
      title: "Smart Recommendations",
      description: "Our AI understands your mood and suggests the perfect tracks"
    },
    {
      icon: "💫",
      title: "Instant Mood Boost",
      description: "Transform your mood with carefully curated music selections"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 relative">
      {/* Welcome Section */}
      <div className="text-center mb-12 relative">
        <h2 className="text-6xl font-bold mb-6 relative inline-block">
          <span className="relative z-10">
            <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur opacity-30 animate-pulse"></span>
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x">
              Welcome to Moodify
            </span>
          </span>
        </h2>
        <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-white'} opacity-85 animate-fade-in-up animation-delay-300 mb-4`}>
          How are you feeling today?
        </p>
        <p className="text-white/70 max-w-2xl mx-auto mb-8">
          Select your current mood and let us create the perfect playlist to match your emotions. 
          Our AI-powered system will analyze your mood and recommend songs that resonate with how you feel.
        </p>

        {/* Feature Carousel */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-12 transform hover:scale-102 transition-all duration-300">
          <div className="flex justify-center items-center h-32">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-500 w-full ${
                  index === activeFeature
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-8'
                }`}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {Object.entries(moodColors).map(([mood, colorClass]) => (
          <div 
            key={mood}
            className={`mood-button group relative overflow-hidden rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${colorClass} bg-opacity-60 text-white cursor-pointer`}
            onClick={() => onMoodSelect(mood as Mood)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="mood-button-content relative z-10 flex flex-col items-center">
              <span className="mood-emoji text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {mood === 'happy' ? '😊' :
                 mood === 'sad' ? '😢' :
                 mood === 'angry' ? '😠' :
                 mood === 'chill' ? '😎' :
                 mood === 'energetic' ? '⚡' : '😌'}
              </span>
              <span className="mood-text font-semibold text-lg mb-2 capitalize">{mood}</span>
              <p className="text-sm text-white/80 text-center">{moodQuotes[mood as Mood].split('!')[0]}!</p>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-4">1️⃣</div>
            <h4 className="text-white font-semibold mb-2">Select Your Mood</h4>
            <p className="text-white/70">Choose how you're feeling right now</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">2️⃣</div>
            <h4 className="text-white font-semibold mb-2">Get Recommendations</h4>
            <p className="text-white/70">We'll create a personalized playlist</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">3️⃣</div>
            <h4 className="text-white font-semibold mb-2">Enjoy & Transform</h4>
            <p className="text-white/70">Let the music enhance your mood</p>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="absolute animate-float-music-note text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              opacity: 0.4 + Math.random() * 0.3,
              color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
              textShadow: '0 0 10px currentColor'
            }}
          >
            {['♪', '♫', '♬', '♩', '🎵', '🎶', '🎼', '🎧'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl max-w-md mx-4">
            <h3 className="text-2xl font-bold text-white mb-4">About Moodify</h3>
            <p className="text-white/90 mb-4">
              Moodify uses advanced algorithms to analyze your current mood and create the perfect playlist to match or enhance how you're feeling.
            </p>
            <button
              onClick={() => setShowInfo(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface PlaylistPageProps {
  darkMode: boolean;
  songs: Track[];
  loading: boolean;
  error: string | null;
  selectedMood?: Mood;
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ darkMode, songs, loading, error, selectedMood }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const getRecommendedPlaylists = () => {
    if (!selectedMood) return [];
    // Return 3 related playlists based on the current mood
    return [
      {
        title: `${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Vibes 24/7`,
        description: "Non-stop music to match your mood",
        image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg"
      },
      {
        title: "Top Hits for Your Mood",
        description: "Popular tracks that fit how you feel",
        image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg"
      },
      {
        title: "Similar Artists",
        description: "Discover more artists you might like",
        image: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg"
      }
    ];
  };

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackSubmitted(false);
    }, 3000);
  };

  const getMoodStyle = (mood: Mood | undefined) => {
    switch(mood) {
      case 'happy':
        return 'from-yellow-400/40 via-yellow-300/40 to-yellow-500/40';
      case 'sad':
        return 'from-blue-400/40 via-blue-300/40 to-blue-500/40';
      case 'angry':
        return 'from-red-400/40 via-red-300/40 to-red-500/40';
      case 'chill':
        return 'from-purple-400/40 via-purple-300/40 to-purple-500/40';
      case 'energetic':
        return 'from-pink-400/40 via-pink-300/40 to-pink-500/40';
      case 'peaceful':
        return 'from-sky-400/40 via-sky-300/40 to-sky-500/40';
      default:
        return 'from-gray-400/40 via-gray-300/40 to-gray-500/40';
    }
  };

  const getMoodBackground = (mood: Mood | undefined) => {
    switch(mood) {
      case 'happy':
        return 'from-yellow-300 via-yellow-400 to-yellow-500';
      case 'sad':
        return 'from-blue-300 via-blue-400 to-blue-500';
      case 'angry':
        return 'from-red-300 via-red-400 to-red-500';
      case 'chill':
        return 'from-purple-300 via-purple-400 to-purple-500';
      case 'energetic':
        return 'from-pink-300 via-pink-400 to-pink-500';
      case 'peaceful':
        return 'from-sky-300 via-sky-400 to-sky-500';
      default:
        return 'from-blue-300 via-blue-400 to-blue-500'; // Default theme
    }
  };

  const handlePlaylistClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getMoodBackground(selectedMood)} ${darkMode ? 'bg-opacity-50' : ''} transition-all duration-500`}>
      <div className="container mx-auto px-4 py-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <div className="loading-pulse text-3xl mb-3">🎵</div>
            <p className="text-lg text-white/80">Finding your perfect playlist...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 bg-red-500/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-base">{error}</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white welcome-text flex items-center gap-2">
                <span className="mood-emoji">🎵</span>
                Your Playlist
              </h2>
              <button
                onClick={() => setShowFeedback(true)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <span>Give Feedback</span>
                <span>💭</span>
              </button>
            </div>

            {/* Mood Quote Section */}
            {selectedMood && (
              <div className="mb-8 bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-102 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{
                    selectedMood === 'happy' ? '😊' :
                    selectedMood === 'sad' ? '😢' :
                    selectedMood === 'angry' ? '😠' :
                    selectedMood === 'chill' ? '😎' :
                    selectedMood === 'energetic' ? '⚡' : '😌'
                  }</div>
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-2">Today's Mood Quote</h3>
                    <p className="text-white/90 italic">{moodQuotes[selectedMood]}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Main Playlist Grid */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => handlePlaylistClick(song.external_urls.spotify)}
                  className={`bg-gradient-to-br ${getMoodStyle(selectedMood)} p-4 rounded-lg backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer group relative`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square mb-3 overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={song.album.images[0]?.url}
                      alt={song.album.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-1 truncate text-white">{song.name}</h3>
                  <p className="text-white/80 mb-2 text-sm truncate">{song.artists.map(artist => artist.name).join(', ')}</p>
                  
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-lg">
                    <span className="text-4xl text-white">▶️</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Playlists Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>🎯</span>
                Recommended for You
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getRecommendedPlaylists().map((playlist, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <img 
                      src={playlist.image} 
                      alt={playlist.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-white font-semibold mb-2">{playlist.title}</h4>
                      <p className="text-white/70 text-sm">{playlist.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Music Notes */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {[...Array(15)].map((_, index) => (
                <div
                  key={index}
                  className="absolute text-white/20 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${10 + Math.random() * 10}s`
                  }}
                >
                  {['♪', '♫', '♬', '♩', '🎵', '🎶'][Math.floor(Math.random() * 6)]}
                </div>
              ))}
            </div>

            {/* Feedback Modal */}
            {showFeedback && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl max-w-md w-full mx-4 shadow-xl border border-white/20">
                  {!feedbackSubmitted ? (
                    <>
                      <h3 className="text-2xl font-bold text-white mb-4">How do you feel after listening?</h3>
                      <div className="flex justify-center gap-4 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-3xl transition-transform hover:scale-110 ${
                              rating >= star ? 'text-yellow-400' : 'text-white/40'
                            }`}
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => setShowFeedback(false)}
                          className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleFeedbackSubmit}
                          disabled={!rating}
                          className={`px-4 py-2 rounded-lg ${
                            rating
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                              : 'bg-white/10 text-white/50 cursor-not-allowed'
                          } transition-all duration-300`}
                        >
                          Submit Feedback
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-5xl mb-4 animate-bounce">🎉</div>
                      <p className="text-white text-lg">Thank you for your feedback!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${darkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
            >
              Moodify
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className={`${location.pathname === '/' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/features')}
              className={`${location.pathname === '/features' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              Features
            </button>
            <button
              onClick={() => navigate('/about')}
              className={`${location.pathname === '/about' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              About
            </button>
            <button
              onClick={() => navigate('/contact')}
              className={`${location.pathname === '/contact' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              Contact
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button
              onClick={() => { navigate('/'); setIsMenuOpen(false); }}
              className={`block w-full text-left ${location.pathname === '/' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              Home
            </button>
            <button
              onClick={() => { navigate('/features'); setIsMenuOpen(false); }}
              className={`block w-full text-left ${location.pathname === '/features' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              Features
            </button>
            <button
              onClick={() => { navigate('/about'); setIsMenuOpen(false); }}
              className={`block w-full text-left ${location.pathname === '/about' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              About
            </button>
            <button
              onClick={() => { navigate('/contact'); setIsMenuOpen(false); }}
              className={`block w-full text-left ${location.pathname === '/contact' ? 'text-purple-500' : 'text-gray-600 dark:text-gray-300'} hover:text-purple-500 transition-colors`}
            >
              Contact
            </button>
            <button
              onClick={toggleDarkMode}
              className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors"
            >
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Your Mood, Your Music
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in-up">
          Discover the perfect playlist that matches your emotions. Let music transform your mood.
        </p>
        <button
          onClick={() => navigate('/mood-selector')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Moodify has completely changed how I listen to music. It's like having a personal DJ that understands my emotions.",
      author: "Sarah J.",
      role: "Music Enthusiast"
    },
    {
      quote: "The perfect companion for my daily commute. It always knows what I need to hear.",
      author: "Michael T.",
      role: "Daily Commuter"
    },
    {
      quote: "As a therapist, I recommend Moodify to my clients. It's a great tool for emotional regulation.",
      author: "Dr. Emily R.",
      role: "Clinical Psychologist"
    }
  ];

  return (
    <div className="py-20 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 transform hover:scale-105 transition-all duration-300"
            >
              <p className="text-white/90 italic mb-4">"{testimonial.quote}"</p>
              <div className="text-white font-semibold">{testimonial.author}</div>
              <div className="text-white/60 text-sm">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CTA = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-md">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Mood?
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of users who have discovered the perfect soundtrack for their emotions.
        </p>
        <button
          onClick={() => navigate('/mood-selector')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
              Moodify
            </h3>
            <p className="text-white/60">
              Your personal mood-based music companion.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-white/60 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/moodifyapp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Twitter</span>
              </a>
              <a 
                href="https://instagram.com/moodifyapp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Instagram</span>
              </a>
              <a 
                href="https://facebook.com/moodifyapp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Moodify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Add new routes for Privacy and Terms pages
const Privacy = () => (
  <div className="container mx-auto px-4 py-12 pt-24">
    <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
    <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
        <p className="text-white/80 mb-4">
          We collect information that you provide directly to us, including when you create an account,
          use our services, or communicate with us. This may include:
        </p>
        <ul className="list-disc pl-6 text-white/80 mb-6">
          <li>Your name and email address</li>
          <li>Your music preferences and mood selections</li>
          <li>Usage data and interaction with our services</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
        <p className="text-white/80 mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 text-white/80 mb-6">
          <li>Provide and improve our services</li>
          <li>Personalize your music recommendations</li>
          <li>Communicate with you about our services</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
        <p className="text-white/80 mb-4">
          We implement appropriate security measures to protect your personal information.
        </p>
      </div>
    </div>
  </div>
);

const Terms = () => (
  <div className="container mx-auto px-4 py-12 pt-24">
    <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
    <div className="bg-black/20 backdrop-blur-md rounded-lg p-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
        <p className="text-white/80 mb-6">
          By accessing and using Moodify, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-2xl font-bold text-white mb-4">2. Use of Service</h2>
        <p className="text-white/80 mb-4">
          You agree to use the service only for lawful purposes and in accordance with these Terms.
        </p>
        <ul className="list-disc pl-6 text-white/80 mb-6">
          <li>You must be at least 13 years old to use this service</li>
          <li>You are responsible for maintaining the security of your account</li>
          <li>You agree not to misuse or abuse the service</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mb-4">3. Service Modifications</h2>
        <p className="text-white/80 mb-4">
          We reserve the right to modify or discontinue the service at any time.
        </p>
      </div>
    </div>
  </div>
);

// Wrap the main App content in a new component to use hooks
const AppContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>(undefined);
  const [songs, setSongs] = useState<Track[]>([]);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [moodLevels, setMoodLevels] = useState<MoodLevels>({
    happy: { before: 0, after: 0 },
    sad: { before: 0, after: 0 },
    angry: { before: 0, after: 0 },
    chill: { before: 0, after: 0 },
    energetic: { before: 0, after: 0 },
    peaceful: { before: 0, after: 0 }
  });
  const [showThankYou, setShowThankYou] = useState<{[key: string]: boolean}>({
    before: false,
    after: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  const moodDecorations: Record<Mood, MoodDecoration> = {
    happy: {
      symbols: ['🌈', '🎈', '🎉', '🌞', '⭐', '🦋', '🎨', '🎪'],
      phrases: ['Keep smiling!', 'Spread joy!', 'Life is beautiful!', 'Stay positive!'],
      color: darkMode ? 'text-yellow-500' : 'text-white'
    },
    sad: {
      symbols: ['🌧️', '🌙', '🕊️', '💫', '🌊', '🍂', '💭', '🤍'],
      phrases: ['Better days ahead', 'You are strong', 'This too shall pass', 'Keep going'],
      color: darkMode ? 'text-blue-500' : 'text-white'
    },
    angry: {
      symbols: ['⚡', '🔥', '💥', '⚔️', '🎯', '💪', '👊', '🐉'],
      phrases: ['Stay strong!', 'Channel your energy!', 'Power through!', 'You got this!'],
      color: darkMode ? 'text-red-500' : 'text-white'
    },
    chill: {
      symbols: ['🌴', '🌺', '🎵', '🌿', '🍃', '🎧', '🌸', '☁️'],
      phrases: ['Take it easy', 'Just breathe', 'Stay cool', 'Relax & unwind'],
      color: darkMode ? 'text-purple-400' : 'text-white'
    },
    energetic: {
      symbols: ['⚡', '✨', '💫', '🎪', '🎨', '🎭', '🎪', '🎯'],
      phrases: ['Let\'s rock!', 'Feel the rhythm!', 'Dance it out!', 'Full power!'],
      color: darkMode ? 'text-pink-500' : 'text-white'
    },
    peaceful: {
      symbols: ['🕊️', '🌸', '🍃', '🌺', '🌙', '⭐', '🌾', '🌊'],
      phrases: ['Inner peace', 'Tranquil moments', 'Calm mind', 'Serene vibes'],
      color: darkMode ? 'text-sky-500' : 'text-white'
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  React.useEffect(() => {
    const getToken = async (retryCount = 0) => {
      try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
          new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': process.env.REACT_APP_SPOTIFY_CLIENT_ID || '',
            'client_secret': process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || ''
          }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        
        setToken(response.data.access_token);
      } catch (err: any) {
        console.error('Error getting Spotify token:', err);
        if (err.response) {
          console.error('Response status:', err.response.status);
          console.error('Response data:', err.response.data);
        }
        
        if (retryCount < 3) {
          console.log(`Retrying Spotify authentication (attempt ${retryCount + 1} of 3)...`);
          setTimeout(() => getToken(retryCount + 1), 2000);
          return;
        }
        
        console.log('Will use mock data instead');
      }
    };

    getToken();
  }, []);

  // Add loading effect
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Cookie consent handler
  const handleCookieConsent = () => {
    setShowCookieConsent(false);
    localStorage.setItem('cookieConsent', 'true');
  };

  // Share handler
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Moodify - Your Mood, Your Music',
          text: 'Check out Moodify, where your mood meets the perfect playlist!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    setLoading(true);
    setError(null);
    setSongs([]);
    
    try {
      if (!token || mood === 'sad' || mood === 'peaceful') {
        console.log(`Using mock data for ${mood} mood`);
        setSongs(getMockSongsForMood(mood));
        setLoading(false);
        navigate('/playlist');
        return;
      }

      const params = moodParams[mood];
      
      try {
        const response = await axios.get<SpotifyRecommendationsResponse>('https://api.spotify.com/v1/recommendations', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            seed_genres: (() => {
              const moodType = mood as Mood;
              switch (moodType) {
                case 'happy':
                  return 'pop,happy';
                case 'sad':
                  return 'sad,piano';
                case 'angry':
                  return 'metal,rock';
                case 'chill':
                  return 'chill,ambient';
                case 'energetic':
                  return 'dance,electronic';
                case 'peaceful':
                  return 'classical,ambient';
                default:
                  return 'classical,ambient';
              }
            })(),
            target_valence: params.valence,
            target_energy: params.energy,
            limit: params.limit
          }
        });
        
        if (response.data.tracks && response.data.tracks.length > 0) {
          setSongs(response.data.tracks);
        } else {
          setSongs(getMockSongsForMood(mood));
        }
      } catch (apiError) {
        console.error('API error, using mock data:', apiError);
        setSongs(getMockSongsForMood(mood));
      }
    } catch (err) {
      console.error('Error in mood selection:', err);
      setError('Failed to get music recommendations. Using sample songs instead.');
      setSongs(getMockSongsForMood(mood));
    } finally {
      setLoading(false);
      navigate('/playlist');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const getBgColor = () => {
    if (darkMode) return 'bg-gray-900';
    if (selectedMood) return moodColors[selectedMood];
    return 'bg-gradient-to-r from-indigo-600 to-purple-700';
  };

  const getMoodEmojis = (mood: Mood) => {
    const emojis = {
      happy: ['🌟', '🎈', '🌞', '✨', '🎉', '😊'],
      sad: ['🌧️', '💭', '🌙', '💫', '🤍', '😢'],
      angry: ['⚡', '💥', '🔥', '💪', '👊', '😠'],
      chill: ['🌊', '🌴', '🎵', '🎧', '🌿', '😎'],
      energetic: ['⚡', '💫', '🎵', '🎪', '🎨', '⭐'],
      peaceful: ['🌸', '🍃', '🌺', '🌙', '✨', '😌']
    };
    return emojis[mood];
  };

  const handleMoodLevelChange = (mood: Mood, type: 'before' | 'after', value: number) => {
    setMoodLevels(prev => ({
      ...prev,
      [mood]: {
        ...prev[mood],
        [type]: value
      }
    }));
    
    // Show thank you message
    setShowThankYou(prev => ({
      ...prev,
      [type]: true
    }));

    // Hide thank you message after 5 seconds (increased from 3)
    setTimeout(() => {
      setShowThankYou(prev => ({
        ...prev,
        [type]: false
      }));
    }, 5000);
  };

  const MoodLevelRating = ({ mood, type }: { mood: Mood, type: 'before' | 'after' }) => (
    <div className="flex flex-col items-center space-y-4 mb-4">
      {/* Rating Section */}
      <div className="w-full flex flex-col items-center space-y-2 p-3 bg-black/20 backdrop-blur-sm rounded-lg">
        <p className="text-white text-lg font-medium">
          {type === 'before' ? 'How do you feel before?' : 'How do you feel after?'}
        </p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => handleMoodLevelChange(mood, type, level)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                moodLevels[mood][type] === level
                  ? `${
                      mood === 'happy' ? 'bg-yellow-400 text-yellow-900' :
                      mood === 'sad' ? 'bg-blue-400 text-blue-900' :
                      mood === 'angry' ? 'bg-red-400 text-red-900' :
                      mood === 'chill' ? 'bg-purple-400 text-purple-900' :
                      mood === 'energetic' ? 'bg-pink-400 text-pink-900' :
                      'bg-sky-400 text-sky-900'
                    }`
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Thank You Message */}
      <div className={`transform transition-all duration-500 ${
        showThankYou[type] 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-2 pointer-events-none'
      }`}>
        <div className={`px-4 py-2 rounded-full backdrop-blur-sm shadow-lg ${
          mood === 'happy' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' :
          mood === 'sad' ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' :
          mood === 'angry' ? 'bg-red-400/20 text-red-400 border border-red-400/30' :
          mood === 'chill' ? 'bg-purple-400/20 text-purple-400 border border-purple-400/30' :
          mood === 'energetic' ? 'bg-pink-400/20 text-pink-400 border border-pink-400/30' :
          'bg-sky-400/20 text-sky-400 border border-sky-400/30'
        } font-medium flex items-center gap-2`}>
          <span>Thank you for the feedback</span>
          <span className="animate-bounce inline-block">
            {mood === 'happy' ? '✨' :
             mood === 'sad' ? '💙' :
             mood === 'angry' ? '💪' :
             mood === 'chill' ? '🌊' :
             mood === 'energetic' ? '⚡' :
             '✨'}
          </span>
        </div>
      </div>
    </div>
  );

  const MoodDecorations = ({ mood }: { mood: Mood }) => {
    const decoration = moodDecorations[mood];
    
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating Symbols */}
        {decoration.symbols.map((symbol, index) => (
          <span
            key={`symbol-${index}`}
            className={`absolute text-3xl animate-float ${decoration.color}`}
            style={{
              left: `${(index * 12) + Math.random() * 5}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.7}s`,
              opacity: 0.4
            }}
          >
            {symbol}
          </span>
        ))}

        {/* Inspirational Phrases */}
        {decoration.phrases.map((phrase, index) => (
          <div
            key={`phrase-${index}`}
            className={`absolute text-sm font-medium ${decoration.color} opacity-30 transform rotate-${Math.floor(Math.random() * 45) - 22}`}
            style={{
              left: `${(index * 25) + Math.random() * 10}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${index * 1.2}s`
            }}
          >
            {phrase}
          </div>
        ))}
      </div>
    );
  };

  const getMoodBackground = (mood: Mood | undefined) => {
    switch(mood) {
      case 'happy':
        return 'from-yellow-300 via-yellow-400 to-yellow-500';
      case 'sad':
        return 'from-blue-300 via-blue-400 to-blue-500';
      case 'angry':
        return 'from-red-300 via-red-400 to-red-500';
      case 'chill':
        return 'from-purple-300 via-purple-400 to-purple-500';
      case 'energetic':
        return 'from-pink-300 via-pink-400 to-pink-500';
      case 'peaceful':
        return 'from-sky-300 via-sky-400 to-sky-500';
      default:
        return 'from-blue-300 via-blue-400 to-blue-500'; // Default theme
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBgColor()}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <Features />
            <Testimonials />
            <CTA />
            <Footer />
          </>
        } />
        <Route path="/mood-selector" element={
          <div className="pt-16">
            <MoodSelector onMoodSelect={handleMoodSelect} darkMode={darkMode} />
          </div>
        } />
        <Route path="/playlist" element={
          <div className="pt-16">
            <PlaylistPage
              darkMode={darkMode}
              songs={songs}
              loading={loading}
              error={error}
              selectedMood={selectedMood}
            />
          </div>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Update the cssAdditions with new color effects
const cssAdditions = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 20px rgba(255, 182, 193, 0.5), 0 0 40px rgba(147, 112, 219, 0.4); }
  50% { text-shadow: 0 0 30px rgba(255, 182, 193, 0.8), 0 0 60px rgba(147, 112, 219, 0.6); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes rainbowText {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.title-container {
  position: relative;
  display: inline-block;
  padding: 0.5em;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(
    300deg,
    #ff0080,
    #ff8c00,
    #40e0d0,
    #7b68ee,
    #ff0080
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientMove 8s ease infinite, rainbowText 12s linear infinite;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  position: relative;
  display: inline-block;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
  margin: 0;
  line-height: 1;
}

.main-title::before {
  content: 'MOODIFY';
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(
    45deg,
    transparent 45%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 55%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  z-index: 1;
  animation: shimmer 3s infinite;
  filter: blur(1px);
}

.subtitle {
  font-size: 1rem;
  font-weight: 500;
  background: linear-gradient(
    120deg,
    #00ffff,
    #ff69b4,
    #4169e1,
    #00ffff
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientMove 6s ease infinite;
  letter-spacing: 0.08em;
  margin-top: 0.2em;
  text-align: center;
  text-transform: uppercase;
  opacity: 0.9;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
  white-space: nowrap;
}

.glow-effect {
  position: relative;
}

.glow-effect::after {
  content: '';
  position: absolute;
  inset: -10px;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.8) 0%,
    transparent 70%
  );
  filter: blur(15px);
  z-index: -1;
  opacity: 0.5;
  animation: glow 2s ease-in-out infinite;
}

.pop-in {
  animation: popIn 0.5s ease-out forwards;
}
`;

export default App;

