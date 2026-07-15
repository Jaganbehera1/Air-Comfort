import React, { useEffect, useState } from 'react';
import { SiteVisitReport, getReport, createDraft, saveReport } from '../../../lib/engineerReports';
import { saveSiteVisit } from '../../../lib/siteVisits';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

function useFormState(id?: string) {
  const [report, setReport] = useState<SiteVisitReport | null>(null);

  useEffect(() => {
    if (!id) {
      const d = createDraft();
      setReport(d);
      return;
    }
    const existing = getReport(id);
    if (existing) setReport(existing);
    else setReport(createDraft());
  }, [id]);

  return { report, setReport } as const;
}

export function SiteVisitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { report, setReport } = useFormState(id);

  if (!report) return null;

  if (id && report.status === 'approved') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Report Approved</h2>
            <p className="text-gray-600 mb-6">
              This report has already been approved and cannot be edited.
            </p>
            <Link
              to="/admin/engineer-portal/reports"
              className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700"
            >
              Back to Reports
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const update = (patch: Partial<SiteVisitReport>) => {
    const updated = { ...report, ...patch, updated_at: new Date().toISOString() };
    setReport(updated);
    saveReport(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteVisitReport = {
      ...report,
      status: 'submitted',
      updated_at: new Date().toISOString(),
      engineer_id: user?.uid ?? report.engineer_id,
    };
    saveReport(updated);
    try {
      const res = await saveSiteVisit(updated);
      if (res.source === 'firestore') {
        alert('Report submitted to Firestore (id: ' + res.id + ')');
      } else {
        alert('Saved locally (offline or permissions).');
      }
    } catch (err) {
      console.error('submit error', err);
      alert('Failed to submit — saved as draft locally.');
    }
    navigate('/admin/engineer-portal/reports');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Site Visit Report</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Customer Name</label>
              <input value={report.customer_name} onChange={(e) => update({ customer_name: e.target.value })} className="w-full px-4 py-2 border rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number</label>
                <input value={report.phone_number} onChange={(e) => update({ phone_number: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Address</label>
                <input value={report.address} onChange={(e) => update({ address: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">GPS Location</label>
                <input value={report.gps_location || ''} onChange={(e) => update({ gps_location: e.target.value })} placeholder="lat,lon or Google Maps link" className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Installation Type</label>
                <input value={report.installation_type || ''} onChange={(e) => update({ installation_type: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Roof Type</label>
                <input value={report.roof_type || ''} onChange={(e) => update({ roof_type: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Roof Material</label>
                <input value={report.roof_material || ''} onChange={(e) => update({ roof_material: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Shadow Analysis</label>
              <textarea value={report.shadow_analysis || ''} onChange={(e) => update({ shadow_analysis: e.target.value })} className="w-full px-4 py-2 border rounded" rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Electricity Bill (kWh / month)</label>
                <input value={report.electricity_bill || ''} onChange={(e) => update({ electricity_bill: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Recommended Solar Capacity</label>
                <input value={report.recommended_capacity || ''} onChange={(e) => update({ recommended_capacity: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Inverter Recommendation</label>
                <input value={report.inverter_recommendation || ''} onChange={(e) => update({ inverter_recommendation: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Panel Recommendation</label>
                <input value={report.panel_recommendation || ''} onChange={(e) => update({ panel_recommendation: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Remarks</label>
              <textarea value={report.remarks || ''} onChange={(e) => update({ remarks: e.target.value })} className="w-full px-4 py-2 border rounded" rows={3} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Attachments (optional)</label>
              <input type="file" multiple onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                const attachments = Array.from(files).map(f => ({ name: f.name, type: f.type }));
                update({ attachments: [...(report.attachments || []), ...attachments] });
              }} />
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Report</button>
              <button
                type="button"
                onClick={() => {
                  const draft: SiteVisitReport = {
                    ...report,
                    status: 'draft',
                    updated_at: new Date().toISOString(),
                  };
                  saveReport(draft);
                  alert('Draft saved');
                }}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Save Draft
              </button>
              <button type="button" onClick={() => navigate('/admin/engineer-portal/reports')} className="text-sm text-gray-600">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
