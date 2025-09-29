import { useState, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../shared/components/Button";
import { useUser } from "../../shared/contexts/UserContext";
import { api } from "../../utils/axios";

// フォームデータの型定義
interface LoginFormData {
  email: string;
  password: string;
}

// APIレスポンスの型定義（修正版）
interface LoginResponse {
  message?: string;
  error?: string; // 
  errors?: string[];
  user?: {
    id: number;
    name: string;
    email: string;
  };
  // token?: string; ← Cookie方式では不要
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUser } = useUser();

  // サインアップからのメッセージを取得
  const successMessage = location.state?.message;

  // フォームデータの状態管理
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // エラーメッセージとローディング状態
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 入力値の変更ハンドラー
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // フォーム送信ハンドラー（修正版）
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      // 修正：新しいaxiosインスタンスを使用
      const response = await api.post("/login", {
        user: formData
      });

      const data: LoginResponse = response.data;

      console.log("ログイン成功:", data);

      // ここでUserContextを更新
      await fetchUser();

      // ホームページへリダイレクト
      navigate("/", {
        state: { message: `${data.user?.name}さん、おかえりなさい！` },
      });

    } catch (error: any) {
      console.error("ログインエラー:", error);
      
      // エラーハンドリング（修正版）
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else if (errorData.error) {
          setErrors([errorData.error]);
        } else if (errorData.message) {
          setErrors([errorData.message]);
        } else {
          setErrors(["ログインに失敗しました"]);
        }
      } else {
        setErrors(["ネットワークエラーが発生しました。もう一度お試しください。"]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-sm flex-col gap-y-5">
          <div>
            <h1 className="text-center">Login</h1>
            <p className="text-secondary text-center text-sm font-bold tracking-widest">
              ログイン
            </p>
          </div>

          {/* Google認証 */}
          <div>
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
          <div className="divider josefin-sans text-secondary">OR</div>

          {/* 成功メッセージ表示 */}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {/* エラーメッセージ表示 */}
          {errors.length > 0 && (
            <div className="alert alert-error">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* メールアドレス認証 */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            {/* メールアドレス入力 */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="label josefin-sans text-secondary text-2xl font-light"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="メールアドレス"
                className="input input-primary w-full"
                required
                disabled={isLoading}
              />
            </div>

            {/* パスワード入力 */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="label josefin-sans text-secondary text-2xl font-light"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="パスワード"
                className="input input-primary w-full"
                required
                disabled={isLoading}
              />
            </div>

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
