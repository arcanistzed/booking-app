import { createTRPCRouter } from "./trpc";
import { bookingRouter } from "./routers/booking";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  booking: bookingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
