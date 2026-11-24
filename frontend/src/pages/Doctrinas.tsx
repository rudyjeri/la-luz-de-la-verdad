import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Doctrinas.css';

const Doctrinas = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  const topics = [
    { title: 'Justificación por la fe', image: '/images/jesus-en-la-cruz.jpg', link: '/justificacion-fe' },
    { title: 'La Deidad', image: '/images/Te-sentaras-en-Su-trono.jpg', link: '/deidad' },
    { title: 'La Ley de Dios', image: '/images/dez-mandamentos.jpg', link: '/ley-de-dios' },
    { title: 'El Estado de los Muertos', image: '/images/istockphoto-627008872-612x612.jpg', link: '/estado-muertos' },
    { title: 'El santuario', image: '/images/Sanctuary-cleansed (1).jpg', link: '/santuario' },
    { title: 'Reforma Prosalud', image: '/images/buddha-bowl-dish-with-vegetables-and-legumes-top-view.webp', link: '/reforma-prosalud' },
    { title: 'El Espíritu de Profecía', image: '/images/reavivados-pelo-espirito-de-profecia.jpg', link: '/espiritu-profecia' },
  ];

  return (
    <div className="doctrinas-page">
      <header className="hero hero-apologetica">
        <section className="hero__container_doctrinas">
          <h1 className={`hero__title ${active ? 'active' : ''}`}>Defendiendo la sana doctrina</h1>
          <p className={`hero__paragraph ${active ? 'active' : ''}`}>
            Enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos 
            los días, hasta el fin del mundo. Amén...Mateo 28:20
          </p>
        </section>
      </header>

      <main>
        <section className="container about">
          <p className="about__paragraph">
            La Biblia no es solo un libro, es la voz de Dios hablándonos hoy,
            revelándonos su amor, su justicia y su plan perfecto para la humanidad. A través de sus páginas, 
            encontramos respuestas a las preguntas más profundas del alma y el camino seguro para una vida 
            plena en Cristo.
          </p>
        </section>

        <section id="topics-section">
          <div className="container">
            <h2 className="topics__title">Temas Doctrinales</h2>
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

export default Doctrinas;
