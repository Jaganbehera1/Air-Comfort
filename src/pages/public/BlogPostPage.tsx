import { Link, useParams } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { blogPosts, buildBreadcrumbSchema } from '../../lib/seo';

export function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return null;
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', item: 'https://aircomforts.netlify.app/' },
    { name: 'Blog', item: 'https://aircomforts.netlify.app/blog' },
    { name: post.title, item: `https://aircomforts.netlify.app/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SEO title={post.title} description={post.excerpt} keywords={post.keywords} canonical={`/blog/${post.slug}`} type="article" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em]">{post.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3">{post.title}</h1>
          <p className="mt-4 text-white/90">{post.excerpt}</p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-16">
        <article>
          <p className="text-slate-600">Published {post.publishedAt}</p>
          <p className="mt-6 text-lg leading-8 text-slate-700">{post.content}</p>
        </article>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold">Need expert solar help?</h2>
          <Link to="/contact" className="mt-4 inline-flex rounded-full bg-brand-orange px-5 py-2.5 font-semibold text-white">Contact Air Comfort</Link>
        </div>
      </main>
    </div>
  );
}
