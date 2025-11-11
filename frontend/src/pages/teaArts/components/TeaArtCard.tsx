import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FaPenFancy } from "react-icons/fa";
import type { TeaArt } from "@/types/teaArt";
import { TeaDeleteButton } from "./TeaDeleteButton";
import TagButtonList from "./TagButtonList";
import SeasonText from "./SeasonText";

interface TeaArtCardProps {
  teaArt: TeaArt;
  onDeleteSuccess?: () => void;
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
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ y: 2 }}
      transition={{ duration: 0.2 }}
      className="bg-base-100 border-base-300 flex translate-y-1.5 cursor-pointer flex-col border-1 p-4 shadow-stone-400/20 transition-shadow hover:shadow-lg sm:max-w-[308px]"
      onClick={handleCardClick}
    >
      {/* 画像 */}
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <img
          src={teaArt.image_url}
          alt={teaArt.title}
          className="absolute h-full w-full object-cover"
        />
        <img
          src="/images/bg_table_small.png"
          alt="テーブル"
          className="h-full w-full object-cover"
        />
      </div>
      {/* テキスト */}
      <SeasonText
        teaArt={teaArt}
        className={`mt-4 mb-0.5 text-center text-lg`}
      />
      <h3 className="text-secondary mb-1 text-center font-bold">
        {teaArt.title}
      </h3>
      <TagButtonList teaArt={teaArt} className={`space-x-2 text-sm`} />

      {/* 自作かどうかで表示変更する範囲ここから */}
      <div className="mt-2 flex flex-1 items-end justify-end space-x-2 px-1">
        {teaArt.is_owner ? (
          <>
            <Link
              to={`/tea-arts/${teaArt.id}/edit`}
              className="btn btn-xs btn-outline btn-accent"
              onClick={handleAuthorClick}
            >
              <FaPenFancy />
              <span className="josefin-sans pt-0.5 font-normal">Edit</span>
            </Link>

            <TeaDeleteButton
              teaArtId={teaArt.id}
              teaArtTitle={teaArt.title}
              className="btn-xs btn-outline btn-accent"
              spanClassName="josefin-sans pt-0.5"
              text="Delete"
              redirectAfterDelete={false}
            />
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
    </motion.div>
  );
};

export default TeaArtCard;
