import { useEffect, useState } from 'react';
import './Recursos.css';

const Recursos = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  const resources = [
    { 
      title: 'Presentaciones PPTX', 
      description: 'Material visual para estudios bíblicos y conferencias.',
      icon: '📊',
      items: ['Idolatría y Santería', 'El Sábado Cristiano', 'La Segunda Venida']
    },
    { 
      title: 'Libros y PDF', 
      description: 'Libros clásicos y artículos en formato digital para lectura profunda.',
      icon: '📚',
      items: ['El Conflicto de los Siglos', 'El Deseado de todas las Gentes', 'El Camino a Cristo']
    },
    { 
      title: 'Guías de Estudio', 
      description: 'Cuestionarios y guías paso a paso para grupos de estudio.',
      icon: '📝',
      items: ['Curso Daniel', 'Curso Apocalipsis', 'La Fe de Jesús']
    },
  ];

  return (
    <div className="resources-page">
      <header className="hero hero-resources">
        <section className="hero__container_resources">
          <h1 className={`hero__title ${active ? 'active' : ''}`}>Recursos Gratuitos</h1>
          <p className={`hero__paragraph ${active ? 'active' : ''}`}>
            "De gracia recibisteis, dad de gracia." Mateo 10:8
          </p>
        </section>
      </header>

      <main>
        <section className="container about">
          <p className="about__paragraph">
            Ponemos a tu disposición una colección seleccionada de materiales para el estudio personal, 
            la predicación y el compartir con otros. Todos nuestros recursos son de libre distribución.
          </p>
        </section>

        <section className="resources-grid container">
          {resources.map((res, index) => (
            <div key={index} className="resource-item-card">
              <div className="resource-icon">{res.icon}</div>
              <h3>{res.title}</h3>
              <p>{res.description}</p>
              <ul className="resource-list">
                {res.items.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
              <button className="download-btn">Explorar {res.title}</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Recursos;
