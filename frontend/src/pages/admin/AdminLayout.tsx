import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { api, AuthUser, getToken, setToken } from '../../lib/api';
import './admin.css';

export default function AdminLayout() {
  const navigate = useNavigate();
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
    return <div className="admin-shell admin-shell--center">Cargando…</div>;
  }

  if (!getToken() || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  function logout() {
    setToken(null);
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <strong>Panel Admin</strong>
          <span className="admin-muted"> · {user.name} ({user.email})</span>
        </div>
        <nav className="admin-nav">
          <Link to="/admin">Artículos</Link>
          <Link to="/admin/articles/new">Nuevo</Link>
          <Link to="/" target="_blank">Ver web</Link>
          <button type="button" className="admin-linkbtn" onClick={logout}>Salir</button>
        </nav>
      </header>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}
