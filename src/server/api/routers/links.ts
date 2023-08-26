import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const linksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shortLink.findMany();
  }),

  sendURL: publicProcedure
    .input(
      z.object({
        name: z.string(),
        link: z.string(),
        dateCreated: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shortLink.create({
        data: {
          ...input,
        },
      });
    }),
});
