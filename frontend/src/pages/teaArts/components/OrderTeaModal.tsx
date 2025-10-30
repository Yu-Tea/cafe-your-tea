import { FaCoffee } from "react-icons/fa";

interface OrderTeaModalProps {
  onDrink: () => void;
  teaImageUrl?: string;
}

const OrderTeaModal = ({ onDrink, teaImageUrl }: OrderTeaModalProps) => {
  return (
    <div className="text-base-100 fixed inset-0 z-50 flex items-center justify-center bg-stone-600/90">
      <div className="mx-4 max-w-md space-y-6 p-8 text-center font-bold">
        <div className="">
          {/* ティー画像 */}
          <img
            src={teaImageUrl}
            alt="完成したティー"
            className="mx-auto object-cover"
          />
        </div>
        {/* テキスト */}
        <h3 className="mb-2 text-xl">ティーが完成したよ！</h3>
        <p className="zen-maru-gothic text-lg">
          心を込めて作ったよ。
          <br />
          どうぞお召し上がりくださいケロ〜！
        </p>

        {/* ボタン */}
        <button onClick={onDrink} className="btn btn-success btn-lg">
          <FaCoffee />
          ティーを飲む
        </button>
      </div>
    </div>
  );
};

export default OrderTeaModal;
