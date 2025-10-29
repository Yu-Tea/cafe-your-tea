import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// レスポンスのインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    // 401エラーは認証確認の正常フローなのでログ出力しない
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }

    // その他のエラーはログ出力
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// リクエストのインターセプター
apiClient.interceptors.request.use(
  (config: any) => {
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error: any) => Promise.reject(error)
);
