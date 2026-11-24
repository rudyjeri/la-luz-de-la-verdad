import ArticleCard from '../../components/ArticleCard';
import { getArticlesByTopic } from '../../data/feCienciaArticles';
import '../TopicDetail.css';

const HistoricidadBiblia = () => {
  const articles = getArticlesByTopic('historicidad-biblia');

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/leer-la-biblia.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">La Historicidad de la Biblia</h1>
          <p className="hero-detail__text">
            ¿Es la Biblia un libro de mitos o un registro histórico confiable?
            Explora las pruebas arqueológicas e históricas de su veracidad.
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Evidencias Históricas</h2>
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HistoricidadBiblia;
