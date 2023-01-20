import React from "react";

type FormProps = {
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"form">;

export default function Form({ children, ...props }: FormProps) {
	return (
		<form
			className="m-4 flex w-[min(90%,_30rem)] flex-col gap-4 rounded-xl bg-secondary-600/20 p-4"
			{...props}
		>
			{children}
		</form>
	);
}
