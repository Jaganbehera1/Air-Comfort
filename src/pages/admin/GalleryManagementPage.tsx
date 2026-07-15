import { useEffect, useState } from 'react';
import { Upload, Trash2, Image as ImageIcon, Video } from 'lucide-react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
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

export function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<'image' | 'video'>('image');
  const { user } = useAuth();

  useEffect(() => {
    loadGallery();
  }, []);

  const [pickerOpen, setPickerOpen] = useState(false);

  // Auto-detect YouTube URLs and update type accordingly
  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    if (isYoutubeUrl(newUrl)) {
      setType('video');
    }
  };

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

      // If a file is selected, upload to Supabase Storage and get its public URL
      if (file) {
        const fileExt = file.name.split('.').pop();
        const filename = `${user.uid}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(filename, file, { upsert: false });

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Get public URL
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
        admin_id: user.uid,
        order_index: items.length,
        created_at: new Date().toISOString(),
      });

      // Reset form
      setUrl('');
      setFile(null);
      setTitle('');
      setDescription('');
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600 mt-2">Upload and manage project images and videos</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload New Media</h2>

          <form onSubmit={handleUpload} className="space-y-6">
            <div className="flex items-center justify-between">
              <div />
              <div>
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Choose From Existing
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Media Type
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setType('image')}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    type === 'image'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ImageIcon className="inline h-5 w-5 mr-2" />
                  Image
                </button>
                <button
                  type="button"
                  onClick={() => setType('video')}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    type === 'video'
                      ? 'bg-green-600 text-white shadow-lg'
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
                Media URL (or upload a file below)
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg or https://youtube.com/watch?v=..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Provide an external URL (including YouTube links), or upload a file from your system below.
                YouTube links will automatically be detected and set as video type.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload File (optional)
              </label>
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
                <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="text-sm text-gray-700">{file.name}</div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Project title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Brief description of the project"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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

        {pickerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setPickerOpen(false)} />
            <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full p-6 overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Select Existing Media</h3>
                <button onClick={() => setPickerOpen(false)} className="text-sm text-gray-600">Close</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.filter(i => i.type === type).map((it) => (
                  <button
                    key={it.id}
                    onClick={() => {
                      setUrl(it.url);
                      setFile(null);
                      setPickerOpen(false);
                    }}
                    className="bg-gray-50 rounded overflow-hidden shadow hover:shadow-lg"
                  >
                    <div className="aspect-video bg-gray-200">
                      <img src={it.url} alt={it.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2 text-sm text-gray-700">{it.title || 'Untitled'}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Current Gallery Items ({items.length})
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No gallery items yet. Upload your first project!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video bg-gray-200">
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <Video className="h-12 w-12 text-white" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.type === 'image'
                          ? 'bg-green-500 text-white'
                          : 'bg-purple-500 text-white'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    {item.title && (
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-full bg-red-50 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
