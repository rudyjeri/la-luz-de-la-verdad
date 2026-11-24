import '../TopicDetail.css';

const Santuario = () => {
  const articles = [
    {
      title: 'El Santuario Terrenal: Sombra de lo Celestial',
      description: 'Un recorrido por el tabernáculo del desierto y el significado de cada uno de sus muebles.',
      image: '/images/tabernaculo.webp',
      tag: 'Doctrina',
      date: '05 Marzo 2025'
    },
    {
      title: 'El Día de la Expiación y el Juicio',
      description: 'El significado profético del servicio del santuario y su cumplimiento en el ministerio de Cristo.',
      image: '/images/Sanctuary-cleansed (1).jpg',
      tag: 'Profecía',
      date: '20 Feb 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/Study+17+-+Outside+Sanctuary.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">El Santuario</h1>
          <p className="hero-detail__text">
            Descubre el "mapa" de la salvación que Dios reveló a través del Santuario. 
            Donde se une la justicia y la misericordia de Dios.
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">El Camino al Lugar Santísimo</h2>
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

export default Santuario;
