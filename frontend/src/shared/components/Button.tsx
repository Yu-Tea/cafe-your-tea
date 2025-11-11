import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

const buttonStyle = {
  "st-btn": "btn font-normal",
  "header-btn":
    "bg-base-200 hover:bg-base-300 josefin-sans text-2xl px-2.5 py-2",
  "nav-btn": "flex hover:text-[#d9e2c0]",
  "google-btn":
    "btn btn-block bg-base-100 hover:bg-base-300 josefin-sans text-xl pt-3 pb-2 border-1 border-neutral",
} as const;

type ButtonVariant = keyof typeof buttonStyle;

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant: ButtonVariant;
  className?: string;
}

export const Button = ({
  children,
  variant,
  className = "",
  ...motionProps
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`cursor-pointer ${buttonStyle[variant]} ${className}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};
