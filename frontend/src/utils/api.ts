import { apiClient } from './axios';
import type { AuthResponse } from '../types/user';

// バックエンドのレスポンス構造に合わせた型定義
interface LogoutResponse {
  message: string; // "ログアウトしました"
}

interface MeResponse {
  logged_in: boolean;
  id?: number;
  name?: string;
  email?: string;
  bio?: string;
  avatar_preset?: number;
}


// 認証関連のAPI呼び出し
export const authApi = {
  // ユーザー情報取得
  getCurrentUser: () => apiClient.get<AuthResponse>('/me'),
  
  // ログイン
  login: (email: string, password: string) =>
    apiClient.post('/login', { email, password }),
  
  // ログアウト
  logout: () => apiClient.post<LogoutResponse>('/logout'),
  
  // ユーザー登録
  register: (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    bio?: string;
    avatar_preset?: number;
  }) => apiClient.post('/users', { user: userData }),
};

// 🎯 ログアウト専用のヘルパー関数（JWTCookie対応版）
export const performLogout = async (): Promise<boolean> => {
  try {
    console.log('ログアウト処理開始...');
    
    // バックエンドにログアウトリクエスト
    const response = await authApi.logout();
    
    console.log('✅ Logout response:', response.data);
    
    // 🎯 JWTがCookieで管理されているため、バックエンドで削除済み
    // フロントエンドのローカルストレージのみクリア
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Axiosのデフォルトヘッダーもクリア（念のため）
    delete apiClient.defaults.headers.common['Authorization'];
    
    return true;
  } catch (error) {
    console.error('❌ ログアウトエラー:', error);
    
    // エラーが発生してもローカルの状態はクリア
    localStorage.removeItem('user');
    sessionStorage.clear();
    delete apiClient.defaults.headers.common['Authorization'];
    
    // Cookieのクリーンアップ（フォールバック）
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    return false;
  }
}