import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../utils/axios";
import { useAuth } from "../../shared/contexts/AuthContext";
import { Title } from "../../shared/components/Title";
import { InputField } from "../../shared/components/InputField";
import { toast } from "sonner";
import GoogleLoginButton from "@/shared/components/GoogleLoginButton";

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
  id: number;
  name: string;
  email: string;
}

export default function SignUp() {
  const { login: updateAuthState } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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

      if (response.status === 200 && response.data) {
        await updateAuthState();
        // 登録完了時は自動ログインしてTOPページにリダイレクト
        navigate("/");
        toast.success("ユーザー登録が完了しました！");
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
        <div className="flex w-full max-w-sm flex-col gap-y-2">
          <Title title="Sign Up" subtitle="新規登録" />

          <div>
            {/* Google認証ボタン */}
            <GoogleLoginButton />
            <p className="text-secondary mt-2 text-center text-sm">
              Googleで登録はこちらから
            </p>
          </div>
          <div className="divider josefin-sans text-secondary">OR</div>

          {/* アラートメッセージ */}
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-1">
            <InputField
              label="Name"
              type="text"
              name="name"
              maxLength={15}
              value={formData.name}
              onChange={handleChange}
              placeholder="お名前 ※15文字以内"
              required
              disabled={isLoading}
            />

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
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              placeholder="パスワード ※6文字以上"
              required
              disabled={isLoading}
            />

            <InputField
              label="Password Confirmation"
              type="password"
              name="password_confirmation"
              minLength={6}
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="パスワード確認"
              required
              disabled={isLoading}
            />

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

          {/* loginページへの案内 */}
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
