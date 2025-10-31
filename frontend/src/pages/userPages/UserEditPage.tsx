import { useState, useEffect } from "react";
import { Title } from "../../shared/components/Title";
import { InputField } from "../../shared/components/InputField";
import { TextAreaField } from "../../shared/components/TextAreaField";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserProfile, getUser } from "../../api/userApi";
import { useAuth } from "../../shared/contexts/AuthContext";
import { toast } from "sonner";
import StatusDisplay from "../../shared/components/StatusDisplay";

// フォームデータの型定義
interface MyPageFormData {
  name: string;
  bio: string;
  avatar_preset: number;
}

const UserEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, refetch } = useAuth();
  const [formData, setFormData] = useState<MyPageFormData>({
    name: currentUser?.name || "",
    bio: currentUser?.bio || "",
    avatar_preset: currentUser?.avatar_preset || 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true); // ページ読み込み状態
  const [errors, setErrors] = useState<string[]>([]);

  // ページ初期化処理
  useEffect(() => {
    const initializePage = async () => {
      try {
        // 編集対象のユーザー情報を取得
        const userData = await getUser(Number(id));

        // 権限チェック - is_ownerがfalseの場合はアクセス拒否
        if (!userData.is_owner) {
          console.warn("他のユーザーの編集ページへのアクセスが試行されました");
          navigate(`/users/${id}`, {
            state: {
              message: "他のユーザーのプロフィールは編集できません",
              messageType: "error",
            },
          });
          return;
        }

        // 権限がある場合は編集フォームを初期化
        setFormData({
          name: userData.name || "",
          bio: userData.bio || "",
          avatar_preset: userData.avatar_preset || 1,
        });
      } catch (error: any) {
        console.error("ユーザー情報の取得に失敗:", error);
        setErrors(["ユーザー情報の取得に失敗しました"]);
        navigate("/users");
      } finally {
        setIsPageLoading(false);
      }
    };

    initializePage();
  }, [id, currentUser, navigate]);

  // ローディング中の表示
  if (isPageLoading) {
    return <StatusDisplay type="loading" />;
  }

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
      await updateUserProfile(formData);

      // AuthContext の状態を更新（最新のユーザー情報を取得）
      await refetch();

      navigate(`/users/${currentUser?.id}`);
      toast.success("プロフィールを編集しました");
    } catch (error: any) {
      console.error("プロフィール更新エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-5 sm:p-10">
      <div className="w-full max-w-2xl space-y-8">
        <Title title="Profile Edit" subtitle="プロフィール編集" />
        <div className="text-center">
          閲覧者に公開されるプロフィール情報を編集できます。
        </div>

        {/* エラーメッセージ表示 */}
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
          <div className="mb-6 flex flex-col gap-y-3">
            <label className="label josefin-sans text-secondary text-left text-2xl font-light">
              Avatar Image
            </label>
            <div className="flex items-center justify-center gap-x-3 sm:gap-x-8">
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
            maxLength={15}
            value={formData.name}
            onChange={handleChange}
            placeholder="お名前"
            required
            disabled={isLoading}
            note="※15文字以内"
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
          />

          {/* ボタン群（更新・キャンセル） */}
          <div className="mt-5 text-center">
            <button
              type="submit"
              className="btn btn-primary px-8 text-base font-normal"
              disabled={isLoading}
            >
              {isLoading ? "更新中..." : "更新する"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;
