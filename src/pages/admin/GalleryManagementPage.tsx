import { useEffect, useState } from 'react';
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  Video, 
  Plus, 
  X, 
  Search,
  Filter,
  Grid,
  List,
  Eye,
  Edit,
  Check,
  AlertCircle,
  Calendar,
  User,
  Link as LinkIcon,
  File,
  Download,
  Share2,
  Star,
  Heart,
  MessageSquare,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  RefreshCw
} from 'lucide-react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db, GalleryItem } from '../../lib/firebase';
import { supabase, GALLERY_BUCKET } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

// Helper function to detect if URL is a YouTube link
function isYoutubeUrl(url: string): boolean {
  try {
    return (
      url.includes('youtube.com') ||
      url.includes('youtu.be') ||
      url.includes('youtube-nocookie.com')
    );
  } catch {
    return false;
  }
}

// Helper to get YouTube thumbnail
function getYoutubeThumbnail(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return url;
}

export function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<'image' | 'video'>('image');
  const [company, setCompany] = useState<'air-comfort' | 'sc-mohanty' | 'both'>('air-comfort');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const { user } = useAuth();

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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUploading(true);

    try {
      let downloadUrl = url.trim();

      if (file) {
        const fileExt = file.name.split('.').pop();
        const filename = `${user.uid}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(filename, file, { upsert: false });

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        const { data: publicData } = supabase.storage
          .from(GALLERY_BUCKET)
          .getPublicUrl(filename);

        downloadUrl = publicData.publicUrl;
      }

      if (!downloadUrl) {
        throw new Error('No file or URL provided for upload');
      }

      await addDoc(collection(db, 'gallery_items'), {
        type,
        url: downloadUrl,
        title: title.trim(),
        description: description.trim(),
        company,
        admin_id: user.uid,
        order_index: items.length,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setUrl('');
      setFile(null);
      setTitle('');
      setDescription('');
      setCompany('air-comfort');
      setShowUploadForm(false);
      await loadGallery();
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Upload failed. Check console for details.');
    }

    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await deleteDoc(doc(db, 'gallery_items', id));
      await loadGallery();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: items.length,
    images: items.filter(i => i.type === 'image').length,
    videos: items.filter(i => i.type === 'video').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  Gallery Management
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">Upload and manage project images and videos</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">{items.length} items</span>
            </div>
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
            >
              {showUploadForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {showUploadForm ? 'Cancel' : 'Upload New'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500 font-medium">Total Items</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-blue-600">{stats.images}</p>
            <p className="text-xs text-blue-600 font-medium">Images</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-purple-600">{stats.videos}</p>
            <p className="text-xs text-purple-600 font-medium">Videos</p>
          </div>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 animate-slideDown">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Upload className="h-5 w-5 text-purple-500" />
                Upload New Media
              </h2>
              <button
                onClick={() => setShowUploadForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Media Type
                </label>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setType('image')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      type === 'image'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ImageIcon className="inline h-5 w-5 mr-2" />
                    Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('video')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      type === 'video'
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Video className="inline h-5 w-5 mr-2" />
                    Video
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Media URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  placeholder="https://example.com/image.jpg or https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  YouTube links will be automatically detected
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Or Upload File
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-all duration-300">
                  <input
                    type="file"
                    accept={type === 'image' ? 'image/*' : 'video/*'}
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null;
                      setFile(f);
                      if (f) setUrl('');
                    }}
                    className="w-full"
                  />
                  {file && (
                    <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <File className="h-4 w-4 text-gray-400" />
                        {file.name}
                        <span className="text-xs text-gray-400">
                          ({(file.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-sm text-red-500 hover:text-red-600 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  placeholder="Project title (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company
                </label>
                <select
                  value={company}
                  onChange={(e) => setCompany(e.target.value as 'air-comfort' | 'sc-mohanty' | 'both')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                >
                  <option value="air-comfort">Air Comfort</option>
                  <option value="sc-mohanty">S.C. Mohanty</option>
                  <option value="both">Both Companies</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none bg-gray-50/50 resize-none"
                  placeholder="Brief description of the project (optional)"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload Media</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search gallery items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={loadGallery}
                className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300"
              >
                <RefreshCw className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Gallery Items
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'})
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="text-gray-500 mt-4 font-medium">Loading gallery...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="h-12 w-12 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700">No gallery items found</h3>
              <p className="text-gray-400 mt-1">
                {searchTerm || filterType !== 'all' ? 'Try adjusting your filters' : 'Upload your first project'}
              </p>
              {!searchTerm && filterType === 'all' && (
                <button
                  onClick={() => setShowUploadForm(true)}
                  className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Plus className="h-5 w-5" />
                  Upload Media
                </button>
              )}
            </div>
          ) : (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-4`}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex items-center gap-4 p-4' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'aspect-video'} bg-gray-200`}>
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.title || 'Gallery item'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-purple-700">
                        {isYoutubeUrl(item.url) ? (
                          <img
                            src={getYoutubeThumbnail(item.url)}
                            alt={item.title || 'Video thumbnail'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Video className="h-12 w-12 text-white/50" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center pl-1">
                              <Video className="h-6 w-6 text-purple-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.type === 'image'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
                    {item.title && (
                      <h3 className={`font-semibold text-gray-900 ${viewMode === 'list' ? 'text-base' : 'text-sm'} mb-1 line-clamp-1`}>
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className={`text-gray-600 ${viewMode === 'list' ? 'text-sm' : 'text-xs'} line-clamp-2`}>
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700">
                      {item.company === 'sc-mohanty' ? 'S.C. Mohanty' : item.company === 'both' ? 'Both Companies' : 'Air Comfort'}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-purple-600 hover:text-purple-700 font-medium text-sm py-1.5 px-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-300"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <ImageIcon className="h-3 w-3 text-blue-500" />
              {stats.images} Images
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <Video className="h-3 w-3 text-purple-500" />
              {stats.videos} Videos
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Gallery Online
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span>v2.0.1</span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}