import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import {
  mergeSearchHits,
  searchCmsArticles,
  searchStaticArticles,
  type SearchHit,
} from '../lib/searchArticles';
import './Buscar.css';

const SUGGESTIONS = ['diluvio', 'creación', 'dinosaurios', 'fósiles', 'arqueología', 'Behemot'];

const Buscar = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const initialQ = params.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [cmsHits, setCmsHits] = useState<SearchHit[]>([]);
  const [loadingCms, setLoadingCms] = useState(false);

  useEffect(() => {
    setQuery(params.get('q') || '');
  }, [params]);

  useEffect(() => {
    const q = (params.get('q') || '').trim();
    if (q.length < 2) {
      setCmsHits([]);
      return;
    }
    let cancelled = false;
    setLoadingCms(true);
    (async () => {
      try {
        const res = await api.publicArticles();
        if (!cancelled) {
          setCmsHits(searchCmsArticles(res.articles || [], q));
        }
      } catch {
        if (!cancelled) setCmsHits([]);
      } finally {
        if (!cancelled) setLoadingCms(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params]);

  const staticHits = useMemo(() => {
    const q = (params.get('q') || '').trim();
    if (q.length < 2) return [];
    return searchStaticArticles(q);
  }, [params]);

  const results = useMemo(
    () => mergeSearchHits(cmsHits, staticHits),
    [cmsHits, staticHits],
  );

  const activeQ = (params.get('q') || '').trim();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar');
  };

  const runSuggestion = (term: string) => {
    setQuery(term);
    navigate(`/buscar?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="buscar-page">
      <header className="buscar-hero">
        <div className="buscar-hero__inner">
          <h1>Buscar artículos</h1>
          <p>Encuentra estudios de fe, ciencia, historia y profecía.</p>
          <form className="buscar-form" onSubmit={submit} role="search">
            <label className="sr-only" htmlFor="buscar-input">
              Buscar artículos
            </label>
            <input
              id="buscar-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej. diluvio, creación, dinosaurios…"
              autoFocus
              autoComplete="off"
            />
            <button type="submit">Buscar</button>
          </form>
          <div className="buscar-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => runSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="buscar-main container">
        {!activeQ && (
          <p className="buscar-hint">Escribe al menos 2 letras para buscar.</p>
        )}

        {activeQ && (
          <div className="buscar-status">
            <p>
              {loadingCms ? 'Buscando…' : (
                <>
                  {results.length === 0
                    ? `Sin resultados para “${activeQ}”`
                    : `${results.length} resultado${results.length === 1 ? '' : 's'} para “${activeQ}”`}
                </>
              )}
            </p>
          </div>
        )}

        {activeQ && results.length > 0 && (
          <div className="buscar-grid">
            {results.map((hit) => (
              <Link
                key={`${hit.source}-${hit.slug}`}
                to={`/articulo/${hit.slug}`}
                className="buscar-card"
              >
                <div className="buscar-card__thumb">
                  <img src={hit.image} alt="" loading="lazy" />
                </div>
                <div className="buscar-card__body">
                  <span className="buscar-card__tag">{hit.tag}</span>
                  <h2>{hit.title}</h2>
                  <p>{hit.description}</p>
                  <span className="buscar-card__meta">{hit.topicLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeQ && !loadingCms && results.length === 0 && (
          <div className="buscar-empty">
            <p>Prueba con otra palabra o revisa Fe y Ciencia.</p>
            <Link to="/fe-y-ciencia" className="buscar-empty__link">
              Ir a Fe y Ciencia →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Buscar;
