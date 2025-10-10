import { FaCommentDots } from "react-icons/fa6";
import { FaArrowAltCircleDown } from "react-icons/fa";
import TwitterButton from "./TwitterButton";

interface OrderBubbleProps {
  orderStep: "initial" | "preparing" | "serving" | "completed";
  onOrder: () => void;
  teaArt?: {
    id: number;
    title: string;
    user: {
      name: string;
    };
  };
}

const OrderBubble = ({ orderStep, onOrder, teaArt }: OrderBubbleProps) => {
  const renderContent = () => {
    switch (orderStep) {
      case "initial":
        return (
          <>
            {/* 初期表示 */}
            <div>
              注文してくれたら、ボクがこのティーを作るケロ〜。
              <br />
              Xへの投稿や感想コメントも受け付けてるよ！
            </div>
            <button onClick={onOrder} className="btn btn-success mt-5 px-6">
              <FaCommentDots />
              注文する！
            </button>
          </>
        );

      case "preparing":
        return (
          <div className="flex items-center justify-center">
            {/* 1秒表示で自動的にモーダル追加 */}
            <span className="loading loading-spinner loading-md text-primary mr-3"></span>
            じゃあ作るよ〜！
          </div>
        );

      case "serving":
        return (
          <div>
            {/* モーダル表示時 */}
            心を込めて作ったよ。
            <br />
            どうぞお召し上がりくださいケロ〜！
          </div>
        );

      case "completed":
        return (
          <>
            {/* X投稿＆感想コメント募集 */}
            <div className="mb-4">
              美味しかった〜？
              <br />
              Xへの投稿や感想コメントもよろしくね〜！
            </div>
            {teaArt && (
              <TwitterButton
                teaArtId={teaArt.id}
                teaArtTitle={teaArt.title}
                teaArtUserName={teaArt.user.name}
                textVariant="order"
                className={`btn-accent gap-0.5 px-5`}
              />
            )}

            <div className="text-secondary mt-3 flex items-center justify-center space-x-1 text-sm">
              <FaArrowAltCircleDown />
              <span>感想コメントは下記フォームから</span>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-base-100 border-neutral/80 rounded-xl border-2 px-4 py-6 text-center">
      {renderContent()}
    </div>
  );
};

export default OrderBubble;
