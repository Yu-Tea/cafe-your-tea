import React from "react";
import { motion } from "motion/react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant: keyof typeof buttonStyle;
};

const buttonStyle = {
  "btn":
    "btn font-normal",
  "header-btn":
    "bg-base-200 hover:bg-base-300 josefin-sans text-2xl px-2.5 py-2",
  "nav-btn":
    "flex hover:text-[#d9e2c0]",
  "google-btn":
    "btn btn-block bg-base-100 hover:bg-base-300 josefin-sans text-xl pt-3 pb-2 border-1 border-neutral",
} as const;

export const Button = ({ children, variant, className, ...props }: Props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`cursor-pointer ${buttonStyle[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
