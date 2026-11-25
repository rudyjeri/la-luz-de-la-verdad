import { useEffect, useState } from 'react';
import { resourceCategories, type ResourceCategory } from '../data/resources';
import './Recursos.css';

const Recursos = () => {
  const [active, setActive] = useState(false);
  const [openId, setOpenId] = useState<string | null>(resourceCategories[0]?.id ?? null);

  useEffect(() => {
    setActive(true);
  }, []);

  const toggleCategory = (category: ResourceCategory) => {
    setOpenId((prev) => (prev === category.id ? null : category.id));
  };

  return (
    <div className="resources-page">
      <header className="hero hero-resources">
        <section className="hero__container_resources">
          <h1 className={`hero__title ${active ? 'active' : ''}`}>Recursos Gratuitos</h1>
          <p className={`hero__paragraph ${active ? 'active' : ''}`}>
            &quot;De gracia recibisteis, dad de gracia.&quot; Mateo 10:8
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
          {resourceCategories.map((res) => {
            const isOpen = openId === res.id;
            return (
              <div
                key={res.id}
                id={res.id}
                className={`resource-item-card ${isOpen ? 'resource-item-card--open' : ''}`}
              >
                <div className="resource-icon" aria-hidden="true">{res.icon}</div>
                <h3>{res.title}</h3>
                <p>{res.description}</p>
                <ul className="resource-list">
                  {res.files.slice(0, 3).map((file) => (
                    <li key={file.id}>• {file.title}</li>
                  ))}
                  {res.files.length > 3 && (
                    <li className="resource-list__more">+ {res.files.length - 3} más</li>
                  )}
                </ul>
                <button
                  type="button"
                  className="download-btn"
                  aria-expanded={isOpen}
                  aria-controls={`files-${res.id}`}
                  onClick={() => toggleCategory(res)}
                >
                  {isOpen ? 'Ocultar archivos' : `Explorar ${res.title}`}
                </button>

                {isOpen && (
                  <div id={`files-${res.id}`} className="resource-files">
                    {res.files.map((file) => (
                      <article key={file.id} className="resource-file">
                        <div className="resource-file__info">
                          <h4>{file.title}</h4>
                          {file.description && <p>{file.description}</p>}
                          <span className="resource-file__meta">
                            {file.format}
                            {file.sizeLabel ? ` · ${file.sizeLabel}` : ''}
                          </span>
                        </div>
                        <a
                          className="resource-file__btn"
                          href={file.href}
                          download={file.external ? undefined : true}
                          target={file.external ? '_blank' : undefined}
                          rel={file.external ? 'noopener noreferrer' : undefined}
                        >
                          {file.external ? 'Abrir' : 'Descargar'}
                        </a>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Recursos;
