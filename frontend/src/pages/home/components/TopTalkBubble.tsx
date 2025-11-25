import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TalkData } from "@/types/character";

interface SpeechBubbleProps {
  talk: TalkData;
  onComplete?: () => void;
}

const TopTalkBubble = ({ talk, onComplete }: SpeechBubbleProps) => {
  useEffect(() => {
    if (talk.duration && talk.duration > 0) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, talk.duration);

      // クリーンアップ関数でタイマーをクリア
      return () => clearTimeout(timer);
    }
  }, [talk.duration, talk.id, onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={talk.id}
        className="bg-base-100 border-neutral/80 rounded-xl border-2 px-2 py-6 text-center"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* セリフテキスト部分 */}
        <div className="zen-maru-gothic text-secondary text-lg sm:whitespace-pre-wrap">
          {talk.text}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TopTalkBubble;
