import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "@/utils/axios";
import type { UserMe } from "@/types/user";
import type { AuthResponse } from "@/types/auth";

interface AuthContextType {
  user: UserMe | null;
  setUser: (user: UserMe | null) => void;
  isLoggedIn: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserMe | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await apiClient.get<AuthResponse>("/me");

      if (data.logged_in) {
        setUser({
          id: data.id!,
          name: data.name!,
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

  const login = async () => {
    try {
      console.log("/me API呼び出し開始...");

      setLoading(true);
      const { data } = await apiClient.get<AuthResponse>("/me");

      console.log("/me APIレスポンス:", data);

      if (data.logged_in) {
        const newUser = {
          id: data.id!,
          name: data.name!,
          bio: data.bio!,
          avatar_preset: data.avatar_preset!,
        };

        setUser(newUser);
        console.log("ユーザー状態更新完了:", newUser);
      } else {
        setUser(null);
        console.log("ログイン状態ではありません");
      }
    } catch (error) {
      console.error("認証状態更新エラー:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/logout");
      setUser(null);
      console.log("ログアウト状態更新完了");
    } catch (error) {
      console.error("ログアウトエラー:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: !!user,
        loading,
        login,
        logout,
        refetch: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
