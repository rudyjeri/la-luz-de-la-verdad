import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LazyImg from '../components/LazyImg';
import { getRecentArticles } from '../data/feCienciaArticles';
import { usePageSeo } from '../hooks/usePageSeo';
import { api } from '../lib/api';
import './Home.css';

type HomeArticle = {
  slug: string;
  title: string;
  category: string;
  image: string;
};

function formatCmsDate(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
}

const Home = () => {
  const [active, setActive] = useState(false);
  const [articles, setArticles] = useState<HomeArticle[]>(() =>
    getRecentArticles(4).map((a) => ({
      slug: a.slug,
      title: a.title,
      category: a.tag,
      image: a.image,
    })),
  );

  const homeSeo = useMemo(
    () => ({
      title: 'La Luz de la Verdad | Estudios bíblicos, fe y ciencia',
      description:
        'Ministerio de estudio bíblico y apologética. Artículos sobre creación, diluvio, doctrinas y profecía. «La tierra fue alumbrada con su gloria» (Apocalipsis 18:1).',
      image: '/images/hero-bg.jpg',
      type: 'website' as const,
    }),
    [],
  );
  usePageSeo(homeSeo);

  useEffect(() => {
    setActive(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.publicArticles();
        const published = (res.articles || [])
          .filter((a) => a.status === 'published' || !a.status)
          .slice(0, 4)
          .map((a) => ({
            slug: a.slug,
            title: a.title,
            category: a.tag || formatCmsDate(a.published_at) || 'Artículo',
            image: a.image || '/images/hero-bg.jpg',
          }));
        if (!cancelled && published.length > 0) {
          setArticles(published);
        }
      } catch {
        // Mantener artículos estáticos reales
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="home">
      <header className="hero hero-inicio">
        <section className="hero__container_inicio">
          <h1 className={`hero__title ${active ? 'active' : ''}`}>Luz en un Mundo en Oscuridad</h1>
          <p className={`hero__paragraph ${active ? 'active' : ''}`}>
            Después de esto vi a otro ángel descender del cielo con gran poder; y la tierra fue alumbrada con su gloria. Apocalipsis 18:1
          </p>
        </section>
      </header>

      <main>
        <section className="trending-section">
          <div className="trending-header">
            <h2>Artículos Recientes</h2>
            <Link to="/fe-y-ciencia" className="view-all">Ver todo &raquo;</Link>
          </div>

          <div className="carousel-container">
            <div className="video-list">
              {articles.map((article) => (
                <div key={article.slug} className="video-card">
                  <Link to={`/articulo/${article.slug}`} className="video-card__link">
                    <div className="thumbnail">
                      <LazyImg src={article.image} alt={article.title} />
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.category}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="info-block">
          <div className="info-text">
            <h2>¿Quiénes somos?</h2>
            <p>Somos un ministerio dedicado al estudio bíblico profundo y la apologética, buscando compartir
               la luz de las Escrituras en estos tiempos de confusión y oscuridad espiritual.</p>
          </div>
          <LazyImg src="/images/buddha-bowl-dish-with-vegetables-and-legumes-top-view.webp" alt="¿Quiénes somos?" />
        </section>

        <section className="info-block reverse">
          <div className="info-text">
            <h2>Nuestra misión</h2>
            <p>Brindar recursos teológicos de alta calidad, organizados por temas, que faciliten el estudio
               personal y compartido de la Palabra de Dios para todos aquellos que deseen profundizar.</p>
          </div>
          <LazyImg src="/images/adventistasjpeg.webp" alt="Nuestra misión" />
        </section>

        <section className="info-block">
          <div className="info-text">
            <h2>Nuestra visión</h2>
            <p>Ser un referente confiable y accesible de enseñanza bíblica, ayudando a cada creyente a
               estar preparado para compartir su fe con sabiduría, convicción y amor cristiano.</p>
          </div>
          <LazyImg src="/images/antena-historia-podcast-diluvio-universal.jpg" alt="Nuestra visión" />
        </section>
      </main>
    </div>
  );
};

export default Home;
