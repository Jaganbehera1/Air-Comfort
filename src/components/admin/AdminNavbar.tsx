import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { countPendingSiteVisits } from '../../lib/siteVisitStats';

type NavbarLink = {
  to: string;
  label: string;
  badge?: number;
};

export function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, role } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);

  let links: NavbarLink[] = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/gallery', label: 'Gallery Management' },
    { to: '/admin/engineer-portal', label: 'Engineer Portal' },
    { to: '/admin/settings', label: 'Settings' },
  ];

  if (role === 'engineer') {
    links = [
      { to: '/admin/engineer-portal/create', label: 'Site Visit Form' },
    ];
  }

  if (role === 'admin') {
    links = [
      { to: '/admin', label: 'Dashboard' },
      { to: '/admin/site-visits', label: 'Site Visits', badge: pendingCount },
      { to: '/admin/gallery', label: 'Gallery Management' },
      { to: '/admin/settings', label: 'Settings' },
      { to: '/admin/engineer-portal', label: 'Engineer Portal' },
    ];
  }

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    if (role === 'admin') {
      countPendingSiteVisits().then(setPendingCount).catch(() => setPendingCount(0));
    }
  }, [role]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
    setIsOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold">Admin Panel</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${
                    isActive(link.to)
                      ? 'text-green-400 border-b-2 border-green-400'
                      : 'text-gray-300 hover:text-white'
                  } transition-colors duration-200 font-medium pb-1`}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                        {link.badge}
                      </span>
                    ) : null}
                  </span>
                </Link>
              ))}

              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>

            {/* Hamburger Menu Button (mobile only) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu (mobile only) */}
      <div
        ref={sidebarRef}
        className={`md:hidden fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                isActive(link.to)
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                {link.label}
                {link.badge ? (
                  <span className="inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
                    {link.badge}
                  </span>
                ) : null}
              </span>
            </Link>
          ))}

          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-red-400 hover:text-red-300 font-medium"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay to close sidebar (mobile only) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 mt-16"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
