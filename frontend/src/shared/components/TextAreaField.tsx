interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  id?: string;
  labelClassName?: string;
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
}: TextAreaFieldProps) => {
  const textareaId = id || `textarea-${name}`;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={textareaId}
        className="label josefin-sans text-secondary text-2xl font-light"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        name={name}
        value={value}
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
