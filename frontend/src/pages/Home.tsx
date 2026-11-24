import { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  const articles = [
    {
      title: '¿Por qué Mineápolis y 1888 son tan importantes hoy?',
      category: 'Estudio profundo',
      image: '/images/1888-conference.jpg'
    },
    {
      title: 'Juicio Final - Estudio Bíblico',
      category: 'Profecía Bíblica',
      image: '/images/investigadores-cristianos-o-como-conciliar-ciencia-y-fe.jpeg'
    },
    {
      title: 'Documental Bíblico',
      category: 'Historia y Fe',
      image: '/images/documental-biblico.jpg'
    },
    {
      title: 'Creación y Evolución',
      category: 'Fe y Ciencia',
      image: '/images/creacion-evolucion.jpg'
    }
  ];

  return (
    <div className="home">
      <header className="hero hero-inicio">
        <section className="hero__container_inicio">
          <h1 className={`hero__title ${active ? 'active' : ''}`}>Luz en un Mundo en Oscuridad</h1>
          <p className={`hero__paragraph ${active ? 'active' : ''}`}>
            Después de esto vi a otro ángel descender del cielo con gran poder; y la tierra fue alumbrada con su gloria. Apocalipsis 18:1
          </p>
        </section>
      </header>

      <main>
        <section className="trending-section">
          <div className="trending-header">
            <h2>Artículos Recientes</h2>
            <a href="#" className="view-all">Ver todo &raquo;</a>
          </div>

          <div className="carousel-container">
            <div className="video-list">
              {articles.map((article, index) => (
                <div key={index} className="video-card">
                  <div className="thumbnail">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <h3><a href="#">{article.title}</a></h3>
                  <p>{article.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="info-block">
          <div className="info-text">
            <h2>¿Quiénes somos?</h2>
            <p>Somos un ministerio dedicado al estudio bíblico profundo y la apologética, buscando compartir 
               la luz de las Escrituras en estos tiempos de confusión y oscuridad espiritual.</p>
          </div>
          <img src="/images/buddha-bowl-dish-with-vegetables-and-legumes-top-view.webp" alt="¿Quiénes somos?" />
        </section>

        <section className="info-block reverse">
          <div className="info-text">
            <h2>Nuestra misión</h2>
            <p>Brindar recursos teológicos de alta calidad, organizados por temas, que faciliten el estudio 
               personal y compartido de la Palabra de Dios para todos aquellos que deseen profundizar.</p>
          </div>
          <img src="/images/adventistasjpeg.webp" alt="Nuestra misión" />
        </section>

        <section className="info-block">
          <div className="info-text">
            <h2>Nuestra visión</h2>
            <p>Ser un referente confiable y accesible de enseñanza bíblica, ayudando a cada creyente a 
               estar preparado para compartir su fe con sabiduría, convicción y amor cristiano.</p>
          </div>
          <img src="/images/antena-historia-podcast-diluvio-universal.jpg" alt="Nuestra visión" />
        </section>
      </main>
    </div>
  );
};

export default Home;
