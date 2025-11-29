import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TalkData } from "@/types/character";

interface SpeechBubbleProps {
  talk: TalkData;
  onComplete?: () => void;
  userName?: string;
}

const TopTalkBubble = ({ talk, onComplete, userName }: SpeechBubbleProps) => {
  useEffect(() => {
    if (talk.duration && talk.duration > 0) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, talk.duration);
      return () => clearTimeout(timer);
    }
  }, [talk.duration, talk.id, onComplete]);

  const renderText = () => {
    if (talk.text.includes("{userName}")) {
      const parts = talk.text.split("{userName}");
      return (
        <>
          {parts[0]}
          <span className="text-accent">{userName ?? "お客"}</span>
          {parts.slice(1).join("{userName}")}
        </>
      );
    }
    return talk.text;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={talk.id}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-base-100 border-neutral/80 rounded-xl border-2 px-2 py-6 text-center lg:px-10"
      >
        <div className="zen-maru-gothic text-secondary font-bold text-lg sm:whitespace-pre-wrap">
          {renderText()}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TopTalkBubble;
