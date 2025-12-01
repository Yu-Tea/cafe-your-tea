import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "sonner";
import { getTeaArt, updateTeaArt } from "@/api/teaArtApi";
import {
  TeaArtFormData,
  SEASONS,
  TEMPERATURES,
  getSeasonValue,
  getTemperatureValue,
  Tag,
} from "@/types/teaArt";
import { inVariants } from "@/utils/animations.ts";
import { Title } from "@/shared/components/Title";
import { InputField } from "@/shared/components/InputField";
import { TextAreaField } from "@/shared/components/TextAreaField";
import { Button } from "@/shared/components/Button";
import { RadioButtonGroup } from "./components/RadioButtonGroup";
import StatusDisplay from "@/shared/components/StatusDisplay";
import TagCheckboxList from "./components/TagCheckboxList";
import LoadingAnime from "./components/LoadingAnime";

const TeaArtEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [imageUrl, setImageUrl] = useState<string>("");
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

        // 権限チェック - is_ownerがfalseの場合はアクセス拒否
        if (!teaArt.is_owner) {
          console.warn(
            "他のユーザーのティー編集ページへのアクセスが試行されました"
          );
          navigate(`/tea-arts/${id}`, {
            state: {
              message: "他のユーザーのティーは編集できません",
              messageType: "error",
            },
          });
          return;
        }

        setImageUrl(teaArt.image_url || "");

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
      toast.success("ティーを編集しました");
    } catch (error) {
      console.error("茶アート作成エラー:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // データ取得中の表示
  if (isDataLoading) {
    return <StatusDisplay type="loading" />;
  }

  // 「変更するボタン」押した後の処理中の画面
  if (isLoading) {
    return <LoadingAnime type="update" />;
  }

  return (
    <div className="space-y-10 p-5 sm:p-10">
      <Title title="Tea Art Edit" subtitle="ティーアートの編集" />
      <motion.div
        variants={inVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center space-y-10"
      >
        <p>ティーの情報の編集ができます。（※画像は修正できません。）</p>

        {/* 画像 */}
        <div className="border-secondary/20 relative aspect-[3/2] w-full max-w-[600px] overflow-hidden rounded-xl border-1">
          <img src={imageUrl} className="absolute h-full w-full object-cover" />
          <img
            src="/images/bg_table_big.png"
            alt="テーブル"
            className="h-full w-full object-cover"
          />
        </div>

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
            onChange={handleChange}
            placeholder="イラストの説明や、ティーの味や効能など、このティーについて自由にお書きください。"
            rows={5}
            required
            disabled={isLoading}
          />

          {/* 季節選択 */}
          <RadioButtonGroup
            label="ティーの提供季節"
            name="season"
            value={formData.season}
            options={SEASONS}
            onChange={handleRadioChange}
            disabled={isLoading}
            helpModalId="season-help"
            helpModalTitle="ティーの提供季節について"
            helpModalContent={
              <>
                <li>
                  ティーのイラストや設定に季節感があるかどうかでお選びください。
                </li>
                <li>
                  メニューやティー詳細ページで対応する季節が表示されます。
                </li>
                <li>
                  TOPページのPick Up
                  Teaコーナーで、該当する季節設定で取り上げられることがあります。
                </li>
                <li>メニューページでの絞り込み検索の対象になります。</li>
              </>
            }
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
            helpModalId="temperature-help"
            helpModalTitle="ティーの提供温度について"
            helpModalContent={
              <>
                <li>
                  このティーが「温かい」「冷たい」どちらの温度で提供されるのか、イメージで選択してください。
                </li>
                <li>
                  ティーの詳細ページのみに表示されるオマケのような要素です。
                </li>
              </>
            }
          />

          {/* タグ選択 */}
          <TagCheckboxList
            selectedTagNames={selectedTagNames}
            onChange={setSelectedTagNames}
            helpModalId="tag-help"
            helpModalTitle="タグについて"
            helpModalContent={
              <>
                <li>
                  イラストやティーのイメージに合わせてお選びください。4つまで選択できます。
                </li>
                <li>
                  メニューやティー詳細ページで設定したタグが表示されます。また、このタグボタンから同じタグを持つティーの一覧ページに移動できます。
                </li>
                <li>メニューページでの絞り込み検索の対象になります。</li>
              </>
            }
          />

          {/* ボタン */}
          <div className="mt-10 text-center">
            <Button
              variant="st-btn"
              type="submit"
              className="btn-primary px-8 text-base"
              disabled={isLoading}
            >
              {isLoading ? "変更中..." : "変更する"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TeaArtEditPage;
