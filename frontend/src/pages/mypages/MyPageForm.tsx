import { useState } from "react";
import { Title } from "../../shared/components/Title";
import { InputField } from "../../shared/components/InputField";
import { TextAreaField } from "../../shared/components/TextAreaField";
import { Link, useNavigate } from "react-router-dom";

// フォームデータの型定義
interface MyPageFormData {
  name: string;
  bio: string;
  avatar_preset?: number;
}

const MyPageForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MyPageFormData>({
    name: "",
    bio: "",
  });

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
  const handleSubmit = async () => {};

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex items-center justify-center px-10">
        <div className="flex w-full max-w-2xl flex-col gap-y-10">
          <Title title="Profile Edit" subtitle="プロフィール編集" />
          <div>閲覧者に公開されるプロフィール情報を編集できます。</div>
          {/* プロフィール編集 */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            {/* 画像選択 */}
            <div className="item-center flex justify-center gap-x-10">
              <div className="item-center flex justify-center gap-x-2">
                <input
                  type="radio"
                  name="radio-4"
                  className="radio radio-primary"
                  defaultChecked
                />
                <img src="images/avatar_user1.png" className="size-16" />
              </div>

              <div className="item-center flex justify-center gap-x-2">
                <input
                  type="radio"
                  name="radio-4"
                  className="radio radio-primary"
                />
                <img src="images/avatar_user2.png" className="size-16" />
              </div>

              <div className="item-center flex justify-center gap-x-2">
                <input
                  type="radio"
                  name="radio-4"
                  className="radio radio-primary"
                />
                <img src="images/avatar_user3.png" className="size-16" />
              </div>
              <div className="item-center flex justify-center gap-x-2">
                <input
                  type="radio"
                  name="radio-4"
                  className="radio radio-primary"
                />
                <img src="images/avatar_user4.png" className="size-16" />
              </div>
              <div className="item-center flex justify-center gap-x-2">
                <input
                  type="radio"
                  name="radio-4"
                  className="radio radio-primary"
                />
                <img src="images/avatar_user5.png" className="size-16" />
              </div>
            </div>

            {/* 入力フォーム */}
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="お名前"
              required
              disabled={isLoading}
            />

            <TextAreaField
              label="Profile"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="自己紹介文"
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
        </div>
      </div>
    </div>
  );
};

export default MyPageForm;
