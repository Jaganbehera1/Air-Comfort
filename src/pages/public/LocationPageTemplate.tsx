import { Link, useParams } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { locationPages, buildBreadcrumbSchema, buildLocationSchema } from '../../lib/seo';

export function LocationPageTemplate() {
  const { slug } = useParams();
  const page = locationPages.find((item) => item.slug === slug);

  if (!page) {
    return null;
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: 'https://aircomforts.netlify.app/' },
    { name: 'Locations', item: 'https://aircomforts.netlify.app/locations' },
    { name: page.title, item: `https://aircomforts.netlify.app/locations/${page.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SEO title={page.title} description={page.description} keywords={page.keywords} canonical={`/locations/${page.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocationSchema(page)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="bg-gradient-to-r from-brand-red to-brand-orange text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em]">Solar Services in {page.title.split('in ').slice(-1)[0] || 'Odisha'}</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">{page.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">{page.description}</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-16">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article>
            <h2 className="text-2xl font-bold">Why choose Air Comfort here</h2>
            <p className="mt-4 text-lg text-slate-700">{page.summary}</p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {page.serviceArea.map((area) => <li key={area} className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-blue" />{area}</li>)}
            </ul>
          </article>
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-xl font-semibold">Book a site visit</h3>
            <p className="mt-3 text-slate-600">We provide solar consultation and installation support for homes and businesses across Odisha.</p>
            <Link to="/contact" className="mt-6 inline-flex rounded-full bg-brand-blue px-5 py-2.5 font-semibold text-white">Contact us</Link>
          </aside>
        </section>
      </main>
    </div>
  );
}
