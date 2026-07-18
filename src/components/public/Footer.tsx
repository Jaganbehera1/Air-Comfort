import { useEffect, useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, ContactInfo } from '../../lib/firebase';

export function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

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

  return (
    <>
      <footer className="bg-gray-900 text-white py-12 pb-28 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Green Leaf Energy</h3>
              <p className="text-gray-400">
                Leading provider of solar panel solutions for homes and businesses.
                Powering a sustainable future.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-green-400 transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="/services" className="hover:text-green-400 transition-colors">Services</a></li>
                <li><a href="/gallery" className="hover:text-green-400 transition-colors">Projects</a></li>
                <li><a href="/contact" className="hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{contactInfo?.phone_number || 'Loading...'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{contactInfo?.email || 'Loading...'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{contactInfo?.whatsapp_number || 'Loading...'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section - Visible on all screens */}
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 space-y-2">
            <p>
              &copy; {new Date().getFullYear()} Green Leaf Energy. All rights reserved.
            </p>

            {/* Show on all screens - both mobile and desktop */}
            <div className="block">
              <p className="text-sm">
                Developed by{' '}
                <a
                  href="https://jaganwebsolutions.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                >
                  Jagan Web Solutions
                </a>
              </p>
              <p className="text-sm">
                Powered by{' '}
                <a
                  href="https://jaganwebsolutions.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                >
                  Mahavir Info Care
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Action Bar - Visible only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-3 px-4 z-40 md:hidden">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          <button
            onClick={handleCall}
            className="flex flex-col items-center space-y-1 text-blue-600 hover:text-blue-700 transition-transform active:scale-95"
          >
            <div className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors">
              <Phone className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium">Call</span>
          </button>

          <button
            onClick={handleEmail}
            className="flex flex-col items-center space-y-1 text-red-600 hover:text-red-700 transition-transform active:scale-95"
          >
            <div className="bg-red-100 p-3 rounded-full hover:bg-red-200 transition-colors">
              <Mail className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium">Email</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center space-y-1 text-green-600 hover:text-green-700 transition-transform active:scale-95"
          >
            <div className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-colors">
              <MessageCircle className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Desktop Floating Action Buttons - Visible only on desktop */}
      <div className="hidden md:flex fixed bottom-8 right-8 flex-col space-y-3 z-40">
        <button
          onClick={handleCall}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Call us"
        >
          <Phone className="h-6 w-6" />
        </button>
        <button
          onClick={handleEmail}
          className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Email us"
        >
          <Mail className="h-6 w-6" />
        </button>
        <button
          onClick={handleWhatsApp}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="WhatsApp us"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}