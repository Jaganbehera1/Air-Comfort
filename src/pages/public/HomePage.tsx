import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ProjectsSection } from '../../components/ProjectsSection';
import { AssistanceWidget } from '../../components/public/AssistanceWidget';
import { SEO } from '../../components/SEO';
import { buildBaseSchema } from '../../lib/seo';
import { useState } from 'react';

// HERO IMAGES
import modiImg from '../../images/scm.png';
import sliderGif from '../../images/slider2.gif';
import modiImg1 from '../../images/modi.png';

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
import bgVideo from '../../images/background3.mp4';

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
      <SEO title="Rooftop Solar Installation in Odisha" description="Air Comfort Solar delivers rooftop solar installation, maintenance, and subsidy guidance for homes, offices, and industries in Odisha." keywords="solar company odisha, rooftop solar installation odisha, pm surya ghar odisha" canonical="/" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBaseSchema()) }} />

      {/* ================= HERO VIDEO SECTION ================= */}
      <section className="relative overflow-hidden min-h-[550px] md:min-h-[650px] flex items-center">

        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl mx-auto text-center space-y-6">
            <br />
            <br />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400">
                Solar Energy for Every Home
                <br />
              </h1>

              <ul className="text-lg md:text-xl text-white space-y-3">
                <li className="flex items-center justify-center gap-2">
                  <span className="text-green-400 text-2xl">✓</span>
                  {t("hero_bullet_1")}
                </li>

                <li className="flex items-center justify-center gap-2">
                  <span className="text-green-400 text-2xl">✓</span>
                  {t("hero_bullet_2")}
                </li>

                <li className="flex items-center justify-center gap-2">
                  <span className="text-green-400 text-2xl">✓</span>
                  {t("hero_bullet_3")}
                </li>
              </ul>

              <div className="flex flex-wrap justify-center gap-5 pt-5">

                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition"
                >
                  📞 {t("book_consult")}
                </Link>

                <Link
                  to="/gallery"
                  className="bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition"
                >
                  🖼️ {t("view_projects")}
                </Link>

              </div>

              <div className="mt-10 rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-slate-950/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-100 font-semibold mb-2">Welcome to Air Comfort</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Your trusted partner for solar design, subsidy guidance, and premium installation.
                    </h2>
                  </div>
                  <div className="rounded-3xl bg-gradient-to-r from-green-500 to-teal-400 px-5 py-4 text-white shadow-lg shadow-teal-500/20">
                    <p className="text-sm font-semibold">Fast decision support</p>
                    <p className="mt-1 text-base">Guaranteed expert quotes, subsidy eligibility checks, and project planning.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

