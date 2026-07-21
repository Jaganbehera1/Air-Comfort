import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ProjectsSection } from '../../components/ProjectsSection';
import { AssistanceWidget } from '../../components/public/AssistanceWidget';
import { useState } from 'react';

// HERO IMAGES
import modiImg from '../../images/scm.png';
import sliderGif from '../../images/slider2.gif';

// SERVICE IMAGES
import annualMaintenance from '../../images/services/AMS_ihsufv.jpg';
import solarUpgradation from '../../images/services/Solar-Upgradation_zqb2mk.jpg';
import panelCleaning from '../../images/services/Solar-Panel-Cleaning_psz0u9.jpg';
import batteryMaintenance from '../../images/services/Battery-Maintenance_o9537u.jpg';
import inverterUpgrade from '../../images/services/Inverter-Upgrade_yoycho.jpg';
import installation from '../../images/services/Installation-solar_yly1qv.jpg';
import irrigation from '../../images/services/Solar-Irrigation-Pumping_zxg3pu.jpg';
import streetLight from '../../images/services/led-street-light-_m6bnnu.png';

// AFFILIATION IMAGES
import tpcodl from '../../images/affiliations/tpcodl.png';
import tpwodl from '../../images/affiliations/TPWODL.jpg';
import tpsodl from '../../images/affiliations/TPSODL-Logo-Eng.jpg';
import tpnodl from '../../images/affiliations/tpnodl.jpg';
import nsic from '../../images/affiliations/nsic-registration-services-550-x-366.jpg';
import msme from '../../images/affiliations/MSME-Certificate-Service.jpg';
import indiamart from '../../images/affiliations/Indiamart.png';
import googleRating from '../../images/affiliations/google-rating.png';
import iitLogo from '../../images/affiliations/iit-bhubneswar-01.jpg';

import workImg from '../../images/work/Air_Comfort.png';

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

// ICON MAP for better visuals
const ICONS = {
  'Save Electricity Bills': '💰',
  'Eco Friendly': '🌱',
  'Renewable Energy': '♻️',
  'Low Maintenance': '🔋',
  'Suitable for Homes & Businesses': '🏠',
  'Increases Property Value': '📈',
};

