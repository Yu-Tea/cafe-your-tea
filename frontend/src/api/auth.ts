import { apiClient } from "../utils/axios";
import type {
  AuthResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../types/user";

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

  // プロフィール更新
  updateProfile: (profileData: UpdateProfileRequest) =>
    apiClient.put<UpdateProfileResponse>("/user", { user: profileData }),
};

// ログアウト専用のヘルパー関数（JWTCookie対応版）
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

// プロフィール更新専用のヘルパー関数
export const updateUserProfile = async (
  profileData: UpdateProfileRequest
): Promise<{ success: boolean; user?: any; error?: string }> => {
  try {
    console.log("プロフィール更新開始...", profileData);

    const response = await authApi.updateProfile(profileData);

    console.log("Profile update response:", response.data);

    // ローカルストレージのユーザー情報も更新
    const updatedUser = response.data.user;
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return {
      success: true,
      user: updatedUser,
    };
  } catch (error: any) {
    console.error("プロフィール更新エラー:", error);

    return {
      success: false,
      error: error.response?.data?.error || "プロフィールの更新に失敗しました",
    };
  }
};
