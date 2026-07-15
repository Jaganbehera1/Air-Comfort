import { useState } from 'react';
import { Play } from 'lucide-react';
import { GalleryItem } from '../lib/firebase';

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
  activePlayingId?: string | null;
  onPlayRequest?: (id: string | null) => void;
}

// Helper function to extract YouTube video ID from various URL formats
function extractYoutubeId(url: string): string | null {
  try {
    // Handle youtu.be/xxx format
    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      if (parts[1]) {
        return parts[1].split('?')[0].split('&')[0];
      }
    }
    // Handle youtube.com/watch?v=xxx format
    if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('v');
    }
    // Handle youtube.com/embed/xxx format
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

export function GalleryCard({ item, onClick, activePlayingId, onPlayRequest }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [suppressClick, setSuppressClick] = useState(false);

  const youtubeId = item.type === 'video' ? extractYoutubeId(item.url) : null;
  const isYoutube = !!youtubeId;

  const isPlaying = activePlayingId === item.id;
  // Show autoplay on hover (desktop) or when this card is the active playing id
  const shouldShowYoutube = (isHovered || isPlaying) && isYoutube;

  const handleTouchStart = (e: React.TouchEvent) => {
    // Start touch-play. Suppress the immediate click that follows a touch
    // so the first tap starts playback instead of opening the modal.
    e.stopPropagation();
    setSuppressClick(true);
    onPlayRequest?.(item.id);
    window.setTimeout(() => setSuppressClick(false), 350);
  };

  const handleCardClick = () => {
    // If a recent touch occurred to start playback, don't open modal immediately.
    if (suppressClick) return;
    // clicking intentionally opens modal — clear active playing id
    onPlayRequest?.(null);
    onClick();
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => { setIsHovered(true); onPlayRequest?.(item.id); }}
      onMouseLeave={() => { setIsHovered(false); onPlayRequest?.(null); }}
      onTouchStart={handleTouchStart}
      className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100"
    >
      <div className="relative aspect-video bg-gradient-to-br from-green-100 to-blue-100 overflow-hidden">
        {item.type === 'image' ? (
          <img
            src={item.url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : shouldShowYoutube ? (
          // YouTube iframe with autoplay and sound enabled
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=0`}
            title={item.title || 'Video'}
            allowFullScreen
            className="absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          // Default video placeholder or non-YouTube video
          <>
            {isYoutube ? (
              // YouTube thumbnail placeholder
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              // Fallback for non-YouTube videos
              <video
                src={item.url}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
              <div className="bg-white bg-opacity-95 rounded-full p-6 group-hover:bg-opacity-100 group-hover:scale-110 transition-all duration-300">
                <Play className="h-12 w-12 text-green-600" />
              </div>
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
      </div>
      {item.title && (
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-green-600 transition-colors">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">{item.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
