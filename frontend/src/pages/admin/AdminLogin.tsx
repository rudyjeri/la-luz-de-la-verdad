import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../../lib/api';
import './admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.login(email.trim(), password);
      setToken(res.token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-shell admin-shell--center">
      <div className="admin-login-wrap">
        <div className="admin-login-brand">
          <div className="admin-login-mark" aria-hidden>L</div>
          <h1>Panel de publicación</h1>
          <p>La Luz de la Verdad — acceso superadmin</p>
        </div>
        <form className="admin-card admin-login" onSubmit={onSubmit}>
          {error && <div className="admin-alert">{error}</div>}
          <label>
            Correo
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </label>
          <button type="submit" className="admin-btn" disabled={loading}>
            {loading ? 'Entrando…' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
