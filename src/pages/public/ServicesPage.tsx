import {
  Home,
  Building2,
  Wrench,
  LineChart,
  Battery,
  Sun,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
} from 'lucide-react';

import bgVideo from '../../images/background3.mp4';

// Service images
import annualMaintenance from '../../images/services/AMS_ihsufv.jpg';
import solarUpgradation from '../../images/services/Solar-Upgradation_zqb2mk.jpg';
import panelCleaning from '../../images/services/Solar-Panel-Cleaning_psz0u9.jpg';
import batteryMaintenance from '../../images/services/Battery-Maintenance_o9537u.jpg';
import inverterUpgrade from '../../images/services/Inverter-Upgrade_yoycho.jpg';
import installation from '../../images/services/Installation-solar_yly1qv.jpg';
import irrigation from '../../images/services/Solar-Irrigation-Pumping_zxg3pu.jpg';
import streetLight from '../../images/services/led-street-light-_m6bnnu.png';

// Service icons mapping for colors
const serviceIcons = {
  'Annual Maintenance': { icon: <Wrench className="w-6 h-6" />, color: 'from-blue-500 to-blue-700' },
  'Solar Upgradation': { icon: <Zap className="w-6 h-6" />, color: 'from-green-500 to-green-700' },
  'Solar Panel Cleaning': { icon: <Sparkles className="w-6 h-6" />, color: 'from-yellow-500 to-yellow-700' },
  'Battery Maintenance': { icon: <Battery className="w-6 h-6" />, color: 'from-purple-500 to-purple-700' },
  'Inverter Upgrade': { icon: <Sun className="w-6 h-6" />, color: 'from-orange-500 to-orange-700' },
  'Installation': { icon: <Home className="w-6 h-6" />, color: 'from-red-500 to-red-700' },
  'Solar Irrigation Pumping': { icon: <Zap className="w-6 h-6" />, color: 'from-teal-500 to-teal-700' },
  'Solar Street Lighting': { icon: <Sparkles className="w-6 h-6" />, color: 'from-indigo-500 to-indigo-700' },
};

export function ServicesPage() {
  return (
    <div className="bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[420px] flex items-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-green-900/50 to-blue-900/60" />
        
        {/* Animated floating elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <div className="animate-fadeInDown">
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-white/30">
              ☀️ Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-300 via-green-300 to-blue-300 bg-clip-text text-transparent">Solar</span> Services
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              Comprehensive solar solutions from consultation to installation and long-term maintenance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" /> Expert Team
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" /> Quality Guarantee
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-300" /> 24/7 Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMAGE SERVICES GRID ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
              ✨ Our Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">What We</span> Offer
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              End-to-end solar services for residential & commercial needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: annualMaintenance, title: 'Annual Maintenance' },
              { img: solarUpgradation, title: 'Solar Upgradation' },
              { img: panelCleaning, title: 'Solar Panel Cleaning' },
              { img: batteryMaintenance, title: 'Battery Maintenance' },
              { img: inverterUpgrade, title: 'Inverter Upgrade' },
              { img: installation, title: 'Installation' },
              { img: irrigation, title: 'Solar Irrigation Pumping' },
              { img: streetLight, title: 'Solar Street Lighting' },
            ].map((service, index) => {
              const iconData = serviceIcons[service.title as keyof typeof serviceIcons];
              return (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                    {iconData && (
                      <div className={`bg-gradient-to-r ${iconData.color} p-3 rounded-full text-white mb-2 transform group-hover:scale-110 transition-transform duration-300`}>
                        {iconData.icon}
                      </div>
                    )}
                    <div className="w-full bg-gradient-to-r from-blue-900/90 to-blue-700/90 backdrop-blur-sm text-white text-center py-3 px-4 rounded-xl text-sm md:text-lg font-bold border border-white/20">
                      {service.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= DETAILED SERVICES ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-yellow-50 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-green-700 text-sm font-semibold mb-4">
              🚀 Our Expertise
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Detailed</span> Services
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Comprehensive solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Home className="h-8 w-8" />,
                title: 'Residential Solar',
                color: 'blue',
                gradient: 'from-blue-500 to-blue-700',
                light: 'from-blue-50 to-blue-100',
                items: [
                  'Free home energy assessment',
                  'Custom system design',
                  'Professional installation',
                  '25-year warranty',
                ],
                badge: 'Most Popular'
              },
              {
                icon: <Building2 className="h-8 w-8" />,
                title: 'Commercial Solar',
                color: 'green',
                gradient: 'from-green-500 to-green-700',
                light: 'from-green-50 to-green-100',
                items: [
                  'ROI analysis',
                  'Scalable design',
                  'Minimal disruption',
                  'Maintenance support',
                ],
                badge: 'Best Value'
              },
              {
                icon: <Sun className="h-8 w-8" />,
                title: 'System Design',
                color: 'yellow',
                gradient: 'from-yellow-500 to-yellow-700',
                light: 'from-yellow-50 to-yellow-100',
                items: [
                  'Site assessment',
                  'Energy analysis',
                  '3D visualization',
                  'Production guarantee',
                ],
                badge: 'Expert Design'
              },
              {
                icon: <Wrench className="h-8 w-8" />,
                title: 'Maintenance & Support',
                color: 'red',
                gradient: 'from-red-500 to-red-700',
                light: 'from-red-50 to-red-100',
                items: [
                  'Annual inspection',
                  'Panel cleaning',
                  'Monitoring',
                  '24/7 support',
                ],
                badge: 'Reliable'
              },
              {
                icon: <Battery className="h-8 w-8" />,
                title: 'Battery Storage',
                color: 'purple',
                gradient: 'from-purple-500 to-purple-700',
                light: 'from-purple-50 to-purple-100',
                items: [
                  'Latest batteries',
                  'Backup power',
                  'Smart management',
                  '10-year warranty',
                ],
                badge: 'Eco-Friendly'
              },
              {
                icon: <LineChart className="h-8 w-8" />,
                title: 'Energy Monitoring',
                color: 'teal',
                gradient: 'from-teal-500 to-teal-700',
                light: 'from-teal-50 to-teal-100',
                items: [
                  'Real-time tracking',
                  'Alerts',
                  'Usage analytics',
                  'Performance reports',
                ],
                badge: 'Smart Tech'
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className={`group bg-gradient-to-br ${service.light} rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] border-2 border-transparent hover:border-opacity-50 relative overflow-hidden`}
                style={{ borderColor: `var(--${service.color}-200)` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Badge */}
                <div className={`absolute top-4 right-4 bg-gradient-to-r ${service.gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse`}>
                  {service.badge}
                </div>
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{service.icon}</div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                
                <ul className="space-y-2.5">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className={`w-5 h-5 text-${service.color}-500 flex-shrink-0 mt-0.5`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
                  <span className={`text-${service.color}-600 group-hover:translate-x-1 transition-transform duration-300`}>
                    Learn More
                  </span>
                  <ArrowRight className={`w-4 h-4 text-${service.color}-500 group-hover:translate-x-2 transition-transform duration-300`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 animate-pulse delay-700" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-white/30">
              ⭐ Why Green Leaf Energy
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-yellow-300">Us</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              We make going solar simple, affordable, and hassle-free
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Users className="w-6 h-6" />, number: '5000+', label: 'Happy Customers' },
              { icon: <Shield className="w-6 h-6" />, number: '25*', label: 'Years Warranty' },
              { icon: <Zap className="w-6 h-6" />, number: '90%', label: 'Energy Savings' },
              { icon: <Clock className="w-6 h-6" />, number: '24/7', label: 'Support Available' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>

    </div>
  );
}