interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  id?: string;
  labelClassName?: string;
  maxLength?: number;
}

export const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  rows = 3,
  id,
  maxLength = 200,
}: TextAreaFieldProps) => {
  const textareaId = id || `textarea-${name}`;

  return (
    <div className="flex flex-col">
      <div className="mb-1 flex items-center">
        <label
          htmlFor={textareaId}
          className="label josefin-sans text-secondary text-2xl font-light"
        >
          {label}
        </label>
        <p className="text-secondary/80 ml-2 text-left text-sm">
          ※{value.length}/{maxLength}文字以内
        </p>
      </div>
      <textarea
        id={textareaId}
        name={name}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="textarea textarea-primary w-full"
        required={required}
        disabled={disabled}
      />
    </div>
  );
};
