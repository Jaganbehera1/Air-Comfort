import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Sparkles, Hammer, Zap, Cog, AirVent, ClipboardCheck, ShieldCheck, ChevronRight } from 'lucide-react';
import scmImg from '../../images/scm.png';
import workBuildingImg from '../../images/work/work1.jpeg';
import powerSolutionImg from '../../images/services/Power-Solution_efs26w.jpg';
import workMechanicalImg from '../../images/work/work2.jpeg';
import workHVACImg from '../../images/work/work3.jpeg';
import turnkeyProjectImg from '../../images/work/work5.jpeg';
import installation from '../../images/adani.png';
import batteryMaintenance from '../../images/consul.jpeg';
import inverterUpgrade from '../../images/CRI.png';

const services = [
  {
    title: 'Civil Works',
    description: 'Foundation, structural support, and turnkey civil installations for solar and industrial projects.',
    icon: Hammer,
    image: workBuildingImg,
  },
  {
    title: 'Electrical Works',
    description: 'Power distribution, wiring, panel upgrades, and safety design for reliable operation.',
    icon: Zap,
    image: powerSolutionImg,
  },
  {
    title: 'Mechanical Works',
    description: 'Equipment mounting, piping, mechanical assembly, and robust project execution.',
    icon: Cog,
    image: workMechanicalImg,
  },
  {
    title: 'HVAC & Ventilation',
    description: 'Climate control, ducting, and ventilation systems designed for optimal comfort and safety.',
    icon: AirVent,
    image: workHVACImg,
  },
  {
    title: 'Turnkey Projects',
    description: 'End-to-end delivery from planning to commissioning for residential and commercial clients.',
    icon: ClipboardCheck,
    image: turnkeyProjectImg,
  },
];

const partners = [
  { title: 'Roofing Specialists', label: 'Civil Safety', color: 'bg-red-600' },
  { title: 'Power Engineers', label: 'Electrical Design', color: 'bg-white text-red-700 border border-red-200' },
  { title: 'Mechanical Experts', label: 'Assembly Teams', color: 'bg-red-600' },
  { title: 'HVAC Leaders', label: 'Climate Systems', color: 'bg-white text-red-700 border border-red-200' },
];

export function SCMPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-red-700 text-white pt-20 pb-24">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-red-900 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 inline-flex items-center gap-3 text-sm text-white/80">
            <Link to="/" className="inline-flex items-center gap-2 hover:text-white transition">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-red-200/80 mb-4">S.C. Mohanty Group</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Civil, Electrical, Mechanical, HVAC &amp; Turnkey Projects
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-red-100/90">
                SCM delivers professional engineering and construction across complex industrial projects. Our expert teams combine deep technical skill with strong execution, safety, and visual quality.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {partners.map((item) => (
                  <div key={item.title} className={`rounded-3xl p-5 shadow-xl ${item.color} ${item.color.includes('border') ? '' : 'text-white'}`}>
                    <p className="text-sm uppercase tracking-[0.3em] font-semibold">{item.title}</p>
                    <p className="mt-3 font-bold text-xl">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_45%)]" />
              <img src={scmImg} alt="S.C. Mohanty Group" className="relative w-full rounded-3xl object-cover shadow-2xl mix-blend-screen" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-red-600 font-semibold">What SCM delivers</p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">Professional engineering with powerful delivery</h2>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-red-200 bg-white px-5 py-3 shadow-sm">
              <Sparkles className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-slate-700">Red & White premium branding</span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="overflow-hidden rounded-[32px] border border-red-100 bg-white shadow-lg transition hover:-translate-y-1">
                  <img src={service.image} alt={service.title} className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-sm mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_0.95fr] items-center">
            <div className="rounded-[32px] border border-red-100 bg-red-50 p-10 shadow-lg">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm mb-6">
                <ShieldCheck className="h-4 w-4" /> Trusted by industry clients
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Design, build, and deliver turnkey projects with confidence.</h2>
              <p className="mt-5 text-slate-600 leading-7">
                SCM combines civil engineering, electrical systems, mechanical assembly, HVAC design, and project management in one cohesive team. Our focus is on safety, quality, and delivering milestones on time.
              </p>
              <ul className="mt-8 space-y-4 text-slate-700">
                <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-600" /> Full project planning and design</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-600" /> Integrated civil and electrical construction</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-600" /> High-performance HVAC and ventilation</li>
                <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-600" /> Commissioning, handover, and support</li>
              </ul>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[32px] overflow-hidden border border-red-100 shadow-lg">
                <img src={installation} alt="Civil and electrical works" className="h-56 w-full object-cover" />
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-semibold text-slate-900">Electrical & Civil Synergy</h3>
                  <p className="mt-3 text-sm text-slate-600">Coordinated teams for building resilient infrastructure.</p>
                </div>
              </div>
              <div className="rounded-[32px] overflow-hidden border border-red-100 shadow-lg">
                <img src={batteryMaintenance} alt="HVAC and maintenance" className="h-56 w-full object-cover" />
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-semibold text-slate-900">HVAC & Ventilation</h3>
                  <p className="mt-3 text-sm text-slate-600">Comfort and efficiency delivered across commercial environments.</p>
                </div>
              </div>
              <div className="rounded-[32px] overflow-hidden border border-red-100 shadow-lg">
                <img src={inverterUpgrade} alt="Mechanical works" className="h-56 w-full object-cover" />
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-semibold text-slate-900">Mechanical Execution</h3>
                  <p className="mt-3 text-sm text-slate-600">Precision installations for durable mechanical systems.</p>
                </div>
              </div>
              <div className="rounded-[32px] overflow-hidden border border-red-100 shadow-lg">
                <img src={scmImg} alt="Turnkey projects" className="h-56 w-full object-cover" />
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-semibold text-slate-900">Turnkey Projects</h3>
                  <p className="mt-3 text-sm text-slate-600">From concept to completion, all services under one trusted umbrella.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-700 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 mb-4">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Engineering Trust</h3>
              <p className="mt-3 text-sm leading-6 text-white/80">SCM is a reliable delivery partner for demanding civil and infrastructure projects.</p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Standout Quality</h3>
              <p className="mt-3 text-sm leading-6 text-white/80">Every project is delivered with strong supervision, safety checks, and polished finishes.</p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 mb-4">
                <ChevronRight className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">One Page Summary</h3>
              <p className="mt-3 text-sm leading-6 text-white/80">A dedicated SCM page with clear service sections and attractive visuals supports conversion and trust.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
