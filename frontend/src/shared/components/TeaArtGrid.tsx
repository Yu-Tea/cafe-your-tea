import React from 'react';
import TeaArtCard from './TeaArtCard';
import type { TeaArt } from '../../types/teaArt';

interface TeaArtGridProps {
  teaArts: TeaArt[];
  showAuthor?: boolean;
  currentUserId?: number;
  emptyMessage?: string;
}

const TeaArtGrid: React.FC<TeaArtGridProps> = ({ 
  teaArts, 
  showAuthor = true, 
  currentUserId,
  emptyMessage = "ティーが存在していません。"
}) => {
  if (teaArts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {teaArts.map((teaArt) => (
        <TeaArtCard
          key={teaArt.id}
          teaArt={teaArt}
          showAuthor={showAuthor}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default TeaArtGrid;