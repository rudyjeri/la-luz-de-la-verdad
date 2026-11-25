import { useEffect, useMemo, useState } from 'react';
import {
  resourceCategories,
  totalResourceCount,
  type ResourceCategory,
  type ResourceFile,
} from '../data/resources';
import './Recursos.css';

const Recursos = () => {
  const [active, setActive] = useState(false);
  const [activeId, setActiveId] = useState(resourceCategories[0]?.id ?? 'guias');

  useEffect(() => {
    setActive(true);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && resourceCategories.some((c) => c.id === hash)) {
      setActiveId(hash);
    }
  }, []);

  const category = useMemo(
    () => resourceCategories.find((c) => c.id === activeId) ?? resourceCategories[0],
    [activeId],
  );

  const selectCategory = (cat: ResourceCategory) => {
    setActiveId(cat.id);
    window.history.replaceState(null, '', `#${cat.id}`);
  };

  return (
    <div className="resources-page">
      <header className="hero hero-resources">
        <section className="hero__container_resources">
          <p className={`resources-kicker ${active ? 'active' : ''}`}>Biblioteca gratuita</p>
          <h1 className={`hero__title ${active ? 'active' : ''}`}>Recursos</h1>
          <p className={`hero__paragraph ${active ? 'active' : ''}`}>
            Guías, presentaciones y lecturas para estudiar y compartir la Palabra.
          </p>
          <p className={`resources-verse ${active ? 'active' : ''}`}>
            «De gracia recibisteis, dad de gracia.» — Mateo 10:8
          </p>
        </section>
      </header>

      <main className="resources-main">
        <div className="resources-shell container">
          <div className="resources-summary">
            <div>
              <h2>Elige una categoría</h2>
              <p>{totalResourceCount()} materiales listos para descargar o abrir.</p>
            </div>
          </div>

          <nav className="resources-tabs" aria-label="Categorías de recursos">
            {resourceCategories.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`resources-tab ${isActive ? 'is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => selectCategory(cat)}
                >
                  <span className="resources-tab__label">{cat.shortTitle}</span>
                  <span className="resources-tab__count">{cat.files.length}</span>
                </button>
              );
            })}
          </nav>

          {category && (
            <section className="resources-panel" aria-labelledby="resources-panel-title">
              <header className="resources-panel__head">
                <div>
                  <p className="resources-panel__eyebrow">{category.audience}</p>
                  <h3 id="resources-panel-title">{category.title}</h3>
                  <p className="resources-panel__desc">{category.description}</p>
                </div>
              </header>

              <ul className="resources-list">
                {category.files.map((file, index) => (
                  <li key={file.id}>
                    <ResourceRow file={file} index={index + 1} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <aside className="resources-note">
            <strong>Libre distribución.</strong> Puedes descargar, estudiar y compartir estos
            materiales con tu iglesia o grupo de estudio.
          </aside>
        </div>
      </main>
    </div>
  );
};

function ResourceRow({ file, index }: { file: ResourceFile; index: number }) {
  return (
    <article className="resource-row">
      <div className="resource-row__index" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </div>
      <div className="resource-row__body">
        <div className="resource-row__top">
          <h4>{file.title}</h4>
          <span className={`resource-badge resource-badge--${file.format.toLowerCase()}`}>
            {file.format}
          </span>
        </div>
        {file.description && <p>{file.description}</p>}
        {file.sizeLabel && <span className="resource-row__size">{file.sizeLabel}</span>}
      </div>
      <a
        className="resource-row__action"
        href={file.href}
        download={file.external ? undefined : true}
        target={file.external ? '_blank' : undefined}
        rel={file.external ? 'noopener noreferrer' : undefined}
      >
        {file.external ? 'Abrir' : 'Descargar'}
      </a>
    </article>
  );
}

export default Recursos;
