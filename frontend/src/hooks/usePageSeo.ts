import { useEffect } from 'react';

export type PageSeo = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  /** Texto del versículo para rich snippet / descripción ampliada */
  keyVerse?: { text: string; ref: string };
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Actualiza title + meta description + Open Graph / Twitter
 * para SEO básico en SPA.
 */
export function usePageSeo(seo: PageSeo | null) {
  useEffect(() => {
    if (!seo) return;

    const prevTitle = document.title;
    const site = 'La Luz de la Verdad';
    const fullTitle = seo.title.includes(site) ? seo.title : `${seo.title} | ${site}`;
    document.title = fullTitle;

    let description = (seo.description || '').trim();
    if (seo.keyVerse?.text && seo.keyVerse?.ref) {
      const verseBit = `«${seo.keyVerse.text}» (${seo.keyVerse.ref})`;
      description = description
        ? `${description} ${verseBit}`
        : verseBit;
    }
    if (description.length > 300) {
      description = `${description.slice(0, 297)}…`;
    }

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', seo.type || 'website');
    upsertMeta('property', 'og:site_name', site);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);

    if (seo.image) {
      const absImage = seo.image.startsWith('http')
        ? seo.image
        : new URL(seo.image, window.location.origin).href;
      upsertMeta('property', 'og:image', absImage);
      upsertMeta('name', 'twitter:image', absImage);
    }

    const pageUrl = seo.url || window.location.href;
    upsertMeta('property', 'og:url', pageUrl);
    upsertLink('canonical', pageUrl);

    return () => {
      document.title = prevTitle;
    };
  }, [seo]);
}
