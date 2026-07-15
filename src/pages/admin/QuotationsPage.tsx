import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilLine, Printer, Download } from 'lucide-react';
import { deleteQuotation, getQuotation, listQuotations, saveQuotation, Quotation } from '../../lib/quotations';

const printStyles = `
  @page { size: A4; margin: 12mm; }
  body { background: white; }
  .no-print { display: none !important; }
  .quotation-sheet { font-family: Arial, sans-serif; color: #111827; padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px; }
  .quotation-sheet h1 { font-size: 24px; font-weight: 700; color: #166534; margin-bottom: 4px; }
  .quotation-sheet .sub { color: #6b7280; font-size: 13px; }
  .quotation-sheet table { width: 100%; border-collapse: collapse; margin-top: 16px; }
  .quotation-sheet th, .quotation-sheet td { border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-size: 13px; }
  .quotation-sheet th { background: #f3f4f6; }
  .quotation-sheet .total { font-size: 18px; font-weight: 700; color: #166534; }
`;

export function QuotationsPage() {
  const [items, setItems] = useState<Quotation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Quotation | null>(null);

  useEffect(() => {
    setItems(listQuotations());
  }, []);

  const selected = useMemo(() => draft || items.find((item) => item.id === selectedId) || null, [draft, items, selectedId]);

  useEffect(() => {
    if (items.length && !selectedId) {
      setSelectedId(items[0].id);
    }
  }, [items, selectedId]);

  useEffect(() => {
    if (selectedId) {
      const item = getQuotation(selectedId);
      setDraft(item || null);
    }
  }, [selectedId]);

  const handleSave = () => {
    if (!draft) return;
    const updated = { ...draft, updated_at: new Date().toISOString() };
    saveQuotation(updated);
    setItems(listQuotations());
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this quotation?')) return;
    deleteQuotation(id);
    setItems(listQuotations());
    if (selectedId === id) setSelectedId(items[0]?.id || null);
  };

  const handlePrint = () => {
    if (!draft) return;
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Quotation</title>
          <style>${printStyles}</style>
        </head>
        <body>
          <div class="quotation-sheet">
            <h1>Green Leaf Energy </h1>
            <p class="sub">Professional Solar Quotation</p>
            <div style="margin-top: 20px; display: flex; justify-content: space-between; gap: 16px;">
              <div>
                <p><strong>Customer:</strong> ${draft.customer_name || '---'}</p>
                <p><strong>Phone:</strong> ${draft.phone || '---'}</p>
                <p><strong>Address:</strong> ${draft.address || '---'}</p>
              </div>
              <div>
                <p><strong>Quotation Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${draft.status}</p>
              </div>
            </div>
            <table>
              <tbody>
                <tr><th>System Capacity</th><td>${draft.system_capacity || '---'}</td></tr>
                <tr><th>Panel Brand</th><td>${draft.panel_brand || '---'}</td></tr>
                <tr><th>Inverter Brand</th><td>${draft.inverter_brand || '---'}</td></tr>
                <tr><th>Battery Requirement</th><td>${draft.battery_requirement || '---'}</td></tr>
                <tr><th>Electricity Bill</th><td>${draft.electricity_bill || '---'}</td></tr>
              </tbody>
            </table>
            <div style="margin-top: 20px; padding: 14px; background: #f9fafb; border-radius: 10px;">
              <p><strong>Estimated Price</strong></p>
              <p class="total">${draft.estimated_price || '---'}</p>
              ${draft.notes ? `<p style="margin-top: 8px;"><strong>Notes:</strong> ${draft.notes}</p>` : ''}
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quotations</h1>
            <p className="mt-2 text-gray-600">Review, edit, approve, print, and export quotations.</p>
          </div>
          <Link to="/quotation" className="rounded-full bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Create Quotation</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full rounded-2xl border p-4 text-left shadow-sm ${selectedId === item.id ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{item.customer_name || 'Unnamed Customer'}</p>
                    <p className="text-sm text-gray-500">{item.phone || 'No phone'}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'approved' ? 'bg-green-100 text-green-700' : item.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{item.system_capacity} • {item.estimated_price}</p>
              </button>
            ))}
          </div>

          {selected ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selected.customer_name || 'Quotation'}</h2>
                  <p className="text-sm text-gray-500">{selected.address}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={handlePrint} className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white"><Printer className="h-4 w-4" /> Print</button>
                  <button onClick={handlePrint} className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-gray-900"><Download className="h-4 w-4" /> PDF</button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Customer Name</label>
                  <input value={draft?.customer_name || ''} onChange={(e) => setDraft((prev) => prev ? { ...prev, customer_name: e.target.value } : prev)} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Phone</label>
                  <input value={draft?.phone || ''} onChange={(e) => setDraft((prev) => prev ? { ...prev, phone: e.target.value } : prev)} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Address</label>
                  <input value={draft?.address || ''} onChange={(e) => setDraft((prev) => prev ? { ...prev, address: e.target.value } : prev)} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Electricity Bill</label>
                  <input value={draft?.electricity_bill || ''} onChange={(e) => setDraft((prev) => prev ? { ...prev, electricity_bill: e.target.value } : prev)} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">System Capacity</label>
                  <input value={draft?.system_capacity || ''} onChange={(e) => setDraft((prev) => prev ? { ...prev, system_capacity: e.target.value } : prev)} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Panel Brand</label>
                  <input value={draft?.panel_brand || ''} onChange={(e) => setDraft((prev) => prev ? { ...prev, panel_brand: e.target.value } : prev)} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Inverter Brand</label>
                  <input value={draft?.inverter_brand || ''} onChange={(e) => setDraft((prev) => prev ? { ...prev, inverter_brand: e.target.value } : prev)} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Battery Requirement</label>
                  <input value={draft?.battery_requirement || ''} onChange={(e) => setDraft((prev) => prev ? { ...prev, battery_requirement: e.target.value } : prev)} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Notes</label>
                  <textarea value={draft?.notes || ''} onChange={(e) => setDraft((prev) => prev ? { ...prev, notes: e.target.value } : prev)} rows={4} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white"><PencilLine className="h-4 w-4" /> Save Changes</button>
                <button onClick={() => handleDelete(selected.id)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
