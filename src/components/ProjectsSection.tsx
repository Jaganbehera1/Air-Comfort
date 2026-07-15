import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, GalleryItem } from '../lib/firebase';
import { GalleryCard } from './GalleryCard';
import { X } from 'lucide-react';

// Helper to extract YouTube video ID
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

export function ProjectsSection({ limit }: { limit?: number }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const q = query(collection(db, 'gallery_items'), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as GalleryItem[];
      setItems(limit ? data.slice(0, limit) : data);
    } catch (err) {
      console.error('ProjectsSection load error', err);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Projects</h2>
          <p className="text-gray-600 mt-3">A selection of recent installations and works</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              activePlayingId={activePlayingId}
              onPlayRequest={(id) => setActivePlayingId(id)}
              onClick={() => {
                setActivePlayingId(null);
                setSelectedItem(item);
              }}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setSelectedItem(null)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            View All Projects
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/80 rounded-full p-2"
            onClick={() => setSelectedItem(null)}
          >
            <X className="h-8 w-8" />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedItem.type === 'image' ? (
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            ) : (() => {
              const youtubeId = extractYoutubeId(selectedItem.url);
              return youtubeId ? (
                <iframe
                  width="100%"
                  height="600"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0`}
                  title={selectedItem.title || 'Video'}
                  allowFullScreen
                  className="rounded-2xl shadow-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              );
            })()}
            {selectedItem.title && (
              <div className="mt-6 text-white text-center">
                <h3 className="text-3xl font-bold">{selectedItem.title}</h3>
                {selectedItem.description && (
                  <p className="text-gray-300 mt-3 text-lg">{selectedItem.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
