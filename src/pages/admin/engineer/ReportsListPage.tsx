import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listReports, deleteReport, SiteVisitReport } from '../../../lib/engineerReports';
import { listSiteVisitsByEngineer } from '../../../lib/siteVisits';
import { Trash2, Edit, Plus } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

function renderStatusBadge(status: SiteVisitReport['status']) {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';
  switch (status) {
    case 'approved':
      return <span className={`${base} bg-green-100 text-green-800`}>Approved</span>;
    case 'rejected':
      return <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>;
    case 'submitted':
      return <span className={`${base} bg-yellow-100 text-yellow-800`}>Submitted</span>;
    default:
      return <span className={`${base} bg-gray-100 text-gray-800`}>Draft</span>;
  }
}

export function ReportsListPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<SiteVisitReport[]>([]);

  useEffect(() => {
    (async () => {
      if (user?.uid) {
        try {
          const remote = await listSiteVisitsByEngineer(user.uid);
          const local = listReports();
          const mergedMap = new Map(local.map((item) => [item.id, item]));
          remote.forEach((item) => mergedMap.set(item.id, item));
          setItems(Array.from(mergedMap.values()).sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1)));
          return;
        } catch (err) {
          console.warn('Failed to load engineer reports from Firestore, using local drafts', err);
        }
      }
      setItems(listReports());
    })();
  }, [user]);

  const handleDelete = (id: string) => {
    if (!confirm('Delete this draft?')) return;
    deleteReport(id);
    setItems(listReports());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Site Visit Reports</h1>
          <Link to="create" className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg">
            <Plus className="h-4 w-4" />
            <span>Create Report</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-gray-500 py-24">No reports yet. Create your first report.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((r) => (
              <div key={r.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{r.customer_name || 'Untitled'}</h3>
                    <p className="text-sm text-gray-500">{r.phone_number}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {renderStatusBadge(r.status)}
                      <span className="text-sm text-gray-400">{new Date(r.updated_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link to={`${r.id}`} className="text-green-600 hover:underline flex items-center space-x-2">
                      <span>View</span>
                    </Link>
                    {r.status === 'draft' && (
                      <>
                        <Link to={`${r.id}`} className="text-green-600 hover:underline flex items-center space-x-2">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                        <button onClick={() => handleDelete(r.id)} className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-700">{r.address}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
