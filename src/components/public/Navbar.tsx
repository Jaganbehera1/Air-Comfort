import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import KSELogo from '../../images/logo_air_comfort.jpg';
import { useLanguage } from '../../contexts/LanguageContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useLanguage();

  const links = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/services', label: t('nav_services') },
    { to: '/gallery', label: t('nav_projects') },
    { to: '/quotation', label: t('nav_quotation') || 'Quotation' },
    { to: '/contact', label: t('nav_contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLang(lang === 'od' ? 'en' : 'od');
  };

  return (
    <nav className="bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-orange shadow-lg fixed top-0 left-0 w-full z-50 border-b-4 border-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo / Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src={KSELogo} 
                  alt="Air Comfort" 
                  className="h-10 w-10 md:h-12 md:w-12 object-cover rounded-full border-2 border-brand-red shadow-lg group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-orange rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-sm md:text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
                  <span className="text-white">Air</span>
                  <span className="text-brand-sand"> Comfort</span>
                </span>
                <p className="text-[8px] md:text-[10px] text-brand-ice leading-none hidden sm:block">
                  {t('nav_powering_tomorrow') || 'Powering Tomorrow'}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${
                  isActive(link.to)
                    ? 'text-brand-sand border-b-2 border-brand-sand'
                    : 'text-white hover:text-brand-sand hover:border-b-2 hover:border-brand-sand/50'
                } transition-all duration-300 font-medium pb-1 text-sm lg:text-base`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language Toggle Button */}
            {/* <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 ml-2"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {lang === 'od' ? t('language_short_en') || 'EN' : t('language_short_od') || 'OD'}
              </span>
            </button> */}
          </div>

          {/* Mobile language toggle + Menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-all duration-300"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              {/* <span>{lang === 'od' ? t('language_short_en') || 'EN' : t('language_short_od') || 'OD'}</span> */}
            </button>
            
            {/* Hamburger menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-brand-blue to-brand-navy border-t-2 border-brand-orange/50 shadow-lg animate-slideDown">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`${
                  isActive(link.to)
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white font-bold'
                    : 'text-white hover:bg-brand-blue/70 hover:text-brand-sand'
                } block px-4 py-3 rounded-lg font-medium transition-all duration-300`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Language Toggle (Full width) */}
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 mt-3 px-4 py-3 rounded-lg bg-gradient-to-r from-brand-orange via-brand-blue to-brand-cyan text-white font-bold hover:shadow-xl transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span>
                {lang === 'od' 
                  ? t('language_en') || 'Switch to English' 
                  : t('language_od') || 'ଓଡ଼ିଆକୁ ବଦଳାନ୍ତୁ'}
              </span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}