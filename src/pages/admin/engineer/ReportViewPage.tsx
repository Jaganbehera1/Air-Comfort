import { useParams, useNavigate, Link } from 'react-router-dom';
import { getReport, SiteVisitReport, saveReport } from '../../../lib/engineerReports';
import { getSiteVisitByIdFromFirestore } from '../../../lib/siteVisits';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
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
  Sun,
  Zap,
  Battery,
  FileText,
  PenTool,
  Send,
  Shield,
  Calendar,
  Building,
  Gauge,
  Navigation,
  HardHat,
  Home,
  Activity,
  Download,
  Loader2,
  Printer,
  Share2,
  Copy,
  Check,
  Award,
  TrendingUp,
  Globe
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import aircomfortlogo from '../../../images/logo_air_comfort.jpg';

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
  const { user, role } = useAuth();
  const [report, setReport] = useState<SiteVisitReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const remote = await getSiteVisitByIdFromFirestore(id);
        if (remote) {
          if (role === 'engineer' && user && remote.engineer_id !== user.uid) {
            navigate('/admin/engineer-portal/reports');
            return;
          }
          setReport(remote);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Could not load remote report:', err);
      }
      const r = getReport(id);
      if (!r || (role === 'engineer' && user && r.engineer_id !== user.uid)) {
        navigate('/admin/engineer-portal/reports');
        return;
      }
      setReport(r);
      setLoading(false);
    })();
  }, [id, navigate]);

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

  const handlePrint = () => {
    if (!contentRef.current) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) {
      window.print();
      return;
    }

    const reportMarkup = contentRef.current.innerHTML;
    
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Site Visit Report - ${report?.customer_name || 'Untitled'}</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 6mm;
            }
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #111827;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              font-size: 11px;
              line-height: 1.5;
            }
            
            body {
              display: flex;
              justify-content: center;
              align-items: flex-start;
              padding: 4mm 0;
              min-height: 100vh;
            }
            
            #report-print-root {
              width: 100%;
              max-width: 100%;
              padding: 0 2mm;
            }
            
            #report-print-root > div {
              width: 100%;
              max-width: 100%;
              border: none !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              overflow: visible !important;
              background: white !important;
              padding: 0 !important;
            }
            
            .no-print {
              display: none !important;
            }
            
            /* Status Bar */
            .h-1\\.5 {
              height: 3px !important;
            }
            
            /* Headers */
            .text-2xl {
              font-size: 16px !important;
              font-weight: 700 !important;
            }
            .text-3xl {
              font-size: 18px !important;
              font-weight: 700 !important;
            }
            .text-xl {
              font-size: 14px !important;
            }
            .text-lg {
              font-size: 13px !important;
            }
            .text-sm {
              font-size: 10px !important;
            }
            .text-xs {
              font-size: 9px !important;
            }
            
            /* Grid Layout */
            .grid {
              display: grid !important;
              gap: 6px !important;
            }
            .grid-cols-1 {
              grid-template-columns: 1fr !important;
            }
            .md\\:grid-cols-2 {
              grid-template-columns: 1fr 1fr !important;
            }
            
            /* Cards and Boxes */
            .rounded-xl {
              border-radius: 6px !important;
            }
            .rounded-2xl {
              border-radius: 8px !important;
            }
            .rounded-3xl {
              border-radius: 10px !important;
            }
            
            .p-4 {
              padding: 6px 8px !important;
            }
            .p-6 {
              padding: 8px 10px !important;
            }
            .p-3 {
              padding: 5px 6px !important;
            }
            
            .border {
              border-width: 1px !important;
            }
            .border-2 {
              border-width: 1.5px !important;
            }
            
            /* Margins */
            .mt-0\\.5 {
              margin-top: 1px !important;
            }
            .mt-1\\.5 {
              margin-top: 2px !important;
            }
            .mt-2 {
              margin-top: 4px !important;
            }
            .mt-3 {
              margin-top: 5px !important;
            }
            .mt-4 {
              margin-top: 6px !important;
            }
            .mt-6 {
              margin-top: 8px !important;
            }
            .mt-8 {
              margin-top: 10px !important;
            }
            
            .mb-2 {
              margin-bottom: 4px !important;
            }
            .mb-6 {
              margin-bottom: 8px !important;
            }
            
            .gap-2 {
              gap: 4px !important;
            }
            .gap-3 {
              gap: 5px !important;
            }
            .gap-4 {
              gap: 6px !important;
            }
            
            /* Flex Layout */
            .flex {
              display: flex !important;
            }
            .flex-wrap {
              flex-wrap: wrap !important;
            }
            .items-center {
              align-items: center !important;
            }
            .items-start {
              align-items: flex-start !important;
            }
            .justify-between {
              justify-content: space-between !important;
            }
            .flex-col {
              flex-direction: column !important;
            }
            .flex-shrink-0 {
              flex-shrink: 0 !important;
            }
            
            /* Images */
            img {
              max-width: 100%;
              height: auto;
              display: block;
            }
            .h-48 {
              height: 120px !important;
            }
            .w-full {
              width: 100% !important;
            }
            .object-cover {
              object-fit: cover !important;
            }
            .object-contain {
              object-fit: contain !important;
            }
            
            /* Status Badge */
            .inline-flex {
              display: inline-flex !important;
            }
            .px-3 {
              padding-left: 6px !important;
              padding-right: 6px !important;
            }
            .py-1\\.5 {
              padding-top: 2px !important;
              padding-bottom: 2px !important;
            }
            
            /* Colors */
            .bg-white {
              background-color: #ffffff !important;
            }
            .text-gray-700 {
              color: #374151 !important;
            }
            .text-gray-900 {
              color: #111827 !important;
            }
            .text-gray-500 {
              color: #6B7280 !important;
            }
            .text-gray-400 {
              color: #9CA3AF !important;
            }
            
            /* Status Colors */
            .text-green-600 {
              color: #059669 !important;
            }
            .text-green-700 {
              color: #047857 !important;
            }
            .text-red-600 {
              color: #DC2626 !important;
            }
            .text-red-700 {
              color: #B91C1C !important;
            }
            .text-yellow-600 {
              color: #D97706 !important;
            }
            .text-yellow-700 {
              color: #B45309 !important;
            }
            
            .bg-green-50 {
              background-color: #F0FDF4 !important;
            }
            .bg-emerald-50 {
              background-color: #ECFDF5 !important;
            }
            .bg-red-50 {
              background-color: #FEF2F2 !important;
            }
            .bg-rose-50 {
              background-color: #FFF1F2 !important;
            }
            .bg-yellow-50 {
              background-color: #FFFBEB !important;
            }
            .bg-amber-50 {
              background-color: #FFFBEB !important;
            }
            .bg-gray-50 {
              background-color: #F9FAFB !important;
            }
            .bg-gray-100 {
              background-color: #F3F4F6 !important;
            }
            .bg-slate-50 {
              background-color: #F8FAFC !important;
            }
            .bg-blue-50 {
              background-color: #EFF6FF !important;
            }
            .bg-indigo-50 {
              background-color: #EEF2FF !important;
            }
            .bg-purple-50 {
              background-color: #F5F3FF !important;
            }
            .bg-pink-50 {
              background-color: #FDF2F8 !important;
            }
            .bg-cyan-50 {
              background-color: #ECFEFF !important;
            }
            .bg-sky-50 {
              background-color: #F0F9FF !important;
            }
            .bg-orange-50 {
              background-color: #FFF7ED !important;
            }
            .bg-amber-50 {
              background-color: #FFFBEB !important;
            }
            .bg-teal-50 {
              background-color: #F0FDFA !important;
            }
            
            /* Gradients for print */
            .bg-gradient-to-br {
              background-image: none !important;
              background-color: #f8fafc !important;
            }
            
            /* Remove animations */
            .animate-pulse {
              animation: none !important;
            }
            .transition-all {
              transition: none !important;
            }
            .hover\\:scale-105:hover {
              transform: none !important;
            }
            .hover\\:shadow-lg:hover {
              box-shadow: none !important;
            }
            
            /* Border Colors */
            .border-green-100 {
              border-color: #D1FAE5 !important;
            }
            .border-blue-100 {
              border-color: #DBEAFE !important;
            }
            .border-indigo-100 {
              border-color: #E0E7FF !important;
            }
            .border-purple-100 {
              border-color: #EDE9FE !important;
            }
            .border-pink-100 {
              border-color: #FCE7F3 !important;
            }
            .border-slate-200 {
              border-color: #E2E8F0 !important;
            }
            .border-gray-200 {
              border-color: #E5E7EB !important;
            }
            .border-cyan-100 {
              border-color: #CFFAFE !important;
            }
            .border-sky-100 {
              border-color: #E0F2FE !important;
            }
            .border-orange-100 {
              border-color: #FFEDD5 !important;
            }
            .border-amber-100 {
              border-color: #FEF3C7 !important;
            }
            .border-teal-100 {
              border-color: #CCFBF1 !important;
            }
            .border-yellow-100 {
              border-color: #FEF3C7 !important;
            }
            .border-red-100 {
              border-color: #FECACA !important;
            }
            .border-rose-100 {
              border-color: #FECDD3 !important;
            }
            .border-emerald-100 {
              border-color: #D1FAE5 !important;
            }
            
            /* Utility Classes */
            .font-bold {
              font-weight: 700 !important;
            }
            .font-semibold {
              font-weight: 600 !important;
            }
            .font-medium {
              font-weight: 500 !important;
            }
            .font-mono {
              font-family: monospace !important;
            }
            .uppercase {
              text-transform: uppercase !important;
            }
            .tracking-wider {
              letter-spacing: 0.05em !important;
            }
            .whitespace-pre-wrap {
              white-space: pre-wrap !important;
            }
            .truncate {
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              white-space: nowrap !important;
            }
            
            /* Icons */
            .w-4, .w-5, .w-6, .h-4, .h-5, .h-6 {
              width: 12px !important;
              height: 12px !important;
            }
            .w-3\\.5, .h-3\\.5 {
              width: 10px !important;
              height: 10px !important;
            }
            
            /* Status Bar Gradient */
            .bg-gradient-to-r {
              background-image: linear-gradient(to right, #34D399, #059669) !important;
            }
            
            /* Print-friendly breaks */
            .page-break-inside-avoid {
              page-break-inside: avoid !important;
            }
            
            /* Attachment images */
            .rounded-lg {
              border-radius: 4px !important;
            }
            .border-dashed {
              border-style: dashed !important;
            }
            
            /* Hide shadow effects */
            .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl, .shadow-2xl {
              box-shadow: none !important;
            }
            
            /* Divider */
            .border-b {
              border-bottom-width: 1px !important;
            }
            .border-t {
              border-top-width: 1px !important;
            }
          </style>
        </head>
        <body>
          <div id="report-print-root">
            ${reportMarkup}
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      setTimeout(() => {
        printWindow.close();
      }, 500);
    }, 500);
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    setDownloading(true);
    try {
      const element = contentRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        allowTaint: true,
        useCORS: true,
        logging: false,
        height: element.scrollHeight,
        width: element.scrollWidth,
        windowHeight: element.scrollHeight,
        windowWidth: element.scrollWidth,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('report-content');
          if (clonedElement) {
            clonedElement.style.overflow = 'visible';
            clonedElement.style.height = 'auto';
            clonedElement.style.maxHeight = 'none';
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;

      const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      const y = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight, undefined, 'FAST');
      pdf.save(`report_${id}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setShowShareMenu(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Site Visit Report - ${report?.customer_name || 'Untitled'}`,
        url: window.location.href,
      });
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const formatValue = (value?: string | null) => {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed ? trimmed : 'N/A';
    }
    return value ? String(value) : 'N/A';
  };

  const getCableSummary = () => {
    const entries = [
      { label: 'Earthing', type: report?.cable_type_earthing || 'Earthing', measurement: report?.cable_measurement_earthing },
      { label: 'DC', type: report?.cable_type_dc || 'DC', measurement: report?.cable_measurement_dc },
      { label: 'AC', type: report?.cable_type_ac || 'AC', measurement: report?.cable_measurement_ac },
    ];

    const nonEmpty = entries.filter((entry) => {
      const type = entry.type?.trim();
      const measurement = entry.measurement?.trim();
      return Boolean(type || measurement);
    });

    if (!nonEmpty.length) return 'N/A';

    return nonEmpty
      .map((entry) => `${entry.label}: ${entry.measurement ? `${entry.measurement} m` : (entry.type || 'N/A')}`)
      .join(' | ');
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      approved: {
        icon: CheckCircle,
        label: 'Approved',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        gradient: 'from-green-400 to-emerald-500',
        badgeGradient: 'from-green-50 to-emerald-50'
      },
      rejected: {
        icon: XCircle,
        label: 'Rejected',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        gradient: 'from-red-400 to-rose-500',
        badgeGradient: 'from-red-50 to-rose-50'
      },
      submitted: {
        icon: Clock,
        label: 'Submitted',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        gradient: 'from-yellow-400 to-amber-500',
        badgeGradient: 'from-yellow-50 to-amber-50'
      },
      draft: {
        icon: AlertCircle,
        label: 'Draft',
        color: 'text-gray-600',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        gradient: 'from-gray-400 to-gray-500',
        badgeGradient: 'from-gray-50 to-gray-100'
      }
    };
    return configs[status as keyof typeof configs] || configs.draft;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-500 mt-4 font-medium text-lg">Loading report...</p>
          <p className="text-gray-400 text-sm">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const statusConfig = getStatusConfig(report.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation Bar - Excluded from PDF */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 no-print">
          <Link
            to="/admin/engineer-portal/reports"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Reports</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download as PDF"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300"
              title="Print Report"
            >
              <Printer className="w-5 h-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                title="Share Report"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10 animate-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={handleCopyLink}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share via...</span>
                  </button>
                </div>
              )}
            </div>

            {report.status === 'draft' && (
              <>
                <Link
                  to={`../create`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold hover:from-blue-100 hover:to-indigo-100 hover:shadow-md transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Link>
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md shadow-green-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Submit</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Report Card - This is what gets captured for PDF */}
        <div 
          id="report-content"
          ref={contentRef}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Status Bar */}
          <div className={`h-1.5 bg-gradient-to-r ${statusConfig.gradient}`} />

          <div className="p-6 md:p-8 lg:p-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-3 shadow-sm">
                  <img
                    src={aircomfortlogo}
                    alt="Green Leaf Energy Logo"
                    className="h-6 w-6 rounded-xl object-cover border border-green-200 bg-white p-1"
                  />
                  <div>
                    <div className="text-base font-extrabold text-green-700">GreenLeaf Energy</div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gray-500">Site Visit Report</div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                    {report.customer_name || 'Untitled Report'}
                    <span className="text-sm font-normal text-gray-400">#{id?.slice(0, 8) || 'N/A'}</span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5">
                    {renderStatusBadge(report.status)}
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(report.updated_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`px-4 py-2.5 rounded-xl ${statusConfig.bg} border ${statusConfig.border} flex items-center gap-2`}>
                <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                <span className={`font-semibold ${statusConfig.color}`}>
                  {statusConfig.label}
                </span>
              </div>
            </div>

            {/* Admin Comment */}
            {report.admin_comment && (
              <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-700">Admin Note</p>
                    <p className="text-sm text-red-600">{report.admin_comment}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Customer Name */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Customer Name</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.customer_name || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Phone Number</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.phone_number || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Address</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.address || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Engineer Details */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Engineer Name</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.engineer_name || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Engineer Mobile */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Engineer Mobile</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.engineer_mobile || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* GPS Location */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">GPS Location</p>
                      <p className="text-gray-700 font-medium mt-0.5 font-mono text-sm">{report.gps_location || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Installation Type */}
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-4 border border-cyan-100">
                  <div className="flex items-start gap-3">
                    <HardHat className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Installation Type</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.installation_type || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Roof Details */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Roof Details</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.roof_type || 'N/A'} / {report.roof_material || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* System Capacity */}
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
                  <div className="flex items-start gap-3">
                    <Gauge className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">System Capacity</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.system_capacity || 'N/A'} kW</p>
                    </div>
                  </div>
                </div>

                {/* Phase Type */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Phase Type</p>
                      <p className="text-gray-700 font-medium mt-0.5">{formatValue(report.phase_type)}</p>
                    </div>
                  </div>
                </div>

                {/* Panel Details */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Battery className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Panel</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.panel_brand || 'N/A'} / {report.panel_type || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Inverter Details */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Inverter</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.inverter_type || 'N/A'} / {report.inverter_brand || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Battery Details */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <Battery className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Battery</p>
                      <p className="text-gray-700 font-medium mt-0.5">{formatValue(report.battery_type)} / {formatValue(report.battery_power)} / Qty: {formatValue(report.battery_quantity)}</p>
                    </div>
                  </div>
                </div>

                {/* Structure Heights */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Structure Heights</p>
                      <p className="text-gray-700 font-medium mt-0.5">Low: {report.structure_height_low || 'N/A'} | High: {report.structure_height_high || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Distances */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Distances</p>
                      <p className="text-gray-700 font-medium mt-0.5">N/S: {report.north_south_distance || 'N/A'} | E/W: {report.east_west_distance || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Shadow Analysis */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-start gap-3">
                    <Sun className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">Shadow Analysis</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.shadow_analysis || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Electricity Bill */}
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">Electricity Bill</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.electricity_bill || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Cable Summary */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Cable Details</p>
                      <p className="text-gray-700 font-medium mt-0.5 whitespace-pre-wrap">{getCableSummary()}</p>
                    </div>
                  </div>
                </div>

                {/* Cable Type */}
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-4 border border-cyan-100">
                  <div className="flex items-start gap-3">
                    <Battery className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Cable Types</p>
                      <p className="text-gray-700 font-medium mt-0.5">{formatValue(report.cable_type_earthing)} / {formatValue(report.cable_type_dc)} / {formatValue(report.cable_type_ac)}</p>
                    </div>
                  </div>
                </div>

                {/* Recommended Capacity */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Recommended Capacity</p>
                      <p className="text-gray-700 font-bold mt-0.5 text-lg">{report.recommended_capacity || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Inverter Recommendation */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Inverter Recommendation</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.inverter_recommendation || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Panel Recommendation */}
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-4 border border-cyan-100">
                  <div className="flex items-start gap-3">
                    <Battery className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Panel Recommendation</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.panel_recommendation || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Remarks - Full Width */}
                <div className="md:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <PenTool className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Remarks</p>
                      <p className="text-gray-700 font-medium mt-0.5">{report.remarks || 'No remarks provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Attachments - Full Width */}
                <div className="md:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Uploaded Images & Documents</p>
                      {report.attachments && report.attachments.length > 0 ? (
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {report.attachments.map((file, index) => {
                            const attachmentData = (file as { data?: string; url?: string }).url || (file as { data?: string }).data;
                            const isImage = file.type?.startsWith('image/');
                            return (
                              <div key={`${file.name}-${index}`} className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <p className="text-sm font-semibold text-gray-700 truncate">{file.name}</p>
                                  <span className="text-xs text-gray-400">{file.category || 'Attachment'}</span>
                                </div>
                                {isImage && attachmentData ? (
                                  <img src={attachmentData} alt={file.name} className="w-full h-48 object-cover rounded-lg border border-gray-100" />
                                ) : (
                                  <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
                                    <div className="text-center">
                                      <FileText className="mx-auto h-8 w-8 text-blue-400" />
                                      <p className="mt-2 text-sm text-gray-500">{file.name}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-500 mt-2">No uploaded images or documents.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Created At - Full Width */}
                <div className="md:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Report Details</p>
                      <div className="flex flex-wrap gap-4 mt-0.5">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Created:</span> {formatDate(report.created_at || report.updated_at)}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Last Updated:</span> {formatDate(report.updated_at)}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Report ID:</span> <span className="font-mono">{id}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer Actions - Excluded from PDF */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 no-print">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Report #{id?.slice(0, 8) || 'N/A'}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>Version 1.0</span>
              </div>
              <div className="flex gap-3">
                {report.status === 'draft' && (
                  <>
                    <Link
                      to={`../create`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-md shadow-green-600/20"
                    >
                      <Send className="w-4 h-4" />
                      Submit Report
                    </button>
                  </>
                )}
                {report.status === 'approved' && (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold border-2 border-green-200">
                    <Award className="w-4 h-4" />
                    Approved
                  </div>
                )}
                {report.status === 'rejected' && (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 text-red-700 font-semibold border-2 border-red-200">
                    <XCircle className="w-4 h-4" />
                    Rejected
                  </div>
                )}
                {report.status === 'submitted' && (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 font-semibold border-2 border-yellow-200">
                    <Clock className="w-4 h-4" />
                    Pending Review
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Status Legend - Excluded from PDF */}
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100 no-print">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
              Approved
            </span>
            <span className="inline-flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-400 to-rose-500"></div>
              Rejected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
              Submitted
            </span>
            <span className="inline-flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
              Draft
            </span>
          </div>
        </div>

      </div>

      {/* Print Styles */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 8mm;
        }

        @media print {
          html, body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body {
            min-width: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          #report-content {
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            border-radius: 0 !important;
            overflow: visible !important;
          }
          #report-content .shadow-2xl {
            box-shadow: none !important;
          }
          #report-content .p-6,
          #report-content .md\\:p-8,
          #report-content .lg\\:p-10 {
            padding: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}