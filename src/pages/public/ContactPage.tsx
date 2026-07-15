import { useEffect, useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle,
  ArrowRight,
  User,
  Calendar,
  Shield,
  Zap,
  Sun,
  Leaf,
  CloudSun
} from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, ContactInfo } from '../../lib/firebase';
import { ChevronDown } from 'lucide-react';

export function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'contact_info', 'default'));
      if (docSnap.exists()) {
        setContactInfo(docSnap.data() as ContactInfo);
      }
    } catch (error) {
      console.error('Error loading contact info:', error);
    }
  };

  const handleCall = () => {
    if (contactInfo?.phone_number) {
      window.location.href = `tel:${contactInfo.phone_number}`;
    }
  };

  const handleEmail = () => {
    if (contactInfo?.email) {
      window.location.href = `mailto:${contactInfo.email}?subject=Solar Panel Installation Enquiry`;
    }
  };

  const handleWhatsApp = () => {
    if (contactInfo?.whatsapp_number) {
      const message = encodeURIComponent(
        'Hello, I am interested in solar panel installation for my home. Please contact me.'
      );
      const whatsappUrl = `https://wa.me/${contactInfo.whatsapp_number.replace(/[^0-9]/g, '')}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  // Split email into parts for better display
  const formatEmail = (email: string) => {
    if (!email) return 'Loading...';
    const parts = email.split('@');
    if (parts.length === 2) {
      return { localPart: parts[0], domain: `@${parts[1]}` };
    }
    return { localPart: email, domain: '' };
  };

  const emailParts = contactInfo?.email ? formatEmail(contactInfo.email) : null;

  return (
    <div className="bg-white min-h-screen pb-24">

      {/* ================= HERO SECTION - ATTRACTIVE & COLORFUL ================= */}
      <section className="relative overflow-hidden w-full min-h-[420px] md:min-h-[520px] flex items-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-green-500 animate-gradient-xy" />
        
        {/* Additional gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
        
        {/* Animated floating shapes */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300/30 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-300/30 rounded-full blur-2xl animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Decorative floating elements */}
        <div className="absolute top-20 right-20 text-4xl animate-float-slow opacity-30">
          <Sun className="w-12 h-12 text-yellow-200" />
        </div>
        <div className="absolute bottom-20 left-20 text-4xl animate-float-delay opacity-30">
          <CloudSun className="w-10 h-10 text-blue-200" />
        </div>
        <div className="absolute top-1/3 left-1/4 text-4xl animate-float-slow opacity-20">
          <Leaf className="w-8 h-8 text-green-200" />
        </div>
        
        {/* Animated gradient circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse-delay" />
        
        {/* Animated border rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-white/10 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-white/5 rounded-full animate-spin-slow-reverse" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center animate-fadeInDown">
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-6 border border-white/30 text-white shadow-lg hover:bg-white/30 transition-all duration-300">
              <span className="flex items-center gap-2">
                <span className="text-yellow-300 text-lg">📞</span> Get in Touch
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              <span className="drop-shadow-2xl">Contact</span>
              <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl"> Us</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium">
              Ready to make the switch to solar? Connect with our team for a
              free consultation and custom quote.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <div className="group px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">Free Consultation</span>
              </div>
              
              <div className="group px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">25-Year Warranty</span>
              </div>
              
              <div className="group px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">Expert Team</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white via-gray-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
              📱 Connect With Us
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">Choose</span> Your Channel
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Reach out to us through your preferred method
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {/* Call Card */}
            <div 
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border-2 border-blue-200 hover:border-blue-400 cursor-pointer"
              onMouseEnter={() => setIsHovered('call')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={handleCall}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-3">Speak directly with our solar experts</p>
                <p className="text-xl font-bold text-blue-600 break-all">
                  {contactInfo?.phone_number || 'Loading...'}
                </p>
                <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold">
                  <span>Call Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div 
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 via-white to-red-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border-2 border-red-200 hover:border-red-400 cursor-pointer"
              onMouseEnter={() => setIsHovered('email')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={handleEmail}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-3">Send us your inquiries and we'll respond promptly</p>
                <div className="text-xl font-bold text-red-600">
                  {emailParts ? (
                    <div className="break-all">
                      <span className="block">{emailParts.localPart}</span>
                      <span className="block text-red-500">{emailParts.domain}</span>
                    </div>
                  ) : (
                    'Loading...'
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2 text-red-600 font-semibold">
                  <span>Send Email</span>
                  <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div 
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-green-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border-2 border-green-200 hover:border-green-400 cursor-pointer"
              onMouseEnter={() => setIsHovered('whatsapp')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={handleWhatsApp}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-3">Chat with us instantly on WhatsApp</p>
                <p className="text-xl font-bold text-green-600 break-all">
                  {contactInfo?.whatsapp_number || 'Loading...'}
                </p>
                <div className="mt-4 flex items-center gap-2 text-green-600 font-semibold">
                  <span>Chat Now</span>
                  <MessageCircle className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= CONTACT INFO & WHY CHOOSE US ================= */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 md:p-10 rounded-3xl shadow-xl border-2 border-gray-200 hover:border-yellow-300 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-green-500 rounded-full" />
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Information</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-md transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Our Location</h4>
                    <p className="text-gray-800 font-medium mt-1">
                      Sahajpur, Pipili<br />
                      Puri, Odisha <br />
                      India,<br />
                      GSTIN - 21BIYPP3700K1Z0
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 hover:shadow-md transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Business Hours</h4>
                    <p className="text-gray-800 font-medium mt-1">
                      Monday - Saturday: 8:00 AM - 8:00 PM<br />
                      Sunday: 8:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100/50 hover:shadow-md transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Consultation</h4>
                    <p className="text-gray-800 font-medium mt-1">
                      Free site assessment available<br />
                      Book your appointment today
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 p-8 md:p-10 text-white shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full -mr-32 -mt-32 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 animate-pulse delay-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                  <h3 className="text-2xl md:text-3xl font-bold">Why Choose Us?</h3>
                </div>

                <ul className="space-y-4">
                  {[
                    { icon: <CheckCircle className="h-5 w-5" />, title: 'Free Consultation', desc: 'No-obligation assessment of your solar potential' },
                    { icon: <CheckCircle className="h-5 w-5" />, title: 'Custom Solutions', desc: 'Tailored systems designed for your specific needs' },
                    { icon: <CheckCircle className="h-5 w-5" />, title: 'Expert Installation', desc: 'Certified professionals with years of experience' },
                    { icon: <CheckCircle className="h-5 w-5" />, title: 'Lifetime Support', desc: 'Ongoing maintenance and 24/7 customer service' },
                  ].map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <span className="text-yellow-300 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                        <p className="text-blue-100 text-sm">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
            🚀 Get Started
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">Start Your</span> Solar Journey Today
          </h2>
          <p className="text-base md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us using any method above. Our friendly team is ready to help you
            transition to clean, affordable solar energy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleCall}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Call Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={handleWhatsApp}
              className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>WhatsApp Us</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={handleEmail}
              className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Email Us</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
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
        @keyframes pulse-delay {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .animate-pulse-delay {
          animation: pulse-delay 4s ease-in-out infinite;
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-gradient-xy {
          animation: gradient-xy 10s ease infinite;
          background-size: 200% 200%;
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
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