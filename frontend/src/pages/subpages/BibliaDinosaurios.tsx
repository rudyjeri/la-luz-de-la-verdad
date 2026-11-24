import ArticleCard from '../../components/ArticleCard';
import { getArticlesByTopic } from '../../data/feCienciaArticles';
import '../TopicDetail.css';

const BibliaDinosaurios = () => {
  const articles = getArticlesByTopic('biblia-dinosaurios');

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/beautiful-hd-dinosaur-cover-c5lkbkctqx1rvr7q.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">La Biblia y los Dinosaurios</h1>
          <p className="hero-detail__text">
            Explora una de las preguntas más fascinantes: ¿Cómo encajan los dinosaurios en el relato bíblico?
            Descubre una perspectiva diferente y fundamentada.
          </p>
        </div>
      </header>

      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Dinosaurios: Fe y Ciencia</h2>
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

export default BibliaDinosaurios;
