import '../TopicDetail.css';

const EstadoMuertos = () => {
  const articles = [
    {
      title: '¿Qué pasa cuando uno muere?',
      description: 'Lo que la Biblia realmente dice sobre la muerte como un sueño.',
      image: '/images/istockphoto-627008872-612x612.jpg',
      tag: 'Doctrina',
      date: '10 Marzo 2025'
    },
    {
      title: 'El Espiritismo y el engaño final',
      description: 'Cómo la creencia en la inmortalidad del alma abre la puerta a los engaños de los últimos días.',
      image: '/images/reavivados-pelo-espirito-de-profecia.jpg',
      tag: 'Advertencia',
      date: '02 Marzo 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/istockphoto-627008872-612x612.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">El Estado de los Muertos</h1>
          <p className="hero-detail__text">
            Descubre la verdad consoladora de las Escrituras sobre la muerte y la gloriosa esperanza 
            de la resurrección en la segunda venida de Cristo.
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Esperanza Más Allá de la Tumba</h2>
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

export default EstadoMuertos;
