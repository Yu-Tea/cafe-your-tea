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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
      {filteredTeaArts.map((teaArt) => (
        <TeaArtCard key={teaArt.id} teaArt={teaArt} />
      ))}
    </div>
  );
};

export default TeaArtGrid;
