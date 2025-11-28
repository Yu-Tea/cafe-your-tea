import { motion, AnimatePresence } from "motion/react";
import { FaCommentDots } from "react-icons/fa6";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Button } from "@/shared/components/Button";
import TwitterButton from "./TwitterButton";

interface OrderBubbleProps {
  orderStep: "initial" | "preparing" | "serving" | "completed" | "comment_send";
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
            <div className="zen-maru-gothic text-secondary font-bold">
              注文してくれたら、ボクがティーを作るケロ〜。
              <br className="hidden sm:block" />
              Xへの投稿や感想コメントも受け付けてるよ！
            </div>
            <div className="text-center">
              <Button
                variant="st-btn"
                onClick={onOrder}
                className="btn-success mt-5 px-6"
              >
                <FaCommentDots />
                注文する！
              </Button>
            </div>
          </>
        );

      case "preparing":
        return (
          <div className="zen-maru-gothic text-secondary flex items-center justify-center font-bold">
            {/* 1秒表示で自動的にモーダル追加 */}
            <span className="loading loading-spinner loading-md text-primary mr-3"></span>
            じゃあ作るよ〜！
          </div>
        );

      case "serving":
        return (
          <div className="zen-maru-gothic text-secondary font-bold">
            {/* モーダル表示時 */}
            ティーが完成したよ！
            <br className="hidden sm:block" />
            どうぞお召し上がりくださいケロ〜！
          </div>
        );

      case "completed":
        return (
          <>
            {/* X投稿＆感想コメント募集 */}
            <div className="zen-maru-gothic text-secondary mb-4 font-bold">
              美味しかった〜？
              <br className="hidden sm:block" />
              Xへの投稿や感想コメントもよろしくね！
            </div>
            {teaArt && (
              <div className="text-center">
                <TwitterButton
                  teaArtId={teaArt.id}
                  teaArtTitle={teaArt.title}
                  teaArtUserName={teaArt.user.name}
                  textVariant="order"
                  className={`btn-accent gap-0.5 px-5`}
                />
              </div>
            )}

            <motion.div
              animate={{
                y: [0, 3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-secondary mt-3 flex items-center justify-center space-x-1 text-sm"
            >
              <FaArrowAltCircleDown />
              <span>感想コメントは下記フォームから</span>
            </motion.div>
          </>
        );

      case "comment_send":
        return (
          <>
            {/* 感想コメント送信後 */}
            <div className="zen-maru-gothic text-secondary mb-4 font-bold">
              わ〜い感想ありがと〜！
              <br className="hidden sm:block" />
              Xへの投稿もよろしくね〜！
            </div>
            {teaArt && (
              <div className="text-center">
                <TwitterButton
                  teaArtId={teaArt.id}
                  teaArtTitle={teaArt.title}
                  teaArtUserName={teaArt.user.name}
                  textVariant="order"
                  className={`btn-accent gap-0.5 px-5`}
                />
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={orderStep}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-base-100 border-neutral/80 rounded-xl border-2 px-5 py-6 sm:text-center"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderBubble;
