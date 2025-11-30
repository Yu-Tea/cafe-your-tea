interface InputFieldProps {
  label: string;
  id?: string;
  type: "text" | "email" | "password";
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  note?: string;
  minLength?: number;
  maxLength?: number;
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
  minLength,
  maxLength,
}: InputFieldProps) => {
  // idが指定されていない場合は、nameを使って自動生成
  const inputId = id || `input-${name}`;

  return (
    <div>
      <div className="mb-1 flex items-center">
        <label
          htmlFor={inputId}
          className="label josefin-sans text-secondary text-2xl font-light"
        >
          {label}
        </label>
        {note && <span className="text-secondary/80 ml-2 text-sm">{note}</span>}
      </div>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-primary validator w-full"
        required={required}
        disabled={disabled}
      />
      {type === "text" && (
        <p className="validator-hint !mt-0">
          {maxLength}文字以内で入力してください。
        </p>
      )}
      {type === "email" && (
        <p className="validator-hint !mt-0">
          メールアドレスを入力してください。
        </p>
      )}
      {type === "password" && (
        <p className="validator-hint !mt-0">
          {minLength}文字以上で入力してください。
        </p>
      )}
    </div>
  );
};
