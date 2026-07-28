import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-24 text-center text-slate-900">
      <SEO title="Page Not Found" description="The page you requested could not be found. Return to Air Comfort Solar homepage for solar services in Odisha." canonical="/404" />
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-lg text-slate-600">The page may have moved. Please return to the homepage or contact us for solar support.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-brand-blue px-5 py-3 font-semibold text-white">Go to Home</Link>
    </div>
  );
}
