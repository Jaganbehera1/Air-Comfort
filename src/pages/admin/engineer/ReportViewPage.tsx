import { useParams, useNavigate, Link } from 'react-router-dom';
import { getReport, SiteVisitReport, saveReport } from '../../../lib/engineerReports';
import { getSiteVisitByIdFromFirestore } from '../../../lib/siteVisits';
import { useEffect, useState } from 'react';

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

export function ReportViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<SiteVisitReport | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const remote = await getSiteVisitByIdFromFirestore(id);
        if (remote) {
          setReport(remote);
          return;
        }
      } catch (err) {
        console.warn('Could not load remote report:', err);
      }
      const r = getReport(id);
      if (!r) {
        navigate('/admin/engineer-portal/reports');
        return;
      }
      setReport(r);
    })();
  }, [id]);

  if (!report) return null;

  const handleSubmit = () => {
    const updated: SiteVisitReport = {
      ...report,
      status: 'submitted',
      updated_at: new Date().toISOString(),
    };
    saveReport(updated);
    alert('Report submitted (local).');
    navigate('/admin/engineer-portal/reports');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold">{report.customer_name || 'Site Visit'}</h1>
              <p className="text-sm text-gray-500">{report.phone_number}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {renderStatusBadge(report.status)}
                <span className="text-sm text-gray-400">{new Date(report.updated_at).toLocaleString()}</span>
              </div>
              {report.admin_comment && (
                <p className="mt-2 text-sm text-red-600">Admin note: {report.admin_comment}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {report.status === 'draft' && (
                <>
                  <Link to={`../create`} className="text-green-600">Edit</Link>
                  <button onClick={handleSubmit} className="bg-green-600 text-white px-3 py-1 rounded">Submit</button>
                </>
              )}
              {report.status === 'approved' && (
                <span className="text-sm font-semibold text-green-700">This report is approved and cannot be edited.</span>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <div><strong>Address:</strong> {report.address}</div>
            <div><strong>GPS:</strong> {report.gps_location}</div>
            <div><strong>Installation:</strong> {report.installation_type}</div>
            <div><strong>Roof:</strong> {report.roof_type} / {report.roof_material}</div>
            <div><strong>Shadow Analysis:</strong> {report.shadow_analysis}</div>
            <div><strong>Electricity Bill:</strong> {report.electricity_bill}</div>
            <div><strong>Recommended Capacity:</strong> {report.recommended_capacity}</div>
            <div><strong>Inverter:</strong> {report.inverter_recommendation}</div>
            <div><strong>Panels:</strong> {report.panel_recommendation}</div>
            <div><strong>Remarks:</strong> {report.remarks}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
