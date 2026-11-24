import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../lib/api';

const TOPICS = [
  { value: 'general', label: 'General' },
  { value: 'creacion-evolucion', label: 'Creación o Evolución' },
  { value: 'evidencias-diluvio', label: 'Evidencias del Diluvio' },
  { value: 'biblia-dinosaurios', label: 'Biblia y Dinosaurios' },
  { value: 'historicidad-biblia', label: 'Historicidad de la Biblia' },
];

export default function AdminEditor() {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [topic, setTopic] = useState('general');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('Artículo');
  const [bodyHtml, setBodyHtml] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      try {
        const full = await api.adminArticle(Number(id));
        const a = full.article;
        setTitle(a.title);
        setSlug(a.slug);
        setTopic(a.topic || 'general');
        setDescription(a.description || '');
        setImage(a.image || '');
        setTag(a.tag || 'Artículo');
        setBodyHtml(a.body_html || '');
        setStatus(a.status === 'published' ? 'published' : 'draft');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isNew]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setOk('');
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      topic,
      description: description.trim(),
      image: image.trim(),
      tag: tag.trim() || 'Artículo',
      body_html: bodyHtml,
      status,
    };
    try {
      if (isNew) {
        const res = await api.createArticle(payload);
        navigate(`/admin/articles/${res.article.id}`, { replace: true });
      } else {
        await api.updateArticle(Number(id), payload);
        setOk('Cambios guardados correctamente.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="admin-card admin-loading">Cargando artículo…</div>;
  }

  return (
    <>
      <div className="admin-pagehead">
        <div>
          <h1>{isNew ? 'Nuevo artículo' : 'Editar artículo'}</h1>
          <p>Usa HTML simple: &lt;p&gt;, &lt;h2&gt;, &lt;blockquote&gt;.</p>
        </div>
        <Link className="admin-btn admin-btn--secondary" to="/admin">← Volver</Link>
      </div>

      <div className="admin-card">
        {error && <div className="admin-alert">{error}</div>}
        {ok && <div className="admin-alert admin-alert--ok">{ok}</div>}
        <form className="admin-form" onSubmit={onSubmit}>
          <label>
            Título
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Slug (URL)
            <span className="admin-hint">Opcional — se genera del título si lo dejas vacío</span>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="se-genera-del-titulo"
            />
          </label>
          <div className="admin-grid2">
            <label>
              Tema
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                {TOPICS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </label>
            <label>
              Estado
              <select value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}>
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </label>
          </div>
          <label>
            Resumen
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          </label>
          <div className="admin-grid2">
            <label>
              Etiqueta
              <input value={tag} onChange={(e) => setTag(e.target.value)} />
            </label>
            <label>
              Imagen
              <span className="admin-hint">URL o ruta /images/…</span>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/hero-bg.png"
              />
            </label>
          </div>
          <label>
            Contenido
            <textarea
              className="admin-body"
              value={bodyHtml}
              onChange={(e) => setBodyHtml(e.target.value)}
              rows={16}
              placeholder={"<p>Escribe aquí tu artículo...</p>\n<h2>Subtítulo</h2>\n<p>Más texto...</p>"}
              required
            />
          </label>
          <div className="admin-row admin-editor-actions">
            <button type="submit" className="admin-btn" disabled={saving}>
              {saving ? 'Guardando…' : isNew ? 'Crear artículo' : 'Guardar cambios'}
            </button>
            {!isNew && status === 'published' && slug && (
              <a className="admin-btn admin-btn--secondary" href={`/articulo/${slug}`} target="_blank" rel="noreferrer">
                Ver en la web
              </a>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
