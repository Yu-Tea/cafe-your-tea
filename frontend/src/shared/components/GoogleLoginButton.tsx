import { use } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext, useAuth } from "../contexts/AuthContext";
import { apiClient } from "@/utils/axios";
import type { GoogleLoginResponse } from "@/types/auth";
import { Button } from "./Button";
import { toast } from "sonner";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const authContext = use(AuthContext);
  const { login: updateAuthState } = useAuth();

  if (!authContext) {
    throw new Error("GoogleLoginButton must be used within AuthProvider");
  }
  const { setUser } = authContext;

  const login = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
    onSuccess: async (codeResponse) => {
      const authCode = codeResponse.code;

      try {
        const response = await apiClient.post<GoogleLoginResponse>(
          "/google_login",
          {
            code: authCode,
          }
        );
        setUser(response.data);
        await updateAuthState();
        // TOPページに遷移
        navigate("/");
        toast.success("ログインしました！");
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error || "ログインに失敗しました";
        alert(`ログインエラー\n${errorMessage}`);
      }
    },
    onError: () => {
      alert("Google認証に失敗しました");
    },
  });

  return (
    <Button
      variant="google-btn"
      className="text-primary mt-5 flex"
      onClick={() => login()}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google logo"
        className="mb-0.5 h-5 w-5"
        loading="lazy"
      />
      Login with Google
    </Button>
  );
};

export default GoogleLoginButton;
