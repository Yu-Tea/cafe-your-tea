import { motion } from "motion/react";
import { TfiAngleDoubleDown } from "react-icons/tfi";
import Info from "./components/Info";
import PickUpSection from "./components/PickUpSection";
import { pickupSections } from "@/pages/home/data/pickupData";

export default function HomePage() {
  const topVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // PickUpTeaセクションのレイアウトパターン用の関数
  const getLayoutPattern = (index: number): 'normal' | 'reverse' => {
    return index % 2 === 0 ? 'normal' : 'reverse';
  };

  return (
    <div className="mt-15 space-y-20">
      <Info />

      {/* Pick Upセクション */}
      <motion.section
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="flex h-60 items-center justify-center bg-[url(/images/top_bg_01.webp)] bg-cover bg-fixed"
      >
        <motion.div
          variants={topVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-base-200 space-y-2 pt-4 text-center"
        >
          <h1 className="!text-base-200">Pick Up Tea</h1>
          <p className="tracking-widest">
            当店の自慢のティーをピックアップして
            <br className="sm:hidden" />
            ご紹介いたします。
          </p>
          <motion.div
            initial={{ y: -10, opacity: 1 }}
            animate={{ y: 10, opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="flex justify-center"
          >
            <TfiAngleDoubleDown size={30} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ティー紹介 All Season */}
      {pickupSections.map((sectionData, index) => (
          <PickUpSection
            key={sectionData.id}
            data={sectionData}
            layout={getLayoutPattern(index)}
            index={index}
          />
        ))}
    </div>
  );
}
