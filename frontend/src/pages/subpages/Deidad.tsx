import '../TopicDetail.css';
import LazyImg from '../../components/LazyImg';

const Deidad = () => {
  const articles = [
    {
      title: 'La Divinidad de Cristo',
      description: 'Pruebas bíblicas de que Jesús es Dios eterno, no un ser creado.',
      image: '/images/Te-sentaras-en-Su-trono.jpg',
      tag: 'Doctrina',
      date: '05 Marzo 2025'
    },
    {
      title: 'La personalidad del Espíritu Santo',
      description: 'Entendiendo la tercera persona de la deidad a través de las Escrituras.',
      image: '/images/the-creator-chris-brazelton.jpg',
      tag: 'Estudio Bíblico',
      date: '20 Feb 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/Te-sentaras-en-Su-trono.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">La Deidad</h1>
          <p className="hero-detail__text">
            Explora el misterio de la naturaleza de Dios: Padre, Hijo y Espíritu Santo. 
            Tres personas co-eternas en una unidad perfecta.
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Conociendo a Dios</h2>
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

export default Deidad;
