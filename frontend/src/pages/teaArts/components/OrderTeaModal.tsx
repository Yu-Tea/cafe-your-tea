import { FaCoffee } from "react-icons/fa";

interface OrderTeaModalProps {
  onDrink: () => void;
  teaImageUrl?: string;
}

const OrderTeaModal = ({ onDrink, teaImageUrl }: OrderTeaModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-600/90">
      <div className="mx-4 max-w-md p-8 text-center">
        <div className="mb-6">
          {/* ティー画像 */}
          <img
            src={teaImageUrl}
            alt="完成したティー"
            className="mx-auto object-cover"
          />
        </div>
        {/* テキスト */}
        <h3 className="text-base-100 mb-4 text-xl font-bold">
          ティーが完成したよ！
        </h3>
        <p className="text-base-100 mb-6">
          心を込めて作ったよ。
          <br />
          どうぞお召し上がりくださいケロ〜！
        </p>

        {/* ボタン */}
        <button
          onClick={onDrink}
          className="btn btn-success btn-lg font-normal"
        >
          <FaCoffee />
          ティーを飲む
        </button>
      </div>
    </div>
  );
};

export default OrderTeaModal;
