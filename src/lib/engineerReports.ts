export interface SiteVisitReport {
  id: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  engineer_id?: string | null;
  customer_name: string;
  phone_number: string;
  address: string;
  gps_location?: string;
  installation_type?: string;
  roof_type?: string;
  roof_material?: string;
  shadow_analysis?: string;
  electricity_bill?: string;
  recommended_capacity?: string;
  inverter_recommendation?: string;
  panel_recommendation?: string;
  remarks?: string;
  customer_signature?: string; // data URL or placeholder
  engineer_signature?: string;
  admin_comment?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  attachments?: { name: string; type: string }[];
}

const STORAGE_KEY = 'kse_site_visit_reports_v1';

function hasMeaningfulContent(report: SiteVisitReport) {
  const textFields = [
    report.customer_name,
    report.phone_number,
    report.address,
    report.gps_location,
    report.installation_type,
    report.roof_type,
    report.roof_material,
    report.shadow_analysis,
    report.electricity_bill,
    report.recommended_capacity,
    report.inverter_recommendation,
    report.panel_recommendation,
    report.remarks,
  ];

  const hasTextContent = textFields.some((value) => typeof value === 'string' && value.trim().length > 0);
  const hasAttachments = (report.attachments?.length || 0) > 0;

  return report.status !== 'draft' || hasTextContent || hasAttachments;
}

function readAll(): SiteVisitReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SiteVisitReport[];
  } catch (e) {
    console.error('Failed to read reports from storage', e);
    return [];
  }
}

function writeAll(items: SiteVisitReport[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to write reports to storage', e);
  }
}

export function listReports(): SiteVisitReport[] {
  const filtered = readAll().filter(hasMeaningfulContent);
  if (filtered.length !== readAll().length) {
    writeAll(filtered);
  }
  return filtered.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
}

export function getReport(id: string): SiteVisitReport | undefined {
  return readAll().find((r) => r.id === id);
}

export function saveReport(report: SiteVisitReport) {
  const items = readAll();
  const idx = items.findIndex((r) => r.id === report.id);
  if (idx >= 0) {
    items[idx] = report;
  } else {
    items.push(report);
  }
  writeAll(items);
}

export function deleteReport(id: string) {
  const items = readAll().filter((r) => r.id !== id);
  writeAll(items);
}

export function createDraft(partial: Partial<SiteVisitReport> = {}): SiteVisitReport {
  const now = new Date().toISOString();
  return {
    id: 'r_' + Math.random().toString(36).slice(2, 9),
    status: 'draft',
    created_at: now,
    updated_at: now,
    engineer_id: null,
    customer_name: '',
    phone_number: '',
    address: '',
    attachments: [],
    ...partial,
  };
}
