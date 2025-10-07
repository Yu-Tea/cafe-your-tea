import { useState, useRef } from "react";
import { Title } from "../../shared/components/Title";
import { InputField } from "../../shared/components/InputField";
import { TextAreaField } from "../../shared/components/TextAreaField";
import { RadioButtonGroup } from "./components/RadioButtonGroup";
import { useNavigate } from "react-router-dom";
import { createTeaArt } from "../../api/teaArtApi";
import { TeaArtFormData } from "../../types/teaArt";
import { SEASONS, TEMPERATURES } from "../../types/teaArt";
import TagCheckboxList from "./components/TagCheckboxList";
import TeaArtDraw, { TeaArtDrawRef } from "./components/TeaArtDraw";
import StatusDisplay from "../../shared/components/StatusDisplay";

const TeaArtCreatePage = () => {
  const navigate = useNavigate();

  // 描画関連のstate
  const drawRef = useRef<TeaArtDrawRef>(null);
  const [artBase64, setArtBase64] = useState<string | null>(null);
  const [hasArtContent, setHasArtContent] = useState(false);

  const [formData, setFormData] = useState<TeaArtFormData>({
    title: "",
    description: "",
    season: 0,
    temperature: 0,
    tag_names: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);

  // 季節と温度用のラジオボタン用の処理
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

    // 描画チェック
    let finalBase64 = artBase64;

    if (!finalBase64) {
      finalBase64 = drawRef.current?.getArtAsBase64() || null;
    }

    if (!finalBase64) {
      alert("ティーアートを描画してから作成してください");
      return;
    }

    setIsLoading(true);

    try {
      // API用の形式に変換して送信
      const requestData = {
        tea_art: {
          ...formData,
          tag_names: selectedTagNames,
          image_data: finalBase64,
          // tea_color: finalTeaColor,
        },
      };

      //  送信前にデータを確認！
      // console.log('=== 送信データの確認 ===');
      // console.log('全体データ:', requestData);

      await createTeaArt(requestData);
      navigate("/tea-arts"); // Menu一覧ページにリダイレクト
    } catch (error) {
      console.error("茶アート作成エラー:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ローディング状態
  if (isLoading) {
    return <StatusDisplay type="loading" />;
  }

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex flex-col items-center justify-center px-10">
        <div className="mb-10 flex w-full max-w-2xl flex-col items-center gap-y-6">
          <Title title="Tea Art" subtitle="ティーアートを描こう！" />
          <div>
            あなただけのオリジナルティーを作って、メニューに登録しよう！
            <br />
            （※登録後の編集ではティーのイラストは修正できないので注意してね）
          </div>
        </div>
      </div>

      {/* イラスト描画枠 */}
      <TeaArtDraw
        ref={drawRef}
        onArtComplete={setArtBase64}
        onArtChange={setHasArtContent}
      />

      {/* フォーム */}
      <div className="mt-10 px-10">
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-3xl flex-col gap-y-8"
          >
            {/* タイトル */}
            <InputField
              label="Title"
              type="text"
              name="title"
              value={formData.title}
              maxLength={15}
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
              maxLength={500}
              onChange={handleChange}
              placeholder="ティーの説明文"
              rows={5}
              required
              disabled={isLoading}
              note="※500文字以内"
            />

            {/* タグ選択 */}
            <div>
              <TagCheckboxList
                selectedTagNames={selectedTagNames}
                onChange={setSelectedTagNames}
              />
            </div>

            {/* 季節選択 */}
            <RadioButtonGroup
              label="ティーの提供季節"
              name="season"
              value={formData.season}
              options={SEASONS}
              onChange={handleRadioChange}
              disabled={isLoading}
            />

            {/* 温度選択 */}
            <RadioButtonGroup
              label="ティーの提供温度"
              name="temperature"
              value={formData.temperature}
              options={TEMPERATURES}
              onChange={handleRadioChange}
              disabled={isLoading}
              gridClassName="md:grid-cols-3"
            />

            {/* ボタン */}
            <div className="flex justify-center gap-x-6">
              <button
                type="submit"
                className="btn btn-primary px-8 text-base font-normal"
                disabled={isLoading || !hasArtContent}
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

export default TeaArtCreatePage;
