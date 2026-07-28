import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { blogPosts, buildBreadcrumbSchema } from '../../lib/seo';

export function BlogPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: 'https://aircomforts.netlify.app/' },
    { name: 'Blog', item: 'https://aircomforts.netlify.app/blog' },
  ]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SEO title="Solar Blog and Guides" description="Explore solar guides, subsidy updates, and rooftop solar insights for Odisha homeowners and businesses." keywords="solar blog odisha, solar guides odisha, pm surya ghar blog" canonical="/blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="bg-gradient-to-r from-brand-blue to-brand-green text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Solar Blog & Guides</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">Helpful articles on rooftop solar, subsidy, net metering, and clean energy in Odisha.</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">{post.category}</p>
            <h2 className="mt-3 text-xl font-semibold">{post.title}</h2>
            <p className="mt-3 text-slate-600">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex text-brand-blue font-semibold">Read more →</Link>
          </article>
        ))}
      </main>
    </div>
  );
}
