import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { PickupSectionData } from "@/types/teaArt";
import { HoverStalker } from "./HoverStalker";

interface PickUpSectionProps {
  data: PickupSectionData;
  layout: "normal" | "reverse";
  index: number;
}

const PickUpSection = ({ data, layout }: PickUpSectionProps) => {
  const isReverse = layout === "reverse";
  const ref = useRef<HTMLDivElement>(null);

  // スクロール位置を取得
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 単色背景のY座標の変化
  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [20, 45, 20]),
    {
      stiffness: 40,
      damping: 5,
      restDelta: 0.001,
    }
  );

  // 写真背景のY座標の変化
  const photoY = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [-10, 10, -10]),
    {
      stiffness: 80,
      damping: 40,
      restDelta: 0.001,
    }
  );

  return (
    <section
      style={{
        backgroundImage: `url(/images/top_bg_${data.category}.png)`,
      }}
      className={`flex items-center justify-center bg-no-repeat xl:py-4 ${
        isReverse
          ? "bg-left-bottom sm:bg-left-top"
          : "bg-right-bottom sm:bg-right-top"
      } px-5`}
    >
      <Link to={`/tea-arts/${data.id}`} className="w-full sm:w-auto">
        <HoverStalker>
          <motion.div
            whileHover={{ scale: 1.01, opacity: 0.9 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex flex-col justify-center xl:gap-x-8 ${
              isReverse ? "sm:flex-row-reverse" : "sm:flex-row"
            }`}
          >
            {/* 画像部分 */}
            <div className="relative aspect-[7/5] max-w-[520px] sm:w-[380px] lg:w-[520px]">
              {/* 単色 */}
              <motion.div
                ref={ref}
                style={{
                  y: bgY,
                }}
              >
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.0,
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className={`${data.colors.bg} absolute top-[10%] ${
                    isReverse ? "right-0" : "left-0"
                  } aspect-[3/2] w-[83%]`}
                ></motion.div>
              </motion.div>
              {/* 写真 */}
              <motion.div
                ref={ref}
                style={{
                  y: photoY,
                }}
              >
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8,
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  style={{
                    backgroundImage: `url(/images/top_image_${data.category}.webp)`,
                  }}
                  className={`absolute top-0 ${
                    isReverse ? "right-[7%]" : "left-[7%]"
                  } aspect-[3/2] w-[83%] bg-cover p-4`}
                >
                  <div
                    className={`josefin-sans text-base-200/80 !leading-tight font-light whitespace-pre-line lg:text-3xl ${
                      isReverse ? "text-right" : "text-left"
                    }`}
                  >
                    {data.description}
                  </div>
                </motion.div>
              </motion.div>

              {/* 影 */}
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 1.9,
                  duration: 1,
                  ease: "easeOut",
                }}
                className={`bg-secondary absolute ${
                  isReverse ? "left-[4%]" : "right-[4%]"
                } bottom-[2%] aspect-square w-[65%] rounded-full opacity-50 blur-md`}
              ></motion.div>
              {/* ティー画像 */}
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.8,
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className={`absolute ${
                  isReverse ? "left-0" : "right-0"
                } bottom-0 w-[73%]`}
              >
                <img
                  src={data.teaImage}
                  className="h-auto w-full"
                  alt={`${data.season}のティー`}
                />
              </motion.div>
            </div>

            {/* テキスト部分 */}
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.3,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="flex-1 space-y-1 sm:mt-8 sm:ml-5 sm:space-y-3 lg:mt-15 xl:ml-10"
            >
              <div className="josefin-sans">
                <p className="text-4xl text-[#aa9b94] italic sm:mb-1 lg:text-6xl">
                  for
                </p>
                <p
                  className={`${data.colors.text} text-6xl italic lg:text-7xl`}
                >
                  {data.season} Season
                </p>
              </div>

              <p className="zen-maru-gothic text-xl font-bold text-[#7b6457] lg:text-2xl">
                {data.title}
              </p>
              <p className="text-secondary text-sm">by {data.name}</p>

              {/* PC・TABのview more */}
              <div className="hidden sm:block">
                <div
                  className={`mt-5 flex items-center space-x-2 ${
                    isReverse ? "justify-start" : "justify-end"
                  }`}
                >
                  {!isReverse && (
                    <div className="border-primary/80 w-20 border-b"></div>
                  )}
                  <span className="text-primary josefin-sans text-2xl font-light sm:text-3xl lg:text-4xl">
                    View More
                  </span>
                  {isReverse && (
                    <div className="border-primary/80 w-20 border-b"></div>
                  )}
                </div>
              </div>

              {/* SPのview more */}
              <div className="block sm:hidden">
                <div className="flex items-center justify-end space-x-2">
                  <div className="border-primary/80 w-20 border-b"></div>
                  <span className="text-primary josefin-sans text-2xl font-light sm:text-3xl lg:text-4xl">
                    View More
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </HoverStalker>
      </Link>
    </section>
  );
};

export default PickUpSection;
