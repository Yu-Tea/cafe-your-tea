import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "../../shared/components/Button";
import { apiClient } from "../../utils/axios";
import { useAuth } from "../../shared/contexts/AuthContext";
import { Title } from "../../shared/components/Title";
import { InputField } from "../../shared/components/InputField";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // フォームデータのstate
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // エラーとローディング状態
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 成功メッセージ（新規登録からの遷移時）
  const [successMessage] = useState<string | null>(
    location.state?.message || null
  );

  // フォーム入力の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setErrors([]);

    try {
      const response = await apiClient.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        // AuthContextのlogin関数を呼び出し（/meエンドポイントを使用）
        await login();

        // ログイン成功時はマイページにリダイレクト
        navigate(`/users/${user?.id}`, {
          state: { message: "ログインしました！" },
        });
      }
    } catch (error: any) {
      if (error.response?.data?.status) {
        setErrors([error.response.data.status]);
      } else if (error.response?.data?.error) {
        setErrors([error.response.data.error]);
      } else {
        setErrors([
          "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-sm flex-col gap-y-5">
          <Title title="Login" subtitle="ログイン" />

          {/* Google認証は後で追加 */}
          {/* <div>
            <Link to="#">
              <Button variant="google-btn" className="text-primary flex">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google logo"
                  className="mb-0.5 h-5 w-5"
                  loading="lazy"
                />
                Login with Google
              </Button>
            </Link>
            <p className="text-secondary mt-2 text-center text-sm">
              Googleでログインはこちらから
            </p>
          </div>
          <div className="divider josefin-sans text-secondary">OR</div> */}

          {/* アラートメッセージ */}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errors.length > 0 && (
            <div className="alert alert-error">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* フォーム */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="メールアドレス"
              required
              disabled={isLoading}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="パスワード"
              required
              disabled={isLoading}
            />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary josefin-sans px-8 text-xl font-normal"
                disabled={isLoading}
              >
                {isLoading ? "ログイン中..." : "Login"}
              </button>
            </div>
          </form>

          {/* signupページへの案内 */}
          <div className="text-center">
            アカウントをお持ちでない方は
            <Link
              to="/signup"
              className="text-primary hover:text-secondary underline"
            >
              新規登録
            </Link>
            へ
          </div>
        </div>
      </div>
    </div>
  );
}
