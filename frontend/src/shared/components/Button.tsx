import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant: keyof typeof buttonStyle;
};

const buttonStyle = {
  "header-btn": "bg-base-200 hover:bg-base-300 josefin-sans text-2xl px-2 pt-2 pb-1",
} as const;

export const Button = ({ children, variant, className, ...props }: Props) => {
  return (
    <button className={`cursor-pointer ${buttonStyle[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
