import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, GalleryItem } from '../lib/firebase';
import { GalleryCard } from './GalleryCard';
import { X, Building2, Sparkles } from 'lucide-react';

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

function resolveCompany(item: GalleryItem) {
  return item.company || 'air-comfort';
}

function matchesCompany(item: GalleryItem, selectedCompany: 'all' | 'air-comfort' | 'sc-mohanty') {
  if (selectedCompany === 'all') return true;
  const company = resolveCompany(item);
  if (company === 'both') return true;
  return company === selectedCompany;
}

export function ProjectsSection({ limit }: { limit?: number }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<'all' | 'air-comfort' | 'sc-mohanty'>('all');

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

  const filteredItems = items.filter((item) => matchesCompany(item, selectedCompany));
  const companySections = [
    {
      id: 'air-comfort' as const,
      title: 'Air Comfort Projects',
      subtitle: 'Premium rooftop and energy solutions by Air Comfort',
      accent: 'from-orange-500 to-amber-500',
      badge: 'Air Comfort',
    },
    {
      id: 'sc-mohanty' as const,
      title: 'S.C. Mohanty Projects',
      subtitle: 'Trusted installations and service work by S.C. Mohanty',
      accent: 'from-blue-600 to-cyan-500',
      badge: 'S.C. Mohanty',
    },
  ];

  const sectionsToRender = selectedCompany === 'all'
    ? companySections.filter((company) => filteredItems.some((item) => resolveCompany(item) === company.id || resolveCompany(item) === 'both'))
    : companySections.filter((company) => company.id === selectedCompany);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-200 text-sm font-semibold text-gray-700">
            <Sparkles className="h-4 w-4 text-green-600" />
            Our Portfolio
          </div>
          <h2 className="mt-4 text-4xl font-bold text-gray-900">Our Projects</h2>
          <p className="mt-3 text-lg text-gray-600">A curated collection of work delivered by both companies</p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'air-comfort', label: 'Air Comfort' },
            { id: 'sc-mohanty', label: 'S.C. Mohanty' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedCompany(filter.id as 'all' | 'air-comfort' | 'sc-mohanty')}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${selectedCompany === filter.id ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg' : 'bg-white text-gray-700 border border-gray-200 hover:border-green-400 hover:text-green-700'}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {sectionsToRender.map((company) => {
          const itemsForCompany = filteredItems.filter((item) => {
            const resolved = resolveCompany(item);
            return resolved === company.id || resolved === 'both';
          });

          if (itemsForCompany.length === 0) return null;

          return (
            <div key={company.id} className="mb-10 rounded-[2rem] border border-gray-200 bg-white/90 p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${company.accent} px-3 py-1 text-sm font-semibold text-white`}>
                    <Building2 className="h-4 w-4" />
                    {company.badge}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-gray-900">{company.title}</h3>
                  <p className="mt-1 text-gray-600">{company.subtitle}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600">
                  {itemsForCompany.length} project{itemsForCompany.length === 1 ? '' : 's'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {itemsForCompany.map((item) => (
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
            </div>
          );
        })}

        <div className="mt-8 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            View All Projects
          </Link>
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
