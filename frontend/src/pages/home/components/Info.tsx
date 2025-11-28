import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { KerochaExpression, TalkData } from "@/types/character";
import Kerocha, { EXPRESSIONS } from "@/shared/components/Kerocha";
import { useAuth } from "@/shared/contexts/AuthContext";
import { TALKS } from "../data/talk";
import TopTalkBubble from "./TopTalkBubble";

const Info = () => {
  const { isLoggedIn, user } = useAuth();

  const [currentExpression, setCurrentExpression] = useState<KerochaExpression>(
    EXPRESSIONS.default
  );
  const [currentTalk, setCurrentTalk] = useState<TalkData>(
    TALKS.find((t) => t.id === "welcome") || TALKS[0]
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // 時間帯を取得する
  const getCurrentTimeRange = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  };

  // 初期セリフを取得
  const getInitialTalk = useCallback((): TalkData => {
    if (isLoggedIn && user) {
      const welcomeTalk = TALKS.find((t) => t.id === "welcome_logged_in");
      if (welcomeTalk) {
        return {
          ...welcomeTalk,
          text: welcomeTalk.text.replace("{userName}", user.name || "さん"),
        };
      }
    }
    return TALKS.find((t) => t.id === "welcome") || TALKS[0];
  }, [isLoggedIn, user]);

  // ランダムセリフを取得
  const getRandomTalk = useCallback((): TalkData => {
    const timeRange = getCurrentTimeRange();
    const availableTalks = TALKS.filter(
      (t) => t.timeRange === timeRange || t.timeRange === "all"
    ).filter((t) => t.id !== "welcome" && t.id !== "welcome_logged_in");

    if (availableTalks.length === 0) {
      return getInitialTalk();
    }

    const randomIndex = Math.floor(Math.random() * availableTalks.length);
    const selectedTalk = availableTalks[randomIndex];

    if (selectedTalk.text.includes("{userName}") && user?.name) {
      return {
        ...selectedTalk,
        text: selectedTalk.text.replace("{userName}", user.name),
      };
    }

    return selectedTalk;
  }, [getInitialTalk, user]);

  // ログイン状態が変わったら初期セリフを更新
  useEffect(() => {
    const initialTalk = getInitialTalk();
    setCurrentTalk(initialTalk);
    setCurrentExpression(initialTalk.expression);
  }, [getInitialTalk]);

  // ケロチャクリック時の処理
  const handleKerochaClick = () => {
    if (isAnimating) return; // アニメーション中はクリック無効

    setIsAnimating(true);
    const randomTalk = getRandomTalk();

    // 表情とセリフを変更
    setCurrentExpression(randomTalk.expression);
    setCurrentTalk(randomTalk);
  };

  // セリフ表示時間終了時の処理
  const handleTalkComplete = useCallback(() => {
    setIsAnimating(false);

    setTimeout(() => {
      const initialTalk = getInitialTalk();
      setCurrentExpression(initialTalk.expression);
      setCurrentTalk(initialTalk);
    }, 500);
  }, [getInitialTalk]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex w-full items-end justify-center bg-[url(/images/order_bg.png)] bg-cover bg-right-bottom bg-repeat-x sm:bg-contain sm:bg-center"
    >
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-6 px-5 sm:h-80 sm:flex-row">
          {/* フキダシ部分 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="flex-1"
          >
            <TopTalkBubble talk={currentTalk} onComplete={handleTalkComplete} />
          </motion.div>
          {/* ケロチャ部分 */}
          <motion.div
            initial={{ opacity: 0, y: -40, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 12,
              delay: 0.8,
            }}
            className="flex items-end justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1.02, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Kerocha
                expression={currentExpression}
                className="max-w-[300px] lg:max-w-[350px]"
                onClick={handleKerochaClick}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Info;
