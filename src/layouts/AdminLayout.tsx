import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '../components/admin/AdminNavbar';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <Outlet />
    </div>
  );
}
