import { useState, useEffect } from "react";
import { Title } from "../../shared/components/Title";
import { InputField } from "../../shared/components/InputField";
import { TextAreaField } from "../../shared/components/TextAreaField";
import { RadioButtonGroup } from "./components/RadioButtonGroup";
import { useParams, useNavigate } from "react-router-dom";
import { getTeaArt, updateTeaArt } from "../../api/teaArtApi";
import TagCheckboxList from "./components/TagCheckboxList";
import { TeaArtFormData } from "../../types/teaArt";
import {
  SEASONS,
  TEMPERATURES,
  getSeasonValue,
  getTemperatureValue,
  Tag,
} from "../../types/teaArt";

const TeaArtEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TeaArtFormData>({
    title: "",
    description: "",
    season: 0,
    temperature: 0,
    tag_names: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);

  // 既存データの取得
  useEffect(() => {
    const fetchTeaArt = async () => {
      if (!id) {
        navigate("/tea-arts");
        return;
      }

      try {
        setIsDataLoading(true);
        const response = await getTeaArt(Number(id)); // idを数値に変換
        const teaArt = response.tea_art;

        // 取得したデータでformDataを初期化
        setFormData({
          title: teaArt.title || "",
          description: teaArt.description || "",
          season: getSeasonValue(teaArt.season), // 文字列→数値変換
          temperature: getTemperatureValue(teaArt.temperature), // 文字列→数値変換
          tag_names: teaArt.tags?.map((tag: Tag) => tag.name) || [],
        });

        // タグの選択状態も初期化
        setSelectedTagNames(teaArt.tags?.map((tag: Tag) => tag.name) || []);
      } catch (error) {
        console.error("茶アート取得エラー:", error);
        navigate("/tea-arts"); // エラー時は一覧ページに戻る
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchTeaArt();
  }, [id, navigate]);

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
    if (isLoading || !id) return;

    setIsLoading(true);

    try {
      // API用の形式に変換して送信
      const requestData = {
        tea_art: {
          ...formData,
          tag_names: selectedTagNames,
        },
      };

      await updateTeaArt(Number(id), requestData);
      navigate(`/tea-arts/${id}`); // メニュー詳細ページへ
    } catch (error) {
      console.error("茶アート作成エラー:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // データ取得中の表示
  if (isDataLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="loading loading-spinner loading-lg"></div>
          <span className="ml-2">データを読み込み中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 text-center">
      <div className="flex flex-col items-center justify-center px-10">
        <div className="mb-10 flex w-full max-w-2xl flex-col items-center gap-y-6">
          <Title title="Tea Art Edit" subtitle="ティーアートの編集" />
          <div className="text-left">
            説明文のテキストです。説明文のテキストです。説明文のテキストです。説明文のテキストです。説明文のテキストです。説明文のテキストです。説明文のテキストです。
          </div>
        </div>
      </div>

      {/* イラスト描画枠 */}
      <div className="flex items-center justify-center gap-4">
        <div className="size-[400px] bg-gray-400 text-white">
          作成済みTeaArt画像の表示（後で実装）
        </div>
      </div>

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
                disabled={isLoading}
              >
                {isLoading ? "変更中..." : "変更する"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeaArtEditPage;
