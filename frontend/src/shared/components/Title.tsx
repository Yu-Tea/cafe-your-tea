import { motion } from "motion/react";

interface TitleProps {
  title: string;
  subtitle: string;
}

export const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div>
      <motion.h1
        viewport={{ once: true }}
        initial={{ y: -10, opacity: 0 }}
        transition={{ delay: 0.2, duration: 1.2, type: "spring", bounce: 0.7 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        {title}
      </motion.h1>
      <motion.p
      viewport={{ once: true }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        whileInView={{ opacity: 1 }}
        className="text-secondary text-center text-sm font-bold tracking-widest"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};
