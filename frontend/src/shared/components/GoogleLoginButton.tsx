import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./Button";

interface GoogleLoginButtonProps {
  onSuccess?: (authCode: string) => void;
  onError?: (error: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError
}) => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log('🎉 認可コード取得成功！', codeResponse);
      console.log('認可コード:', codeResponse.code);
      
      // 成功時のコールバック実行
      if (onSuccess) {
        onSuccess(codeResponse.code);
      }
    },
    onError: (error) => {
      console.error('❌ Google認証エラー:', error);
      if (onError) {
        onError(error);
      }
    },
    flow: 'auth-code', // 重要：認可コードフローを指定
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
