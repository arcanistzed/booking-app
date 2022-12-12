import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import {
	faCheck,
	faTimes,
	faAngleLeft,
	faAngleRight,
	faAngleDoubleLeft,
	faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false;

// Add font awesome icons
library.add(faCheck, faTimes, faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight);

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
