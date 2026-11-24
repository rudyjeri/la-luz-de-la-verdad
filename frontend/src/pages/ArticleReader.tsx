import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug, topicMeta } from '../data/feCienciaArticles';
import './ArticleReader.css';

const ArticleReader = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

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

  const topic = topicMeta[article.topic];

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
        <p className="article-reader__lead">{article.description}</p>
        {article.sections.map((section, index) => (
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
        ))}
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
