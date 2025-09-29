import axios, { type AxiosInstance } from "axios";

let csrfToken: string | undefined;

export const setCsrfToken = (token: string | undefined) => {
  csrfToken = token;
};

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 環境変数があれば使用
  withCredentials: true,
  timeout: 30000,
});

// リクエストインターセプター（認証トークンを自動付与）
api.interceptors.request.use((config) => {
  // JWTトークンがあれば Authorization ヘッダーに追加
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // CSRFトークンがあれば追加
  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  
  return config;
});

// レスポンスインターセプター（CSRFトークンの更新）
api.interceptors.response.use(
  (response) => {
    const newToken = response.headers["x-csrf-token"];
    if (newToken) {
      setCsrfToken(newToken);
    }
    return response;
  },
  (error) => {
    const newToken = error.response?.headers["x-csrf-token"];
    if (newToken) {
      setCsrfToken(newToken);
    }
    return Promise.reject(error);
  },
);