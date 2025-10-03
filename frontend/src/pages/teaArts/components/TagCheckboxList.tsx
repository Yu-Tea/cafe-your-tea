import { useState, useEffect } from "react";
import { Tag, getTags } from "../../../api/tagApi";

interface TagCheckboxListProps {
  selectedTagNames: string[];
  onChange: (tagNames: string[]) => void;
  maxTags?: number;
}

const TagCheckboxList = ({
  selectedTagNames,
  onChange,
  maxTags = 4,
}: TagCheckboxListProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 既存タグを取得
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const data = await getTags();
        setTags(data.tags);
      } catch (err) {
        setError("タグの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // チェックボックスの変更処理
  const handleCheckboxChange = (tagName: string, checked: boolean) => {
    if (checked) {
      // 追加する場合
      let newSelectedTags;

      if (selectedTagNames.length >= maxTags) {
        // 最大数に達している場合、最初の要素を削除して新しいタグを追加
        newSelectedTags = [...selectedTagNames.slice(1), tagName];
      } else {
        // 通常の追加
        newSelectedTags = [...selectedTagNames, tagName];
      }

      onChange(newSelectedTags);
    } else {
      // 削除する場合（変更なし）
      onChange(selectedTagNames.filter((name) => name !== tagName));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="text-gray-500">タグを読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-2">
      <div className="text-secondary">
        タグ
        <span className="text-sm">
          （{selectedTagNames.length}/{maxTags} 個選択中）
        </span>
      </div>

      <div className="grid grid-cols-5 gap-x-0.5 gap-y-2">
        {tags.map((tag) => (
          <label
            key={tag.id}
            className="hover:bg-base-300 flex items-center space-x-1.5 px-1 py-2"
          >
            <input
              type="checkbox"
              checked={selectedTagNames.includes(tag.name)}
              onChange={(e) => handleCheckboxChange(tag.name, e.target.checked)}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="text-sm">{tag.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagCheckboxList;
