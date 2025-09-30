import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../../shared/components/Button";
import { apiClient } from "../../utils/axios";
import { useAuth } from "../../shared/contexts/AuthContext";

// フォームデータの型定義
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  bio?: string;
  avatar_preset?: number;
}

// APIレスポンスの型定義
interface SignupResponse {
  status: string;
  data?: {
    id: number;
    name: string;
    email: string;
  };
}

export default function Signup() {
  const { login: updateAuthState } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    bio: "",
    avatar_preset: 1,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // フォーム入力の処理
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 既に送信中の場合は何もしない
    if (isLoading) return;

    setIsLoading(true);
    setErrors([]);

    try {
      const response = await apiClient.post<SignupResponse>("/users", {
        user: formData,
      });

      if (
        response.status === 200 &&
        response.data.name &&
        response.data.email
      ) {
        await updateAuthState();
        // 成功時はボタンを無効化したまま遷移
        navigate("/", {
          state: { message: "ユーザー登録が完了しました！" },
        });
      }
    } catch (error: any) {

      if (error.response?.data?.errors) {
        // バックエンドからのバリデーションエラー
        const errorMessages = Object.values(
          error.response.data.errors
        ).flat() as string[];
        setErrors(errorMessages);
      } else {
        setErrors(["登録に失敗しました。もう一度お試しください。"]);
      }
    } finally {
      // エラーの場合のみボタンを再有効化
      // 成功時は遷移するので不要
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
              Googleで登録はこちらから
            </p>
          </div>
          <div className="divider josefin-sans text-secondary">OR</div> */}

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
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-8 text-base font-normal"
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
