declare module "prettier-plugin-tailwindcss" {
	import type { Plugin } from "prettier";
	export interface TailwindOptions {
		/**
		 * Path to your Tailwind config file.
		 * @default tailwind.config.js
		 */
		config?: string;
		/**
		 * Format the output CSS.
		 * @default auto
		 */
		format?: "auto" | "css" | "scss" | "less";
	}

	export default prettier_plugin_tailwindcss as Plugin;
}

declare module "prettier" {
	import type { TailwindOptions } from "prettier-plugin-tailwindcss";
	import type { Config } from "prettier";

	export type TailwindConfig = Config & {
		tailwindcss?: TailwindOptions;
	};
}
