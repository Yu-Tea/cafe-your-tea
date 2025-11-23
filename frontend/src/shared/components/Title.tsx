import { motion } from "motion/react";

interface TitleProps {
  title: string;
  subtitle: string;
  disableAnimation?: boolean;
}

export const Title = ({
  title,
  subtitle,
  disableAnimation = false,
}: TitleProps) => {
  if (disableAnimation) {
    // アニメーション無効化の場合
    return (
      <div>
        <h1 className="text-center">{title}</h1>
        <p className="text-secondary text-center text-sm font-bold tracking-widest">
          {subtitle}
        </p>
      </div>
    );
  }

  return (
    <div>
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2, type: "spring", bounce: 0.7 }}
        className="text-center"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-secondary text-center text-sm font-bold tracking-widest"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};
