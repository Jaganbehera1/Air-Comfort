export interface SiteVisitReport {
  id: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  engineer_id?: string | null;
  engineer_name?: string;
  engineer_mobile?: string;
  customer_name: string;
  phone_number: string;
  address: string;
  gps_location?: string;
  installation_type?: string;
  roof_type?: string;
  roof_material?: string;
  system_capacity?: string;
  structure_height_low?: string;
  structure_height_high?: string;
  north_south_height?: string;
  north_south_distance?: string;
  east_west_distance?: string;
  panel_brand?: string;
  panel_type?: string;
  inverter_type?: string;
  inverter_brand?: string;
  battery_type?: string;
  battery_power?: string;
  shadow_analysis?: string;
  electricity_bill?: string;
  cables_in_meters?: string;
  cable_type?: string;
  recommended_capacity?: string;
  inverter_recommendation?: string;
  panel_recommendation?: string;
  remarks?: string;
  customer_signature?: string; // data URL or placeholder
  engineer_signature?: string;
  admin_comment?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  cable_type_earthing?: string;
  cable_measurement_earthing?: string;
  cable_type_dc?: string;
  cable_measurement_dc?: string;
  cable_type_ac?: string;
  cable_measurement_ac?: string;
  battery_brand?: string;
  battery_quantity?: string;
  electricity_units?: string; // Units/month - New field
  technician_name?: string;
  technician_mobile?: string;
  phase_type?: string;
  attachments?: {
    name: string;
    type: string;
    category?: string;
    size?: number;
    url?: string;
    public_id?: string;
    data?: string;
  }[];
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
    report.system_capacity,
    report.structure_height_low,
    report.structure_height_high,
    report.north_south_height,
    report.north_south_distance,
    report.east_west_distance,
    report.panel_brand,
    report.panel_type,
    report.inverter_type,
    report.inverter_brand,
    report.battery_type,
    report.battery_power,
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

function cloneReportForPersistence(report: SiteVisitReport): SiteVisitReport {
  return {
    ...report,
    attachments: report.attachments?.map(({ data, ...attachment }) => attachment) ?? [],
  };
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

export function listReportsByEngineer(engineerId: string | null): SiteVisitReport[] {
  if (!engineerId) return [];
  return listReports().filter((report) => report.engineer_id === engineerId);
}

export function getReport(id: string): SiteVisitReport | undefined {
  return readAll().find((r) => r.id === id);
}

export function saveReport(report: SiteVisitReport) {
  const persistentReport = cloneReportForPersistence(report);
  const items = readAll();
  const idx = items.findIndex((r) => r.id === persistentReport.id);
  if (idx >= 0) {
    items[idx] = persistentReport;
  } else {
    items.push(persistentReport);
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
    engineer_name: '',
    engineer_mobile: '',
    // New fields with default values
    cable_type_earthing: 'Earthing',
    cable_measurement_earthing: '',
    cable_type_dc: 'DC',
    cable_measurement_dc: '',
    cable_type_ac: 'AC',
    cable_measurement_ac: '',
    panel_brand: '',
    panel_type: '',
    inverter_type: '',
    inverter_brand: '',
    battery_brand: '',
    battery_type: '',
    battery_power: '',
    battery_quantity: '',
    electricity_units: '',
    technician_name: '',
    technician_mobile: '',
  };
}