import { motion } from "motion/react";
import { KerochaExpression } from "@/types/character";

// 表情パターン
export const EXPRESSIONS = {
  default: {
    eye: "normal",
    mouth: "normal",
    body: "normal",
  },
  normalOpenHai: {
    eye: "normal",
    mouth: "open",
    body: "hai",
  },
  smileNormalDown: {
    eye: "smile",
    mouth: "normal",
    body: "down",
  },
  smileNormalTouch: {
    eye: "smile",
    mouth: "normal",
    body: "touch",
  },
  smileOpenHai: {
    eye: "smile",
    mouth: "open",
    body: "hai",
  },
  smileOpenUp: {
    eye: "smile",
    mouth: "open",
    body: "up",
  },
  smileMunyaTouch: {
    eye: "smile",
    mouth: "munya",
    body: "touch",
  },
  ItomeNormalDown: {
    eye: "itome",
    mouth: "normal",
    body: "down",
  },
  ItomeOpenHai: {
    eye: "itome",
    mouth: "open",
    body: "hai",
  },
} as const;

interface KerochaCharacterProps {
  expression: KerochaExpression;
  className?: string;
  onClick?: () => void;
}

const Kerocha = ({
  expression,
  className = "",
  onClick,
}: KerochaCharacterProps) => {
  return (
    <motion.div className={`relative ${className}`} onClick={onClick}>
      {/* 体 */}
      <img
        src={`/images/kerocha/body_${expression.body}.png`}
        alt="みわくのボディー"
        className="h-auto w-full"
      />

      {/* 目 */}
      <img
        src={`/images/kerocha/eye_${expression.eye}.png`}
        alt="おめめ"
        className="absolute inset-0 h-full w-full object-contain"
      />

      {/* 口 */}
      <img
        src={`/images/kerocha/mouth_${expression.mouth}.png`}
        alt="おくち"
        className="absolute inset-0 h-full w-full object-contain"
      />
    </motion.div>
  );
};

export default Kerocha;
