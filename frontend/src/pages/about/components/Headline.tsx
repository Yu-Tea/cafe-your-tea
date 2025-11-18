import { motion } from "motion/react";

interface HeadlineProps {
  title: string;
  subtitle: string;
  bg: string;
}

const Headline = ({ title, subtitle, bg }: HeadlineProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      style={{
        backgroundImage: `url(/images/${bg}.webp)`,
      }}
      className="mt-15 flex items-center justify-center bg-cover bg-fixed bg-center py-6"
    >
      <motion.div 
      initial={{ opacity: 0, y: 30}}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="pb-5 text-center">
        <h1>{title}</h1>
        <div className="text-secondary text-sm font-bold tracking-widest">
          {subtitle}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Headline;
