import { motion, AnimatePresence } from "motion/react";
import { FaRegHandPointDown } from "react-icons/fa";

interface OrderTeaModalProps {
  onDrink: () => void;
  teaImageUrl?: string;
}

const OrderTeaModal = ({ onDrink, teaImageUrl }: OrderTeaModalProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
        }}
        className="text-base-100 fixed inset-0 z-50 flex items-center justify-center bg-[#4a6545]/90"
      >
        <div className="max-w-md px-2 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.0,
              delay: 0.5,
              ease: "easeOut",
            }}
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="josefin-sans flex justify-center space-x-2 text-5xl tracking-wide"
            >
              <FaRegHandPointDown />
              <span>Let's Drink!!</span>
              <FaRegHandPointDown />
            </motion.div>

            {/* ティー画像 */}
            <motion.button
              whileHover={{ scale: 1.03, rotate: 8 }}
              whileTap={{ scale: 0.97, rotate: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={onDrink}
              className="cursor-pointer"
            >
              <img
                src={teaImageUrl}
                alt="完成したティー"
                className="mx-auto object-cover"
              />
            </motion.button>
            <p className="zen-maru-gothic text-lg font-bold mt-2">
              ティーが完成したよ！
              <br />
              どうぞお召し上がりくださいケロ〜！
            </p>
          </motion.div>
          {/* テキスト */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderTeaModal;
