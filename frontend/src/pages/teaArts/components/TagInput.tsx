import React, { useState } from 'react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  placeholder = "タグを入力してEnterキーを押してください",
  maxTags = 4
}) => {
  const [inputValue, setInputValue] = useState('');

  // タグ追加処理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    
    // バリデーション
    if (!trimmedValue) return;
    if (tags.includes(trimmedValue)) {
      alert('同じタグは追加できません');
      return;
    }
    if (tags.length >= maxTags) {
      alert(`タグは最大${maxTags}個まで追加できます`);
      return;
    }
    if (trimmedValue.length > 20) {
      alert('タグは20文字以内で入力してください');
      return;
    }

    onChange([...tags, trimmedValue]);
    setInputValue('');
  };

  // タグ削除処理
  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      {/* タグ表示エリア */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 text-green-600 hover:text-green-800 focus:outline-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 入力フィールド */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={tags.length >= maxTags}
        />
        <button
          type="button"
          onClick={addTag}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 focus:outline-none"
          disabled={tags.length >= maxTags}
        >
          追加
        </button>
      </div>

      <p className="text-sm text-gray-500">
        {tags.length}/{maxTags} 個のタグが追加されています
      </p>
    </div>
  );
};