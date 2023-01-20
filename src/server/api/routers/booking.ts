import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

// Holidays in Canada
const holidays = [
  "2022-12-12 14:00:00",
  "2022-12-25",
  "2022-12-26",
  "2023-01-01",
  "2023-02-20",
  "2023-02-21",
  "2023-04-09",
  "2023-04-10",
  "2023-05-22",
  "2023-07-01",
  "2023-07-02",
  "2023-08-07",
  "2023-09-05",
  "2023-10-10",
  "2023-11-11",
  "2023-12-25",
  "2023-12-26",
].map((date) => new Date(date));

export const bookingRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.appointment.findMany();
  }),
  getDisabled: publicProcedure.query(async ({ ctx }) => {
    return [
      ...(
        await ctx.prisma.appointment.findMany({
          select: {
            date: true,
          },
        })
      ).map((appointment) => appointment.date),
      ...holidays,
    ];
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
