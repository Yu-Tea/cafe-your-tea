import type React from "react";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { api } from "../../utils/axios";

interface UserProps {
  id: number;
  name: string;
  email: string;
  provider: string;
  bio: string;
  avatar_preset: number;
}

interface UserContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  loading: boolean;
  fetchUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get<{ user: UserProps }>(
        "/api/v1/current_user"
      );
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// カスタムフック
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
