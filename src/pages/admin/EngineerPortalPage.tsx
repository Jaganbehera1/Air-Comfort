import { Link, Outlet } from 'react-router-dom';
import { ClipboardList, HardHat, MessageSquare, Wrench, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function EngineerPortalPage() {
  const { user, role } = useAuth();

  const roleLabel = role === 'admin' ? 'Administrator' : role === 'engineer' ? 'Engineer' : 'Customer';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Engineer Portal</h1>
          <p className="text-gray-600 mt-2">
            Review site activity, monitor project updates, and manage engineer-facing tasks in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <HardHat className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Assigned Work</h2>
            </div>
            <p className="text-gray-600 mb-4">Track ongoing installations and field service schedules.</p>
            <div className="text-3xl font-bold text-gray-900">8 Active</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Service Reports</h2>
            </div>
            <p className="text-gray-600 mb-4">Stay updated on completion notes and maintenance follow-ups.</p>
            <div className="text-3xl font-bold text-gray-900">12 Pending</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Wrench className="h-6 w-6 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Maintenance Queue</h2>
            </div>
            <p className="text-gray-600 mb-4">Review the next round of preventive service visits.</p>
            <div className="text-3xl font-bold text-gray-900">5 Scheduled</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Engineer Overview</h2>
              <p className="text-gray-600 mt-2">
                Signed in as <span className="font-semibold text-gray-900">{user?.email || 'Engineer'}</span> with role <span className="font-semibold text-green-600">{roleLabel}</span>.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/admin/engineer-portal/create" className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold">Create Report</Link>
              <Link to="/admin/engineer-portal/reports" className="px-4 py-2 bg-gray-100 rounded-lg">My Reports</Link>
              <Link
                to="/admin"
                className="inline-flex items-center space-x-2 text-green-600 font-semibold hover:text-green-700"
              >
                <span>Go to admin dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Support Requests</h3>
              </div>
              <p className="text-gray-600">Customer requests and on-site coordination are ready for review.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Wrench className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Urgent Follow-ups</h3>
              </div>
              <p className="text-gray-600">Flag high-priority service issues for immediate attention.</p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