{/* ================= PM SURYA GHAR SECTION ================= */}
<section className="relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-green-900">

  {/* Background Glow */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-24 -left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>

    <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

    <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

    {/* Left Column - Main Card */}
    <div className="w-full max-w-lg mx-auto lg:mx-0 rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 transition-all duration-500 hover:scale-105 hover:border-yellow-400">

      {/* Header */}
      <div className="inline-flex items-center justify-center w-full mb-6">
        <div className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 shadow-lg">

          <h2 className="text-lg font-extrabold tracking-wider text-gray-900">
            🇮🇳 PM SURYA GHAR YOJANA
          </h2>

        </div>
      </div>

      {/* GIF */}
      <div className="bg-white rounded-2xl p-4 flex justify-center">
        <img
          src={sliderGif}
          alt="PM Surya Ghar Solar Scheme"
          className="w-full max-h-[320px] object-contain drop-shadow-2xl"
        />
      </div>

      {/* Subsidy Banner */}
      <div className="mt-8 flex justify-center">

        <div className="relative overflow-hidden flex items-center rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 px-3 py-2 border-2 border-yellow-300 shadow-2xl animate-pulse">

          {/* Shine */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_2.5s_linear_infinite]" />

          {/* Modi Image */}
          <div className="relative z-10 flex-shrink-0">
            <img
              src={modiImg1}
              alt="PM Modi"
              className="w-16 h-16 rounded-full object-cover border-2 border-white bg-white shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="relative z-10 ml-4">

            <p className="text-white text-sm font-semibold uppercase tracking-wide">
              💰 Subsidy up to
            </p>

            <div className="mt-1 inline-block bg-white text-red-600 px-5 py-1 rounded-full text-2xl font-extrabold shadow-lg">
              ₹1,38,000
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center">

        <p className="text-gray-200 text-lg">
          Government Subsidy Available under
        </p>

        <h3 className="mt-2 text-2xl font-bold bg-gradient-to-r from-yellow-300 via-green-300 to-cyan-300 bg-clip-text text-transparent">
          PM Surya Ghar Muft Yojana
        </h3>

      </div>

    </div>

    {/* Right Column - SCM Partnership Card */}
    <div className="w-full max-w-lg mx-auto lg:mx-0 rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 transition-all duration-500 hover:scale-105 hover:border-cyan-400">

      {/* Header */}
      <div className="inline-flex items-center justify-center w-full mb-6">
        <div className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 shadow-lg">

          <h2 className="text-lg font-extrabold tracking-wider text-gray-900">
            🤝 PARTNERSHIP WITH SCM
          </h2>

        </div>
      </div>

      {/* Company Image */}
      <div className="bg-white rounded-2xl p-4 flex justify-center">
        <img
          src={modiImg}
          alt="S.C. Mohanty Company"
          className="w-full max-h-[320px] object-contain drop-shadow-2xl"
        />
      </div>

      {/* Company Details Banner */}
      <div className="mt-8 flex justify-center">

        <div className="relative overflow-hidden flex flex-col items-center rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 px-4 py-4 border-2 border-cyan-300 shadow-2xl w-full">

          {/* Shine */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_2.5s_linear_infinite]" />

          {/* Content */}
          <div className="relative z-10 text-center">

            <p className="text-white text-sm font-semibold uppercase tracking-wide">
              🏢 Trusted Solar Partner
            </p>

            <Link
              to="/scm"
              className="mt-2 inline-block rounded-full bg-white px-5 py-2 text-lg font-extrabold text-blue-600 shadow-lg transition hover:text-blue-900"
            >
              S.C. Mohanty Group
            </Link>

          </div>

        </div>

      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center">

        <p className="text-gray-200 text-lg">
          Certified Partner for Quality Solar Solutions
        </p>

        <h3 className="mt-2 text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
          Experience & Excellence
        </h3>

      </div>

    </div>

  </div>

{/* </section> */}

      {/* ================= RESIDENTIAL SOLAR SECTION ================= */}
      {/* <section className="relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-green-900"> */}
      {/* Background Glow */}
      <br />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-green-400/20 rounded-full blur-3xl"></div>
      </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto">

            <div className="inline-flex items-center gap-4 rounded-full border border-yellow-300 bg-white/10 backdrop-blur-xl px-8 py-4 shadow-2xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-3xl shadow-lg">🏡</div>

              <h2 className="text-3xl sm:text-4xl font-extrabold">
                {/* <span className="bg-gradient-to-r from-green-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Residential
                </span>{" "} */}
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Solar Installation
                </span>
              </h2>

            </div>

            <p className="mt-6 text-lg text-gray-200 leading-8">
              High-efficiency solar panels with professional installation,
              government subsidy support and long-term savings for your home.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <Link
                to="/contact"
                className="rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-yellow-500/50"
              >
                📅 Book a Free Consultation
              </Link>

              <Link
                to="/gallery"
                className="rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-yellow-500/50"

              >
                📁 View Our Projects
              </Link>

              <Link
              to="/contact#enquiry-form"
              className="rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-yellow-500/50"
            >
              <span>📋</span> Apply Now
            </Link>

            </div>

          </div>

          {/* Divider */}
          <div className="my-16 flex justify-center">
            <div className="h-1 w-40 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500"></div>
          </div>

          {/* Sub Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400">
              ☀️ Types of Solar Installation
            </h3>
            <p className="text-white mt-3 text-lg">
              Perfect solutions for Residential, Agricultural & Commercial applications
            </p>
          </div>

          {/* Installation Types Cards */}
          <div className="grid gap-8 md:grid-cols-3">

            {/* Domestic Installation */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-yellow-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-2xl transition duration-300 hover:-translate-y-4 hover:border-yellow-400">
              
              {/* Top Color Bar */}
              <div className="h-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500"></div>

              {/* Icon & Header */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg">
                    🏡
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white">Domestic</h4>
                    <p className="text-xs text-yellow-300 font-semibold">Residential Homes</p>
                  </div>
                </div>

                {/* Govt Subsidy Badge */}
                <div className="mb-4 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full text-sm font-bold text-gray-900 shadow-lg">
                  ✨ Govt Subsidy Available
                </div>

                {/* Description */}
                <p className="text-gray-200 leading-7 mb-6">
                  Perfect for residential homes with government financial support through PM SURYA GHAR Yojana scheme.
                </p>

                {/* Payment Process */}
                <div className="bg-white/10 border border-yellow-400/40 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-yellow-300 mb-3">💳 Payment Process:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="bg-yellow-400 text-gray-900 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">1</span>
                      <span className="text-gray-200">Apply for govt subsidy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-yellow-400 text-gray-900 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">2</span>
                      <span className="text-gray-200">Receive subsidy amount</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-yellow-400 text-gray-900 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">3</span>
                      <span className="text-gray-200">Pay remaining installation cost</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 rounded-xl hover:scale-105 transition-transform shadow-lg">
                  📋 Apply for Subsidy
                </button>
              </div>
            </div>

            {/* Agricultural Installation */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-green-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-2xl transition duration-300 hover:-translate-y-4 hover:border-green-400">
              
              {/* Top Color Bar */}
              <div className="h-3 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"></div>

              {/* Icon & Header */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-3xl shadow-lg">
                    🌾
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white">Agricultural</h4>
                    <p className="text-xs text-green-300 font-semibold">Farms & Irrigation</p>
                  </div>
                </div>

                {/* Feature Badge */}
                <div className="mb-4 inline-block bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-2 rounded-full text-sm font-bold text-gray-900 shadow-lg">
                  🚜 Farming Solutions
                </div>

                {/* Description */}
                <p className="text-gray-200 leading-7 mb-6">
                  Solar pumping systems and power solutions for farms, irrigation, and agricultural equipment with cost-effective benefits.
                </p>

                {/* Benefits */}
                <div className="bg-white/10 border border-green-400/40 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-green-300 mb-3">✅ Key Benefits:</p>
                  <div className="space-y-2 text-sm text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>💰</span>
                      <span>Reduces operational costs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⚡</span>
                      <span>24/7 power availability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🌱</span>
                      <span>Eco-friendly farming</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 font-bold py-3 rounded-xl hover:scale-105 transition-transform shadow-lg">
                  🌾 Get Quote
                </button>
              </div>
            </div>

            {/* Commercial Installation */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-blue-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-2xl transition duration-300 hover:-translate-y-4 hover:border-blue-400">
              
              {/* Top Color Bar */}
              <div className="h-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500"></div>

              {/* Icon & Header */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-3xl shadow-lg">
                    🏢
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-white">Commercial</h4>
                    <p className="text-xs text-blue-300 font-semibold">Businesses & Industries</p>
                  </div>
                </div>

                {/* Feature Badge */}
                <div className="mb-4 inline-block bg-gradient-to-r from-blue-400 to-cyan-500 px-4 py-2 rounded-full text-sm font-bold text-gray-900 shadow-lg">
                  📊 Large-Scale Solutions
                </div>

                {/* Description */}
                <p className="text-gray-200 leading-7 mb-6">
                  Scalable solar systems for businesses, factories, and commercial spaces with maximum ROI and energy independence.
                </p>

                {/* Benefits */}
                <div className="bg-white/10 border border-blue-400/40 rounded-2xl p-4 mb-6">
                  <p className="text-xs font-bold text-blue-300 mb-3">✅ Key Advantages:</p>
                  <div className="space-y-2 text-sm text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>💵</span>
                      <span>Reduce electricity bills 50-80%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📈</span>
                      <span>Quick ROI & Tax benefits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🌍</span>
                      <span>Corporate sustainability</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-gray-900 font-bold py-3 rounded-xl hover:scale-105 transition-transform shadow-lg">
                  💼 Enquire Now
                </button>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="my-16 flex justify-center">
            <div className="h-1 w-40 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500"></div>
          </div>
          {/* Sub Heading */}
          <div className="text-center mb-10">

            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400">
              🏠 Types of Rooftop Solar Systems
            </h3>

            <p className="text-white mt-3">
              Choose the perfect rooftop solar solution according to your needs.
            </p>

          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-3">

            {[
              {
                name: "On-Grid System",
                img: onGridRooftopImg,
                color: "from-blue-500 to-cyan-400",
                desc:
                  "Connected directly to the electricity grid. No batteries required. Ideal for homes with reliable power supply.",
                best: "💡 Best for Urban Areas",
              },
              {
                name: "Off-Grid System",
                img: offGridRooftopImg,
                color: "from-green-500 to-emerald-400",
                desc:
                  "Works independently using battery storage. Perfect for villages and remote locations without grid access.",
                best: "🔋 Best for Remote Areas",
              },
              {
                name: "Hybrid System",
                img: hybridRooftopImg,
                color: "from-purple-500 to-pink-400",
                desc:
                  "Combines grid connection with battery backup. Ideal where frequent power cuts occur.",
                best: "⚡ Best for Backup Power",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="group overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:shadow-2xl transition duration-300 hover:-translate-y-4 hover:scale-105"
              >

                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>

                <img
                  src={item.img}
                  alt={item.name}
                  className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="p-6">

                  <h4 className="text-2xl font-bold text-white">
                    {item.name}
                  </h4>

                  <p className="mt-4 text-gray-200 leading-7">
                    {item.desc}
                  </p>

                  <div className={`mt-6 rounded-full bg-gradient-to-r ${item.color} py-3 text-center font-bold text-white shadow-lg`}>
                    {item.best}
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= LEARNING SECTION CTA ================= */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl border-2 border-green-200 bg-gradient-to-br from-white to-green-50 p-12 shadow-lg hover:shadow-2xl transition-all duration-300">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">📚 Want to Learn More About Solar?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Explore our comprehensive learning center for detailed information about solar systems, components, comparisons, and more.
            </p>
            <Link
              to="/learning"
              className="inline-block bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              🎓 Visit Learning Center
            </Link>
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