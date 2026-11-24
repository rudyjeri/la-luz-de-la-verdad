import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug, topicMeta, FeCienciaTopic } from '../data/feCienciaArticles';
import { api, CmsArticle } from '../lib/api';
import './ArticleReader.css';

type ViewArticle = {
  source: 'cms' | 'static';
  title: string;
  description: string;
  image: string;
  tag: string;
  date: string;
  topic?: FeCienciaTopic | string;
  bodyHtml?: string;
  sections?: Array<{
    heading?: string;
    paragraphs: string[];
    quote?: { text: string; ref?: string };
  }>;
};

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
      // 1) Intentar CMS
      try {
        const res = await api.getArticle(slug);
        const a = res.article as CmsArticle;
        if (!cancelled) {
          setArticle({
            source: 'cms',
            title: a.title,
            description: a.description,
            image: a.image || '/images/hero-bg.png',
            tag: a.tag,
            date: a.published_at || a.updated_at || '',
            topic: a.topic,
            bodyHtml: a.body_html || '',
          });
          setLoading(false);
          return;
        }
      } catch {
        // 2) Fallback estático
      }
      const staticArticle = getArticleBySlug(slug);
      if (!cancelled) {
        if (staticArticle) {
          setArticle({
            source: 'static',
            title: staticArticle.title,
            description: staticArticle.description,
            image: staticArticle.image,
            tag: staticArticle.tag,
            date: staticArticle.date,
            topic: staticArticle.topic,
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
    <article className="article-reader">
      <header
        className="article-reader__hero"
        style={{ backgroundImage: `url('${article.image}')` }}
      >
        <div className="article-reader__hero-inner">
          <Link to={topic.path} className="article-reader__crumb">
            ← {topic.label}
          </Link>
          <h1 className="article-reader__title">{article.title}</h1>
          <div className="article-reader__meta">
            <span className="article-tag">{article.tag}</span>
            <time dateTime={article.date}>{article.date}</time>
          </div>
        </div>
      </header>

      <div className="container article-reader__body">
        {article.description && <p className="article-reader__lead">{article.description}</p>}

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
