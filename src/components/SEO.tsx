import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildCanonical, PageSEO, siteName } from '../lib/seo';

interface SEOProps extends Partial<PageSEO> {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function SEO({ title, description, keywords, canonical, image, type = 'website' }: SEOProps) {
  const location = useLocation();
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDescription = description || 'Air Comfort Solar delivers rooftop solar installation and maintenance across Odisha.';
  const pageKeywords = keywords || 'solar company odisha, rooftop solar installation odisha';
  const pageCanonical = canonical || buildCanonical(location.pathname);
  const pageImage = image || '/images/og-default.jpg';

  useEffect(() => {
    document.title = pageTitle;
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', pageDescription);
    setMeta('keywords', pageKeywords);
    setMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    setMeta('canonical', pageCanonical);
    setProperty('og:title', pageTitle);
    setProperty('og:description', pageDescription);
    setProperty('og:type', type);
    setProperty('og:url', pageCanonical);
    setProperty('og:image', pageImage);
    setProperty('og:site_name', siteName);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', pageDescription);
    setMeta('twitter:image', pageImage);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = pageCanonical;
  }, [pageTitle, pageDescription, pageKeywords, pageCanonical, pageImage, type, location.pathname]);

  return null;
}
