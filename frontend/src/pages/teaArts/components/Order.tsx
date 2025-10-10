import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaCommentDots } from "react-icons/fa6";
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
}

const Order = ({ teaArt }: OrderProps) => {
  // 注文の進行状況を管理
  const [orderStep, setOrderStep] = useState<
    "initial" | "preparing" | "serving" | "completed"
  >("initial");
  const [showTeaModal, setShowTeaModal] = useState(false);

  // 注文ボタンクリック処理
  const handleOrder = () => {
    setOrderStep("preparing");

    // 2秒後にティー提供モーダル表示
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

  return (
    <div className="my-15">
      {/* ティー提供モーダル */}
      {showTeaModal && (
        <OrderTeaModal
          onDrink={handleDrinkTea}
          teaImageUrl={teaArt?.image_url}
        />
      )}

      <div className="flex w-full items-end justify-center bg-[url(../images/order_bg.png)] bg-contain bg-center bg-repeat-x">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col gap-6 px-3 sm:h-80 sm:flex-row">
            <div className="flex-1">
              <OrderBubble
                orderStep={orderStep}
                onOrder={handleOrder}
                teaArt={teaArt}
              />
            </div>
            <img
              src="../images/kero_img_01.png"
              alt="ケロチャ"
              className="relative w-[300px] self-end object-contain"
            />
          </div>
        </div>
      </div>

      {/* 注文完了時のみ表示 */}
      {orderStep === "completed" && <CommentsForm />}
    </div>
  );
};

export default Order;
