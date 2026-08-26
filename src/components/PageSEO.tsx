import { useEffect } from 'react';

const SITE_URL = 'https://www.jandclewisconstruction.com';

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
}

function setMetaTag(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default function PageSEO({ title, description, path }: PageSEOProps) {
  useEffect(() => {
    document.title = title;
    setMetaTag('description', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const canonicalHref = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    canonical.setAttribute('href', canonicalHref);
  }, [title, description, path]);

  return null;
}