export function HomePage() {
  const { t } = useLanguage();

  // Calculator state
  const [annualConsumption, setAnnualConsumption] = useState<number>(6000);
  const [monthlyBill, setMonthlyBill] = useState<number>(2000);
  const [location, setLocation] = useState<string>('Mumbai');
  const [roofType, setRoofType] = useState<string>('Concrete Roof');
  const [showResults, setShowResults] = useState<boolean>(false);

  // Calculate estimates using the specified method
  const calculateEstimate = () => {
    setShowResults(true);
  };

  // Derived calculations using the specified method
  const dailyUsage = annualConsumption / 12 / 30;
  const systemSize = Math.ceil((dailyUsage / 4) * 10) / 10;
  const recommendedSize = Math.ceil(systemSize);
  
  const baseCost = recommendedSize * 35000;
  const costRange = `${(recommendedSize * 32000).toLocaleString()} - ${(recommendedSize * 38000).toLocaleString()}`;
  const subsidy = recommendedSize * 15000;
  const monthlySaving = Math.round((monthlyBill / 3000) * 70) + 20;
  const paybackYears = Math.max(Math.round((baseCost - subsidy) / (monthlyBill * 12 * (monthlySaving / 100))), 2);

  return (
    <div className="bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="w-full bg-gradient-to-br from-brand-sand via-brand-ice to-brand-sand py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">

            {/* LEFT – MODI IMAGE */}
    
            <div className="flex justify-center md:justify-end">
              <div className="bg-white border-2 border-brand-orange/30 rounded-3xl shadow-2xl p-6 w-full max-w-[380px] hover:shadow-3xl transition-all duration-300 hover:scale-105">

                <div className="bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan rounded-2xl p-2 text-center mb-4">
                  <span className="text-sm font-bold text-gray-800 tracking-widest">🇮🇳 PM SURYA GHAR YOJANA</span>
                </div>

                <img
                  src={sliderGif}
                  alt="PM Surya Ghar Solar Scheme"
                  className="w-full h-auto max-h-[280px] object-contain mx-auto rounded-xl"
                />

                <div className="mt-3 text-center">
                  <span className="inline-block bg-gradient-to-r from-brand-ice to-brand-sand text-brand-blue px-4 py-1 rounded-full text-sm font-bold">
                    💰 Subsidy up to 40%
                  </span>
                </div>
              </div>
            </div>

            {/* CENTER – TEXT */}
            <div className="space-y-5 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-brand-orange via-brand-red to-brand-cyan bg-clip-text text-transparent">Solar</span>
                <span className="text-gray-800"> Energy</span><br />
                <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">for Every Home</span>
              </h1>

              <ul className="text-base sm:text-lg text-gray-700 space-y-2">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-brand-blue text-xl">✓</span> {t('hero_bullet_1')}
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-brand-orange text-xl">✓</span> {t('hero_bullet_2')}
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-brand-cyan text-xl">✓</span> {t('hero_bullet_3')}
                </li>
              </ul>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <Link
                  to="/contact#enquiry-form"
                  className="bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2"
                >
                  <span>📞</span> {t('book_consult')}
                </Link>

                <Link
                  to="/gallery"
                  className="bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <span>🖼️</span> {t('view_projects')}
                </Link>
              </div>
            </div>

            {/* RIGHT – PM SURYA GHAR CARD */}
            <div className="flex justify-center md:justify-start">
              <img
                src={modiImg}
                alt="PM Surya Ghar Yojana"
                className="max-h-[220px] md:max-h-[280px] object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= RESIDENTIAL SECTION ================= */}
      <section className="bg-gradient-to-r from-brand-sand via-brand-ice to-brand-sand py-12 sm:py-16 border-t-4 border-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-4xl sm:text-5xl">🏡</span>
              <span className="bg-gradient-to-r from-brand-green via-brand-blue to-brand-cyan bg-clip-text text-transparent">
                Residential
              </span>
            </div>

            <span className="text-gray-800">
              Solar Installation
            </span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-700">
            High-efficiency panels and professional installation tailored to your home.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact#enquiry-form"
              className="bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>📅</span> Book a Free Consultation
            </Link>
            <Link
              to="/gallery"
              className="bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>📁</span> View Our Projects
            </Link>
            <Link
              to="/contact#enquiry-form"
              className="bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span>📁</span> Apply Now
            </Link>
          </div>
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

      {/* ================= WHAT IS SOLAR ENERGY =================
      <section className="py-16 bg-gradient-to-b from-brand-ice via-brand-sand to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan bg-clip-text text-transparent">☀️ What is Solar Energy?</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Solar energy is electricity generated from sunlight. It is clean, renewable, pollution-free, and helps reduce electricity bills while offering a long-term investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
            <div className="rounded-3xl border-2 border-brand-cyan/20 bg-gradient-to-br from-brand-ice via-brand-sand to-white p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">☀️</div>
              <p>Solar energy is electricity generated from sunlight.</p>
              <p className="mt-4 text-brand-blue font-semibold">🌿 It is clean, renewable, and pollution-free.</p>
            </div>
            <div className="rounded-3xl border-2 border-brand-orange/20 bg-gradient-to-br from-brand-sand via-brand-ice to-white p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">💰</div>
              <p>It helps reduce electricity bills.</p>
              <p className="mt-4 text-brand-cyan font-semibold">📈 It is a long-term investment for your home or business.</p>
            </div>
          </div>
        </div>
      </section> */}

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
            {Object.entries(ICONS).map(([title, icon]) => (
              <div key={title} className="group rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white via-yellow-50 to-green-50 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center hover:border-yellow-400">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
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
              { name: 'Monocrystalline', desc: 'Highest efficiency, sleek black appearance, space-efficient.', icon: '⬛', img: monocrystallineImg, color: 'from-blue-900 to-blue-700' },
              { name: 'Polycrystalline', desc: 'Cost-effective, blue color, good efficiency for homes.', icon: '🔷', img: polycrystallineImg, color: 'from-blue-500 to-blue-300' },
              { name: 'Thin Film', desc: 'Flexible, lightweight, good for curved surfaces.', icon: '📜', img: thinFilmImg, color: 'from-gray-500 to-gray-300' },
              { name: 'Bifacial', desc: 'Generates from both sides, higher output, modern design.', icon: '🔄', img: bifacialImg, color: 'from-purple-500 to-purple-300' },
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
              { name: 'String Inverter', desc: 'Most common, cost-effective, works well for standard installations.', icon: '🔌', img: stringInverterImg, color: 'from-orange-500 to-orange-300' },
              { name: 'Micro Inverter', desc: 'Per-panel optimization, ideal for complex roofs, higher efficiency.', icon: '⚡', img: microInverterImg, color: 'from-green-500 to-green-300' },
              { name: 'Hybrid Inverter', desc: 'Works with batteries, grid, and solar. Best for power backup.', icon: '🔋', img: hybridInverterImg, color: 'from-purple-500 to-purple-300' },
              { name: 'Central Inverter', desc: 'For large commercial systems, high power output, industrial use.', icon: '🏭', img: centralInverterImg, color: 'from-red-500 to-red-300' },
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
              { name: 'On-Grid System', desc: 'Connected to utility grid, low cost, no battery needed. Best for areas with stable grid.', icon: '🌐', img: onGridRooftopImg, color: 'from-blue-500 to-blue-300' },
              { name: 'Off-Grid System', desc: 'Independent system with batteries, works without grid. Best for remote areas.', icon: '🏝️', img: offGridRooftopImg, color: 'from-green-500 to-green-300' },
              { name: 'Hybrid System', desc: 'Combines on-grid & off-grid features, battery backup, grid connectivity. Best for power cuts.', icon: '🔄', img: hybridRooftopImg, color: 'from-purple-500 to-purple-300' },
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
                  {system.name === 'On-Grid System' && '💡 Best for: Urban areas, no power cuts'}
                  {system.name === 'Off-Grid System' && '🔋 Best for: Rural areas, remote locations'}
                  {system.name === 'Hybrid System' && '⚡ Best for: Frequent power cuts, backup needed'}
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

      {/* ================= SOLAR COST CALCULATOR ================= */}
      <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">🧮 Solar Cost Calculator</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Enter your annual electricity consumption to get a personalized solar estimate.
            </p>
            <p className="mt-2 text-sm bg-gradient-to-r from-yellow-100 to-green-100 inline-block px-4 py-2 rounded-full shadow">
              💡 1 kW solar system generates ~4 units (kWh) per day
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white to-yellow-50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); calculateEstimate(); }}>
                <div>
                  <label className="block text-sm font-semibold text-gray-900">📊 Annual electricity consumption (kWh)</label>
                  <input 
                    type="number" 
                    min="0" 
                    value={annualConsumption}
                    onChange={(e) => setAnnualConsumption(Number(e.target.value))}
                    placeholder="e.g. 6000" 
                    className="mt-2 w-full rounded-2xl border-2 border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-400 focus:shadow-md transition" 
                  />
                  <p className="mt-1 text-xs text-gray-500">Check your electricity bills for annual consumption</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900">💰 Monthly electricity bill (₹)</label>
                  <input 
                    type="number" 
                    min="0" 
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    placeholder="e.g. 2000" 
                    className="mt-2 w-full rounded-2xl border-2 border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-400 focus:shadow-md transition" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900">📍 House location</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai" 
                    className="mt-2 w-full rounded-2xl border-2 border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-400 focus:shadow-md transition" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900">🏠 Roof type</label>
                  <select 
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value)}
                    className="mt-2 w-full rounded-2xl border-2 border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-400 focus:shadow-md transition"
                  >
                    <option>Tile Roof</option>
                    <option>Metal Roof</option>
                    <option>Concrete Roof</option>
                    <option>Flat Roof</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>🔍</span> Calculate Estimate
                </button>
              </form>
            </div>

            <div className={`rounded-3xl border-2 border-gray-200 p-8 shadow-xl transition-all duration-500 ${showResults ? 'bg-gradient-to-br from-green-100 via-yellow-100 to-blue-100' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
              {showResults ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 text-white p-4 rounded-2xl text-center">
                    <div className="text-sm font-semibold">📊 Your Solar Estimate</div>
                    <div className="text-2xl font-bold mt-1">For {location}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-green-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>📊</span> Recommended system size</h3>
                    <p className="mt-2 text-gray-700 font-bold text-2xl">{recommendedSize} kW</p>
                    <p className="text-sm text-gray-500">Based on {annualConsumption} kWh annual consumption</p>
                    <div className="mt-2 text-xs bg-gradient-to-r from-yellow-50 to-green-50 p-2 rounded-lg">
                      <p>📐 Calculation: {annualConsumption} ÷ 12 = {(annualConsumption/12).toFixed(1)} kWh/month</p>
                      <p>📐 {(annualConsumption/12).toFixed(1)} ÷ 30 = {(dailyUsage).toFixed(2)} kWh/day</p>
                      <p>📐 {(dailyUsage).toFixed(2)} ÷ 4 = {(systemSize).toFixed(2)} kW → Recommended: {recommendedSize} kW</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-yellow-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>💵</span> Approximate installation cost</h3>
                    <p className="mt-2 text-gray-700 font-bold text-lg">₹{costRange}</p>
                    <p className="text-sm text-gray-500">₹{(recommendedSize * 35000).toLocaleString()} average</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-blue-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>🏛️</span> Estimated subsidy</h3>
                    <p className="mt-2 text-gray-700 font-bold text-lg">₹{subsidy.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">~{(subsidy / (recommendedSize * 35000) * 100).toFixed(0)}% of installation cost</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-green-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>💰</span> Expected monthly savings</h3>
                    <p className="mt-2 text-gray-700 font-bold text-lg">~{monthlySaving}%</p>
                    <p className="text-sm text-gray-500">Save up to ₹{(monthlyBill * monthlySaving / 100).toFixed(0)} per month</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-purple-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2"><span>⏱️</span> Payback period</h3>
                    <p className="mt-2 text-gray-700 font-bold text-lg">{paybackYears} years</p>
                    <p className="text-sm text-gray-500">With current consumption and subsidy</p>
                  </div>
                  
                  <Link
                    to="/contact"
                    className="block w-full bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white text-center p-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    💡 Get a personalized quote from our experts!
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-gray-700">Enter your details</h3>
                  <p className="mt-2">Fill in the form and click "Calculate Estimate" to see your personalized solar savings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">✨ What We Offer</span>
            </h2>
            <p className="text-gray-600 mt-3">
              End-to-end solar services for residential & commercial needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: annualMaintenance, title: 'Annual Maintenance', color: 'from-blue-500 to-blue-700' },
              { img: solarUpgradation, title: 'Solar Upgradation', color: 'from-green-500 to-green-700' },
              { img: panelCleaning, title: 'Solar Panel Cleaning', color: 'from-yellow-500 to-yellow-700' },
              { img: batteryMaintenance, title: 'Battery Maintenance', color: 'from-purple-500 to-purple-700' },
              { img: inverterUpgrade, title: 'Inverter Upgrade', color: 'from-orange-500 to-orange-700' },
              { img: installation, title: 'Installation', color: 'from-red-500 to-red-700' },
              { img: irrigation, title: 'Solar Irrigation Pumping', color: 'from-teal-500 to-teal-700' },
              { img: streetLight, title: 'Solar Street Lighting', color: 'from-indigo-500 to-indigo-700' },
            ].map((service, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/40 flex items-end">
                  <div className={`w-full bg-gradient-to-r ${service.color} text-white text-center py-4 text-lg font-bold`}>
                    {service.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}
      <section className="bg-gradient-to-b from-yellow-50 via-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center lg:text-left flex items-center gap-3 justify-center lg:justify-start">
            <span>⚙️</span> How We Work
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* LEFT — STEPS */}
            <div className="relative pl-12 order-2 lg:order-1">

              <div className="absolute left-4 top-2 bottom-2 w-[4px] bg-gradient-to-b from-yellow-400 via-green-500 to-blue-500 rounded-full"></div>

              {[
                { title: 'Contact Us', desc: 'Easily reach out to our support team to inquire about our range of solar products.', icon: '📞' },
                { title: 'Estimation', desc: 'Receive a comprehensive solar installation quote tailored to your needs.', icon: '📊' },
                { title: 'Execution', desc: 'Ensuring perfect implementation of your solar system.', icon: '🔧' },
                { title: 'Maintenance', desc: 'Reliable maintenance services to keep your system running smoothly.', icon: '🛠️' },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 mb-12">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white font-bold text-lg shadow-lg z-10">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2 flex items-center gap-2">
                      <span>{step.icon}</span> {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — IMAGE */}
            <div className="flex justify-center lg:justify-end items-end order-1 lg:order-2">
              <img
                src={workImg}
                alt="How We Work"
                className="h-[380px] sm:h-[440px] lg:h-[500px] w-auto object-contain bg-white rounded-3xl shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= OUR AFFILIATIONS ================= */}
      <section className="py-16 bg-gradient-to-b from-white via-yellow-50 to-green-50 border-t-4 border-gradient-to-r from-yellow-400 via-green-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">🤝 Our Affiliations</span>
            </h2>

            <p className="mt-4 text-xl font-semibold text-gray-800">
              We are <span className="text-green-600 font-extrabold">TPCODL empanelled vendor!</span>
            </p>

          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-4 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:scale-105">
              <img src={tpcodl} alt="TPCODL" className="h-20 sm:h-24 md:h-28 object-contain" />
              <span className="mt-2 text-green-600 font-semibold text-sm">✔ Empanelled</span>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-4 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:scale-105">
              <img src={googleRating} alt="Google Rating" className="h-20 sm:h-24 md:h-28 object-contain" />
              <span className="mt-2 text-yellow-500 font-bold text-lg">⭐ 4.9</span>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-4 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:scale-105">
              <img src={indiamart} alt="IndiaMART Verified" className="h-20 sm:h-24 md:h-28 object-contain" />
              <span className="mt-2 text-green-600 font-semibold text-sm">✔ Verified</span>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:scale-105">
              <img src={nsic} alt="NSIC" className="h-20 sm:h-24 md:h-28 object-contain" />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:scale-105">
              <img src={tpwodl} alt="TPWODL" className="h-20 sm:h-24 md:h-28 object-contain" />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:scale-105">
              <img src={iitLogo} alt="IIT" className="h-20 sm:h-24 md:h-28 object-contain" />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:scale-105">
              <img src={tpsodl} alt="TPSODL" className="h-20 sm:h-24 md:h-28 object-contain" />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:scale-105">
              <img src={tpnodl} alt="TPNODL" className="h-20 sm:h-24 md:h-28 object-contain" />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-4 flex items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 hover:scale-105">
              <img src={msme} alt="MSME" className="h-20 sm:h-24 md:h-28 object-contain" />
            </div>

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 bg-gradient-to-br from-yellow-500 via-green-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
              <span>🚀</span> Ready to Go Solar?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of homeowners switching to affordable solar energy.
            </p>

            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-4xl font-bold">500+</div>
                <div className="text-sm">Installations</div>
              </div>
              <div>
                <div className="text-4xl font-bold">25<span className="text-yellow-300 font-extrabold ml-1">*</span></div>
                <div className="text-sm">Years Warranty</div>
              </div>
              <div>
                <div className="text-4xl font-bold">90%</div>
                <div className="text-sm">Savings</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-2xl text-gray-900 hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <Zap className="h-14 w-14 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Get Started Today</h3>
            <p className="mb-6 text-gray-600">
              Contact us for a free consultation and custom quote.
            </p>
            <Link
              to="/contact"
              className="block bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white text-center px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              📞 Contact Us Now
            </Link>
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

          <div className="grid gap-6 lg:grid-cols-2">
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
            ].map((item) => (
              <div key={item.question} className="rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white to-green-50 p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <span className="text-yellow-500">❓</span> {item.question}
                </h3>
                <p className="mt-3 text-gray-600 pl-7">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS PREVIEW ================= */}
      <ProjectsSection limit={6} />

      {/* <AssistanceWidget /> */}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .border-gradient-to-r {
          border-image: linear-gradient(to right, #fbbf24, #22c55e, #3b82f6) 1;
        }
      `}</style>

    </div>
  );
}