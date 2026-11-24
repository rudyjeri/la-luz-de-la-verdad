import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profecias.css';

const Profecias = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  const topics = [
    { title: 'Profecías de Daniel', image: '/images/Daniel-7-Four-Beasts.jpg', link: '/profecias-daniel' },
    { title: 'Profecías del Apocalipsis', image: '/images/apocalipsis (1).jpg', link: '/profecias-apocalipsis' },
    { title: 'Los Eventos Finales', image: '/images/zarandeo.png', link: '/eventos-finales' },
    { title: 'El Juicio Investigador', image: '/images/Jesus_sumosacerdote.jpg', link: '/juicio-investigador' },
  ];

  return (
    <div className="prophecy-page">
      <header className="hero hero-prophecy">
        <section className="hero__container_prophecy">
          <h1 className={`hero__title ${active ? 'active' : ''}`}>Profecías Bíblicas</h1>
          <p className={`hero__paragraph ${active ? 'active' : ''}`}>
            "Tenemos también la palabra profética más segura, a la cual hacéis bien en estar atentos como a una antorcha que alumbra en lugar oscuro." 2 Pedro 1:19
          </p>
        </section>
      </header>

      <main>
        <section className="container about">
          <p className="about__paragraph">
            La profecía no fue dada para satisfacer nuestra curiosidad sobre el futuro, sino para fortalecer 
            nuestra fe y prepararnos para los eventos finales de la historia de este mundo. Descubre el mensaje 
            de Dios para nuestro tiempo a través de los símbolos de Daniel y Apocalipsis.
          </p>
        </section>

        <section id="topics-section">
          <div className="container">
            <h2 className="topics__title">Estudios Proféticos</h2>
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

export default Profecias;
