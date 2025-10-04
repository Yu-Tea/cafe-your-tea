import { useState, useEffect } from "react";
import { Tag } from "../../../types/teaArt";
import { getTags } from "../../../api/tagApi";

interface SearchFormData {
  season: string;
  tagName: string;
  searchQuery: string;
}

interface TeaArtSearchFormProps {
  onSearch: (searchData: SearchFormData) => void;
  onReset: () => void;
}

export const TeaArtSearchForm = ({
  onSearch,
  onReset,
}: TeaArtSearchFormProps) => {
  const [formData, setFormData] = useState<SearchFormData>({
    season: "",
    tagName: "",
    searchQuery: "",
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // フォーム値の変更
  const handleChange = (key: keyof SearchFormData, value: string) => {
    const newFormData = { ...formData, [key]: value };
    setFormData(newFormData);

    // リアルタイム検索（デバウンス処理付き）
    onSearch(newFormData);
  };

  // 検索リセット
  const handleReset = () => {
    const resetData = { season: "", tagName: "", searchQuery: "" };
    setFormData(resetData);
    onReset();
  };

  // 検索条件があるかチェック
  const hasSearchConditions =
    formData.season || formData.tagName || formData.searchQuery;

  return (
    <div className="mb-6 flex items-center justify-center space-x-2">
      <span className="josefin-sans text-neutral pt-1 text-4xl font-light tracking-wider">
        Search
      </span>
      {/* 季節選択 */}
      <select
        value={formData.season}
        onChange={(e) => handleChange("season", e.target.value)}
        className="select select-neutral w-28"
      >
        <option value="">提供季節</option>
        <option value="通年">通年</option>
        <option value="春">春</option>
        <option value="夏">夏</option>
        <option value="秋">秋</option>
        <option value="冬">冬</option>
      </select>

      {/* タグ選択 */}
      <select
        value={formData.tagName}
        onChange={(e) => handleChange("tagName", e.target.value)}
        className="select select-neutral w-44"
        disabled={isLoading}
      >
        <option value=""># メニュータグ</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </select>

      {/* 検索入力 */}
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
          value={formData.searchQuery}
          onChange={(e) => handleChange("searchQuery", e.target.value)}
          placeholder="メニュー名または制作者名で検索"
          className="w-56 grow"
        />
      </label>

      {/* リセットボタン */}
      <div className="flex h-10 w-11 items-center justify-center">
        {hasSearchConditions && (
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-ghost btn-square"
            title="検索条件をリセット"
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
        )}
      </div>
    </div>
  );
};
