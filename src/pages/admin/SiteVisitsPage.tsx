import { useEffect, useState } from 'react';
import { listSiteVisits, listSiteVisitsByEngineer, updateSiteVisitStatus, deleteSiteVisit } from '../../lib/siteVisits';
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
  Users,
  Grid,
  List,
  Database,
  Download,
  Loader2,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import greenLeafLogo from '../../images/GreenLeaf.jpeg';

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

// Helper function to generate a single report PDF with full design
const generateSingleReportHTML = (report: SiteVisitReport) => {
  const safeValue = (value?: string | null) =>
    typeof value === 'string' && value.trim() ? value.trim() : 'N/A';

  const getCableSummary = () => {
    const entries = [
      { label: 'Earthing', type: report.cable_type_earthing || 'Earthing', measurement: report.cable_measurement_earthing },
      { label: 'DC', type: report.cable_type_dc || 'DC', measurement: report.cable_measurement_dc },
      { label: 'AC', type: report.cable_type_ac || 'AC', measurement: report.cable_measurement_ac },
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

  const statusColors = {
    approved: { text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
    rejected: { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
    submitted: { text: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    draft: { text: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' },
  };

  const statusColor = statusColors[report.status as keyof typeof statusColors] || statusColors.draft;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Site Visit Report - ${safeValue(report.customer_name)}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            background: #ffffff;
            color: #111827;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 12px;
            line-height: 1.6;
            padding: 10px;
          }
          .report-container {
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          }
          .status-bar {
            height: 4px;
            background: ${report.status === 'approved' ? 'linear-gradient(to right, #34D399, #059669)' : 
                      report.status === 'rejected' ? 'linear-gradient(to right, #F87171, #DC2626)' :
                      report.status === 'submitted' ? 'linear-gradient(to right, #FCD34D, #F59E0B)' :
                      'linear-gradient(to right, #9CA3AF, #6B7280)'};
          }
          .content {
            padding: 30px 35px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: 20px;
            border-bottom: 1px solid #E5E7EB;
            margin-bottom: 25px;
          }
          .header-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .logo-section {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #F0FDF4;
            padding: 8px 16px 8px 12px;
            border-radius: 12px;
            border: 1px solid #D1FAE5;
          }
          .logo-img {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            object-fit: cover;
            border: 1px solid #D1FAE5;
            background: white;
            padding: 2px;
          }
          .logo-text {
            font-size: 16px;
            font-weight: 800;
            color: #047857;
          }
          .logo-sub {
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 0.22em;
            color: #6B7280;
          }
          .customer-name {
            font-size: 24px;
            font-weight: 700;
            color: #111827;
          }
          .report-id {
            font-size: 12px;
            font-weight: 400;
            color: #9CA3AF;
            margin-left: 8px;
          }
          .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 600;
            background: ${statusColor.bg};
            color: ${statusColor.text};
            border: 1px solid ${statusColor.border};
          }
          .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 6px;
          }
          .grid-full {
            grid-column: span 2;
          }
          .info-card {
            padding: 14px 16px;
            border-radius: 10px;
            border: 1px solid #E5E7EB;
            background: #F9FAFB;
            display: flex;
            align-items: flex-start;
            gap: 12px;
          }
          .info-card .icon {
            flex-shrink: 0;
            margin-top: 2px;
          }
          .info-card .label {
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #6B7280;
          }
          .info-card .value {
            font-weight: 500;
            color: #111827;
            margin-top: 2px;
          }
          .info-card .value-mono {
            font-family: monospace;
            font-size: 12px;
          }
          .bg-green { background: #F0FDF4; border-color: #D1FAE5; }
          .bg-green .label { color: #059669; }
          .bg-blue { background: #EFF6FF; border-color: #DBEAFE; }
          .bg-blue .label { color: #2563EB; }
          .bg-purple { background: #F5F3FF; border-color: #EDE9FE; }
          .bg-purple .label { color: #7C3AED; }
          .bg-slate { background: #F8FAFC; border-color: #E2E8F0; }
          .bg-slate .label { color: #475569; }
          .bg-indigo { background: #EEF2FF; border-color: #E0E7FF; }
          .bg-indigo .label { color: #4F46E5; }
          .bg-cyan { background: #ECFEFF; border-color: #CFFAFE; }
          .bg-cyan .label { color: #0891B2; }
          .bg-orange { background: #FFF7ED; border-color: #FFEDD5; }
          .bg-orange .label { color: #EA580C; }
          .bg-teal { background: #F0FDFA; border-color: #CCFBF1; }
          .bg-teal .label { color: #0D9488; }
          .bg-yellow { background: #FFFBEB; border-color: #FEF3C7; }
          .bg-yellow .label { color: #D97706; }
          .bg-red { background: #FEF2F2; border-color: #FECACA; }
          .bg-red .label { color: #DC2626; }
          .bg-amber { background: #FFFBEB; border-color: #FEF3C7; }
          .bg-amber .label { color: #D97706; }
          .bg-pink { background: #FDF2F8; border-color: #FCE7F3; }
          .bg-pink .label { color: #DB2777; }
          .bg-sky { background: #F0F9FF; border-color: #E0F2FE; }
          .bg-sky .label { color: #0284C7; }
          .bg-gray { background: #F9FAFB; border-color: #E5E7EB; }
          .bg-gray .label { color: #4B5563; }
          .bg-emerald { background: #ECFDF5; border-color: #D1FAE5; }
          .bg-emerald .label { color: #059669; }

          .admin-comment {
            padding: 14px 18px;
            background: #FEF2F2;
            border-radius: 10px;
            border: 1px solid #FECACA;
            margin-top: 16px;
          }
          .admin-comment .label {
            font-weight: 600;
            color: #DC2626;
          }
          .admin-comment .text {
            color: #991B1B;
            margin-top: 2px;
          }

          .attachments-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 8px;
          }
          .attachment-card {
            border: 1px solid #E5E7EB;
            border-radius: 10px;
            padding: 12px;
            background: white;
          }
          .attachment-card .name {
            font-weight: 600;
            color: #374151;
            font-size: 12px;
            margin-bottom: 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .attachment-card img {
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #F3F4F6;
          }
          .attachment-card .placeholder {
            height: 140px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #F9FAFB;
            border-radius: 6px;
            border: 1px dashed #D1D5DB;
            color: #9CA3AF;
          }

          .footer-details {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 4px;
          }
          .footer-details span {
            font-size: 12px;
            color: #374151;
          }
          .footer-details .label {
            font-weight: 600;
          }

          .full-width {
            grid-column: span 2;
          }

          @media print {
            html, body {
              padding: 0;
              background: white;
            }
            .report-container {
              box-shadow: none;
              border-radius: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="report-container">
          <div class="status-bar"></div>
          <div class="content">
            
            <!-- Header -->
            <div class="header">
              <div class="header-left">
                <div class="logo-section">
                  <img src="${greenLeafLogo}" alt="GreenLeaf Logo" class="logo-img" />
                  <div>
                    <div class="logo-text">GreenLeaf Energy</div>
                    <div class="logo-sub">Site Visit Report</div>
                  </div>
                </div>
                <div>
                  <div class="customer-name">
                    ${safeValue(report.customer_name)}
                    <span class="report-id">#${report.id?.slice(0, 8) || 'N/A'}</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:12px; margin-top:4px;">
                    <span class="status-badge">${report.status.toUpperCase()}</span>
                    <span style="font-size:12px; color:#9CA3AF;">
                      📅 ${formatDate(report.updated_at)}
                    </span>
                  </div>
                </div>
              </div>
              <div style="display:flex; align-items:center; gap:8px; padding:6px 14px; border-radius:10px; background:${statusColor.bg}; border:1px solid ${statusColor.border};">
                <span style="font-weight:600; color:${statusColor.text}; font-size:13px;">
                  ${report.status.toUpperCase()}
                </span>
              </div>
            </div>

            <!-- Admin Comment -->
            ${report.admin_comment ? `
              <div class="admin-comment">
                <div class="label">⚠️ Admin Note</div>
                <div class="text">${report.admin_comment}</div>
              </div>
            ` : ''}

            <!-- Details Grid -->
            <div class="grid-2">
              
              <!-- Customer Name -->
              <div class="info-card bg-green">
                <span class="icon">👤</span>
                <div>
                  <div class="label">Customer Name</div>
                  <div class="value">${safeValue(report.customer_name)}</div>
                </div>
              </div>

              <!-- Phone Number -->
              <div class="info-card bg-blue">
                <span class="icon">📱</span>
                <div>
                  <div class="label">Phone Number</div>
                  <div class="value">${safeValue(report.phone_number)}</div>
                </div>
              </div>

              <!-- Address -->
              <div class="info-card bg-purple full-width">
                <span class="icon">📍</span>
                <div>
                  <div class="label">Address</div>
                  <div class="value">${safeValue(report.address)}</div>
                </div>
              </div>

              <!-- Engineer Name -->
              <div class="info-card bg-slate">
                <span class="icon">👷</span>
                <div>
                  <div class="label">Engineer Name</div>
                  <div class="value">${safeValue(report.engineer_name)}</div>
                </div>
              </div>

              <!-- Engineer Mobile -->
              <div class="info-card bg-slate">
                <span class="icon">📱</span>
                <div>
                  <div class="label">Engineer Mobile</div>
                  <div class="value">${safeValue(report.engineer_mobile)}</div>
                </div>
              </div>

              <!-- GPS Location -->
              <div class="info-card bg-indigo full-width">
                <span class="icon">🧭</span>
                <div>
                  <div class="label">GPS Location</div>
                  <div class="value value-mono">${safeValue(report.gps_location)}</div>
                </div>
              </div>

              <!-- Installation Type -->
              <div class="info-card bg-cyan">
                <span class="icon">⛑️</span>
                <div>
                  <div class="label">Installation Type</div>
                  <div class="value">${safeValue(report.installation_type)}</div>
                </div>
              </div>

              <!-- Roof Details -->
              <div class="info-card bg-orange">
                <span class="icon">🏠</span>
                <div>
                  <div class="label">Roof Details</div>
                  <div class="value">${safeValue(report.roof_type)} / ${safeValue(report.roof_material)}</div>
                </div>
              </div>

              <!-- System Capacity -->
              <div class="info-card bg-teal">
                <span class="icon">⚡</span>
                <div>
                  <div class="label">System Capacity</div>
                  <div class="value">${safeValue(report.system_capacity)} kW</div>
                </div>
              </div>

              <!-- Phase Type -->
              <div class="info-card bg-cyan">
                <span class="icon">🔌</span>
                <div>
                  <div class="label">Phase Type</div>
                  <div class="value">${safeValue(report.phase_type)}</div>
                </div>
              </div>

              <!-- Panel Details -->
              <div class="info-card bg-blue">
                <span class="icon">🪫</span>
                <div>
                  <div class="label">Panel</div>
                  <div class="value">${safeValue(report.panel_brand)} / ${safeValue(report.panel_type)}</div>
                </div>
              </div>

              <!-- Inverter Details -->
              <div class="info-card bg-yellow">
                <span class="icon">⚡</span>
                <div>
                  <div class="label">Inverter</div>
                  <div class="value">${safeValue(report.inverter_type)} / ${safeValue(report.inverter_brand)}</div>
                </div>
              </div>

              <!-- Battery Details -->
              <div class="info-card bg-purple">
                <span class="icon">🔋</span>
                <div>
                  <div class="label">Battery</div>
                  <div class="value">${safeValue(report.battery_type)} / ${safeValue(report.battery_power)} / Qty: ${safeValue(report.battery_quantity)}</div>
                </div>
              </div>

              <!-- Structure Heights -->
              <div class="info-card bg-slate">
                <span class="icon">🏗️</span>
                <div>
                  <div class="label">Structure Heights</div>
                  <div class="value">Low: ${safeValue(report.structure_height_low)} | High: ${safeValue(report.structure_height_high)}</div>
                </div>
              </div>

              <!-- Distances -->
              <div class="info-card bg-slate">
                <span class="icon">📏</span>
                <div>
                  <div class="label">Distances</div>
                  <div class="value">N/S: ${safeValue(report.north_south_distance)} | E/W: ${safeValue(report.east_west_distance)}</div>
                </div>
              </div>

              <!-- Shadow Analysis -->
              <div class="info-card bg-yellow">
                <span class="icon">☀️</span>
                <div>
                  <div class="label">Shadow Analysis</div>
                  <div class="value">${safeValue(report.shadow_analysis)}</div>
                </div>
              </div>

              <!-- Electricity Bill -->
              <div class="info-card bg-red">
                <span class="icon">📄</span>
                <div>
                  <div class="label">Electricity Bill</div>
                  <div class="value">${safeValue(report.electricity_bill)}</div>
                </div>
              </div>

              <!-- Cable Summary -->
              <div class="info-card bg-indigo full-width">
                <span class="icon">🔌</span>
                <div>
                  <div class="label">Cable Details</div>
                  <div class="value">${getCableSummary()}</div>
                </div>
              </div>

              <!-- Cable Types -->
              <div class="info-card bg-cyan">
                <span class="icon">🔌</span>
                <div>
                  <div class="label">Cable Types</div>
                  <div class="value">${safeValue(report.cable_type_earthing)} / ${safeValue(report.cable_type_dc)} / ${safeValue(report.cable_type_ac)}</div>
                </div>
              </div>

              <!-- Recommended Capacity -->
              <div class="info-card bg-emerald">
                <span class="icon">📈</span>
                <div>
                  <div class="label">Recommended Capacity</div>
                  <div class="value" style="font-size:18px; font-weight:700;">${safeValue(report.recommended_capacity)}</div>
                </div>
              </div>

              <!-- Inverter Recommendation -->
              <div class="info-card bg-indigo">
                <span class="icon">⚡</span>
                <div>
                  <div class="label">Inverter Recommendation</div>
                  <div class="value">${safeValue(report.inverter_recommendation)}</div>
                </div>
              </div>

              <!-- Panel Recommendation -->
              <div class="info-card bg-cyan">
                <span class="icon">🪫</span>
                <div>
                  <div class="label">Panel Recommendation</div>
                  <div class="value">${safeValue(report.panel_recommendation)}</div>
                </div>
              </div>

              <!-- Remarks -->
              <div class="info-card bg-gray full-width">
                <span class="icon">✏️</span>
                <div>
                  <div class="label">Remarks</div>
                  <div class="value">${safeValue(report.remarks) || 'No remarks provided'}</div>
                </div>
              </div>

            </div>

            <!-- Attachments -->
            ${report.attachments && report.attachments.length > 0 ? `
              <div style="margin-top:20px; padding:16px; background:#F9FAFB; border-radius:10px; border:1px solid #E5E7EB;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <span style="font-size:16px;">📎</span>
                  <div style="flex:1;">
                    <div style="font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#6B7280;">Uploaded Images & Documents</div>
                    <div class="attachments-grid">
                      ${report.attachments.map((file) => {
                        const isImage = file.type?.startsWith('image/');
                        const fileData = (file as any).url || (file as any).data;
                        return `
                          <div class="attachment-card">
                            <div class="name">${file.name}</div>
                            ${isImage && fileData ? `
                              <img src="${fileData}" alt="${file.name}" />
                            ` : `
                              <div class="placeholder">
                                <div style="text-align:center;">
                                  <div style="font-size:32px;">📄</div>
                                  <div style="font-size:12px; color:#6B7280; margin-top:4px;">${file.name}</div>
                                </div>
                              </div>
                            `}
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- Footer Details -->
            <div style="margin-top:24px; padding-top:20px; border-top:1px solid #E5E7EB;">
              <div class="footer-details">
                <span><span class="label">Created:</span> ${formatDate(report.created_at || report.updated_at)}</span>
                <span><span class="label">Last Updated:</span> ${formatDate(report.updated_at)}</span>
                <span><span class="label">Report ID:</span> <span style="font-family:monospace;">${report.id}</span></span>
              </div>
              <div style="margin-top:12px; text-align:center; font-size:10px; color:#9CA3AF; border-top:1px solid #F3F4F6; padding-top:12px;">
                Generated from GreenLeaf Energy Site Visits Dashboard • ${new Date().toLocaleString()}
              </div>
            </div>

          </div>
        </div>
      </body>
    </html>
  `;
};

// Helper function to generate a summary table PDF for all reports
const generateSummaryHTML = (reports: SiteVisitReport[]) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>All Site Visits Summary</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            background: white; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            padding: 20px;
            font-size: 11px;
          }
          .container { max-width: 1100px; margin: 0 auto; }
          .header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            padding-bottom: 16px;
            border-bottom: 2px solid #2563EB;
            margin-bottom: 20px;
          }
          .header h1 { font-size: 22px; color: #1F2937; }
          .header .sub { font-size: 12px; color: #6B7280; }
          table { 
            width: 100%; 
            border-collapse: collapse;
            margin-top: 12px;
          }
          th {
            background: #2563EB;
            color: white;
            padding: 8px 10px;
            text-align: left;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          td {
            padding: 7px 10px;
            border-bottom: 1px solid #E5E7EB;
            font-size: 11px;
          }
          tr:nth-child(even) { background: #F9FAFB; }
          .status-badge {
            display: inline-block;
            padding: 2px 10px;
            border-radius: 9999px;
            font-size: 10px;
            font-weight: 600;
          }
          .status-approved { background: #D1FAE5; color: #065F46; }
          .status-rejected { background: #FECACA; color: #991B1B; }
          .status-submitted { background: #FEF3C7; color: #92400E; }
          .status-draft { background: #F3F4F6; color: #4B5563; }
          .footer {
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px solid #E5E7EB;
            text-align: center;
            font-size: 10px;
            color: #9CA3AF;
          }
          .stats {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 12px;
            padding: 12px 16px;
            background: #F9FAFB;
            border-radius: 8px;
          }
          .stats .item {
            font-size: 12px;
            color: #374151;
          }
          .stats .count {
            font-weight: 700;
            margin-right: 4px;
          }
          .stats .approved .count { color: #059669; }
          .stats .rejected .count { color: #DC2626; }
          .stats .submitted .count { color: #D97706; }
          .stats .draft .count { color: #6B7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1>📋 Site Visits Summary Report</h1>
              <div class="sub">Complete list of all site visit reports</div>
            </div>
            <div style="text-align:right;">
              <div style="font-weight:600; color:#1F2937;">${new Date().toLocaleDateString()}</div>
              <div style="font-size:10px; color:#6B7280;">${new Date().toLocaleTimeString()}</div>
            </div>
          </div>

          <div class="stats">
            <span class="item"><span class="count">${reports.length}</span> Total</span>
            <span class="item approved"><span class="count">${reports.filter(r => r.status === 'approved').length}</span> Approved</span>
            <span class="item rejected"><span class="count">${reports.filter(r => r.status === 'rejected').length}</span> Rejected</span>
            <span class="item submitted"><span class="count">${reports.filter(r => r.status === 'submitted').length}</span> Submitted</span>
            <span class="item draft"><span class="count">${reports.filter(r => r.status === 'draft').length}</span> Draft</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Engineer</th>
                <th>System Capacity</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              ${reports.map((r, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td><strong>${r.customer_name || 'N/A'}</strong></td>
                  <td>${r.phone_number || 'N/A'}</td>
                  <td>${r.address ? (r.address.length > 30 ? r.address.substring(0, 30) + '...' : r.address) : 'N/A'}</td>
                  <td>${r.engineer_name || 'N/A'}</td>
                  <td>${r.system_capacity || 'N/A'}</td>
                  <td><span class="status-badge status-${r.status}">${r.status.toUpperCase()}</span></td>
                  <td>${r.updated_at ? new Date(r.updated_at).toLocaleDateString() : 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            Generated from GreenLeaf Energy Site Visits Dashboard • ${new Date().toLocaleString()}
          </div>
        </div>
      </body>
    </html>
  `;
};

export function SiteVisitsPage() {
  const { user, role } = useAuth();
  const [items, setItems] = useState<SiteVisitReport[]>([]);
  const [filteredItems, setFilteredItems] = useState<SiteVisitReport[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('');
  const [downloading, setDownloading] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, filterStatus]);

  const loadData = async () => {
    setLoading(true);
    try {
      let data: SiteVisitReport[];
      if (role === 'engineer' && user?.uid) {
        data = await listSiteVisitsByEngineer(user.uid);
      } else {
        data = await listSiteVisits();
      }
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

  // Download a single report with full design
  const downloadSingleReportPDF = async (report: SiteVisitReport) => {
    setDownloadingReport(report.id);
    try {
      const html = generateSingleReportHTML(report);
      const printWindow = window.open('', '_blank', 'width=1200,height=900');
      if (!printWindow) {
        setToast({ message: 'Please allow popups to download PDF', type: 'error' });
        setTimeout(() => setToast(null), 3000);
        setDownloadingReport(null);
        return;
      }

      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 1000);

      setToast({ message: 'Report downloaded successfully!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setToast({ message: 'Failed to generate PDF', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setDownloadingReport(null);
    }
  };

  // Download all reports as a summary
  const downloadAllReportsPDF = async () => {
    if (filteredItems.length === 0) {
      setToast({ message: 'No reports to download', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setDownloading(true);
    try {
      const html = generateSummaryHTML(filteredItems);
      const printWindow = window.open('', '_blank', 'width=1200,height=900');
      if (!printWindow) {
        setToast({ message: 'Please allow popups to download PDF', type: 'error' });
        setTimeout(() => setToast(null), 3000);
        setDownloading(false);
        return;
      }

      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 1000);

      setToast({ message: 'All reports downloaded successfully!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setToast({ message: 'Failed to generate PDF', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setDownloading(false);
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
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadAllReportsPDF}
              disabled={downloading || filteredItems.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download All
                </>
              )}
            </button>
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
                : 'No reports available.'}
            </p>
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

                    {/* Download Individual Report */}
                    <button
                      onClick={() => downloadSingleReportPDF(r)}
                      disabled={downloadingReport === r.id}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-medium hover:from-green-100 hover:to-emerald-100 transition-all duration-300 text-sm disabled:opacity-50"
                    >
                      {downloadingReport === r.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      PDF
                    </button>

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