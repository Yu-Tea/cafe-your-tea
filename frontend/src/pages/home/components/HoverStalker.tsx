import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface HoverStalkerProps {
  children: React.ReactNode;
}

export const HoverStalker = ({ children }: HoverStalkerProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHovering) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = e.clientX - rect.left;
      const centerY = e.clientY - rect.top;
      setMousePosition({ x: centerX, y: centerY });
      setInitialPosition({ x: centerX, y: centerY });
    }
    setIsHovering(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}

      {isHovering && (
        <>
          {/* 白背景の円 */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              x: initialPosition.x - 14,
              y: initialPosition.y - 54,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x - 14,
              y: mousePosition.y - 54,
            }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 15,
              mass: 1.6,
            }}
            className="bg-base-100/70 pointer-events-none absolute inset-0 flex size-[68px] items-center justify-center rounded-full"
          />

          {/* 緑の線の円 */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              x: initialPosition.x - 20,
              y: initialPosition.y - 60,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x - 20,
              y: mousePosition.y - 60,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              mass: 1.2,
            }}
            className="border-primary/70 pointer-events-none absolute inset-0 flex size-[80px] items-center justify-center rounded-full border-1"
          >
            <span className="text-primary/70 josefin-sans pt-1">Click!</span>
          </motion.div>
        </>
      )}
    </div>
  );
};
