import type { TeaArt } from "../../../types/teaArt";

interface SeasonTextProps {
  teaArt: TeaArt;
  className?: string;
}

const SeasonText = ({ teaArt, className = "" }: SeasonTextProps) => {
  // ✅ 季節に応じた色クラスを返す関数
  const getSeasonColorClass = (season: string): string => {
    switch (season) {
      case "Spring":
        return "text-accent/80"; // ピンク色
      case "Summer":
        return "text-primary/70"; // 黄緑色
      case "Autumn":
        return "text-warning/70"; // 山吹色
      case "Winter":
        return "text-info/80"; // 水色
      default:
        return "text-secondary/80"; // デフォルト色
    }
  };
  return (
    <div
      className={`${getSeasonColorClass(teaArt.season)} josefin-sans font-light ${className}`}
    >
      {teaArt.season} Season
    </div>
  );
};

export default SeasonText;
