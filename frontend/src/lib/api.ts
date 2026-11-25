const API_BASE = (import.meta as any).env?.VITE_API_BASE || '/api';

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export type CmsArticle = {
  id: number;
  slug: string;
  topic: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  body_html?: string;
  status: 'draft' | 'published' | string;
  published_at?: string | null;
  updated_at?: string;
};

const TOKEN_KEY = 'luz_admin_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (!token) localStorage.removeItem(TOKEN_KEY);
  else localStorage.setItem(TOKEN_KEY, token);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Error ${res.status}`);
  }
  return data as T;
}

export const api = {
  login(email: string, password: string) {
    return request<{ token: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  me() {
    return request<{ user: AuthUser }>('/auth/me');
  },
  adminArticles() {
    return request<{ articles: CmsArticle[] }>('/admin/articles');
  },
  adminArticle(id: number) {
    return request<{ article: CmsArticle }>(`/admin/articles/${id}`);
  },
  publicArticles(topic?: string) {
    const q = topic ? `?topic=${encodeURIComponent(topic)}` : '';
    return request<{ articles: CmsArticle[] }>(`/articles${q}`);
  },
  getArticle(slug: string) {
    return request<{ article: CmsArticle }>(`/articles/${encodeURIComponent(slug)}`);
  },
  createArticle(payload: Partial<CmsArticle> & { title: string; body_html?: string }) {
    return request<{ article: CmsArticle }>('/articles', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  updateArticle(id: number, payload: Partial<CmsArticle> & { body_html?: string }) {
    return request<{ article: CmsArticle }>(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
  deleteArticle(id: number) {
    return request<{ ok: boolean }>(`/articles/${id}`, { method: 'DELETE' });
  },
  async uploadImage(file: File) {
    const headers = new Headers();
    const token = getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    const body = new FormData();
    body.append('image', file);
    const res = await fetch(`${API_BASE}/uploads/image`, {
      method: 'POST',
      headers,
      body,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || `Error ${res.status}`);
    }
    return data as { url: string; bytes: number; width?: number; height?: number };
  },
};
