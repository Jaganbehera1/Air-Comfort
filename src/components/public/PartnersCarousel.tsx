import exide from '../../images/exide-solar.jpg';
import luminous from '../../images/luminous_solar.png';
import vikram from '../../images/vikarm_solar.webp';
import usha from '../../images/usha_sriram.png';
import waaree from '../../images/waaree.jpg';
import jakson from '../../images/jakson.avif';
import adani from '../../images/adani.png';
import lg from '../../images/LG.png';
import rec from '../../images/rec-solar-logo.webp';
import moserbaer from '../../images/Moser_Baer_Solar_Limited_logo.jpg';
import fronius from '../../images/Fronius-logo.png';
import solaredge from '../../images/SolarEdge.webp';
import sma from '../../images/sma.svg';
import delta from '../../images/DELTA_Electronics_Logo.png';
import tata from '../../images/TPS-Logo-Print.jpg';
import abb from '../../images/ABB_logo.svg.png';
import sungrow from '../../images/sungrow.png';
import consul from '../../images/consul.jpeg';
import havells from '../../images/Havells_Logo.svg.png';

export function PartnersCarousel() {
  const logos = [
    { src: exide, name: 'Exide Solar' },
    { src: luminous, name: 'Luminous Solar' },
    { src: vikram, name: 'Vikram Solar' },
    { src: usha, name: 'Usha Shriram' },
    { src: waaree, name: 'Waaree' },
    { src: jakson, name: 'Jakson' },
    { src: adani, name: 'Adani Solar' },
    { src: lg, name: 'LG Solar' },
    { src: rec, name: 'REC Solar' },
    { src: moserbaer, name: 'Moserbaer Solar' },
    { src: fronius, name: 'Fronius' },
    { src: solaredge, name: 'SolarEdge' },
    { src: sma, name: 'SMA' },
    { src: delta, name: 'Delta Electronics' },
    { src: tata, name: 'Tata Power Solar' },
    { src: abb, name: 'ABB' },
    { src: sungrow, name: 'Sungrow' },
    { src: consul, name: 'Consul Neowatt' },
    { src: havells, name: 'Havells' },
  ];

  const repeatedLogos = [...logos, ...logos]; // ✅ correct duplication

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trusted Solar Brands
          </h3>
          <p className="text-gray-600 mt-2">
            We work with India’s leading solar manufacturers
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-scroll w-max">
            {repeatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[220px] px-6 py-6"
              >
                <div className="h-28 flex items-center justify-center bg-white rounded-xl shadow-md hover:shadow-lg transition">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            animation: scroll 25s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

      </div>
    </section>
  );
}
