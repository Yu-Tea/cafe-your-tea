import { motion } from "motion/react";
import { TfiAngleDoubleDown } from "react-icons/tfi";
import Info from "./components/Info";

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
            当店の自慢のティーをピックアップしてご紹介いたします。
          </p>
          <motion.div
            initial={{ y: -10, opacity: 1 }}
            animate={{ y: 10, opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
            className="flex justify-center"
          >
            <TfiAngleDoubleDown size={30} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ティー紹介 */}
      <section className="flex items-center justify-center">
        <div className="flex w-full max-w-5xl justify-center gap-x-15 gap-y-10 sm:flex-row">
          {/* 画像 */}

          <div className="relative h-[400px] w-[500px]">
            <div className="bg-secondary absolute top-8 left-0 aspect-[3/2] w-[400px]"></div>
            <div className="absolute top-0 left-8 aspect-[3/2] w-[400px]">
              <img
                src="../images/bg_table_big.png"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-secondary absolute top-10 right-4 size-[320px] rounded-full opacity-60 blur-md"></div>
            <div className="absolute top-2 right-0">
              <img src="images/tea_sample.png" className="w-[360px]" />
            </div>
          </div>

          {/* テキスト */}

          <div className="mt-15 space-y-3">
            <div className="josefin-sans">
              <p className="text-neutral mb-2 text-5xl italic">for</p>
              <p className="text-secondary text-6xl italic">All Season</p>
            </div>

            <p className="zen-maru-gothic text-2xl font-bold">
              あいうえおカキクケコ名前ティー
            </p>
            <p className="text-sm">by ダミーテキストお名前さん</p>
          </div>
        </div>
      </section>
    </div>
  );
}
