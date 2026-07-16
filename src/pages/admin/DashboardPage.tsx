import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, 
  Video, 
  Settings, 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Upload,
  Eye,
  BarChart3,
  Activity,
  Zap,
  Home,
  FileText,
  Sun,
  Shield,
  Bell,
  ChevronRight,
  Star,
  Award,
  PieChart
} from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadPendingApprovals();
    loadRecentActivity();
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
    } finally {
      setLoading(false);
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

  const loadRecentActivity = async () => {
    // Mock recent activity - replace with actual data
    setRecentActivity([
      { id: 1, action: 'New gallery item uploaded', time: '2 hours ago', type: 'upload' },
      { id: 2, action: 'Site visit report submitted', time: '5 hours ago', type: 'submission' },
      { id: 3, action: 'Gallery item approved', time: '1 day ago', type: 'approval' },
    ]);
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalItems,
      icon: <TrendingUp className="h-8 w-8" />,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-600',
      delay: 0
    },
    {
      title: 'Images',
      value: stats.totalImages,
      icon: <Image className="h-8 w-8" />,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      textColor: 'text-green-600',
      delay: 100
    },
    {
      title: 'Videos',
      value: stats.totalVideos,
      icon: <Video className="h-8 w-8" />,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-600',
      delay: 200
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: <AlertCircle className="h-8 w-8" />,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      textColor: 'text-orange-600',
      delay: 300
    },
  ];

  const quickActions = [
    {
      title: 'Upload New Media',
      icon: <Upload className="h-5 w-5" />,
      to: '/admin/gallery',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'View Gallery',
      icon: <Eye className="h-5 w-5" />,
      to: '/admin/gallery',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Update Settings',
      icon: <Settings className="h-5 w-5" />,
      to: '/admin/settings',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'View Reports',
      icon: <FileText className="h-5 w-5" />,
      to: '/admin/engineer-portal/reports',
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">Welcome back, Admin</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                {stats.pendingApprovals}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">System Online</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={card.title}
              className={`group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeIn`}
              style={{ animationDelay: `${card.delay}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{card.title}</span>
                <div className={`w-12 h-12 bg-gradient-to-br ${card.bgGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`${card.textColor}`}>{card.icon}</div>
                </div>
              </div>
              {loading ? (
                <div className="h-9 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
              ) : (
                <p className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                  {card.title === 'Total Projects' && card.value > 0 && (
                    <span className="text-sm font-normal text-gray-400 ml-2">total</span>
                  )}
                </p>
              )}
              <div className="mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min((card.value / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-3 text-center border border-yellow-100">
            <p className="text-xs text-yellow-600 font-semibold uppercase tracking-wider">Rating</p>
            <p className="text-lg font-bold text-yellow-700">4.9</p>
            <p className="text-xs text-yellow-600">⭐ stars</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Quick Actions
              </h3>
              <span className="text-xs text-gray-400">Click to navigate</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.to}
                  className={`${action.bgColor} rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-transparent hover:border-${action.textColor}`}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-white mb-2`}>
                    {action.icon}
                  </div>
                  <p className={`text-sm font-semibold ${action.textColor}`}>{action.title}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Recent Activity
              </h3>
              <Link to="/admin/activity" className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                View All
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">No recent activity</p>
              ) : (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'upload' ? 'bg-green-100 text-green-600' :
                      activity.type === 'submission' ? 'bg-blue-100 text-blue-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {activity.type === 'upload' && <Upload className="h-4 w-4" />}
                      {activity.type === 'submission' && <FileText className="h-4 w-4" />}
                      {activity.type === 'approval' && <CheckCircle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{activity.action}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Link
            to="/admin/gallery"
            className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Gallery Management</h3>
                  <p className="text-sm text-gray-500">{stats.totalItems} total items</p>
                </div>
              </div>
              <p className="text-gray-600">
                Upload, edit, and delete project images and videos displayed on the public website.
              </p>
              <div className="mt-4 flex items-center gap-1 text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                Manage Gallery
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link
            to="/admin/settings"
            className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Settings className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Contact Settings</h3>
                  <p className="text-sm text-gray-500">Manage contact info</p>
                </div>
              </div>
              <p className="text-gray-600">
                Manage contact information including phone number, email, and WhatsApp number.
              </p>
              <div className="mt-4 flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                Update Settings
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions CTA */}
        <div className="mt-8 bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 text-white p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-300" />
                  Quick Actions
                </h3>
                <p className="text-white/80">Manage your site efficiently with these quick links</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-all px-5 py-2.5 rounded-xl font-semibold text-sm"
                >
                  <Eye className="h-4 w-4" />
                  View Website
                </a>
                <Link
                  to="/admin/gallery"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-all px-5 py-2.5 rounded-xl font-semibold text-sm"
                >
                  <Upload className="h-4 w-4" />
                  Upload Media
                </Link>
                <Link
                  to="/admin/settings"
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-all px-5 py-2.5 rounded-xl font-semibold text-sm"
                >
                  <Settings className="h-4 w-4" />
                  Update Settings
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            System Online
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            {stats.totalItems} Projects
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            {stats.pendingApprovals} Pending
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            v2.0.1
          </span>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}