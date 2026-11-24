import ArticleCard from '../../components/ArticleCard';
import { getArticlesByTopic } from '../../data/feCienciaArticles';
import '../TopicDetail.css';

const CreacionEvolucion = () => {
  const articles = getArticlesByTopic('creacion-evolucion');

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/Day_5_Creation_600x.webp')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">Creación o Evolución</h1>
          <p className="hero-detail__text">
            ¿Fuimos creados por un Dios inteligente o somos el resultado de un proceso evolutivo al azar?
            Explora las evidencias del diseño en la naturaleza.
          </p>
        </div>
      </header>

      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Artículos de Investigación</h2>
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

export default CreacionEvolucion;
