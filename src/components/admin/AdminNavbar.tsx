import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard,  // Changed from Dashboard
  Image, 
  Settings, 
  Users, 
  ClipboardCheck, 
  Shield, 
  ChevronDown, 
  Bell, 
  User,
  PlusCircle,
  FileText,
  Home,
  Mail
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { countPendingSiteVisits } from '../../lib/siteVisitStats';

type NavbarLink = {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
};

export function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, role, user } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);

  const getNavLinks = (): NavbarLink[] => {
    if (role === 'engineer') {
      return [
        { 
          to: '/admin/engineer-portal/create', 
          label: 'Site Visit Form', 
          icon: <ClipboardCheck className="h-5 w-5" /> 
        },
      ];
    }

    if (role === 'admin') {
      return [
        { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
        { 
          to: '/admin/site-visits', 
          label: 'Site Visits', 
          icon: <ClipboardCheck className="h-5 w-5" />,
          badge: pendingCount 
        },
        { to: '/admin/contact-requests', label: 'Contact Requests', icon: <Mail className="h-5 w-5" /> },
        { to: '/admin/gallery', label: 'Gallery', icon: <Image className="h-5 w-5" /> },
        { to: '/admin/engineer-portal', label: 'Engineers', icon: <Users className="h-5 w-5" /> },
        { to: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
      ];
    }

    return [];
  };

  const links = getNavLinks();

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    if (role === 'admin') {
      countPendingSiteVisits().then(setPendingCount).catch(() => setPendingCount(0));
    }
  }, [role]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isOpen || isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isProfileOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/admin')}>
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-green-400 to-green-600 p-2.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Sun className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent tracking-tight">
                  Admin Panel
                </span>
                <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  {role === 'admin' ? 'Administrator' : 'Engineer'}
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300
                    flex items-center gap-2.5 text-sm
                    ${isActive(link.to) 
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg shadow-red-500/30 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {isActive(link.to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></span>
                  )}
                </Link>
              ))}

              {/* Profile Dropdown */}
              <div className="relative ml-4" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-700/50"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">
                      {user?.email?.split('@')[0] || 'Admin'}
                    </p>
                    <p className="text-[10px] text-gray-400 capitalize">{role}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden animate-slideDown">
                    <div className="p-4 border-b border-gray-700/50">
                      <p className="text-sm font-semibold text-white">{user?.email || 'Admin User'}</p>
                      <p className="text-xs text-gray-400 mt-0.5 capitalize">Role: {role}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
                      >
                        <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Notification Bell for Mobile */}
              {pendingCount > 0 && (
                <div className="relative">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                    {pendingCount}
                  </span>
                </div>
              )}
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          md:hidden fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
          shadow-2xl transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ top: '64px' }}
      >
        <div className="h-full overflow-y-auto">
          {/* User Profile in Sidebar */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl shadow-green-500/20">
                <User className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-base font-bold text-white">
                  {user?.email?.split('@')[0] || 'Admin'}
                </p>
                <p className="text-xs text-gray-400 capitalize">{role}</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300
                  ${isActive(link.to)
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="flex items-center gap-3 font-medium">
                  {link.icon}
                  {link.label}
                </span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="inline-flex items-center justify-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white animate-pulse">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 font-medium mt-2"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          style={{ top: '64px' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}