import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Printer, 
  Download, 
  User, 
  Phone, 
  MapPin, 
  Zap, 
  Sun, 
  Battery, 
  Activity,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';
import { createQuotationDraft, saveQuotation } from '../../lib/quotations';

const capacityOptions = ['2 kW', '3 kW', '5 kW', '7 kW', '10 kW'];
const panelOptions = ['Tata Power Solar', 'Waaree', 'Adani Solar', 'Luminous', 'Vikram Solar', 'Jinko Solar'];
const inverterOptions = ['SMA', 'Huawei', 'Fronius', 'GoodWe', 'Growatt', 'SolarEdge'];
const batteryOptions = ['No Battery', '1 Battery', '2 Batteries', '3 Batteries'];

export function QuotationPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(createQuotationDraft());

  const estimatedPrice = useMemo(() => {
    const numeric = Number(form.system_capacity.replace(/[^0-9.]/g, '')) || 3;
    return `₹${(65000 * numeric).toLocaleString('en-IN')}`;
  }, [form.system_capacity]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const quotation = {
      ...form,
      estimated_price: estimatedPrice,
      status: 'submitted' as const,
      updated_at: new Date().toISOString(),
      created_at: form.created_at || new Date().toISOString(),
    };
    saveQuotation(quotation);
    navigate('/admin/quotations');
  };

  // Get system capacity numeric value
  const capacityNum = Number(form.system_capacity.replace(/[^0-9.]/g, '')) || 3;
  
  // Calculate estimated savings
  const estimatedSavings = useMemo(() => {
    return `₹${(capacityNum * 8500).toLocaleString('en-IN')}`;
  }, [capacityNum]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-sand via-brand-ice to-brand-sand py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER ================= */}
        <div className="mb-10 md:mb-12 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-sand to-brand-ice px-4 py-2 text-sm font-semibold text-brand-blue border border-brand-orange/20">
            <FileText className="h-4 w-4 text-brand-orange" /> Quotation Generator
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan bg-clip-text text-transparent">Get a Professional</span>
            <br className="sm:hidden" />
            <span className="text-gray-800"> Solar Quotation</span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Share your details and we'll prepare a clear, ready-to-review quotation for your solar installation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          
          {/* ================= FORM SECTION ================= */}
          <form onSubmit={handleSubmit} className="rounded-3xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-green-500 rounded-full" />
              <h2 className="text-xl font-bold text-gray-800">Customer Details</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" /> Customer Name
                </label>
                <input 
                  value={form.customer_name} 
                  onChange={(e) => setForm({ ...form, customer_name: e.target.value })} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-cyan focus:shadow-md transition-all duration-300 hover:border-brand-cyan/50" 
                  placeholder="Enter full name"
                  required 
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" /> Phone
                </label>
                <input 
                  value={form.phone} 
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-blue focus:shadow-md transition-all duration-300 hover:border-brand-blue/50" 
                  placeholder="Enter phone number"
                  required 
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-yellow-600" /> Electricity Bill (₹)
                </label>
                <input 
                  value={form.electricity_bill} 
                  onChange={(e) => setForm({ ...form, electricity_bill: e.target.value })} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-orange focus:shadow-md transition-all duration-300 hover:border-brand-orange/50" 
                  placeholder="Monthly bill amount"
                  required 
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" /> Address
                </label>
                <input 
                  value={form.address} 
                  onChange={(e) => setForm({ ...form, address: e.target.value })} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-red focus:shadow-md transition-all duration-300 hover:border-brand-red/50" 
                  placeholder="Enter complete address"
                  required 
                />
              </div>
              
              <div className="md:col-span-2 mt-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-brand-orange to-brand-cyan rounded-full" />
                  <h2 className="text-xl font-bold text-gray-800">System Configuration</h2>
                </div>
              </div>
              
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" /> System Capacity
                </label>
                <select 
                  value={form.system_capacity} 
                  onChange={(e) => setForm({ ...form, system_capacity: e.target.value })} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-orange focus:shadow-md transition-all duration-300 hover:border-brand-orange/50 bg-white"
                  required
                >
                  {capacityOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Sun className="h-4 w-4 text-orange-500" /> Panel Brand
                </label>
                <select 
                  value={form.panel_brand} 
                  onChange={(e) => setForm({ ...form, panel_brand: e.target.value })} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-orange focus:shadow-md transition-all duration-300 hover:border-brand-orange/50 bg-white"
                  required
                >
                  {panelOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-500" /> Inverter Brand
                </label>
                <select 
                  value={form.inverter_brand} 
                  onChange={(e) => setForm({ ...form, inverter_brand: e.target.value })} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-blue focus:shadow-md transition-all duration-300 hover:border-brand-blue/50 bg-white"
                  required
                >
                  {inverterOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Battery className="h-4 w-4 text-green-600" /> Battery Requirement
                </label>
                <select 
                  value={form.battery_requirement} 
                  onChange={(e) => setForm({ ...form, battery_requirement: e.target.value })} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-brand-cyan focus:shadow-md transition-all duration-300 hover:border-brand-cyan/50 bg-white"
                  required
                >
                  {batteryOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="mt-8 w-full bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 group"
            >
              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Generate Quotation
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>

          {/* ================= QUOTATION PREVIEW ================= */}
          <div className="rounded-3xl border-2 border-brand-cyan/20 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-orange p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full -mr-32 -mt-32 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 animate-pulse delay-700" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-brand-sand">Quotation Preview</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-300 font-medium">Live Preview</span>
                </div>
              </div>
              
              {/* Customer Card */}
              <div className="mt-5 rounded-2xl bg-white/10 backdrop-blur-sm p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-sm font-bold text-gray-900">
                    {form.customer_name ? form.customer_name.charAt(0).toUpperCase() : 'G'}
                  </div>
                  <div>
                    <p className="text-xs text-brand-sand font-medium">Customer</p>
                    <h2 className="text-xl md:text-2xl font-bold">{form.customer_name || 'Guest User'}</h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <p className="text-brand-sand text-xs font-medium">Phone</p>
                    <p className="text-white font-semibold">{form.phone || '---'}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <p className="text-brand-sand text-xs font-medium">Bill (₹)</p>
                    <p className="text-white font-semibold">{form.electricity_bill || '---'}</p>
                  </div>
                  <div className="col-span-2 bg-white/5 rounded-lg p-2.5">
                    <p className="text-brand-sand text-xs font-medium">Address</p>
                    <p className="text-white font-semibold truncate">{form.address || '---'}</p>
                  </div>
                </div>
              </div>
              
              {/* System Specs */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-brand-sand text-xs font-medium">Capacity</p>
                  <p className="text-white font-bold">{form.system_capacity || '---'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-brand-sand text-xs font-medium">Panel</p>
                  <p className="text-white font-bold truncate">{form.panel_brand || '---'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-brand-sand text-xs font-medium">Inverter</p>
                  <p className="text-white font-bold truncate">{form.inverter_brand || '---'}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                  <p className="text-brand-sand text-xs font-medium">Battery</p>
                  <p className="text-white font-bold truncate">{form.battery_requirement || '---'}</p>
                </div>
              </div>
              
              {/* Price Card */}
              <div className="mt-5 rounded-2xl bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan p-4 text-gray-900 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                <div className="relative z-10">
                  <p className="text-sm font-medium text-gray-700">Estimated Price</p>
                  <p className="text-3xl md:text-4xl font-bold">{estimatedPrice}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="h-4 w-4 text-green-700" />
                    <span className="text-xs font-medium text-green-800">Including all taxes & installation</span>
                  </div>
                </div>
              </div>
              
              {/* Savings Estimate */}
              <div className="mt-4 flex items-center gap-4 bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm">Est. Monthly Savings:</span>
                </div>
                <span className="text-lg font-bold text-brand-sand">{estimatedSavings}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap gap-3">
                <button 
                  type="button" 
                  onClick={() => window.print()} 
                  className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-5 py-2.5 text-sm font-semibold text-white border border-white/20 hover:scale-105"
                >
                  <Printer className="h-4 w-4" /> Print
                </button>
                <button 
                  type="button" 
                  onClick={() => window.print()} 
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg hover:scale-105"
                >
                  <Download className="h-4 w-4" /> Save PDF
                </button>
                <button 
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 px-5 py-2.5 text-sm font-semibold text-white border border-white/20"
                >
                  <CheckCircle className="h-4 w-4 text-green-400" /> Share Quote
                </button>
              </div>
              
              {/* Trust Badge */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-brand-sand/80">
                <span>✓ 25-Year Warranty</span>
                <span>✓ Free Consultation</span>
                <span>✓ Expert Installation</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>

    </div>
  );
}