import '../TopicDetail.css';

const ReformaProsalud = () => {
  const articles = [
    {
      title: 'El cuerpo como templo del Espíritu Santo',
      description: '¿Por qué la salud es una parte integral del mensaje del tercer ángel?',
      image: '/images/buddha-bowl-dish-with-vegetables-and-legumes-top-view.webp',
      tag: 'Salud',
      date: '10 Marzo 2025'
    },
    {
      title: 'Los 8 Remedios Naturales',
      description: 'La farmacia de Dios: agua, descanso, ejercicio, luz solar, aire, nutrición, temperancia y confianza en Dios.',
      image: '/images/0_dieta-vegetariana.webp',
      tag: 'Vida Sana',
      date: '01 Marzo 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/0_dieta-vegetariana.webp')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">Reforma Prosalud</h1>
          <p className="hero-detail__text">
            "Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud, así como prospera tu alma." 
            Descubre el plan de Dios para tu bienestar integral.
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Salud Integral</h2>
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

export default ReformaProsalud;
