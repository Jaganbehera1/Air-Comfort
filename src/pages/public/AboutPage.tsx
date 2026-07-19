import { Users, Award, Target, Heart, Leaf, Sun, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import kaashvi2 from '../../images/logo_air_comfort.jpg';
import bgVideo from '../../images/background2.mp4';

export function AboutPage() {
  return (
    <div className="bg-white">

      {/* ================= HERO SECTION WITH VIDEO ================= */}
      <section className="relative overflow-hidden w-full min-h-[350px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[600px]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          aria-hidden="true"
        />
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/70 via-brand-blue/50 to-brand-cyan/60" />
        
        {/* Animated floating elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fadeInDown">
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4 border border-white/30">
                🌱 About Us
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                Air <br />
                <span className="bg-gradient-to-r from-brand-orange via-brand-cyan to-brand-blue bg-clip-text text-transparent">Comfort</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Powering a Sustainable Future, One Home at a Time
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300" /> Trusted since 2010
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300" /> 5000+ Installations
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-300" /> 25 Years Warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPANY INTRODUCTION ================= */}
      <section className="bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-orange text-white py-8 md:py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Leaf className="w-6 h-6 text-yellow-300 animate-pulse" />
              <span className="text-sm font-semibold text-yellow-200 uppercase tracking-wider">About Air Comfort</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base leading-relaxed">ପିପିଲି, ପୁରୀ ଓ ଓଡିଶାର ବିଶ୍ୱସନୀୟ ସୋଲାର ପ୍ରଦାନକାରୀ</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base leading-relaxed">ଘର ଓ ବ୍ୟବସାୟ ପାଇଁ ଶୁଭ ସୋଲାର ସମାଧାନ</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base leading-relaxed">ବିଦ୍ୟୁତ୍ ବିଲ୍ କମେଇବାରେ ସହାୟକ</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base leading-relaxed">ପ୍ରବୀଣ ସ୍ଥାପନା ଓ ସହାୟତା • ପରିବେଶ-ମେଳା ଦୀର୍ଘ ସେବା</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-green-700 text-sm font-semibold mb-4">
                📖 Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Powering <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Tomorrow</span> Today
              </h2>
              <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                <p className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-all duration-300">
                  Founded with a vision to transform how homes consume energy, <span className="font-semibold text-green-700">Air Comfort</span> has been at the forefront of the renewable energy revolution for over a decade.
                </p>
                <p className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-yellow-500 hover:shadow-md transition-all duration-300">
                  We started with a simple belief: <span className="font-semibold text-yellow-700">every home deserves access to clean, affordable, and reliable solar energy.</span> Today, we've helped thousands of families reduce their carbon footprint while significantly lowering their energy costs.
                </p>
                <p className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all duration-300">
                  Our team of certified professionals brings <span className="font-semibold text-blue-700">expertise, passion, and dedication</span> to every project. From initial consultation to final installation and beyond, we're committed to delivering excellence at every step.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-50 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-green-700">10+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-blue-700">5000+ Installations</span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-50 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-yellow-700">4.9★ Rating</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative h-80 sm:h-96 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center border-4 border-white">
                  <img
                    src={kaashvi2}
                    alt="Air Comfort Logo"
                    className="max-w-full max-h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                  Trusted
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce delay-700">
                  Eco-Friendly
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
              💎 Core Values
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Drives</span> Us
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                icon: Target, 
                title: 'Excellence', 
                desc: 'We strive for perfection in every installation, ensuring the highest quality standards.',
                color: 'blue',
                gradient: 'from-blue-500 to-blue-700'
              },
              { 
                icon: Heart, 
                title: 'Sustainability', 
                desc: 'Committed to protecting our planet through renewable energy solutions.',
                color: 'green',
                gradient: 'from-green-500 to-green-700'
              },
              { 
                icon: Users, 
                title: 'Customer First', 
                desc: 'Your satisfaction is our priority. We\'re here to support you every step of the way.',
                color: 'yellow',
                gradient: 'from-yellow-500 to-yellow-700'
              },
              { 
                icon: Award, 
                title: 'Integrity', 
                desc: 'Transparent pricing, honest advice, and reliable service you can trust.',
                color: 'red',
                gradient: 'from-red-500 to-red-700'
              },
            ].map((value, index) => (
              <div 
                key={value.title} 
                className="group bg-white p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border-2 border-transparent hover:border-opacity-50 relative overflow-hidden"
                style={{ 
                  borderColor: `var(--${value.color}-200)`,
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{value.desc}</p>
                <div className={`mt-4 w-12 h-1 bg-gradient-to-r ${value.gradient} rounded-full group-hover:w-20 transition-all duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 animate-pulse delay-700" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '10+', label: 'Years Experience', icon: <Target className="w-6 h-6 text-yellow-300" /> },
              { number: '5000+', label: 'Installations', icon: <Zap className="w-6 h-6 text-yellow-300" /> },
              { number: '25', label: 'Years Warranty', icon: <Shield className="w-6 h-6 text-yellow-300" /> },
              { number: '4.9★', label: 'Customer Rating', icon: <Users className="w-6 h-6 text-yellow-300" /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
                <div className="text-sm md:text-base text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-200/30 rounded-full blur-2xl" />
            <div className="relative bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-orange rounded-3xl p-8 sm:p-16 text-white text-center overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-500">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48 animate-pulse delay-700" />
              <div className="relative z-10">
                <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-white/30">
                  🎯 Our Mission
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  Empowering <span className="text-yellow-300">Every</span> Household
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
                  To empower every household with sustainable, affordable solar energy solutions,
                  creating a cleaner, brighter future for generations to come.
                </p>
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <Sun className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm">Clean Energy</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <Leaf className="w-4 h-4 text-green-300" />
                    <span className="text-sm">Sustainable</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm">Affordable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
              ⭐ Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Air Comfort</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              We make going solar simple, affordable, and hassle-free
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Sun className="w-8 h-8 text-yellow-500" />,
                title: 'Expert Installation',
                desc: 'Certified professionals with years of experience in solar installation.',
                bg: 'from-yellow-50 to-yellow-100',
                border: 'border-yellow-200'
              },
              {
                icon: <Shield className="w-8 h-8 text-green-500" />,
                title: 'Quality Assurance',
                desc: 'Top-tier equipment with comprehensive warranty coverage.',
                bg: 'from-green-50 to-green-100',
                border: 'border-green-200'
              },
              {
                icon: <Zap className="w-8 h-8 text-blue-500" />,
                title: 'Energy Savings',
                desc: 'Significant reduction in electricity bills from day one.',
                bg: 'from-blue-50 to-blue-100',
                border: 'border-blue-200'
              },
            ].map((item) => (
              <div 
                key={item.title}
                className={`bg-gradient-to-br ${item.bg} p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${item.border}`}
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-green-600 font-semibold text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
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