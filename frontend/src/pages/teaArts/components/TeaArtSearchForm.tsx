import { useState, useEffect, useRef } from "react";
import { Tag } from "@/types/teaArt";
import { getTags } from "@/api/tagApi";

interface SearchFormData {
  season: string;
  tag_id: number | null;
  search_text: string;
}

interface TeaArtSearchFormProps {
  onSearch: (searchData: SearchFormData) => void;
  onReset: () => void;
  hasResults?: boolean | null; // null = 未絞り込み, true = 絞り込みありかつ結果あり, false = 絞り込みありかつ結果なし
  searchConditions: SearchFormData;
}

export const TeaArtSearchForm = ({
  onSearch,
  onReset,
  hasResults = null, // デフォルトは未絞り込み
  searchConditions,
}: TeaArtSearchFormProps) => {
  const [formData, setFormData] = useState<SearchFormData>(searchConditions);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // デバウンス用のrefを追加
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // タグ一覧の取得
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const response = await getTags();
        setTags(response.tags || []);
      } catch (error) {
        console.error("タグ取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  // クリーンアップ用
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // フォーム値の変更
  const handleSeasonChange = (value: string) => {
    const newFormData = { ...formData, season: value };
    setFormData(newFormData);
    onSearch(newFormData);
  };

  const handleTagChange = (value: string) => {
    const tag_id = value ? Number(value) : null;
    const newFormData = { ...formData, tag_id };
    setFormData(newFormData);
    onSearch(newFormData);
  };

  const handleSearchTextChange = (value: string) => {
    // フォームの状態は即座に更新
  const newFormData = { ...formData, search_text: value };
  setFormData(newFormData);
  
  // 既存のタイマーをクリア
  if (debounceTimerRef.current) {
    clearTimeout(debounceTimerRef.current);
  }
  
  // 新しいタイマーを設定（500ms後に検索実行）
  debounceTimerRef.current = setTimeout(() => {
    onSearch(newFormData);
  }, 500);
  };

  // 検索リセット
  const handleReset = () => {
    // リセット時もタイマーをクリア
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    const resetData = { season: "", tag_id: null, search_text: "" };
    setFormData(resetData);
    onReset();
  };

  // 検索条件があるかチェック
  const hasSearchConditions =
    formData.season || formData.tag_id || formData.search_text;

  // ケロチャのセリフ
  const titleText = (() => {
    if (hasResults === null) return "ティーを探すならここに入力してね！";
    return hasResults
      ? "こんなティーがあるよ！"
      : "その条件のティーはまだないみたい…";
  })();

  // ケロチャの画像
  const imageSrc = (() => {
    if (hasResults === null) return "images/kero_menu_01.png";
    return hasResults ? "images/kero_menu_02.png" : "images/kero_menu_03.png";
  })();

  return (
    <div className="flex flex-col items-center">

      {/* ケロチャ */}
      <div className="relative top-6 flex w-full justify-center">
        <div className="text-secondary/80 zen-maru-gothic mt-1 mr-1 w-full max-w-[340px] ml-5 sm:ml-0 text-left sm:text-right font-bold sm:mt-2">
          {titleText}
        </div>
        <img src={imageSrc} className="mr-3 w-[120px] sm:mr-8" />
      </div>

      {/* 検索バー部分 */}
      <div className="text-secondary bg-base-300 z-10 flex w-full flex-col items-center justify-center space-y-3 rounded-lg px-4 py-4 sm:mb-2 sm:flex-row sm:space-y-0 sm:space-x-1.5 lg:w-auto">
        <div className="flex w-full space-x-1.5 sm:w-auto">
          {/* 季節選択 */}
          <select
            value={formData.season}
            onChange={(e) => handleSeasonChange(e.target.value)}
            className="select select-neutral w-2/5 sm:w-28"
          >
            <option value="">提供季節</option>
            <option value="all_seasons">通年</option>
            <option value="spring">春</option>
            <option value="summer">夏</option>
            <option value="autumn">秋</option>
            <option value="winter">冬</option>
          </select>

          {/* タグ選択 */}
          <select
            value={formData.tag_id || ""}
            onChange={(e) => handleTagChange(e.target.value)}
            className="select select-neutral w-3/5 sm:w-44"
            disabled={isLoading}
          >
            <option value=""># メニュータグ</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        {/* 検索入力フォーム */}
        <div className="flex w-full space-x-1.5">
          <label className="input input-neutral flex items-center">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="text"
              value={formData.search_text}
              onChange={(e) => handleSearchTextChange(e.target.value)}
              placeholder="メニュー名または制作者名で検索"
              className="w-54 grow"
            />
          </label>

          {/* リセットボタン */}
          <div className="flex h-10 w-11 items-center justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-square btn-outline btn-secondary rounded"
              disabled={!hasSearchConditions}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
