import { Link, Outlet } from 'react-router-dom';
import { 
  ClipboardList, 
  HardHat, 
  MessageSquare, 
  Wrench, 
  ArrowRight,
  User,
  Zap,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  FileText,
  Settings,
  Home,
  Sun,
  Shield,
  Bell,
  ChevronRight,
  Star,
  Award,
  PieChart,
  Activity,
  BarChart3,
  Eye,
  Upload,
  Plus,
  List,
  Grid
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function EngineerPortalPage() {
  const { user, role } = useAuth();

  const roleLabel = role === 'admin' ? 'Administrator' : role === 'engineer' ? 'Engineer' : 'Customer';

  const stats = [
    {
      title: 'Active Projects',
      value: '8',
      icon: <HardHat className="h-6 w-6" />,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      textColor: 'text-green-600',
      subtitle: 'Ongoing installations'
    },
    {
      title: 'Pending Reports',
      value: '12',
      icon: <ClipboardList className="h-6 w-6" />,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-600',
      subtitle: 'Need review'
    },
    {
      title: 'Scheduled Maintenance',
      value: '5',
      icon: <Wrench className="h-6 w-6" />,
      gradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-50 to-amber-50',
      textColor: 'text-yellow-600',
      subtitle: 'Upcoming visits'
    },
    {
      title: 'Completed Tasks',
      value: '24',
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-600',
      subtitle: 'This month'
    },
  ];

  const quickLinks = [
    {
      title: 'Create Report',
      icon: <Plus className="h-5 w-5" />,
      to: '/admin/engineer-portal/create',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      textColor: 'text-green-600'
    },
    {
      title: 'My Reports',
      icon: <List className="h-5 w-5" />,
      to: '/admin/engineer-portal/reports',
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Site Visits',
      icon: <Eye className="h-5 w-5" />,
      to: '/admin/site-visits',
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
      to: '/admin',
      gradient: 'from-yellow-500 to-amber-500',
      bgColor: 'from-yellow-50 to-amber-50',
      textColor: 'text-yellow-600'
    },
  ];

  const recentActivities = [
    { id: 1, action: 'Site visit report submitted', time: '2 hours ago', type: 'submission' },
    { id: 2, action: 'New project assigned', time: '5 hours ago', type: 'assignment' },
    { id: 3, action: 'Maintenance scheduled', time: '1 day ago', type: 'maintenance' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <HardHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent">
                  Engineer Portal
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Review site activity, monitor project updates, and manage engineer-facing tasks
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">System Online</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <User className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">{roleLabel}</span>
            </div>
          </div>
        </div>

        {/* User Info Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user?.email?.charAt(0).toUpperCase() || 'E'}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{user?.email || 'Engineer'}</p>
                <p className="text-xs text-gray-500">Role: <span className="font-medium text-green-600">{roleLabel}</span></p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Last login: Today
              </span>
              <span className="w-px h-4 bg-gray-200 hidden sm:block"></span>
              <Link 
                to="/admin" 
                className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1 transition-colors"
              >
                <ArrowRight className="h-3 w-3" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className={`group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fadeIn`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">{stat.title}</span>
                <div className={`w-11 h-11 bg-gradient-to-br ${stat.bgGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <div className={stat.textColor}>{stat.icon}</div>
                </div>
              </div>
              <p className={`text-2xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              to={link.to}
              className={`bg-gradient-to-br ${link.bgColor} rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-transparent hover:border-${link.textColor}`}
            >
              <div className={`w-10 h-10 bg-gradient-to-r ${link.gradient} rounded-xl flex items-center justify-center text-white mb-2`}>
                {link.icon}
              </div>
              <p className={`text-sm font-semibold ${link.textColor}`}>{link.title}</p>
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          
          {/* Overview Section - Left 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Recent Activity
                </h3>
                <Link to="/admin/engineer-portal/activity" className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'submission' ? 'bg-green-100 text-green-600' :
                      activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'submission' && <FileText className="h-4 w-4" />}
                      {activity.type === 'assignment' && <User className="h-4 w-4" />}
                      {activity.type === 'maintenance' && <Wrench className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{activity.action}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats - Right column */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-yellow-300" />
                <h4 className="font-semibold">Quick Stats</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-white/80 text-sm">Total Projects</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-white/80 text-sm">Completion Rate</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Avg. Rating</span>
                  <span className="font-bold flex items-center gap-1">⭐ 4.9</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="h-5 w-5 text-blue-200" />
                <h4 className="font-semibold">Notifications</h4>
              </div>
              <div className="space-y-2">
                <div className="bg-white/10 rounded-lg p-2 text-sm">
                  <p className="font-medium">3 new reports</p>
                  <p className="text-white/70 text-xs">Pending review</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-sm">
                  <p className="font-medium">2 maintenance tasks</p>
                  <p className="text-white/70 text-xs">Due this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Support Requests</h3>
                <p className="text-sm text-gray-500">Customer inquiries</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">Customer requests and on-site coordination are ready for review.</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-2xl font-bold text-purple-600">3</span>
              <span className="text-sm text-gray-400">pending requests</span>
              <Link to="/admin/engineer-portal/support" className="ml-auto text-purple-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                View <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Urgent Follow-ups</h3>
                <p className="text-sm text-gray-500">High priority issues</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">Flag high-priority service issues for immediate attention.</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-2xl font-bold text-red-600">2</span>
              <span className="text-sm text-gray-400">urgent tasks</span>
              <Link to="/admin/engineer-portal/urgent" className="ml-auto text-red-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                View <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Sun className="h-3 w-3 text-yellow-500" />
              Green Leaf Energy
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span>v2.0.1</span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              System Online
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span>© 2025</span>
          </div>
        </div>

      </div>
      <Outlet />

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