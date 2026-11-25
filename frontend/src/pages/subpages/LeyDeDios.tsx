import '../TopicDetail.css';
import LazyImg from '../../components/LazyImg';

const LeyDeDios = () => {
  const articles = [
    {
      title: 'Los Diez Mandamientos: ¿Vigentes o Abolidos?',
      description: 'Un análisis sobre la perpetuidad de la ley moral de Dios en el Nuevo Testamento.',
      image: '/images/dez-mandamentos.jpg',
      tag: 'Ley de Dios',
      date: '01 Marzo 2025'
    },
    {
      title: 'El Sábado: Sello de la Creación',
      description: 'La historia y el significado del séptimo día como día de reposo bíblico.',
      image: '/images/miniatura_mandamientos-1024x576.jpg',
      tag: 'Sábado',
      date: '15 Feb 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/dez-mandamentos.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">La Ley de Dios</h1>
          <p className="hero-detail__text">
            "Si me amáis, guardad mis mandamientos." La ley de Dios es el espejo que nos muestra nuestra 
            necesidad de un Salvador.
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Su Ley de Amor</h2>
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

export default LeyDeDios;
