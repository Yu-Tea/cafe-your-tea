import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { KerochaExpression } from "@/types/character";
import Kerocha, { EXPRESSIONS } from "@/shared/components/Kerocha";
import type { Comment } from "@/types/comment";
import OrderBubble from "./OrderBubble";
import OrderTeaModal from "./OrderTeaModal";
import CommentsForm from "./CommentsForm";

interface OrderProps {
  teaArt?: {
    id: number;
    title: string;
    image_url: string;
    user: {
      name: string;
    };
  };
  onCommentCreated?: (comment: Comment) => void;
}

const Order = ({ teaArt, onCommentCreated }: OrderProps) => {
  const [currentExpression, setCurrentExpression] = useState<KerochaExpression>(
    EXPRESSIONS.normalOpenHai
  );

  // 注文の進行状況を管理
  const [orderStep, setOrderStep] = useState<
    "initial" | "preparing" | "serving" | "completed" | "comment_send"
  >("initial");
  const [showTeaModal, setShowTeaModal] = useState(false);

  // orderStep に応じて表情を変更
  useEffect(() => {
    switch (orderStep) {
      case "initial":
        setCurrentExpression(EXPRESSIONS.normalOpenHai);
        break;
      case "preparing":
        setCurrentExpression(EXPRESSIONS.smileNormalTouch);
        break;
      case "serving":
        setCurrentExpression(EXPRESSIONS.smileNormalTouch);
        break;
      case "completed":
        setCurrentExpression(EXPRESSIONS.smileOpenUp);
        break;
      case "comment_send":
        setCurrentExpression(EXPRESSIONS.smileOpenHai);
        break;
      default:
        setCurrentExpression(EXPRESSIONS.normalOpenHai);
    }
  }, [orderStep]);

  // 注文ボタンクリック処理
  const handleOrder = () => {
    setOrderStep("preparing");

    // 1秒後にティー提供モーダル表示
    setTimeout(() => {
      setOrderStep("serving");
      setShowTeaModal(true);
    }, 1000);
  };

  // ティーを飲むボタンクリック処理
  const handleDrinkTea = () => {
    setShowTeaModal(false);
    setOrderStep("completed");
  };

  // コメント作成後の処理
  const handleCommentCreated = (comment: Comment) => {
    setOrderStep("comment_send");
    onCommentCreated?.(comment); // 親に新規コメントを渡す
    console.log("コメントが作成されました！");
  };

  return (
    <div className="my-15">
      {/* ティー提供モーダル */}
      {showTeaModal && (
        <OrderTeaModal
          onDrink={handleDrinkTea}
          teaImageUrl={teaArt?.image_url}
        />
      )}

      <motion.div className="flex w-full items-end justify-center bg-[url(/images/order_bg.png)] bg-cover bg-right-bottom bg-repeat-x sm:bg-contain sm:bg-center">
        <div className="w-full max-w-[800px]">
          <div className="flex flex-col gap-6 px-5 sm:h-80 sm:flex-row">
            {/* フキダシ */}
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.2 }}
              className="min-h-[190px] flex-1"
            >
              <OrderBubble
                orderStep={orderStep}
                onOrder={handleOrder}
                teaArt={teaArt}
              />
            </motion.div>
            {/* ケロチャ */}
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: -40, rotate: 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
                delay: 1.0,
              }}
              className="flex items-end justify-center"
            >
              <Kerocha
                expression={currentExpression}
                className="max-w-[300px]"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 注文完了時のみ表示 */}
      {orderStep === "completed" && teaArt && (
        <CommentsForm
          teaArtId={teaArt.id}
          onCommentCreated={handleCommentCreated}
        />
      )}
    </div>
  );
};

export default Order;
