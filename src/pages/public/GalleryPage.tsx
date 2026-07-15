import { useEffect, useState } from 'react';
import { X, Image, Video, Grid, Filter, Sparkles, ChevronDown } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, GalleryItem } from '../../lib/firebase';
import { GalleryCard } from '../../components/GalleryCard';
import bgVideo from '../../images/background4.mp4';

// Helper function to extract YouTube video ID
function extractYoutubeId(url: string): string | null {
  try {
    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      if (parts[1]) {
        return parts[1].split('?')[0].split('&')[0];
      }
    }
    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('v');
    }
    if (url.includes('youtube.com/embed/')) {
      const parts = url.split('youtube.com/embed/');
      if (parts[1]) {
        return parts[1].split('?')[0].split('&')[0];
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'gallery_items'),
        orderBy('created_at', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as GalleryItem[];
      setItems(data);
    } catch (error) {
      console.error('Error loading gallery:', error);
    }
    setLoading(false);
  };

  const filteredItems = items.filter(item =>
    filter === 'all' ? true : item.type === filter
  );

  // Count items by type
  const imageCount = items.filter(item => item.type === 'image').length;
  const videoCount = items.filter(item => item.type === 'video').length;

  return (
    <div className="bg-white min-h-screen pb-24">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden w-full min-h-[340px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[550px] flex items-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-green-900/50 to-blue-900/60" />
        
        {/* Animated floating elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center animate-fadeInDown">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-white/30 text-white">
              📸 Our Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-300 via-green-300 to-blue-300 bg-clip-text text-transparent">Our</span> Projects
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successful solar installations.
              See the quality and craftsmanship that goes into every project.
            </p>
            
            {/* Stats badges */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/30 flex items-center gap-2">
                <Grid className="w-4 h-4 text-yellow-300" /> {items.length} Total Projects
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/30 flex items-center gap-2">
                <Image className="w-4 h-4 text-green-300" /> {imageCount} Images
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/30 flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-300" /> {videoCount} Videos
              </span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ================= FILTER SECTION ================= */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full text-green-700 text-sm font-semibold">
              🎯 Filter Projects
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`group px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md border-2 border-gray-200'
                }`}
              >
                <Grid className={`w-4 h-4 ${filter === 'all' ? 'text-white' : 'text-gray-500'}`} />
                All Projects
                <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                  filter === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {items.length}
                </span>
              </button>
              
              <button
                onClick={() => setFilter('image')}
                className={`group px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  filter === 'image'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md border-2 border-gray-200'
                }`}
              >
                <Image className={`w-4 h-4 ${filter === 'image' ? 'text-white' : 'text-gray-500'}`} />
                Images
                <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                  filter === 'image' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {imageCount}
                </span>
              </button>
              
              <button
                onClick={() => setFilter('video')}
                className={`group px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  filter === 'video'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md border-2 border-gray-200'
                }`}
              >
                <Video className={`w-4 h-4 ${filter === 'video' ? 'text-white' : 'text-gray-500'}`} />
                Videos
                <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                  filter === 'video' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {videoCount}
                </span>
              </button>
            </div>
            
            {/* Active filter indicator */}
            <div className="text-sm text-gray-500">
              Showing {filteredItems.length} {filter === 'all' ? 'projects' : filter === 'image' ? 'images' : 'videos'}
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY GRID ================= */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-yellow-50 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-200 border-t-green-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-500 animate-pulse" />
                </div>
              </div>
              <p className="mt-4 text-gray-500 font-semibold">Loading projects...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-2xl text-gray-500 font-semibold">No projects to display yet.</p>
              <p className="text-gray-400 mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <GalleryCard
                    item={item}
                    activePlayingId={activePlayingId}
                    onPlayRequest={(id) => setActivePlayingId(id)}
                    onClick={() => {
                      setSelectedItem(item);
                      setActivePlayingId(null);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= LIGHTBOX / MODAL ================= */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => { setSelectedItem(null); setActivePlayingId(null); }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-all duration-300 bg-black/50 hover:bg-black/80 rounded-full p-2 hover:scale-110 z-10 border border-white/20"
            onClick={() => { setSelectedItem(null); setActivePlayingId(null); }}
          >
            <X className="h-8 w-8" />
          </button>

          <div className="max-w-6xl w-full relative z-10" onClick={(e) => e.stopPropagation()}>
            <div className="bg-black/40 rounded-2xl p-2 backdrop-blur-sm border border-white/10">
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
                />
              ) : (() => {
                const youtubeId = extractYoutubeId(selectedItem.url);
                return youtubeId ? (
                  <div className="relative pt-[56.25%]">
                    <iframe
                      className="absolute inset-0 w-full h-full rounded-xl shadow-2xl"
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&rel=0`}
                      title={selectedItem.title || 'Video'}
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                ) : (
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[80vh] rounded-xl shadow-2xl"
                  />
                );
              })()}
            </div>
            
            {selectedItem.title && (
              <div className="mt-6 text-white text-center animate-fadeInUp">
                <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-yellow-300 border border-white/20 mb-2">
                  {selectedItem.type === 'image' ? '📸 Image' : '🎬 Video'}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">{selectedItem.title}</h3>
                {selectedItem.description && (
                  <p className="text-gray-300 mt-2 text-base sm:text-lg max-w-2xl mx-auto">
                    {selectedItem.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>

    </div>
  );
}