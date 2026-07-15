import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/public/Navbar';
import { Footer } from '../components/public/Footer';
import { PartnersCarousel } from '../components/public/PartnersCarousel';
import { useLanguage } from '../contexts/LanguageContext';

export function PublicLayout() {
  const { lang, setLang, t } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'od' : 'en');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleLanguage={toggleLanguage} currentLang={lang} t={t} />
      <main className="flex-1">
        <Outlet />
      </main>
      <PartnersCarousel />
      <Footer />
    </div>
  );
}