import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../shared/components/Button";

// フォームデータの型定義
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// APIレスポンスの型定義
interface SignupResponse {
  message?: string;
  errors?: string[];
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export default function Signup() {
  const navigate = useNavigate();

  // フォームデータの状態管理
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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

  // フォーム送信ハンドラー
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: formData }),
      });

      const data: SignupResponse = await response.json();

      if (response.ok) {
        console.log("登録成功:", data);
        // 成功時はログインページへリダイレクト
        navigate("/login", {
          state: { message: "登録が完了しました。ログインしてください。" },
        });
      } else {
        // エラーハンドリング
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors([data.message || "登録に失敗しました"]);
        }
      }
    } catch (error) {
      console.error("ネットワークエラー:", error);
      setErrors(["ネットワークエラーが発生しました。もう一度お試しください。"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-sm flex-col gap-y-5">
          <div>
            <h1 className="text-center">Sign Up</h1>
            <p className="text-secondary text-center text-sm font-bold tracking-widest">
              新規登録
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
              Googleで登録はこちらから
            </p>
          </div>
          <div className="divider josefin-sans text-secondary">OR</div>

          {/* メールアドレス認証 */}

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            <div className="flex flex-col">
              <label className="label josefin-sans text-secondary text-2xl font-light">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="お名前"
                className="input input-primary w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col">
              <label className="label josefin-sans text-secondary text-2xl font-light">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="メールアドレス"
                className="input input-primary w-full"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="flex flex-col">
              <label className="label josefin-sans text-secondary text-2xl font-light">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="パスワード"
                className="input input-primary w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col">
              <label className="label josefin-sans text-secondary text-2xl font-light">
                Password Confirmation
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="パスワード確認"
                className="input input-primary w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-8 text-base font-normal"
                disabled={isLoading}
              >
                {isLoading ? "登録中..." : "登録する"}
              </button>
            </div>
          </form>
          <div className="text-center">
            すでにアカウントをお持ちの方は
            <Link
              to="/login"
              className="text-primary hover:text-secondary underline"
            >
              ログイン
            </Link>
            へ
          </div>
        </div>
      </div>
    </div>
  );
}
