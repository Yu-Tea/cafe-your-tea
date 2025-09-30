import { useState, useEffect } from "react";
import { apiClient } from "../../utils/axios";
import type { User, AuthResponse } from "../../types/user";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await apiClient.get<AuthResponse>("/me");

      if (data.logged_in) {
        setUser({
          id: data.id!,
          name: data.name!,
          email: data.email!,
          bio: data.bio!,
          avatar_preset: data.avatar_preset!,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 新規登録・ログイン後の状態更新用
  const login = async () => {
    try {
      console.log("🔄 /me API呼び出し開始...");
      setLoading(true);
      const { data } = await apiClient.get<AuthResponse>("/me");
      console.log("✅ /me APIレスポンス:", data);

      if (data.logged_in) {
        const newUser = {
          id: data.id!,
          name: data.name!,
          email: data.email!,
          bio: data.bio!,
          avatar_preset: data.avatar_preset!,
        };

        setUser(newUser);
        console.log("✅ ユーザー状態更新完了:", newUser);
      } else {
        setUser(null);
        console.log('❌ ログイン状態ではありません');
      }
    } catch (error) {
      console.error("❌ 認証状態更新エラー:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/logout");
      setUser(null);
    } catch (error) {
      console.error("ログアウトエラー:", error);
      setUser(null); // エラーが発生してもローカル状態はクリア
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    isLoggedIn: !!user, // userがあればtrue
    loading,
    login,
    logout,
    refetch: checkAuth,
  };
};
