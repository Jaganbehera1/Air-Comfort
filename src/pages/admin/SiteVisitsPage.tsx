import { useEffect, useState } from 'react';
import { listSiteVisits, updateSiteVisitStatus, deleteSiteVisit } from '../../lib/siteVisits';
import { SiteVisitReport } from '../../lib/engineerReports';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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

export function SiteVisitsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<SiteVisitReport[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    (async () => {
      const data = await listSiteVisits();
      setItems(data);
    })();
  }, []);

  const refresh = async () => {
    const data = await listSiteVisits();
    setItems(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this site visit report? This cannot be undone.')) return;
    try {
      const result = await deleteSiteVisit(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setToast({ message: `Report deleted (${result.source})`, type: 'success' });
    } catch (error: any) {
      console.error('Delete failed', error);
      setToast({ message: `Delete failed: ${error?.message || error}`, type: 'error' });
    }
  };

  const handleReview = async (id: string, status: 'approved' | 'rejected') => {
    if (!user) return;
    const comment = status === 'rejected' ? prompt('Enter rejection reason (optional):') : '';
    try {
      const result = await updateSiteVisitStatus(id, status, user.uid, comment || undefined);
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
      setToast({ message: `Report ${status} (${result.source})`, type: 'success' });
      await refresh();
    } catch (error: any) {
      console.error('Review update failed', error);
      setToast({ message: `Failed to ${status} report: ${error?.message || error}`, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Site Visits</h1>
          <Link to="/admin/engineer-portal/reports" className="text-sm text-green-600">Go to Engineer Reports</Link>
        </div>

        {toast && (
          <div className={`mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${toast.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
            {toast.message}
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center text-gray-500 py-24">No site visits found.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((r) => (
              <div key={r.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{r.customer_name || 'Untitled'}</h3>
                    <p className="text-sm text-gray-500">{r.phone_number}</p>
                    <p className="text-sm text-gray-400">{r.updated_at ? new Date(r.updated_at).toLocaleString() : ''}</p>
                  </div>
                  <div className="text-right space-y-2">
                    {renderStatusBadge(r.status)}
                    <div className="flex flex-col items-end gap-2">
                      <Link to={`/admin/engineer-portal/reports/${r.id}`} className="text-green-600 text-sm">View</Link>
                      <div className="flex flex-wrap justify-end gap-2">
                        {r.status === 'submitted' && (
                          <>
                            <button onClick={() => handleReview(r.id, 'approved')} className="text-white bg-green-600 px-3 py-1 rounded text-xs">
                              Approve
                            </button>
                            <button onClick={() => handleReview(r.id, 'rejected')} className="text-white bg-red-600 px-3 py-1 rounded text-xs">
                              Reject
                            </button>
                          </>
                        )}
                        <button onClick={() => handleDelete(r.id)} className="text-white bg-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-800">
                          Delete
                        </button>
                      </div>
                    </div>
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
