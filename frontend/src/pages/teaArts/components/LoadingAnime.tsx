import { useState, useEffect } from "react";

// 型定義
type LoadingType = "create" | "update";

interface LoadingAnimeProps {
  type?: LoadingType;
}

const LoadingAnime = ({ type = "create" }: LoadingAnimeProps) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const keroImages: string[] = [
    "/images/kero_load_01.png",
    "/images/kero_load_02.png",
  ];

  // メッセージの種類
  const messages: Record<LoadingType, string> = {
    create: "ティーをメニューに登録中だよ。\nしばらく待っててね！",
    update: "ティーのメニューを更新中だよ。\nもう少し待っててね！",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % keroImages.length);
    }, 1000); // 画像の切り替え時間

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col items-center justify-center p-5">
      <span className="zen-maru-gothic text-secondary text-center text-lg font-bold whitespace-pre-line">
        {messages[type]}
      </span>
      <img
        src={keroImages[currentImage]}
        alt="ケロチャ読み込み中"
        className="mx-auto mt-20 animate-bounce transition duration-2000"
      />
    </div>
  );
};

export default LoadingAnime;
