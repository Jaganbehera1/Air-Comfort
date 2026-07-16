import React, { useEffect, useState } from 'react';
import { SiteVisitReport, getReport, createDraft, saveReport } from '../../../lib/engineerReports';
import { saveSiteVisit } from '../../../lib/siteVisits';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Navigation,
  HardHat,
  Home,
  Sun,
  FileText,
  Gauge,
  Zap,
  Battery,
  PenTool,
  Paperclip,
  Save,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  Image,
  Upload,
  Trash2,
  Plus,
  Building,
  Wrench,
  Activity,
  Calendar
} from 'lucide-react';

function useFormState(id?: string) {
  const [report, setReport] = useState<SiteVisitReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      const d = createDraft();
      setReport(d);
      setLoading(false);
      return;
    }
    const existing = getReport(id);
    if (existing) {
      setReport(existing);
    } else {
      setReport(createDraft());
    }
    setLoading(false);
  }, [id]);

  return { report, setReport, loading } as const;
}

export function SiteVisitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { report, setReport, loading } = useFormState(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

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
          <p className="text-gray-500 mt-4 font-medium">Loading form...</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  if (id && report.status === 'approved') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-green-700 mb-3">Report Approved</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              This report has already been approved and cannot be edited. Please contact the administrator for any changes.
            </p>
            <Link
              to="/admin/engineer-portal/reports"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-600/30 hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
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
    setIsSubmitting(true);
    
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
        alert('✅ Report submitted successfully! ID: ' + res.id);
      } else {
        alert('📝 Report saved locally (offline mode). Will sync when online.');
      }
      navigate('/admin/engineer-portal/reports');
    } catch (err) {
      console.error('submit error', err);
      alert('⚠️ Failed to submit — saved as draft locally.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    const draft: SiteVisitReport = {
      ...report,
      status: 'draft',
      updated_at: new Date().toISOString(),
    };
    saveReport(draft);
    setSavedMessage('✅ Draft saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const attachments = Array.from(files).map(f => ({ 
      name: f.name, 
      type: f.type,
      size: f.size 
    }));
    update({ attachments: [...(report.attachments || []), ...attachments] });
  };

  const removeAttachment = (index: number) => {
    const current = report.attachments || [];
    update({ attachments: current.filter((_, i) => i !== index) });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <Link
              to="/admin/engineer-portal/reports"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 transition-all duration-300 group mb-2"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Reports</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              {id ? 'Edit Site Visit Report' : 'New Site Visit Report'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Fill in the details below to create a comprehensive site visit report</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 text-green-700 flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{savedMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Form Header Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500" />
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            
            {/* Section: Customer Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-500" />
                </div>
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="text-red-500">*</span> Customer Name
                  </label>
                  <input
                    value={report.customer_name}
                    onChange={(e) => update({ customer_name: e.target.value })}
                    placeholder="Enter customer's full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="text-red-500">*</span> Phone Number
                  </label>
                  <input
                    value={report.phone_number}
                    onChange={(e) => update({ phone_number: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="text-red-500">*</span> Address
                  </label>
                  <input
                    value={report.address}
                    onChange={(e) => update({ address: e.target.value })}
                    placeholder="Enter full address"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section: Site Details */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-purple-500" />
                </div>
                Site Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    GPS Location
                  </label>
                  <input
                    value={report.gps_location || ''}
                    onChange={(e) => update({ gps_location: e.target.value })}
                    placeholder="lat,lon or Google Maps link"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Installation Type
                  </label>
                  <select
                    value={report.installation_type || ''}
                    onChange={(e) => update({ installation_type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  >
                    <option value="">Select installation type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Agricultural">Agricultural</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Roof Type
                  </label>
                  <select
                    value={report.roof_type || ''}
                    onChange={(e) => update({ roof_type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  >
                    <option value="">Select roof type</option>
                    <option value="Flat">Flat</option>
                    <option value="Sloped">Sloped</option>
                    <option value="Shed">Shed</option>
                    <option value="Complex">Complex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Roof Material
                  </label>
                  <select
                    value={report.roof_material || ''}
                    onChange={(e) => update({ roof_material: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  >
                    <option value="">Select roof material</option>
                    <option value="Concrete">Concrete</option>
                    <option value="Metal">Metal</option>
                    <option value="Tile">Tile</option>
                    <option value="Asphalt">Asphalt</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Solar Analysis */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg flex items-center justify-center">
                  <Sun className="h-4 w-4 text-yellow-500" />
                </div>
                Solar Analysis
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Shadow Analysis
                  </label>
                  <textarea
                    value={report.shadow_analysis || ''}
                    onChange={(e) => update({ shadow_analysis: e.target.value })}
                    placeholder="Describe any shading issues, obstructions, or peak sun hours..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50 resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Electricity Bill (kWh/month)
                    </label>
                    <input
                      value={report.electricity_bill || ''}
                      onChange={(e) => update({ electricity_bill: e.target.value })}
                      placeholder="e.g. 600"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Recommended Solar Capacity (kW)
                    </label>
                    <input
                      value={report.recommended_capacity || ''}
                      onChange={(e) => update({ recommended_capacity: e.target.value })}
                      placeholder="e.g. 5"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Equipment Recommendations */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-indigo-500" />
                </div>
                Equipment Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Inverter Recommendation
                  </label>
                  <input
                    value={report.inverter_recommendation || ''}
                    onChange={(e) => update({ inverter_recommendation: e.target.value })}
                    placeholder="e.g. Hybrid 5kW"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Panel Recommendation
                  </label>
                  <input
                    value={report.panel_recommendation || ''}
                    onChange={(e) => update({ panel_recommendation: e.target.value })}
                    placeholder="e.g. 10 x 550W Monocrystalline"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  />
                </div>
              </div>
            </div>

            {/* Section: Additional Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                  <PenTool className="h-4 w-4 text-gray-500" />
                </div>
                Additional Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Remarks
                  </label>
                  <textarea
                    value={report.remarks || ''}
                    onChange={(e) => update({ remarks: e.target.value })}
                    placeholder="Any additional notes or observations..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section: Attachments */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg flex items-center justify-center">
                  <Paperclip className="h-4 w-4 text-teal-500" />
                </div>
                Attachments
              </h3>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-green-300 transition-all duration-300">
                <label className="block text-center cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-600 font-medium">Click to upload files</span>
                    <span className="text-gray-400 text-sm">or drag and drop</span>
                    <span className="text-gray-400 text-xs">Supported: JPG, PNG, GIF, PDF, DOC</span>
                  </div>
                </label>
                {report.attachments && report.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {report.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Image className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-400">({Math.round(file.size / 1024)}KB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-600/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Report
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium"
              >
                <Save className="h-5 w-5" />
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/engineer-portal/reports')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                <X className="h-5 w-5" />
                Cancel
              </button>
            </div>

          </form>
        </div>

        {/* Form Helper */}
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            <span className="text-red-500">*</span> Required fields &nbsp;·&nbsp;
            <span className="text-yellow-500">⚠️</span> Your progress is auto-saved as you type &nbsp;·&nbsp;
            <span className="text-green-500">✓</span> Submit when complete
          </p>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}