import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { api, AuthUser, getToken, setToken } from '../../lib/api';
import './admin.css';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    api
      .me()
      .then((r) => setUser(r.user))
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="admin-shell admin-shell--center admin-loading">Cargando panel…</div>;
  }

  if (!getToken() || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  function logout() {
    setToken(null);
    navigate('/admin/login', { replace: true });
  }

  const onArticles = location.pathname === '/admin' || location.pathname.startsWith('/admin/articles');
  const onNew = location.pathname === '/admin/articles/new';

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div className="admin-brand">
          <div className="admin-brand__mark" aria-hidden>L</div>
          <div className="admin-brand__text">
            <strong>La Luz de la Verdad</strong>
            <span>{user.name} · {user.email}</span>
          </div>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className={onArticles && !onNew ? 'admin-nav--active' : undefined}>
            Artículos
          </Link>
          <Link to="/admin/articles/new" className={onNew ? 'admin-nav--active' : undefined}>
            Nuevo
          </Link>
          <Link to="/" target="_blank" rel="noreferrer">Ver web</Link>
          <button type="button" className="admin-linkbtn admin-linkbtn--ghost" onClick={logout}>
            Salir
          </button>
        </nav>
      </header>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}
