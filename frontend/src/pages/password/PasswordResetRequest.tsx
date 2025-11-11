import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { requestPasswordReset } from "@/api/auth";
import { Title } from "@/shared/components/Title";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/Button";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await requestPasswordReset(email);

      // 成功時のメッセージ表示
      toast.success(
        response.message || "パスワードリセット手順を送信しました",
        {
          duration: 4000,
          description: "メールをご確認ください",
        }
      );

      // 成功時はログインページにリダイレクト
      setTimeout(() => {
        navigate("/login");
      }, 1500); // 少し遅延を入れてメッセージを読ませる
    } catch (error: any) {
      console.error("Password reset error:", error);

      // セキュリティ対策：エラーが発生しても同じメッセージを表示
      // これによりメールアドレスの存在を推測されることを防ぐ
      toast.success("パスワードリセット手順を送信しました", {
        duration: 4000,
        description: "メールをご確認ください",
      });

      // エラー時もログインページにリダイレクト
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 sm:p-10">
      <Title title="Password Reset" subtitle="パスワードリセット" />
      <p className="my-8 text-left text-sm sm:text-center">
        登録されているメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。
        <br />
        ※Google認証で登録された方は、「Googleでログイン」をご利用ください。
      </p>
      <div className="w-full max-w-sm space-y-8">
        {/* フォーム */}
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="メールアドレス"
            required
            disabled={isLoading}
          />

          <div className="text-center">
            <Button
              variant="st-btn"
              type="submit"
              className="btn btn-primary px-8 text-base font-normal"
              disabled={isLoading}
            >
              {isLoading ? "送信中..." : "送信"}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          ログインページは
          <Link
            to="/login"
            className="text-primary hover:text-secondary underline"
          >
            こちら
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
