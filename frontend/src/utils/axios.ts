import axios from 'axios';

// axiosインスタンスの作成
export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true, // Cookieを含める
  headers: {
    'Content-Type': 'application/json',
  },
});

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401エラーは認証確認の正常フローなのでログ出力しない
    if (error.response?.status === 401) {
      // 必要に応じて認証エラー用の処理を追加
      return Promise.reject(error);
    }
    
    // その他のエラーはログ出力
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// リクエストインターセプター（必要に応じて）
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);
