import '../TopicDetail.css';
import LazyImg from '../../components/LazyImg';

const ProfeciasApocalipsis = () => {
  const articles = [
    {
      title: 'Los Siete Sellos y las Siete Trompetas',
      description: 'Un estudio profundo sobre los juicios y la protección de Dios a través de la historia cristiana.',
      image: '/images/apocalipsis (1).jpg',
      tag: 'Apocalipsis',
      date: '10 Marzo 2025'
    },
    {
      title: 'El Mensaje de los Tres Ángeles',
      description: 'La última amonestación de Dios al mundo antes de la siega final.',
      image: '/images/la-luz-de-la-verdad-high-resolution-logo-transparent (12).png',
      tag: 'Profecía',
      date: '01 Marzo 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/apocalipsis (1).jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">Profecías del Apocalipsis</h1>
          <p className="hero-detail__text">
            "Bienaventurado el que lee, y los que oyen las palabras de esta profecía." 
            La revelación de Jesucristo para su pueblo hoy.
          </p>
        </div>
      </header>
      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">La Revelación de Jesús</h2>
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

export default ProfeciasApocalipsis;
