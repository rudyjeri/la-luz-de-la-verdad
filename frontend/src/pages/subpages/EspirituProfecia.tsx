import '../TopicDetail.css';

const EspirituProfecia = () => {
  const articles = [
    {
      title: 'El Don Profético en la Iglesia Remanente',
      description: '¿Cómo identificar a un verdadero profeta? Pruebas bíblicas aplicadas al ministerio de Elena G. de White.',
      image: '/images/reavivados-pelo-espirito-de-profecia.jpg',
      tag: 'Doctrina',
      date: '08 Marzo 2025'
    },
    {
      title: 'El propósito de los testimonios',
      description: 'Por qué Dios envió mensajes especiales para guiar a su iglesia en el tiempo del fin.',
      image: '/images/leer-la-biblia.jpg',
      tag: 'Estudio',
      date: '25 Feb 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/reavivados-pelo-espirito-de-profecia.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">El Espíritu de Profecía</h1>
          <p className="hero-detail__text">
            "Acordaos de la ley de Moisés mi siervo... He aquí, yo os envío el profeta Elías." 
            Descubre el don que guía al pueblo de Dios en el tiempo del fin.
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">El Testimonio de Jesús</h2>
          <div className="articles-grid">
            {articles.map((article, index) => (
              <div key={index} className="article-card">
                <img src={article.image} alt={article.title} className="article-card__image" />
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

export default EspirituProfecia;
