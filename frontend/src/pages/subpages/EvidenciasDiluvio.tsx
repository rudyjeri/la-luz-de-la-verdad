import ArticleCard from '../../components/ArticleCard';
import { getArticlesByTopic } from '../../data/feCienciaArticles';
import '../TopicDetail.css';

const EvidenciasDiluvio = () => {
  const articles = getArticlesByTopic('evidencias-diluvio');

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/antena-historia-podcast-diluvio-universal.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">Evidencias del Diluvio</h1>
          <p className="hero-detail__text">
            Las huellas de una catástrofe global están escritas en las rocas y en la memoria de las naciones.
            Descubre las pruebas científicas del Diluvio Universal.
          </p>
        </div>
      </header>

      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Artículos y Evidencias</h2>
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

export default EvidenciasDiluvio;
