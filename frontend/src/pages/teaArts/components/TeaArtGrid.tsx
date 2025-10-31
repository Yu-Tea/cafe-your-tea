import React from "react";
import TeaArtCard from "./TeaArtCard";
import type { TeaArt } from "../../../types/teaArt";

interface TeaArtGridProps {
  teaArts: TeaArt[];
  emptyMessage?: string;
  filterByUserId?: boolean;
  userId?: number;
}

const TeaArtGrid: React.FC<TeaArtGridProps> = ({
  teaArts,
  emptyMessage = "ティーが存在していません。",
  filterByUserId = false,
  userId,
}) => {
  // マイページ用にユーザーidで絞り込み
  const filteredTeaArts =
    filterByUserId && userId !== undefined
      ? teaArts.filter((teaArt) => teaArt.user.id === userId)
      : teaArts;

  if (filteredTeaArts.length === 0) {
    return (
      <div className="py-8 text-center">
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
    <div className={getResponsiveGridClass(filteredTeaArts.length)}>
      {filteredTeaArts.map((teaArt) => (
        <TeaArtCard key={teaArt.id} teaArt={teaArt} />
      ))}
    </div>
  );
};

export default TeaArtGrid;
