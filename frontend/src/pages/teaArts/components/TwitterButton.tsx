import { FaXTwitter } from "react-icons/fa6";

interface TwitterButtonProps {
  teaArtId: number;
  teaArtTitle: string;
  teaArtUserName?: string;
  textVariant?: "default" | "order";
  className?: string;
}

const TwitterButton = ({
  teaArtId,
  teaArtTitle,
  teaArtUserName = "",
  textVariant = "default",
  className = "",
}: TwitterButtonProps) => {
  // テキスト切り替え用
  const getShareText = () => {
    switch (textVariant) {
      case "order":
        return `${teaArtUserName}さんが作成した『${teaArtTitle}』を飲んだよ！\n#Cafe_Your_Tea\n`;
      default:
        return `『${teaArtTitle}』を作ったよ。飲みに来てね！\n#Cafe_Your_Tea\n`;
    }
  };

  const handleShareToX = () => {
    // OGP用URLを適用
    const ogpUrl = `${import.meta.env.VITE_API_BASE_URL}/ogp/tea_arts/${teaArtId}`;
    const text = getShareText();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(ogpUrl)}`;

    window.open(twitterUrl, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleShareToX}
      className={`btn font-normal ${className}`}
    >
      <FaXTwitter />
      で共有
    </button>
  );
};

export default TwitterButton;
