import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { TfiAngleDoubleDown } from "react-icons/tfi";

import { FaCoffee } from "react-icons/fa";
import { pickupTeaArts } from "@/api/teaArtApi";
import { PickupSectionData } from "@/types/teaArt";
import { convertAllPickupData } from "@/utils/pickupData";
import { Button } from "@/shared/components/Button";
import StatusDisplay from "@/shared/components/StatusDisplay";
import Info from "./components/Info";
import PickUpSection from "./components/PickUpSection";

export default function HomePage() {
  const [pickupData, setPickupData] = useState<PickupSectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPickupData = async () => {
      try {
        const response = await pickupTeaArts();
        const convertedData = convertAllPickupData(response);
        setPickupData(convertedData);
      } catch (err) {
        setError("データの取得に失敗しました");
        console.error("Pickup fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPickupData();
  }, []);

  if (loading) {
    return <StatusDisplay type="loading" />;
  }

  if (error) {
    return <StatusDisplay type="error" />;
  }

  // PickUpTeaセクションのレイアウトパターン用の関数
  const getLayoutPattern = (index: number): "normal" | "reverse" => {
    return index % 2 === 0 ? "normal" : "reverse";
  };

  return (
    <div className="mt-20 space-y-15 lg:space-y-20">
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
        className="flex items-center justify-center bg-[url(/images/top_bg_01.webp)] bg-cover bg-fixed py-3 sm:py-9"
      >
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="text-base-200 space-y-2 pt-4 text-center"
        >
          <h1 className="!text-base-200">Pick Up Tea</h1>
          <p className="tracking-widest">
            当店の自慢のティーをピックアップして
            <br className="sm:hidden" />
            ご紹介いたします。
          </p>
          {/* 矢印 */}
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

      {/* 各種ティー紹介 */}
      {pickupData.map((data, index) => (
        <PickUpSection
          key={data.category}
          data={data}
          layout={getLayoutPattern(index)}
          index={index}
        />
      ))}
      {/* ボタン */}
      <motion.div
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="mb-5 text-center"
      >
        <Link to="/tea-arts">
          <Button variant="st-btn" className="btn-outline btn-primary">
            <FaCoffee size={18} />
            ティーの一覧はこちら
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
