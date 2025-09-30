// import type { InputHTMLAttributes } from "react";
// import type { FieldError } from "react-hook-form";
// import Input from "./Input";
// import Label from "./Label";

// type FormFieldProps = {
//   id: string;
//   label: string;
//   className?: string;
//   error?: FieldError;
// } & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

// const FormField = ({
//   id,
//   label,
//   className,
//   error,
//   ...props
// }: FormFieldProps) => {
//   return (
//     <div className="flex flex-col">
//       <Label htmlFor={id}>{label}</Label>
//       <Input id={id} className={className} {...props} />
//       {error && <p className="text-sm text-red-500">{error.message}</p>}
//     </div>
//   );
// };

// export default FormField;
