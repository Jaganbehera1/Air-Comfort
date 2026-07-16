import { useEffect, useState } from 'react';
import { listSiteVisits, updateSiteVisitStatus, deleteSiteVisit } from '../../lib/siteVisits';
import { SiteVisitReport } from '../../lib/engineerReports';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Phone,
  MapPin,
  Calendar,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  FileText,
  Users,
  Grid,
  List,
  Check,
  X,
  Database,
  HardDrive
} from 'lucide-react';

function renderStatusBadge(status: SiteVisitReport['status']) {
  const base = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300';
  switch (status) {
    case 'approved':
      return (
        <span className={`${base} bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm shadow-green-200/50`}>
          <CheckCircle className="h-3.5 w-3.5" />
          Approved
        </span>
      );
    case 'rejected':
      return (
        <span className={`${base} bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm shadow-red-200/50`}>
          <XCircle className="h-3.5 w-3.5" />
          Rejected
        </span>
      );
    case 'submitted':
      return (
        <span className={`${base} bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border border-yellow-200 shadow-sm shadow-yellow-200/50`}>
          <Clock className="h-3.5 w-3.5" />
          Pending Review
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border border-gray-200`}>
          <AlertCircle className="h-3.5 w-3.5" />
          Draft
        </span>
      );
  }
}

export function SiteVisitsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<SiteVisitReport[]>([]);
  const [filteredItems, setFilteredItems] = useState<SiteVisitReport[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, filterStatus]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await listSiteVisits();
      console.log('📊 Loaded site visits:', data);
      setItems(data);
      setDataSource(data.length > 0 ? '✅ Data loaded successfully' : '📭 No data found');
      if (data.length === 0) {
        setToast({ 
          message: 'No site visits found. Reports may be stored locally or in a different collection.', 
          type: 'error' 
        });
        setTimeout(() => setToast(null), 5000);
      }
    } catch (error) {
      console.error('❌ Error loading site visits:', error);
      setToast({ message: 'Failed to load site visits', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.customer_name?.toLowerCase().includes(term) ||
        item.phone_number?.includes(term) ||
        item.address?.toLowerCase().includes(term)
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }
    setFilteredItems(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('🗑️ Deleting site visit:', id);
      await deleteSiteVisit(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setToast({ message: 'Report deleted successfully', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error: any) {
      console.error('❌ Delete failed:', error);
      setToast({ message: `Delete failed: ${error?.message || error}`, type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
    setShowDeleteConfirm(null);
  };

  const handleReview = async (id: string, status: 'approved' | 'rejected') => {
    if (!user) return;
    const comment = status === 'rejected' ? prompt('Enter rejection reason (optional):') : '';
    try {
      await updateSiteVisitStatus(id, status, user.uid, comment || undefined);
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
                reviewed_by: user.uid,
                reviewed_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                admin_comment: comment || '',
              }
            : item
        )
      );
      setToast({ message: `Report ${status} successfully`, type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error: any) {
      console.error('❌ Review update failed:', error);
      setToast({ message: `Failed to ${status} report: ${error?.message || error}`, type: 'error' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const stats = {
    total: items.length,
    approved: items.filter(i => i.status === 'approved').length,
    rejected: items.filter(i => i.status === 'rejected').length,
    pending: items.filter(i => i.status === 'submitted').length,
    draft: items.filter(i => i.status === 'draft').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-500 mt-4 font-medium">Loading site visits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Site Visits
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">Manage and review all site visit reports</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">{items.length} Reports</span>
            </div>
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 text-sm"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Data Source Info */}
        {dataSource && (
          <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-700 flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>{dataSource}</span>
            <span className="ml-auto text-blue-500">
              {items.length > 0 ? `${items.length} report(s) found` : 'No reports found'}
            </span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-3 md:gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-xl md:text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-[10px] md:text-xs text-gray-500 font-medium">Total</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-3 md:p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-xl md:text-2xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-[10px] md:text-xs text-green-600 font-medium">Approved</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-200 p-3 md:p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-xl md:text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-[10px] md:text-xs text-red-600 font-medium">Rejected</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 p-3 md:p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-xl md:text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-[10px] md:text-xs text-yellow-600 font-medium">Pending</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-3 md:p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-xl md:text-2xl font-bold text-gray-600">{stats.draft}</p>
            <p className="text-[10px] md:text-xs text-gray-600 font-medium">Drafts</p>
          </div>
        </div>

        {/* Toast Message */}
        {toast && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-slideDown ${
            toast.type === 'success'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700'
              : 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, phone, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="submitted">Pending</option>
                <option value="draft">Draft</option>
              </select>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Site Visits List */}
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mb-4">
              <Users className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">No site visits found</h3>
            <p className="text-gray-400 mt-1 max-w-md text-center">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your filters' 
                : 'No reports available. Reports are stored in the "engineer_reports" collection.'}
            </p>
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200 max-w-md">
              <p className="text-sm text-yellow-700">
                <strong>💡 Tip:</strong> Make sure there are site visits submitted by engineers. 
                Check the <Link to="/admin/engineer-portal/reports" className="text-blue-600 underline font-medium">Engineer Reports</Link> page to see all reports.
              </p>
            </div>
            <button
              onClick={loadData}
              className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <RefreshCw className="h-5 w-5" />
              Refresh Data
            </button>
          </div>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
            {filteredItems.map((r) => (
              <div
                key={r.id}
                className={`group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                  viewMode === 'list' ? 'flex items-start gap-4 p-4' : ''
                }`}
              >
                {/* Status Bar */}
                <div className={`h-1.5 ${
                  r.status === 'approved' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  r.status === 'rejected' ? 'bg-gradient-to-r from-red-400 to-red-500' :
                  r.status === 'submitted' ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                  'bg-gradient-to-r from-gray-300 to-gray-400'
                }`} />

                <div className={`${viewMode === 'list' ? 'flex-1 p-0' : 'p-5'}`}>
                  <div className={`${viewMode === 'list' ? 'flex items-start justify-between' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <h3 className="font-semibold text-gray-900 truncate">
                          {r.customer_name || 'Untitled Report'}
                        </h3>
                      </div>
                      {r.phone_number && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                          <span>{r.phone_number}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      {renderStatusBadge(r.status)}
                    </div>
                  </div>

                  {r.address && (
                    <div className="flex items-start gap-2 mt-2 text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{r.address}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{r.updated_at ? new Date(r.updated_at).toLocaleString() : 'N/A'}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                    <Link
                      to={`/admin/engineer-portal/reports/${r.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>

                    {r.status === 'submitted' && (
                      <>
                        <button
                          onClick={() => handleReview(r.id, 'approved')}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-medium hover:from-green-100 hover:to-emerald-100 transition-all duration-300 text-sm"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReview(r.id, 'rejected')}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 text-red-600 font-medium hover:from-red-100 hover:to-rose-100 transition-all duration-300 text-sm"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setShowDeleteConfirm(r.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-300 text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>

                  {/* Delete Confirmation */}
                  {showDeleteConfirm === r.id && (
                    <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200">
                      <p className="text-sm text-red-700 font-medium mb-2">Delete this report?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Database className="h-3 w-3 text-blue-500" />
              {items.length} Reports
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              {stats.approved} Approved
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <XCircle className="h-3 w-3 text-red-500" />
              {stats.rejected} Rejected
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-yellow-500" />
              {stats.pending} Pending
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-gray-500" />
              {stats.draft} Drafts
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}