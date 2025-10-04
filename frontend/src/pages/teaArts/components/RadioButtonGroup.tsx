import React from "react";

interface RadioOption {
  readonly id: string;
  readonly value: number;
  readonly label: string;
}

interface RadioButtonGroupProps {
  label: string;
  name: string;
  value: number;
  options: readonly RadioOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  gridClassName?: string;
  className?: string;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  disabled = false,
  gridClassName = "md:grid-cols-5", // デフォルト値
  className = "",
}) => {
  return (
    <div className={`form-control ${className}`}>
      <label className="text-secondary">{label}</label>
      <div className={`mt-1 grid grid-cols-2 gap-3 ${gridClassName}`}>
        {options.map((option) => (
          <label
            key={option.id}
            className={`hover:bg-primary/10 flex cursor-pointer flex-col items-center border-1 p-3 transition-all ${
              value === option.value
                ? "border-primary bg-primary/10"
                : "border-neutral hover:border-primary/50"
            } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          >
            <input
              id={option.id}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="sr-only"
              disabled={disabled}
            />
            <div className="flex items-center justify-center">
              <span className="text-sm font-normal">{option.label}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
