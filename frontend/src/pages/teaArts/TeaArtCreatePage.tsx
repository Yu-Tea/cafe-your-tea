import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "sonner";
import { createTeaArt } from "@/api/teaArtApi";
import { TeaArtFormData, SEASONS, TEMPERATURES } from "@/types/teaArt";
import { inVariants } from "@/utils/animations.ts";
import { RadioButtonGroup } from "./components/RadioButtonGroup";
import TeaArtDraw, { TeaArtDrawRef } from "./components/TeaArtDraw";
import { Title } from "@/shared/components/Title";
import { TextAreaField } from "@/shared/components/TextAreaField";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/Button";
import TagCheckboxList from "./components/TagCheckboxList";
import LoadingAnime from "./components/LoadingAnime";

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
        },
      };

      await createTeaArt(requestData);
      navigate("/tea-arts"); // Menu一覧ページにリダイレクト
      toast.success("ティーを登録しました");
    } catch (error) {
      console.error("ティー登録エラー:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ローディング状態
  if (isLoading) {
    return <LoadingAnime type="create" />;
  }

  return (
    <div className="space-y-10 p-5 sm:p-10">
      <Title title="Tea Art" subtitle="ティーアートを描こう！" />
      <motion.div
        variants={inVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center space-y-10"
      >
        <div className="text-left sm:text-center">
          あなただけのオリジナルティーを作って、メニューに登録しよう！
          <br />
          （※登録した後の編集時にはティーのイラスト修正はできないので注意してね）
        </div>

        {/* イラスト描画枠&ツール部分 */}
        <TeaArtDraw
          ref={drawRef}
          onArtComplete={setArtBase64}
          onArtChange={setHasArtContent}
        />

        {/* フォーム */}
        <form
          onSubmit={handleSubmit}
          className="mt-5 w-full max-w-3xl space-y-10"
        >
          {/* タイトル */}
          <div className="mb-5">
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
          </div>

          {/* 説明文 */}
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            maxLength={500}
            onChange={handleChange}
            placeholder="イラストの説明や、ティーの味や効能など、このティーについて自由にお書きください。"
            rows={5}
            required
            disabled={isLoading}
          />

          {/* 季節選択 */}
          <RadioButtonGroup
            label="ティーの提供季節"
            note="※ ティーに季節感があるかどうかでお選びください。メニューページでの絞り込み検索の対象になります。"
            name="season"
            value={formData.season}
            options={SEASONS}
            onChange={handleRadioChange}
            disabled={isLoading}
          />

          {/* 温度選択 */}
          <RadioButtonGroup
            label="ティーの提供温度"
            note="※ ティーの詳細ページのみに表示。ティーのイメージに合わせてお選びください。"
            name="temperature"
            value={formData.temperature}
            options={TEMPERATURES}
            onChange={handleRadioChange}
            disabled={isLoading}
            gridClassName="md:grid-cols-3"
          />

          {/* タグ選択 */}

          <TagCheckboxList
            note="※ イラストやティーのイメージに合わせてお選びください。4つまで選択でき、絞り込み検索の対象になります。"
            selectedTagNames={selectedTagNames}
            onChange={setSelectedTagNames}
          />

          {/* ボタン */}
          <div className="mt-10 text-center">
            <Button
              variant="st-btn"
              type="submit"
              className="btn-primary px-8 text-base"
              disabled={isLoading || !hasArtContent}
            >
              {isLoading ? "作成中..." : "作成する"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TeaArtCreatePage;
