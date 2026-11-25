import '../TopicDetail.css';
import LazyImg from '../../components/LazyImg';

const EventosFinales = () => {
  const articles = [
    {
      title: 'El Zarandeo en el pueblo de Dios',
      description: '¿Qué es el zarandeo y cómo podemos prepararnos para permanecer firmes?',
      image: '/images/zarandeo.jpg',
      tag: 'Eventos Finales',
      date: '12 Marzo 2025'
    },
    {
      title: 'El Fuerte Clamor y la Lluvia Tardía',
      description: 'La preparación final para la venida de Cristo y el derramamiento del Espíritu Santo.',
      image: '/images/la-luz-de-la-verdad-high-resolution-logo-transparent (12).png',
      tag: 'Preparación',
      date: '05 Marzo 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/Sanctuary-cleansed (1).jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">Los Eventos Finales</h1>
          <p className="hero-detail__text">
            Estamos viviendo en el tiempo del fin. Descubre lo que la Biblia dice sobre los últimos 
            eventos antes del regreso glorioso de nuestro Salvador.
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Preparándonos para el Fin</h2>
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

export default EventosFinales;
