import type { NextConfig } from "next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

const isProd = process.env.NODE_ENV === "production";

let internalHost = null;
if (!isProd) {
	const { internalIpV4 } = await import("internal-ip");
	internalHost = await internalIpV4();
}

const config: NextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	// Note: This experimental feature is required to use NextJS Image in SSG mode.
	// See https://nextjs.org/docs/messages/export-image-api for different workarounds.
	images: {
		unoptimized: true,
	},
	assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
};

export default config;
