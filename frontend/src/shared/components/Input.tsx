import type { InputHTMLAttributes } from "react";

type InputProps = {
	className?: string;
	id: string;
	placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, id, placeholder, ...props }: InputProps) => {
	return (
		<input
			type="text"
			id={id}
			placeholder={placeholder}
			{...props}
			className={`input input-primary w-full ${className}`}
		/>
	);
};

export default Input;