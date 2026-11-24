import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, CmsArticle } from '../../lib/api';

const TOPIC_LABELS: Record<string, string> = {
  general: 'General',
  'creacion-evolucion': 'Creación o Evolución',
  'evidencias-diluvio': 'Evidencias del Diluvio',
  'biblia-dinosaurios': 'Biblia y Dinosaurios',
  'historicidad-biblia': 'Historicidad de la Biblia',
};

function formatDate(value?: string | null) {
  if (!value) return '—';
  const d = new Date(value.includes('T') ? value : value.replace(' ', 'T') + 'Z');
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminArticles() {
  const [articles, setArticles] = useState<CmsArticle[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await api.adminArticles();
      setArticles(res.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const published = articles.filter((a) => a.status === 'published').length;
    const drafts = articles.length - published;
    return { total: articles.length, published, drafts };
  }, [articles]);

  async function remove(id: number, title: string) {
    if (!confirm(`¿Eliminar “${title}”?`)) return;
    try {
      await api.deleteArticle(id);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'No se pudo eliminar');
    }
  }

  return (
    <>
      <div className="admin-pagehead">
        <div>
          <h1>Artículos</h1>
          <p>Publica y edita contenido sin tocar código.</p>
        </div>
        <Link className="admin-btn" to="/admin/articles/new">+ Nuevo artículo</Link>
      </div>

      <div className="admin-kpis">
        <div className="admin-kpi">
          <div className="admin-kpi__label">Total</div>
          <div className="admin-kpi__value">{stats.total}</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi__label">Publicados</div>
          <div className="admin-kpi__value">{stats.published}</div>
        </div>
        <div className="admin-kpi">
          <div className="admin-kpi__label">Borradores</div>
          <div className="admin-kpi__value">{stats.drafts}</div>
        </div>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      {loading ? (
        <div className="admin-card admin-loading">Cargando artículos…</div>
      ) : articles.length === 0 ? (
        <div className="admin-card admin-empty">
          <h2>Aún no hay artículos</h2>
          <p>Crea el primero y publícalo cuando esté listo.</p>
          <Link className="admin-btn" to="/admin/articles/new">Crear artículo</Link>
        </div>
      ) : (
        <div className="admin-list">
          {articles.map((a) => (
            <article key={a.id} className="admin-item">
              <div>
                <Link className="admin-item__title" to={`/admin/articles/${a.id}`}>
                  {a.title}
                </Link>
                <div className="admin-item__meta">
                  <span className={`admin-badge admin-badge--${a.status}`}>
                    {a.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                  <span className="admin-topic">{TOPIC_LABELS[a.topic] || a.topic}</span>
                  <span className="admin-item__slug">/{a.slug}</span>
                  <span>Actualizado {formatDate(a.updated_at)}</span>
                </div>
              </div>
              <div className="admin-actions">
                <Link to={`/admin/articles/${a.id}`}>Editar</Link>
                {a.status === 'published' && (
                  <a href={`/articulo/${a.slug}`} target="_blank" rel="noreferrer">Ver</a>
                )}
                <button
                  type="button"
                  className="admin-danger"
                  onClick={() => remove(a.id, a.title)}
                >
                  Borrar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
