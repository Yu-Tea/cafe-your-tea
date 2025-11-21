import TeaArtCard from "./TeaArtCard";
import type { TeaArt } from "@/types/teaArt";

interface TeaArtGridProps {
  teaArts: TeaArt[];
  emptyMessage?: string;
}

const TeaArtGrid = ({
  teaArts,
  emptyMessage = "ティーが存在していません。",
}: TeaArtGridProps) => {

  if (teaArts.length === 0) {
    return (
      <div className="py-4 text-center">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  // カード数が3つ以下のときの調整
  const getResponsiveGridClass = (itemCount: number) => {
    const baseClasses = "grid gap-x-4 gap-y-7";

    if (itemCount === 1) {
      return `${baseClasses} grid-cols-1 justify-items-center`;
    }

    if (itemCount === 2) {
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 justify-items-center`;
    }

    if (itemCount === 3) {
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center`;
    }

    return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center`;
  };

  return (
    <div className={getResponsiveGridClass(teaArts.length)}>
      {teaArts.map((teaArt) => (
        <TeaArtCard key={teaArt.id} teaArt={teaArt} />
      ))}
    </div>
  );
};

export default TeaArtGrid;
