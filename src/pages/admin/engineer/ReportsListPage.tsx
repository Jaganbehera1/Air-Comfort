import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listReports, deleteReport, SiteVisitReport } from '../../../lib/engineerReports';
import { listSiteVisitsByEngineer } from '../../../lib/siteVisits';
import { 
  Trash2, Edit, Plus, Eye, Calendar, MapPin, Phone, User, 
  FileText, CheckCircle, XCircle, Clock, AlertCircle, 
  Search, Filter, Grid, List, ArrowUpDown 
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

function renderStatusBadge(status: SiteVisitReport['status']) {
  const base = 'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300';
  switch (status) {
    case 'approved':
      return (
        <span className={`${base} bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 shadow-sm shadow-green-200/50`}>
          <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
          Approved
        </span>
      );
    case 'rejected':
      return (
        <span className={`${base} bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200 shadow-sm shadow-red-200/50`}>
          <XCircle className="h-3.5 w-3.5 mr-1.5" />
          Rejected
        </span>
      );
    case 'submitted':
      return (
        <span className={`${base} bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200 shadow-sm shadow-yellow-200/50`}>
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          Submitted
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border border-gray-200`}>
          <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
          Draft
        </span>
      );
  }
}

export function ReportsListPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<SiteVisitReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (user?.uid) {
        try {
          const remote = await listSiteVisitsByEngineer(user.uid);
          const local = listReports();
          const mergedMap = new Map(local.map((item) => [item.id, item]));
          remote.forEach((item) => mergedMap.set(item.id, item));
          setItems(Array.from(mergedMap.values()).sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1)));
        } catch (err) {
          console.warn('Failed to load engineer reports from Firestore, using local drafts', err);
          setItems(listReports());
        }
      } else {
        setItems(listReports());
      }
      setLoading(false);
    })();
  }, [user]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm('Delete this draft?')) return;
    deleteReport(id);
    setItems(listReports());
  };

  // Filter and search
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone_number?.includes(searchTerm) ||
      item.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: items.length,
    approved: items.filter(i => i.status === 'approved').length,
    rejected: items.filter(i => i.status === 'rejected').length,
    submitted: items.filter(i => i.status === 'submitted').length,
    draft: items.filter(i => i.status === 'draft').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              Site Visit Reports
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Manage and track all your site visit reports</p>
          </div>
          <Link 
            to="create" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 hover:scale-105 transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            <span>Create Report</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Total</span>
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Approved</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Rejected</span>
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.rejected}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Submitted</span>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.submitted}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Drafts</span>
              <AlertCircle className="h-5 w-5 text-gray-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.draft}</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, phone, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none appearance-none bg-white min-w-[140px]"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="submitted">Submitted</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'list' ? 'bg-green-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-gray-500 mt-4 font-medium">Loading reports...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-12 w-12 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">No reports found</h3>
            <p className="text-gray-400 mt-1">
              {searchTerm || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first report'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="create"
                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-600/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Plus className="h-5 w-5" />
                Create Report
              </Link>
            )}
          </div>
        )}

        {/* Reports Grid */}
        {!loading && filteredItems.length > 0 && (
          <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
            {filteredItems.map((r) => (
              <div
                key={r.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Status Bar */}
                <div className={`h-1.5 ${
                  r.status === 'approved' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  r.status === 'rejected' ? 'bg-gradient-to-r from-red-400 to-red-500' :
                  r.status === 'submitted' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                  'bg-gradient-to-r from-gray-300 to-gray-400'
                }`} />

                <div className="p-5">
                  <div className="flex justify-between items-start gap-3">
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
                    <div className="flex-shrink-0">
                      {renderStatusBadge(r.status)}
                    </div>
                  </div>

                  {r.address && (
                    <div className="flex items-start gap-2 mt-2 text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{r.address}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(r.updated_at).toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to={`${r.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-medium hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group-hover:shadow-md"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </Link>
                    {r.status === 'draft' && (
                      <>
                        <Link
                          to={`${r.id}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group-hover:shadow-md"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={(e) => handleDelete(r.id, e)}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 text-red-600 font-medium hover:from-red-100 hover:to-rose-100 transition-all duration-300 group-hover:shadow-md"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {!loading && filteredItems.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-400">
            Showing {filteredItems.length} of {items.length} reports
          </div>
        )}
      </div>
    </div>
  );
}