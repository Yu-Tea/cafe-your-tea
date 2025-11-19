import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "sonner";
import { apiClient } from "@/utils/axios";
import { inVariants } from "@/utils/animations.ts";
import { useAuth } from "@/shared/contexts/AuthContext";
import { Title } from "@/shared/components/Title";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/Button";
import GoogleLoginButton from "@/shared/components/GoogleLoginButton";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        await login();

        // ログイン成功時はTOPページにリダイレクト
        navigate("/");
        toast.success("ログインしました");
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
    <div className="flex flex-col items-center justify-center space-y-2 p-5 sm:p-10">
      <Title title="Login" subtitle="ログイン" />
      <motion.div
        variants={inVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-sm space-y-2"
      >
        <div>
          {/* Google認証ボタン */}
          <GoogleLoginButton />
          <p className="text-secondary mt-2 text-center text-sm">
            Googleでログインはこちらから
          </p>
        </div>
        <div className="divider josefin-sans text-secondary">OR</div>

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
        <form onSubmit={handleSubmit} className="flex flex-col">
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
            placeholder="パスワード"
            required
            disabled={isLoading}
          />
          <div className="text-center">
            <Button
              variant="st-btn"
              type="submit"
              className="btn-primary px-8 text-base"
              disabled={isLoading}
            >
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>
          </div>
        </form>

        {/* signupページへの案内 */}
        <div className="mt-4 space-y-1.5 text-center text-sm">
          <p>
            パスワードをお忘れの方は
            <Link
              to="/password-reset"
              className="text-primary hover:text-secondary underline"
            >
              こちら
            </Link>
            へ
          </p>
          <p>
            アカウントをお持ちでない方は
            <Link
              to="/signup"
              className="text-primary hover:text-secondary underline"
            >
              新規登録
            </Link>
            へ
          </p>
        </div>
      </motion.div>
    </div>
  );
}
