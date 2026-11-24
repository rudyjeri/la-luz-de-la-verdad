import '../TopicDetail.css';

const JustificacionFe = () => {
  const articles = [
    {
      title: 'El mensaje de 1888: Cristo nuestra justicia',
      description: 'Un estudio profundo sobre el reavivamiento en Minneapolis y la importancia de la justicia de Cristo para hoy.',
      image: '/images/1888-conference.jpg',
      tag: 'Historia Adventista',
      date: '01 Marzo 2025'
    },
    {
      title: 'La Fe que Obra por el Amor',
      description: '¿Cómo se relaciona la fe con la obediencia? Descubre el equilibrio bíblico entre gracia y ley.',
      image: '/images/Manto-justicia.jpg',
      tag: 'Teología',
      date: '15 Feb 2025'
    },
    {
      title: 'La justicia imputada vs impartida',
      description: 'Entendiendo los términos bíblicos que definen nuestra salvación en Cristo Jesús.',
      image: '/images/justi1888.png',
      tag: 'Doctrina',
      date: '10 Feb 2025'
    }
  ];

  return (
    <div className="topic-detail-page">
      <header className="hero-detail" style={{ backgroundImage: "url('/images/jesus-en-la-cruz.jpg')" }}>
        <div className="hero-detail__content">
          <h1 className="hero-detail__title">Justificación por la Fe</h1>
          <p className="hero-detail__text">
            "Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo." 
            Descubre el corazón del evangelio eterno.
          </p>
        </div>
      </header>

      <main className="articles-section">
        <div className="container">
          <h2 className="topics__title">Estudios del Evangelio</h2>
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

export default JustificacionFe;
