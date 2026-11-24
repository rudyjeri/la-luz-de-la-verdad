import { Link } from 'react-router-dom';
import type { FeCienciaArticle } from '../data/feCienciaArticles';

interface ArticleCardProps {
  article: FeCienciaArticle;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link to={`/articulo/${article.slug}`} className="article-card article-card--link">
      <img src={article.image} alt={article.title} className="article-card__image" />
      <div className="article-card__content">
        <h3 className="article-card__title">{article.title}</h3>
        <p className="article-card__description">{article.description}</p>
        <div className="article-card__footer">
          <span className="article-tag">{article.tag}</span>
          <span className="article-date">{article.date}</span>
        </div>
        <span className="article-card__read">Leer artículo →</span>
      </div>
    </Link>
  );
};

export default ArticleCard;
