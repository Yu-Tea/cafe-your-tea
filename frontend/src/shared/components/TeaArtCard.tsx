import React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { TeaArt } from "../../types/teaArt";
import { FaPenFancy, FaTrashAlt } from "react-icons/fa";
import TagButtonList from "../../pages/teaArts/components/TagButtonList";
import SeasonText from "../../pages/teaArts/components/SeasonText";

interface TeaArtCardProps {
  teaArt: TeaArt;
}

const TeaArtCard = ({ teaArt }: TeaArtCardProps) => {
  const navigate = useNavigate();

  // カード全体のクリック
  const handleCardClick = () => {
    navigate(`/tea-arts/${teaArt.id}`);
  };

  // 作者名クリック時はカードのクリックイベントを止める
  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-base-100 border-base-300 translate-y-1.5 cursor-pointer border-1 p-4 shadow-stone-400/20 transition duration-300 hover:translate-y-1 hover:shadow-lg flex flex-col"
      onClick={handleCardClick}
    >
      {/* 画像 */}
      <div className="h-[180px] bg-gray-300"></div>
      {/* テキスト */}
      <SeasonText teaArt={teaArt} className="mt-4 mb-0.5 text-lg" />
      <h3 className="text-secondary mb-1 font-bold">{teaArt.title}</h3>
      <TagButtonList teaArt={teaArt} />

      {/* 自作かどうかで表示変更する範囲ここから */}
      <div className="mt-1 flex items-end justify-end px-1 flex-1">
        {teaArt.is_owner ? (
          <>
            <Link
              to={`/tea-arts/${teaArt.id}/edit`}
              className="btn btn-xs btn-outline btn-accent mr-2"
            >
              <FaPenFancy />
              <span className="josefin-sans pt-0.5 font-normal">Edit</span>
            </Link>
            <Link to="#" className="btn btn-xs btn-outline btn-accent">
              <FaTrashAlt />
              <span className="josefin-sans pt-0.5 font-normal">Delete</span>
            </Link>
          </>
        ) : (
          <Link
            to={`/users/${teaArt.user.id}`}
            className="btn btn-xs btn-outline btn-accent font-normal"
            onClick={handleAuthorClick}
          >
            by {teaArt.user.name}
          </Link>
        )}
      </div>
      {/* 自作かどうかで表示変更する範囲ここまで */}
    </div>
  );
};

export default TeaArtCard;
