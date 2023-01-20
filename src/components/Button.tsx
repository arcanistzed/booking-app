import type { VariantProps } from "cva";
import { cva } from "cva";

export const button = cva("rounded-xl", {
	variants: {
		intent: {
			primary: "bg-primary-800 p-2 text-secondary-100",
			secondary: "bg-secondary-800 p-2 text-primary-100",
			link: "text-primary-500",
			nav: "bg-tertiary-700 px-4 py-2 text-white hover:bg-tertiary-800 sm:px-8 sm:py-3",
		},
	},
	defaultVariants: {
		intent: "primary",
	},
});

type ButtonProps = {
	children: React.ReactNode;
} & VariantProps<typeof button> &
	React.ComponentPropsWithoutRef<"button">;

export default function Button({ children, intent, ...props }: ButtonProps) {
	return (
		<button className={button({ intent })} {...props}>
			{children}
		</button>
	);
}
