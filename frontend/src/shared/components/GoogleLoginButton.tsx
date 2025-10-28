import { use } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../contexts/AuthContext";
import { apiClient } from "../../utils/axios";
import type { GoogleLoginResponse } from "../../types/auth";
import { Button } from "./Button";
import { toast } from "sonner";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { setUser } = use(AuthContext);

  const login = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
    onSuccess: async (codeResponse) => {
      const authCode = codeResponse.code;
      console.log("認可コード取得成功:", authCode);

      try {
        const response = await apiClient.post<GoogleLoginResponse>(
          "/google_login",
          {
            code: authCode,
          }
        );
        setUser(response.data);
        // TOPページに遷移
        navigate("/");
        toast.success("ログインしました！");

      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error || "ログインに失敗しました";
        alert(`ログインエラー\n${errorMessage}`);
      }
    },
    onError: (error) => {
      alert("Google認証に失敗しました");
    },
  });

  return (
    <Button
      variant="google-btn"
      className="text-primary flex"
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
