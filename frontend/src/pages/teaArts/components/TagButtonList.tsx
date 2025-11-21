import type { TeaArt } from "@/types/teaArt";
import { Link } from "react-router-dom";

interface TagButtonListProps {
  teaArt: TeaArt;
  className?: string;
}

// タグ部分クリック時はカードのクリックイベントを止める
const handleTagClick = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const TagButtonList = ({ teaArt, className = "" }: TagButtonListProps) => {
  return (
    <div className={`text-left ${className}`}>
      {teaArt.tags.map((tag) => (
        <Link
          to={`/tea-arts/tag/${tag.id}`}
          key={tag.id}
          className="link link-success hover:btn-success transition-colors"
          onClick={handleTagClick}
        >
          # {tag.name}
        </Link>
      ))}
    </div>
  );
};

export default TagButtonList;
