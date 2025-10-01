interface InputFieldProps {
  label: string;
  id?: string;
  type: "text" | "email" | "password";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  note?: string;
}

export const InputField = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  note,
}: InputFieldProps) => {
  // idが指定されていない場合は、nameを使って自動生成
  const inputId = id || `input-${name}`;

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <label
          htmlFor={inputId}
          className="label josefin-sans text-secondary text-2xl font-light"
        >
          {label}
        </label>
        {note && <span className="text-neutral ml-2 text-sm">{note}</span>}
      </div>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-primary w-full"
        required={required}
        disabled={disabled}
      />
    </div>
  );
};
