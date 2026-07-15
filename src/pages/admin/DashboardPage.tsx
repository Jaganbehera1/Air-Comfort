import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Video, Settings, TrendingUp } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { countPendingSiteVisits } from '../../lib/siteVisitStats';

export function DashboardPage() {
  const [stats, setStats] = useState({
    totalImages: 0,
    totalVideos: 0,
    totalItems: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    loadStats();
    loadPendingApprovals();
  }, []);

  const loadStats = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'gallery_items'));
      const data = snapshot.docs.map((doc) => doc.data());

      const images = data.filter((item) => item.type === 'image').length;
      const videos = data.filter((item) => item.type === 'video').length;
      setStats((prev) => ({
        ...prev,
        totalImages: images,
        totalVideos: videos,
        totalItems: data.length,
      }));
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadPendingApprovals = async () => {
    try {
      const count = await countPendingSiteVisits();
      setStats((prev) => ({ ...prev, pendingApprovals: count }));
    } catch (error) {
      console.error('Error loading pending approvals:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to the Green Leaf Energy  admin panel</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Projects</h3>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats.totalItems}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Images</h3>
              <Image className="h-8 w-8 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats.totalImages}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Videos</h3>
              <Video className="h-8 w-8 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats.totalVideos}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pending Approvals</h3>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
            <p className="text-4xl font-bold">{stats.pendingApprovals}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/admin/gallery"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <Image className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Gallery Management</h3>
            </div>
            <p className="text-gray-600 text-lg">
              Upload, edit, and delete project images and videos displayed on the public website.
            </p>
          </Link>

          <Link
            to="/admin/settings"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Contact Settings</h3>
            </div>
            <p className="text-gray-600 text-lg">
              Manage contact information including phone number, email, and WhatsApp number.
            </p>
          </Link>
        </div>

        <div className="mt-12 bg-gradient-to-br from-green-600 to-blue-600 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all p-4 rounded-lg text-center font-semibold"
            >
              View Public Website
            </a>
            <Link
              to="/admin/gallery"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all p-4 rounded-lg text-center font-semibold"
            >
              Upload New Media
            </Link>
            <Link
              to="/admin/settings"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all p-4 rounded-lg text-center font-semibold"
            >
              Update Contact Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
