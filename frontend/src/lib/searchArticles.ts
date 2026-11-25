import {
  feCienciaArticles,
  topicMeta,
  type FeCienciaTopic,
} from '../data/feCienciaArticles';
import type { CmsArticle } from './api';

export type SearchHit = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  date: string;
  topicLabel: string;
  source: 'cms' | 'static';
  score: number;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokensOf(query: string): string[] {
  return normalize(query)
    .split(' ')
    .filter((t) => t.length >= 2);
}

function scoreText(haystack: string, tokens: string[]): number {
  if (!tokens.length || !haystack) return 0;
  let score = 0;
  for (const token of tokens) {
    if (haystack.includes(token)) {
      score += 2;
      // bonus si aparece al inicio de una palabra
      if (new RegExp(`(?:^|\\s)${token}`).test(haystack)) score += 1;
    }
  }
  return score;
}

function staticBody(article: (typeof feCienciaArticles)[number]): string {
  return [
    article.keyVerse?.text || '',
    article.keyVerse?.ref || '',
    article.seoTitle || '',
    ...article.sections.flatMap((s) => [
      s.heading || '',
      ...s.paragraphs,
      s.quote?.text || '',
      s.quote?.ref || '',
    ]),
  ].join(' ');
}

export function searchStaticArticles(query: string, limit = 30): SearchHit[] {
  const tokens = tokensOf(query);
  if (!tokens.length) return [];

  const hits: SearchHit[] = [];
  for (const a of feCienciaArticles) {
    const titleN = normalize(a.title);
    const descN = normalize(a.description);
    const tagN = normalize(a.tag);
    const topicN = normalize(topicMeta[a.topic]?.label || a.topic);
    const bodyN = normalize(staticBody(a));

    let score = 0;
    score += scoreText(titleN, tokens) * 4;
    score += scoreText(descN, tokens) * 2;
    score += scoreText(tagN, tokens) * 2;
    score += scoreText(topicN, tokens) * 2;
    score += scoreText(bodyN, tokens);

    // todas las tokens deben aparecer en algún campo
    const blob = `${titleN} ${descN} ${tagN} ${topicN} ${bodyN}`;
    const allMatch = tokens.every((t) => blob.includes(t));
    if (!allMatch || score <= 0) continue;

    hits.push({
      slug: a.slug,
      title: a.title,
      description: a.description,
      image: a.image,
      tag: a.tag,
      date: a.date,
      topicLabel: topicMeta[a.topic as FeCienciaTopic]?.label || 'Artículo',
      source: 'static',
      score,
    });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function searchCmsArticles(articles: CmsArticle[], query: string, limit = 30): SearchHit[] {
  const tokens = tokensOf(query);
  if (!tokens.length) return [];

  const hits: SearchHit[] = [];
  for (const a of articles) {
    if (a.status && a.status !== 'published') continue;
    const titleN = normalize(a.title || '');
    const descN = normalize(a.description || '');
    const tagN = normalize(a.tag || '');
    const topicN = normalize(a.topic || '');
    const bodyN = normalize(a.body_html || '');
    const blob = `${titleN} ${descN} ${tagN} ${topicN} ${bodyN}`;
    if (!tokens.every((t) => blob.includes(t))) continue;

    let score = 0;
    score += scoreText(titleN, tokens) * 4;
    score += scoreText(descN, tokens) * 2;
    score += scoreText(tagN, tokens) * 2;
    score += scoreText(topicN, tokens) * 2;
    score += scoreText(bodyN, tokens);
    if (score <= 0) continue;

    hits.push({
      slug: a.slug,
      title: a.title,
      description: a.description || '',
      image: a.image || '/images/hero-bg.png',
      tag: a.tag || 'Artículo',
      date: a.published_at || a.updated_at || '',
      topicLabel: a.topic || 'CMS',
      source: 'cms',
      score,
    });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Combina CMS + estáticos; CMS gana si hay mismo slug. */
export function mergeSearchHits(cms: SearchHit[], staticHits: SearchHit[], limit = 40): SearchHit[] {
  const bySlug = new Map<string, SearchHit>();
  for (const h of staticHits) bySlug.set(h.slug, h);
  for (const h of cms) bySlug.set(h.slug, h); // sobrescribe
  return [...bySlug.values()].sort((a, b) => b.score - a.score).slice(0, limit);
}
