export interface Quotation {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  electricity_bill: string;
  system_capacity: string;
  panel_brand: string;
  inverter_brand: string;
  battery_requirement: string;
  estimated_price: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  notes?: string;
}

const STORAGE_KEY = 'kse_quotations_v1';

function readAll(): Quotation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Quotation[];
  } catch (error) {
    console.error('Failed to read quotations', error);
    return [];
  }
}

function writeAll(items: Quotation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save quotations', error);
  }
}

export function listQuotations(): Quotation[] {
  return readAll().sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
}

export function saveQuotation(quotation: Quotation) {
  const items = readAll();
  const index = items.findIndex((item) => item.id === quotation.id);
  if (index >= 0) {
    items[index] = quotation;
  } else {
    items.push(quotation);
  }
  writeAll(items);
}

export function getQuotation(id: string): Quotation | undefined {
  return readAll().find((item) => item.id === id);
}

export function deleteQuotation(id: string) {
  const items = readAll().filter((item) => item.id !== id);
  writeAll(items);
}

export function createQuotationDraft(partial: Partial<Quotation> = {}): Quotation {
  const now = new Date().toISOString();
  const capacity = partial.system_capacity || '3 kW';
  const estimatedPrice = calculateEstimatedPrice(capacity);
  return {
    id: `q_${Date.now()}`,
    customer_name: '',
    phone: '',
    address: '',
    electricity_bill: '',
    system_capacity: capacity,
    panel_brand: 'Tier-1 Poly/Mono',
    inverter_brand: 'Huawei/SMA',
    battery_requirement: 'No',
    estimated_price: estimatedPrice,
    status: 'draft',
    created_at: now,
    updated_at: now,
    ...partial,
  };
}

export function calculateEstimatedPrice(capacity: string) {
  const numeric = Number(capacity.replace(/[^0-9.]/g, '')) || 3;
  const base = 65000;
  const estimated = base * numeric;
  return `₹${estimated.toLocaleString('en-IN')}`;
}
