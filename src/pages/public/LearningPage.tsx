import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Inverter Images
import stringInverterImg from '../../images/inverters/string-inverter.webp';
import microInverterImg from '../../images/inverters/micro-inverter.jpg';
import hybridInverterImg from '../../images/inverters/hybrid-inverter.jpg';
import centralInverterImg from '../../images/inverters/central-inverter.webp';

// Solar Panel Images
import monocrystallineImg from '../../images/panels/monocrystalline.png';
import polycrystallineImg from '../../images/panels/polycrystalline.webp';
import thinFilmImg from '../../images/panels/thin-film.webp';
import bifacialImg from '../../images/panels/bifacial.webp';

// Rooftop System Images
import onGridRooftopImg from '../../images/rooftop/on-grid.avif';
import offGridRooftopImg from '../../images/rooftop/off-grid.gif';
import hybridRooftopImg from '../../images/rooftop/hybrid.jpg';

export function LearningPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-500 via-green-600 to-blue-700 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-4 border border-white/30">
            📚 Solar Learning Center
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Learn Everything About Solar
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive guides, comparisons, and expert insights to help you make informed solar decisions.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* ================= REQUIRED DOCUMENTS ================= */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 via-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">📋 Required Documents</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Keep these documents ready when you book your solar site visit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Aadhaar Card', icon: '🪪' },
              { name: 'PAN Card', icon: '💳' },
              { name: 'Electricity Bill', icon: '📄' },
              { name: 'Bank Passbook', icon: '📕' },
              { name: 'Mobile Number', icon: '📱' },
            ].map((item) => (
              <div key={item.name} className="rounded-3xl border-2 border-green-200 bg-gradient-to-br from-white to-green-50 p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 flex items-center gap-4">
                <div className="text-3xl">{item.icon}</div>
                <span className="text-gray-700 font-semibold text-lg">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE SOLAR ================= */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">Why Choose Solar?</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Solar energy delivers savings, sustainability, and long-term value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Save Electricity Bills', icon: '💰' },
              { title: 'Eco Friendly', icon: '🌱' },
              { title: 'Renewable Energy', icon: '♻️' },
              { title: 'Low Maintenance', icon: '🔋' },
              { title: 'Suitable for Homes & Businesses', icon: '🏠' },
              { title: 'Increases Property Value', icon: '📈' },
            ].map((item) => (
              <div key={item.title} className="group rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white via-yellow-50 to-green-50 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center hover:border-yellow-400">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TYPES OF SOLAR PANELS ================= */}
      <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">🟦 Types of Solar Panels</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Choose the right solar panel technology for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Monocrystalline', desc: 'Highest efficiency, sleek black appearance, space-efficient.', img: monocrystallineImg, color: 'from-blue-900 to-blue-700' },
              { name: 'Polycrystalline', desc: 'Cost-effective, blue color, good efficiency for homes.', img: polycrystallineImg, color: 'from-blue-500 to-blue-300' },
              { name: 'Thin Film', desc: 'Flexible, lightweight, good for curved surfaces.', img: thinFilmImg, color: 'from-gray-500 to-gray-300' },
              { name: 'Bifacial', desc: 'Generates from both sides, higher output, modern design.', img: bifacialImg, color: 'from-purple-500 to-purple-300' },
            ].map((panel) => (
              <div key={panel.name} className={`rounded-3xl border-2 border-gray-200 bg-gradient-to-br ${panel.color} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300 text-white`}>
                <img
                  src={panel.img}
                  alt={panel.name}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-xl font-bold">{panel.name}</h3>
                <p className="mt-3 text-white/90 leading-7">{panel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TYPES OF INVERTERS ================= */}
      <section className="py-16 bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">⚡ Types of Inverters</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Different inverter technologies for different solar needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'String Inverter', desc: 'Most common, cost-effective, works well for standard installations.', img: stringInverterImg, color: 'from-orange-500 to-orange-300' },
              { name: 'Micro Inverter', desc: 'Per-panel optimization, ideal for complex roofs, higher efficiency.', img: microInverterImg, color: 'from-green-500 to-green-300' },
              { name: 'Hybrid Inverter', desc: 'Works with batteries, grid, and solar. Best for power backup.', img: hybridInverterImg, color: 'from-purple-500 to-purple-300' },
              { name: 'Central Inverter', desc: 'For large commercial systems, high power output, industrial use.', img: centralInverterImg, color: 'from-red-500 to-red-300' },
            ].map((inverter) => (
              <div key={inverter.name} className={`rounded-3xl border-2 border-gray-200 bg-gradient-to-br ${inverter.color} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300 text-white`}>
                <img
                  src={inverter.img}
                  alt={inverter.name}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-xl font-bold">{inverter.name}</h3>
                <p className="mt-3 text-white/90 leading-7">{inverter.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TYPE OF ROOFTOP SOLAR SYSTEM ================= */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">🏠 Types of Rooftop Solar Systems</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Choose the right rooftop solar system for your home or business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'On-Grid System', desc: 'Connected to utility grid, low cost, no battery needed. Best for areas with stable grid.', img: onGridRooftopImg, color: 'from-blue-500 to-blue-300', best: '💡 Best for: Urban areas, no power cuts' },
              { name: 'Off-Grid System', desc: 'Independent system with batteries, works without grid. Best for remote areas.', img: offGridRooftopImg, color: 'from-green-500 to-green-300', best: '🔋 Best for: Rural areas, remote locations' },
              { name: 'Hybrid System', desc: 'Combines on-grid & off-grid features, battery backup, grid connectivity. Best for power cuts.', img: hybridRooftopImg, color: 'from-purple-500 to-purple-300', best: '⚡ Best for: Frequent power cuts, backup needed' },
            ].map((system) => (
              <div key={system.name} className={`rounded-3xl border-2 border-gray-200 bg-gradient-to-br ${system.color} p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300 text-white text-center`}>
                <img
                  src={system.img}
                  alt={system.name}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-2xl font-bold">{system.name}</h3>
                <p className="mt-3 text-white/90 leading-7">{system.desc}</p>
                <div className="mt-4 bg-white/20 rounded-xl p-3 text-sm font-semibold">
                  {system.best}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ON-GRID VS HYBRID ================= */}
      <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">⚡ On-Grid vs Hybrid System</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Understand the difference and choose the right system for your needs.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* On-Grid */}
            <div className="rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-yellow-50 to-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span>🔌</span> On-Grid Solar System
              </h3>
              <p className="text-gray-700 mb-4 font-semibold">How it works</p>
              <div className="rounded-2xl bg-white p-5 border-2 border-blue-100 text-sm leading-8 text-gray-700">
                <span className="text-blue-600 font-bold">☀️ Solar Panels</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;⬇<br />
                <span className="text-orange-500 font-bold">⚡ Solar Inverter</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;⬇<br />
                <span className="text-green-600 font-bold">🏠 Home</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;⬇<br />
                <span className="text-purple-600 font-bold">📊 Net Meter</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;⬇<br />
                <span className="text-gray-600 font-bold">⚡ Electric Grid</span>
              </div>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-4 border-2 border-green-200 text-green-700 font-semibold flex items-center gap-2">
                  <span>✅</span> Lowest cost
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-4 border-2 border-green-200 text-green-700 font-semibold flex items-center gap-2">
                  <span>✅</span> Government subsidy available
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-4 border-2 border-green-200 text-green-700 font-semibold flex items-center gap-2">
                  <span>✅</span> Reduce electricity bill
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-red-50 to-red-100 p-4 border-2 border-red-200 text-red-600 font-semibold flex items-center gap-2">
                  <span>❌</span> Doesn't work during power cuts
                </div>
              </div>
            </div>

            {/* Hybrid */}
            <div className="rounded-3xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 via-green-50 to-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
                <span>🔋</span> Hybrid Solar System
              </h3>
              <p className="text-gray-700 mb-4 font-semibold">How it works</p>
              <div className="rounded-2xl bg-white p-5 border-2 border-yellow-100 text-sm leading-8 text-gray-700">
                <span className="text-blue-600 font-bold">☀️ Solar Panels</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;⬇<br />
                <span className="text-orange-500 font-bold">⚡ Hybrid Inverter</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;⬇<br />
                <span className="text-green-600 font-bold">🔋 Battery</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;⬇<br />
                <span className="text-green-600 font-bold">🏠 Home</span><br />
                &nbsp;&nbsp;&nbsp;&nbsp;⬇<br />
                <span className="text-gray-600 font-bold">⚡ Grid</span>
              </div>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-4 border-2 border-green-200 text-green-700 font-semibold flex items-center gap-2">
                  <span>✅</span> Works during power cuts
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-4 border-2 border-green-200 text-green-700 font-semibold flex items-center gap-2">
                  <span>✅</span> Battery backup
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-4 border-2 border-green-200 text-green-700 font-semibold flex items-center gap-2">
                  <span>✅</span> Lower electricity bill
                </div>
              </div>
            </div>
          </div>

          {/* Which One Should I Choose? */}
          <div className="mt-12 overflow-x-auto rounded-3xl border-2 border-gray-200 bg-gradient-to-r from-yellow-50 via-green-50 to-blue-50 p-6 shadow-lg">
            <div className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>📌</span> Which One Should I Choose?
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-5 border-2 border-blue-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">No power cuts</div>
                <div className="font-bold text-blue-700 text-lg">On-Grid</div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 border-2 border-yellow-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">Frequent power cuts</div>
                <div className="font-bold text-yellow-700 text-lg">Hybrid</div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-5 border-2 border-green-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">Want lowest investment</div>
                <div className="font-bold text-green-700 text-lg">On-Grid</div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-5 border-2 border-purple-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">Need backup</div>
                <div className="font-bold text-purple-700 text-lg">Hybrid</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOLAR SYSTEM COMPONENTS ================= */}
      <section className="py-16 bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">🔧 Solar System Components</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              The essential parts that make a solar system work efficiently.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { name: 'Solar Panels', desc: 'Convert sunlight into electricity using photovoltaic cells.', icon: '☀️', color: 'from-yellow-200 to-yellow-100' },
              { name: 'Solar Inverter', desc: 'Turns DC power from panels into AC power for your home.', icon: '⚡', color: 'from-orange-200 to-orange-100' },
              { name: 'Hybrid Inverter', desc: 'Manages solar power, battery storage, and grid input seamlessly.', icon: '🔄', color: 'from-purple-200 to-purple-100' },
              { name: 'Battery', desc: 'Stores energy so your home can run during power cuts.', icon: '🔋', color: 'from-green-200 to-green-100' },
              { name: 'Net Meter', desc: 'Measures electricity exported to and imported from the grid.', icon: '📊', color: 'from-blue-200 to-blue-100' },
              { name: 'Mounting Structure', desc: 'Supports solar panels securely on the roof.', icon: '🏗️', color: 'from-gray-200 to-gray-100' },
              { name: 'DC Cable', desc: 'Carries direct current from panels to the inverter.', icon: '🔌', color: 'from-red-200 to-red-100' },
              { name: 'ACDB/DCDB', desc: 'Distributes AC and DC power safely throughout the system.', icon: '📦', color: 'from-indigo-200 to-indigo-100' },
              { name: 'Earthing', desc: 'Protects the system and your home from electrical faults.', icon: '⛑️', color: 'from-teal-200 to-teal-100' },
              { name: 'Lightning Arrester', desc: 'Guards the system against lightning and surges.', icon: '⚡', color: 'from-pink-200 to-pink-100' },
            ].map((item) => (
              <div key={item.name} className={`rounded-3xl border-2 border-gray-200 bg-gradient-to-br ${item.color} p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400`}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                <p className="mt-3 text-gray-600 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY REPLACE COAL ================= */}
      <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">🔄 Why Replace Coal Electricity?</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Solar energy is a cleaner, more sustainable alternative to coal-generated power.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border-2 border-gray-200 shadow-xl">
            <div className="grid grid-cols-2">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 text-white font-bold text-center text-lg">Coal</div>
              <div className="bg-gradient-to-r from-green-700 to-green-600 p-4 text-white font-bold text-center text-lg">Solar</div>
              <div className="bg-gray-100 p-4 text-center border-t border-gray-300 flex items-center justify-center gap-2"><span>🏭</span> Pollution</div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 text-center border-t border-gray-300 flex items-center justify-center gap-2"><span>🌿</span> Clean</div>
              <div className="bg-gray-100 p-4 text-center border-t border-gray-300 flex items-center justify-center gap-2"><span>⛏️</span> Limited Resource</div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 text-center border-t border-gray-300 flex items-center justify-center gap-2"><span>♾️</span> Unlimited</div>
              <div className="bg-gray-100 p-4 text-center border-t border-gray-300 flex items-center justify-center gap-2"><span>📈</span> Cost Increasing</div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 text-center border-t border-gray-300 flex items-center justify-center gap-2"><span>📉</span> Cost Reducing</div>
              <div className="bg-gray-100 p-4 text-center border-t border-gray-300 flex items-center justify-center gap-2"><span>💀</span> Environmental Damage</div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 text-center border-t border-gray-300 flex items-center justify-center gap-2"><span>🌎</span> Eco Friendly</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= APPLICATIONS ================= */}
      <section className="py-16 bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">🏢 Applications of Solar</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Solar energy can power a wide range of homes, businesses and public services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Home Rooftop', icon: '🏠', color: 'from-yellow-200 to-yellow-100' },
              { name: 'Water Pump', icon: '💧', color: 'from-blue-200 to-blue-100' },
              { name: 'Street Lights', icon: '💡', color: 'from-yellow-200 to-yellow-100' },
              { name: 'Water Heater', icon: '🔥', color: 'from-red-200 to-red-100' },
              { name: 'Solar Cooking', icon: '🍳', color: 'from-orange-200 to-orange-100' },
              { name: 'Industries', icon: '🏭', color: 'from-gray-200 to-gray-100' },
              { name: 'Commercial Buildings', icon: '🏢', color: 'from-blue-200 to-blue-100' },
            ].map((item) => (
              <div key={item.name} className={`rounded-3xl border-2 border-gray-200 bg-gradient-to-br ${item.color} p-8 text-center shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400`}>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GOVERNMENT SUBSIDY ================= */}
      <section className="py-16 bg-gradient-to-b from-white via-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">🏛️ Government Subsidy</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Government subsidies can reduce the cost of solar installations, and the program details may change over time.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: 'Central Government subsidy', description: 'Support from the central government for approved solar systems.', icon: '🇮🇳', color: 'from-blue-200 to-blue-100' },
              { title: 'State Government subsidy', description: 'Additional state-level incentives and rebates.', icon: '🏛️', color: 'from-green-200 to-green-100' },
              { title: 'Loan facility', description: 'Easy financing options to make your solar investment affordable.', icon: '🏦', color: 'from-yellow-200 to-yellow-100' },
              { title: 'Insurance', description: 'Optional coverage for equipment and installation.', icon: '🛡️', color: 'from-purple-200 to-purple-100' },
              { title: 'Net Meter', description: 'Net metering lets you sell excess solar power back to the grid.', icon: '📊', color: 'from-red-200 to-red-100' },
              { title: 'Installation timeline', description: 'Fast execution with professional workmanship and timely delivery.', icon: '⏱️', color: 'from-indigo-200 to-indigo-100' },
            ].map((item) => (
              <div key={item.title} className={`rounded-3xl border-2 border-gray-200 bg-gradient-to-br ${item.color} p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-16 bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">❓ Frequently Asked Questions</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Answers to the most common solar questions from our customers.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              { question: 'What is On-Grid Solar?', answer: 'A system connected to the grid that exports excess power and reduces your electricity bill.' },
              { question: 'What is Hybrid Solar?', answer: 'A system with battery backup that works during power cuts and stores solar energy.' },
              { question: 'Which is better?', answer: 'On-grid is best for lowest cost, while hybrid is best if you need backup during outages.' },
              { question: 'Does solar work in rainy weather?', answer: 'Yes, solar panels still generate electricity on cloudy days, though output is lower.' },
              { question: 'How many years do panels last?', answer: 'Solar panels typically last 20-25 years with proper maintenance.' },
              { question: 'How much subsidy is available?', answer: 'Subsidy varies by state and system type; contact us for the latest government support.' },
              { question: 'Can I run AC on solar?', answer: 'Yes, a properly sized system with battery backup can run AC and other appliances.' },
              { question: 'What happens during a power cut?', answer: 'On-grid systems stop during cuts; hybrid systems continue using stored battery energy.' },
              { question: 'Is maintenance expensive?', answer: 'Maintenance is usually low-cost and includes cleaning and annual inspections.' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-md hover:shadow-2xl transition-all duration-300">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-yellow-500">❓</span> {item.question}
                  </h3>
                  {expandedFaq === idx ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <p className="mt-4 text-gray-600 pl-7">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 via-green-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Learn More?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Contact us today to discuss your solar needs with our expert team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-yellow-600 font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            📞 Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
