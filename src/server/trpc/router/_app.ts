import { router } from "../trpc";
import { authRouter } from "./auth";
import { bookingRouter } from "./booking";

export const appRouter = router({
	booking: bookingRouter,
	auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
