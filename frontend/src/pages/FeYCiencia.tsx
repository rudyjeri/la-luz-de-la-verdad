import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FeYCiencia.css';

const FeYCiencia = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  const topics = [
    { title: '¿Creación o Evolución?', image: '/images/criacionismo.jpg', link: '/creacion-evolucion' },
    { title: 'Evidencias del Diluvio', image: '/images/antena-historia-podcast-diluvio-universal.jpg', link: '/evidencias-diluvio' },
    { title: 'La Biblia y los Dinosaurios', image: '/images/13dinosaur-superJumbo.jpg', link: '/biblia-dinosaurios' },
    { title: 'La Historicidad de la Biblia', image: '/images/cnne-1394633-oldest-bible-auction.jpeg', link: '/historicidad-biblia' },
  ];

  return (
    <div className="science-page">
      <header className="hero hero-science">
        <section className="hero__container_science">
          <h1 className={`hero__title ${active ? 'active' : ''}`}>Fe y Ciencia</h1>
          <p className={`hero__paragraph ${active ? 'active' : ''}`}>
            "Porque las cosas invisibles de él, su eterno poder y deidad, se hacen claramente visibles 
            desde la creación del mundo, siendo entendidas por medio de las cosas hechas." Romanos 1:20
          </p>
        </section>
      </header>

      <main>
        <section className="container about">
          <p className="about__paragraph">
            Exploramos la fascinante intersección entre las Sagradas Escrituras y el conocimiento científico. 
            Creemos que la verdadera ciencia y la revelación bíblica no están en conflicto, sino que 
            armonizan para revelar la gloria del Creador.
          </p>
        </section>

        <section id="topics-section">
          <div className="container">
            <h2 className="topics__title">Temas de Investigación</h2>
            <div className="topics__grid">
              {topics.map((topic, index) => (
                <div key={index} className="topic-card">
                  <Link to={topic.link}>
                    <img src={topic.image} alt={topic.title} className="topic-card__image" />
                    <div className="topic-card__overlay">
                      <h3 className="topic-card__title">{topic.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FeYCiencia;
