import { useState } from "react";
import { Title } from "../../shared/components/Title";
import { InputField } from "../../shared/components/InputField";
import { TextAreaField } from "../../shared/components/TextAreaField";
import { RadioButtonGroup } from "./components/RadioButtonGroup";
import { useNavigate } from "react-router-dom";
import { createTeaArt } from "../../api/teaArt";

// フォームデータの型定義
interface TeaArtFormData {
  title: string;
  description: string;
  season: number;
  temperature: number;
}

const New = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TeaArtFormData>({
    title: "",
    description: "",
    season: 0,
    temperature: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // 季節の選択肢
  const seasons = [
    { id: "season-0", value: 0, label: "通年" },
    { id: "season-1", value: 1, label: "春期限定" },
    { id: "season-2", value: 2, label: "夏期限定" },
    { id: "season-3", value: 3, label: "秋期限定" },
    { id: "season-4", value: 4, label: "冬期限定" },
  ];

  // 温度の選択肢
  const temperatures = [
    { id: "temp-0", value: 0, label: "HOT" },
    { id: "temp-1", value: 1, label: "ICE" },
    { id: "temp-2", value: 2, label: "HOT & ICE" },
  ];

  // ラジオボタン用の処理（seasonとtemperature）
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value), // 数値に変換
    }));
  };

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

    try {
      // API用の形式に変換して送信
      const requestData = {
        tea_art: formData, // formDataをtea_artプロパティでラップ
      };
      await createTeaArt(requestData);
      navigate("/menu"); // Menuページにリダイレクト
    } catch (error) {
      console.error("茶アート作成エラー:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex flex-col items-center justify-center px-10">
        <div className="mb-10 flex w-full max-w-2xl flex-col items-center gap-y-6">
          <Title title="Tea Art" subtitle="ティーアートを描こう！" />
          <div className="text-left">
            説明文のテキストです。説明文のテキストです。説明文のテキストです。説明文のテキストです。説明文のテキストです。説明文のテキストです。説明文のテキストです。
          </div>
        </div>
      </div>

      {/* イラスト描画枠 */}
      <div className="flex items-center justify-center gap-4">
        <div className="size-[500px] bg-gray-400 text-white">
          描画（後で実装）
        </div>
        <div className="h-[500px] w-[300px] bg-gray-400 text-white">
          ツール（後で実装）
        </div>
      </div>

      {/* フォーム */}
      <div className="mt-10 flex flex-col items-center justify-center px-10">
        <div className="flex w-full max-w-2xl flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-2xl flex-col gap-y-8"
          >
            {/* タイトル */}
            <InputField
              label="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="ティーのメニュー名"
              
              required
              disabled={isLoading}
              note="※15文字以内"
            />
            {/* 説明文 */}
            <TextAreaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="ティーの説明文"
              rows={5}
              required
              disabled={isLoading}
              note="※500文字以内"
            />
            {/* 季節選択 */}
            <RadioButtonGroup
              label="ティーの季節"
              name="season"
              value={formData.season}
              options={seasons}
              onChange={handleRadioChange}
              disabled={isLoading}
            />

            {/* 温度選択 */}
            <RadioButtonGroup
              label="ティーの温度"
              name="temperature"
              value={formData.temperature}
              options={temperatures}
              onChange={handleRadioChange}
              disabled={isLoading}
              gridClassName="md:grid-cols-3"
            />

            {/* ボタン */}
            <div className="flex justify-center gap-x-6">
              <button
                type="submit"
                className="btn btn-primary px-8 text-base font-normal"
                disabled={isLoading}
              >
                {isLoading ? "作成中..." : "作成する"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
