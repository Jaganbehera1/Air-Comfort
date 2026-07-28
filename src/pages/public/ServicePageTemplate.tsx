import { Link, useParams } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { servicePages, buildFAQSchema, buildBreadcrumbSchema, buildServiceSchema } from '../../lib/seo';

export function ServicePageTemplate() {
  const { slug } = useParams();
  const page = servicePages.find((item) => item.slug === slug);

  if (!page) {
    return null;
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: 'https://aircomforts.netlify.app/' },
    { name: 'Services', item: 'https://aircomforts.netlify.app/services' },
    { name: page.title, item: `https://aircomforts.netlify.app/services/${page.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SEO title={page.title} description={page.description} keywords={page.keywords} canonical={`/services/${page.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(page.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em]">Air Comfort Solar</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">{page.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">{page.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full bg-white px-5 py-3 font-semibold text-brand-blue">Get a Free Quote</Link>
            <Link to="/gallery" className="rounded-full border border-white/40 px-5 py-3 font-semibold text-white">See Projects</Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-16">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article>
            <h2 className="text-2xl font-bold">Why this service matters</h2>
            <p className="mt-4 text-lg text-slate-700">{page.summary}</p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {page.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-orange" />{bullet}</li>)}
            </ul>
          </article>
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-xl font-semibold">Need a custom solar solution?</h3>
            <p className="mt-3 text-slate-600">Our team plans systems for homes, businesses, and industrial sites across Odisha.</p>
            <Link to="/contact" className="mt-6 inline-flex rounded-full bg-brand-orange px-5 py-2.5 font-semibold text-white">Talk to an expert</Link>
          </aside>
        </section>
      </main>
    </div>
  );
}
