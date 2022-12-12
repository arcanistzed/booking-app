import type { TailwindConfig } from "prettier";
import prettier_plugin_tailwindcss from "prettier-plugin-tailwindcss";

const config: TailwindConfig = {
	plugins: [prettier_plugin_tailwindcss],
	tailwindcss: {
		config: "./tailwind.config.cjs",
		format: "auto",
	},
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: false,
	trailingComma: "all",
	bracketSpacing: true,
	arrowParens: "avoid",
	endOfLine: "lf",
	printWidth: 120,
};
export default config;
