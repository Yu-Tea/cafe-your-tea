import { useState } from "react";
import { Title } from "../../shared/components/Title";
import { InputField } from "../../shared/components/InputField";
import { TextAreaField } from "../../shared/components/TextAreaField";
import { Link, useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../api/auth";
import { useAuth } from "../../shared/contexts/AuthContext";

// フォームデータの型定義
interface MyPageFormData {
  name: string;
  bio: string;
  avatar_preset: number;
}

const UserEditPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState<MyPageFormData>({
    name: user?.name || "",
    bio: user?.bio || "",
    avatar_preset: user?.avatar_preset || 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // 入力値変更用
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // アバター選択用
  const handleAvatarChange = (avatarPreset: number) => {
    setFormData((prev) => ({
      ...prev,
      avatar_preset: avatarPreset,
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
      const result = await updateUserProfile(formData);

      if (result.success && result.user) {
        setUser(result.user); // 認証状態を更新
        navigate(`/users/${user?.id}`, {
          state: { message: "プロフィールを更新しました！" },
        });
      } else {
        setErrors(
          Array.isArray(result.error)
            ? result.error
            : [result.error || "更新に失敗しました"]
        );
      }
    } catch (error) {
      setErrors(["予期しないエラーが発生しました"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-2xl flex-col gap-y-10">
          <Title title="Profile Edit" subtitle="プロフィール編集" />
          <div>閲覧者に公開されるプロフィール情報を編集できます。</div>

          {/* 🆕 エラーメッセージ表示 */}
          {errors.length > 0 && (
            <div className="alert alert-error">
              <ul className="list-inside list-disc">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* プロフィール編集 */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
            {/* 画像選択 */}
            <div className="flex flex-col gap-y-3 mb-6">
              <label className="text-left label josefin-sans text-secondary text-2xl font-light">Avatar Image</label>
              <div className="flex items-center justify-center gap-x-8">
                {[1, 2, 3, 4, 5].map((avatarNum) => (
                  <div
                    key={avatarNum}
                    className="flex flex-col items-center gap-y-2"
                  >
                    <img
                      src={`/images/avatar_user${avatarNum}.png`}
                      alt={`アバター${avatarNum}`}
                      className="cursor-pointer"
                      onClick={() => handleAvatarChange(avatarNum)}
                    />
                    <input
                      type="radio"
                      name="avatar_preset"
                      value={avatarNum}
                      checked={formData.avatar_preset === avatarNum}
                      onChange={() => handleAvatarChange(avatarNum)}
                      className="radio radio-primary"
                      disabled={isLoading}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 入力フォーム */}
            <InputField
              label="Name"
              type="text"
              name="name"
              maxLength={10}
              value={formData.name}
              onChange={handleChange}
              placeholder="お名前"
              required
              disabled={isLoading}
              note="※10文字以内"
            />

            <TextAreaField
              label="Profile"
              name="bio"
              maxLength={200}
              value={formData.bio}
              onChange={handleChange}
              placeholder="自己紹介文"
              required
              disabled={isLoading}
              note="※200文字以内"
            />

            {/* ボタン群（更新・キャンセル） */}
            <div className="flex justify-center gap-x-6">
              <button
                type="submit"
                className="btn btn-primary px-8 text-base font-normal"
                disabled={isLoading}
              >
                {isLoading ? "更新中..." : "更新する"}
              </button>

              <Link
                to="/mypage"
                className="btn btn-outline px-8 text-base font-normal"
              >
                キャンセル
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
