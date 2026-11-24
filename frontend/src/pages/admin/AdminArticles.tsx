import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, CmsArticle } from '../../lib/api';

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
    <div className="admin-card">
      <div className="admin-row">
        <h1>Artículos</h1>
        <Link className="admin-btn" to="/admin/articles/new">+ Nuevo artículo</Link>
      </div>
      {error && <div className="admin-alert">{error}</div>}
      {loading ? (
        <p className="admin-muted">Cargando…</p>
      ) : articles.length === 0 ? (
        <p className="admin-muted">Aún no hay artículos. Crea el primero.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Tema</th>
              <th>Estado</th>
              <th>Actualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id}>
                <td>
                  <Link to={`/admin/articles/${a.id}`}>{a.title}</Link>
                  <div className="admin-muted">/{a.slug}</div>
                </td>
                <td>{a.topic}</td>
                <td>
                  <span className={`admin-badge admin-badge--${a.status}`}>{a.status}</span>
                </td>
                <td>{a.updated_at || '—'}</td>
                <td className="admin-actions">
                  <Link to={`/admin/articles/${a.id}`}>Editar</Link>
                  {a.status === 'published' && (
                    <a href={`/articulo/${a.slug}`} target="_blank" rel="noreferrer">Ver</a>
                  )}
                  <button type="button" onClick={() => remove(a.id, a.title)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
