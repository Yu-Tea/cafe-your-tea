import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { api } from "../../utils/axios";

interface UserProps {
  id: number;
  name: string;
  email: string;
  logged_in?: boolean;
}

interface UserContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// カスタムフック
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ユーザー情報を取得する関数
  const fetchUser = useCallback(async (): Promise<void> => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser({ ...userData, logged_in: true });
      } else {
        // トークンが無効な場合
        localStorage.removeItem("authToken");
        setUser(null);
      }
    } catch (error) {
      console.error("ユーザー情報取得エラー:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ログアウト関数
  const logout = useCallback(async (): Promise<void> => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await fetch("http://localhost:3000/logout", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("ログアウトエラー:", error);
    } finally {
      localStorage.removeItem("authToken");
      setUser(null);
    }
  }, []);

  // 初回マウント時にユーザー情報を取得
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
