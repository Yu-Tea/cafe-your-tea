import { apiClient } from "../utils/axios";
import type {
  AuthResponse,
  PasswordResetRequest,
  PasswordResetResponse,
} from "../types/auth";

// バックエンドのレスポンス構造に合わせた型定義
interface LogoutResponse {
  message: string; // "ログアウトしました"
}

// 認証関連のAPI呼び出し
export const authApi = {
  // ユーザー情報取得
  getCurrentUser: () => apiClient.get<AuthResponse>("/me"),

  // ログイン
  login: (email: string, password: string) =>
    apiClient.post("/login", { email, password }),

  // ログアウト
  logout: () => apiClient.post<LogoutResponse>("/logout"),

  // ユーザー登録
  register: (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    bio?: string;
    avatar_preset?: number;
  }) => apiClient.post("/users", { user: userData }),
};

// ログアウト用
export const performLogout = async (): Promise<boolean> => {
  try {
    // バックエンドにログアウトリクエスト
    const response = await authApi.logout();
    console.log("Logout response:", response.data);

    // JWTがCookieで管理されているため、バックエンドで削除済み
    // フロントエンドのローカルストレージのみクリア
    localStorage.removeItem("user");
    sessionStorage.clear();

    // Axiosのデフォルトヘッダーもクリア（念のため）
    delete apiClient.defaults.headers.common["Authorization"];

    return true;
  } catch (error) {
    // エラーが発生してもローカルの状態はクリア
    localStorage.removeItem("user");
    sessionStorage.clear();
    delete apiClient.defaults.headers.common["Authorization"];

    // Cookieのクリーンアップ（フォールバック）
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return false;
  }
};

// パスワードリセット申請
export const requestPasswordReset = async (
  email: string
): Promise<PasswordResetResponse> => {
  const response = await apiClient.post<PasswordResetResponse>(
    "/password_resets",
    {
      email,
    } as PasswordResetRequest
  );
  return response.data;
};

// トークンの有効性確認
export const validateResetToken = async (
  token: string
): Promise<{ valid: boolean; email?: string; message?: string }> => {
  const response = await apiClient.get(`/password_resets/${token}`);
  return response.data;
};

// パスワード更新
export const updatePassword = async (
  token: string,
  password: string,
  passwordConfirmation: string
): Promise<{ message: string }> => {
  const response = await apiClient.patch(`/password_resets/${token}`, {
    user: {
      password,
      password_confirmation: passwordConfirmation,
    },
  });
  return response.data;
};
