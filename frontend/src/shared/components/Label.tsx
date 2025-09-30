import type { LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = {
  className?: string;
  htmlFor: string;
  children: ReactNode;
} & Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  "className" | "htmlFor" | "children"
>;

const Label = ({ className = "", htmlFor, children, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={`label josefin-sans text-secondary text-2xl font-light ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
