import type React from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../../utils/axios";

interface UserProps {
	logged_in?: boolean;
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
	undefined,
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserProps | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchUser = useCallback(async (): Promise<void> => {
		try {
			const response = await api.get<UserProps>("/check_login_status");
			if (response.data.logged_in) {
				setUser(response.data);
			} else {
				setUser(null);
			}
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
		<UserContext value={{ user, setUser, loading, fetchUser }}>
			{children}
		</UserContext>
	);
};