// @ts-check
/** @type {import("prettier").Config} */
module.exports = {
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
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
