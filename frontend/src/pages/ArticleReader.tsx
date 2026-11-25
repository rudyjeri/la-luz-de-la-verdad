import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug, topicMeta, FeCienciaTopic, KeyVerse } from '../data/feCienciaArticles';
import { api, CmsArticle } from '../lib/api';
import { usePageSeo } from '../hooks/usePageSeo';
import './ArticleReader.css';

type ViewArticle = {
  source: 'cms' | 'static';
  title: string;
  seoTitle?: string;
  description: string;
  image: string;
  tag: string;
  date: string;
  topic?: FeCienciaTopic | string;
  keyVerse?: KeyVerse;
  bodyHtml?: string;
  sections?: Array<{
    heading?: string;
    paragraphs: string[];
    quote?: { text: string; ref?: string };
  }>;
};

/** Intenta extraer un versículo citado en HTML del CMS (blockquote + cite / ref). */
function extractVerseFromHtml(html: string): KeyVerse | undefined {
  if (!html) return undefined;
  const citeMatch = html.match(/<cite[^>]*>\s*([^<]{3,80})\s*<\/cite>/i);
  const blockMatch = html.match(/<blockquote[^>]*>[\s\S]*?<p[^>]*>\s*([^<]{12,280})\s*<\/p>/i);
  if (citeMatch && blockMatch) {
    return { text: blockMatch[1].trim(), ref: citeMatch[1].trim() };
  }
  const refOnly = html.match(/\b((?:G[eé]nesis|Exodo|Éxodo|Salmos?|Job|Romanos|Lucas|Mateo|Juan|Apocalipsis|Daniel|Isa[ií]as|2?\s*Timoteo)\s+\d+:\d+(?:-\d+)?)\b/i);
  if (refOnly) {
    return {
      text: 'Consulta el texto bíblico completo en tu Biblia.',
      ref: refOnly[1],
    };
  }
  return undefined;
}

const ArticleReader = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ViewArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.getArticle(slug);
        const a = res.article as CmsArticle;
        if (!cancelled) {
          setArticle({
            source: 'cms',
            title: a.title,
            seoTitle: a.title,
            description: a.description,
            image: a.image || '/images/hero-bg.png',
            tag: a.tag,
            date: a.published_at || a.updated_at || '',
            topic: a.topic,
            bodyHtml: a.body_html || '',
            keyVerse: extractVerseFromHtml(a.body_html || ''),
          });
          setLoading(false);
          return;
        }
      } catch {
        // fallback estático
      }
      const staticArticle = getArticleBySlug(slug);
      if (!cancelled) {
        if (staticArticle) {
          setArticle({
            source: 'static',
            title: staticArticle.title,
            seoTitle: staticArticle.seoTitle || staticArticle.title,
            description: staticArticle.description,
            image: staticArticle.image,
            tag: staticArticle.tag,
            date: staticArticle.date,
            topic: staticArticle.topic,
            keyVerse: staticArticle.keyVerse,
            sections: staticArticle.sections,
          });
        } else {
          setArticle(null);
        }
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const seo = useMemo(() => {
    if (!article) {
      return loading
        ? { title: 'Cargando artículo', description: 'La Luz de la Verdad' }
        : {
            title: 'Artículo no encontrado',
            description: 'El artículo no existe o fue movido.',
          };
    }
    return {
      title: article.seoTitle || article.title,
      description: article.description,
      image: article.image,
      type: 'article' as const,
      keyVerse: article.keyVerse,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };
  }, [article, loading]);

  usePageSeo(seo);

  if (loading) {
    return (
      <div className="article-reader article-reader--missing">
        <div className="container">
          <p>Cargando artículo…</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-reader article-reader--missing">
        <div className="container">
          <h1>Artículo no encontrado</h1>
          <p>El enlace puede estar desactualizado o el artículo fue movido.</p>
          <Link to="/fe-y-ciencia" className="article-reader__back">Volver a Fe y Ciencia</Link>
        </div>
      </div>
    );
  }

  const topicKey = article.topic as FeCienciaTopic | undefined;
  const topic = topicKey && topicMeta[topicKey] ? topicMeta[topicKey] : { path: '/fe-y-ciencia', label: 'Artículos' };

  return (
    <article className="article-reader" itemScope itemType="https://schema.org/Article">
      <header
        className="article-reader__hero"
        style={{ backgroundImage: `url('${article.image}')` }}
      >
        <div className="article-reader__hero-inner">
          <Link to={topic.path} className="article-reader__crumb">
            ← {topic.label}
          </Link>
          <h1 className="article-reader__title" itemProp="headline">{article.title}</h1>
          <div className="article-reader__meta">
            <span className="article-tag">{article.tag}</span>
            <time dateTime={article.date} itemProp="datePublished">{article.date}</time>
          </div>
        </div>
      </header>

      <div className="container article-reader__body" itemProp="articleBody">
        {article.keyVerse && (
          <aside className="article-reader__key-verse" aria-label="Versículo clave">
            <span className="article-reader__key-verse-label">Versículo clave</span>
            <blockquote>
              <p itemProp="citation">«{article.keyVerse.text}»</p>
              <cite>{article.keyVerse.ref}</cite>
            </blockquote>
          </aside>
        )}

        {article.description && (
          <p className="article-reader__lead" itemProp="description">{article.description}</p>
        )}

        {article.source === 'cms' ? (
          <div
            className="article-reader__cms"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml || '' }}
          />
        ) : (
          article.sections?.map((section, index) => (
            <section key={index} className="article-reader__section">
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.quote && (
                <blockquote className="article-reader__quote">
                  <p>{section.quote.text}</p>
                  {section.quote.ref && <cite>{section.quote.ref}</cite>}
                </blockquote>
              )}
            </section>
          ))
        )}

        <footer className="article-reader__footer">
          <Link to={topic.path} className="article-reader__back">
            Ver más en {topic.label}
          </Link>
          <Link to="/fe-y-ciencia" className="article-reader__back article-reader__back--muted">
            Fe y Ciencia
          </Link>
        </footer>
      </div>
    </article>
  );
};

export default ArticleReader;
