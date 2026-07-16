import { useParams, useNavigate, Link } from 'react-router-dom';
import { getReport, SiteVisitReport, saveReport } from '../../../lib/engineerReports';
import { getSiteVisitByIdFromFirestore } from '../../../lib/siteVisits';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Phone,
  MapPin,
  Navigation,
  Home,
  HardHat,
  Sun,
  Zap,
  Battery,
  FileText,
  PenTool,
  Send,
  Shield,
  Award,
  Calendar,
  Building,
  Wrench,
  Gauge,
  Activity,
  Check,
  X,
  Eye
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
          Submitted
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

export function ReportViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<SiteVisitReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const remote = await getSiteVisitByIdFromFirestore(id);
        if (remote) {
          setReport(remote);
          setLoading(false);
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
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = () => {
    if (!report) return;
    const confirmSubmit = window.confirm('Are you sure you want to submit this report?');
    if (!confirmSubmit) return;
    
    const updated: SiteVisitReport = {
      ...report,
      status: 'submitted',
      updated_at: new Date().toISOString(),
    };
    saveReport(updated);
    alert('Report submitted successfully!');
    navigate('/admin/engineer-portal/reports');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-500 mt-4 font-medium">Loading report...</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link
          to="/admin/engineer-portal/reports"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 transition-all duration-300 mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Reports</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header Gradient Bar */}
          <div className={`h-2 ${
            report.status === 'approved' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
            report.status === 'rejected' ? 'bg-gradient-to-r from-red-400 to-red-500' :
            report.status === 'submitted' ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
            'bg-gradient-to-r from-gray-300 to-gray-400'
          }`} />

          <div className="p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <User className="h-8 w-8 text-green-500" />
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {report.customer_name || 'Untitled Report'}
                  </h1>
                </div>
                {report.phone_number && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{report.phone_number}</span>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {renderStatusBadge(report.status)}
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(report.updated_at).toLocaleString()}
                  </span>
                </div>
                {report.admin_comment && (
                  <div className="mt-3 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200">
                    <p className="text-sm text-red-700 flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span><strong className="font-semibold">Admin Note:</strong> {report.admin_comment}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {report.status === 'draft' && (
                  <>
                    <Link
                      to={`../create`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Report
                    </Link>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-600/30 hover:scale-105 transition-all duration-300 shadow-md shadow-green-600/20"
                    >
                      <Send className="h-4 w-4" />
                      Submit Report
                    </button>
                  </>
                )}
                {report.status === 'approved' && (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold border border-green-200">
                    <Shield className="h-4 w-4" />
                    Approved
                  </div>
                )}
                {report.status === 'rejected' && (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 text-red-700 font-semibold border border-red-200">
                    <XCircle className="h-4 w-4" />
                    Rejected
                  </div>
                )}
                {report.status === 'submitted' && (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 font-semibold border border-yellow-200">
                    <Clock className="h-4 w-4" />
                    Pending Review
                  </div>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Address */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Address</p>
                      <p className="text-gray-700 mt-0.5">{report.address || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* GPS Location */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <Navigation className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">GPS Location</p>
                      <p className="text-gray-700 mt-0.5">{report.gps_location || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Installation Type */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-start gap-3">
                    <HardHat className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Installation Type</p>
                      <p className="text-gray-700 mt-0.5">{report.installation_type || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Roof Details */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-start gap-3">
                    <Home className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Roof Details</p>
                      <p className="text-gray-700 mt-0.5">{report.roof_type} / {report.roof_material}</p>
                    </div>
                  </div>
                </div>

                {/* Shadow Analysis */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-start gap-3">
                    <Sun className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Shadow Analysis</p>
                      <p className="text-gray-700 mt-0.5">{report.shadow_analysis || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Electricity Bill */}
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">Electricity Bill</p>
                      <p className="text-gray-700 mt-0.5">{report.electricity_bill || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Recommended Capacity */}
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-4 border border-cyan-100">
                  <div className="flex items-start gap-3">
                    <Gauge className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Recommended Capacity</p>
                      <p className="text-gray-700 mt-0.5 font-semibold">{report.recommended_capacity || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Inverter Recommendation */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Inverter Recommendation</p>
                      <p className="text-gray-700 mt-0.5">{report.inverter_recommendation || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Panel Recommendation */}
                <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-4 border border-teal-100">
                  <div className="flex items-start gap-3">
                    <Battery className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Panel Recommendation</p>
                      <p className="text-gray-700 mt-0.5">{report.panel_recommendation || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Remarks - Full Width */}
                <div className="md:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <PenTool className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Remarks</p>
                      <p className="text-gray-700 mt-0.5">{report.remarks || 'No remarks provided'}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-gray-400">
                <span className="font-medium">Report ID:</span> {report.id}
              </div>
              <div className="flex gap-3">
                {report.status === 'draft' && (
                  <>
                    <Link
                      to={`../create`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Link>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <Send className="h-4 w-4" />
                      Submit
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Status Legend */}
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            <span className="inline-flex items-center gap-1 mx-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
              Approved
            </span>
            <span className="inline-flex items-center gap-1 mx-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-red-500"></div>
              Rejected
            </span>
            <span className="inline-flex items-center gap-1 mx-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              Submitted
            </span>
            <span className="inline-flex items-center gap-1 mx-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
              Draft
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}