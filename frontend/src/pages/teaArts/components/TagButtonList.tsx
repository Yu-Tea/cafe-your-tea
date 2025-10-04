import type { TeaArt } from "../../../types/teaArt";
import { Link } from "react-router-dom";

interface TagButtonListProps {
  teaArt: TeaArt;
  textSize?: "xs" | "sm";
}

// 作者名クリック時はカードのクリックイベントを止める
  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

const TagButtonList = ({ teaArt, textSize = "sm" }: TagButtonListProps) => {
  return (
    <div className="space-x-2 text-left">
      {teaArt.tag_names.map((tagName, index) => (
        <Link
          to={`/tea-arts/tag/${encodeURIComponent(tagName)}`}
          key={index}
          className={`link link-success text-${textSize} hover:btn-success rounded-full transition-colors`}
          onClick={handleAuthorClick}
        >
          # {tagName}
        </Link>
      ))}
    </div>
  );
};

export default TagButtonList;
