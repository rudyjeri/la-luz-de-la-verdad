import '../TopicDetail.css';
import LazyImg from '../../components/LazyImg';

const ProfeciasDaniel = () => {
  const articles = [
    {
      title: 'El Sueño de Nabucodonosor: La Estatua',
      description: 'Un recorrido por la historia del mundo desde Babilonia hasta el fin de los tiempos en Daniel 2.',
      image: '/images/Sueño-Nabucodonosor-Daniel.jpg',
      tag: 'Daniel 2',
      date: '01 Marzo 2025'
    },
    {
      title: 'Las Cuatro Bestias de Daniel 7',
      description: '¿Quiénes son estas bestias y qué representan en la geopolítica profética?',
      image: '/images/Daniel-7-Four-Beasts.jpg',
      tag: 'Daniel 7',
      date: '20 Feb 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/Daniel_mini-1038x576.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">Profecías de Daniel</h1>
          <p className="hero-detail__text">
            El libro de Daniel revela el control de Dios sobre la historia humana. 
            "El Dios del cielo levantará un reino que no será jamás destruido."
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">El Profeta Daniel</h2>
          <div className="articles-grid">
            {articles.map((article, index) => (
              <div key={index} className="article-card">
                <LazyImg src={article.image} alt={article.title} className="article-card__image" />
                <div className="article-card__content">
                  <h3 className="article-card__title">{article.title}</h3>
                  <p className="article-card__description">{article.description}</p>
                  <div className="article-card__footer">
                    <span className="article-tag">{article.tag}</span>
                    <span className="article-date">{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfeciasDaniel;
