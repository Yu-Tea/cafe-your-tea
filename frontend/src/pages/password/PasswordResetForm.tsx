import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { validateResetToken, updatePassword } from "@/api/auth";
import { Title } from "@/shared/components/Title";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/Button";
import StatusDisplay from "@/shared/components/StatusDisplay";

const PasswordResetForm = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState("");

  // トークンの有効性チェック
  useEffect(() => {
    if (!token) {
      toast.error("無効なリンクです");
      navigate("/login");
      return;
    }

    const checkToken = async () => {
      try {
        const result = await validateResetToken(token);
        if (result.valid) {
          setTokenValid(true);
          setUserEmail(result.email || "");
          toast.success("パスワードリセット画面を表示しました");
        } else {
          setTokenValid(false);
          toast.error(result.message || "無効なリンクです");
        }
      } catch (error: any) {
        setTokenValid(false);
        if (error.response?.status === 404) {
          toast.error(
            "無効なリンクです。パスワードリセットを再度申請してください。"
          );
        } else if (error.response?.status === 422) {
          toast.error(
            "トークンが期限切れです。パスワードリセットを再度申請してください。"
          );
        } else {
          toast.error("トークンの確認に失敗しました。");
        }
      }
    };

    checkToken();
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    setLoading(true);

    // バリデーション
    if (password !== passwordConfirmation) {
      toast.error("パスワードが一致しません");
      setLoading(false);
      return;
    }

    try {
      await updatePassword(token, password, passwordConfirmation);

      // 成功トーストを表示
      toast.success("パスワードを更新しました！ログイン画面に移動します...", {
        duration: 3000,
      });

      // 2秒後にログイン画面にリダイレクト
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Password reset error:", error);

      if (error.response?.status === 404) {
        toast.error(
          "無効なリンクです。パスワードリセットを再度申請してください。"
        );
      } else if (error.response?.status === 422) {
        const errorData = error.response.data;
        if (errorData.errors) {
          // バリデーションエラーの場合
          const errorMessages = Object.values(errorData.errors).flat();
          toast.error(errorMessages.join(", "));
        } else {
          toast.error(
            "トークンが期限切れです。パスワードリセットを再度申請してください。"
          );
        }
      } else {
        toast.error("パスワードの更新に失敗しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  };

  // トークン確認中の表示
  if (tokenValid === null) {
    return <StatusDisplay type="loading" />;
  }

  // トークンが無効な場合
  if (tokenValid === false) {
    return (
      <div className="flex flex-col items-center justify-center p-5 sm:p-10">
        <Title title="Password Reset" subtitle="パスワードリセット" />
        <p className="my-8 text-center">リンクが無効または期限切れです。</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/password-reset">
            <Button variant="btn" className="btn-outline btn-primary">
              リセットを再申請
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="btn" className="btn-outline btn-secondary">
              ログインページ
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // メインフォーム（成功画面は削除してトーストのみ）
  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-5 sm:p-10">
      <Title title="New Password" subtitle="パスワード更新" />
      {userEmail && (
        <p className="text-center">{userEmail} のパスワードを変更します。</p>
      )}
      <div className="w-full max-w-sm space-y-8">
        {/* フォーム */}
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
          <InputField
            label="Password"
            type="password"
            name="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="パスワード ※6文字以上"
            required
          />

          <InputField
            label="Password Confirmation"
            type="password"
            name="password-confirmation"
            minLength={6}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            disabled={loading}
            placeholder="パスワード確認"
            required
          />

          <div className="text-center">
            <Button
              variant="btn"
              type="submit"
              className="btn-primary text-base"
            >
              {loading ? "更新中..." : "パスワードを更新"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
