import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const linksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shortLink.findMany();
  }),
  getAllSlugs: publicProcedure.query(async ({ ctx }) => {
    const links = await ctx.prisma.shortLink.findMany();

    return links.map((a) => {
      shortLink: a.shortLink;
    });
  }),

  sendURL: protectedProcedure
    .input(
      z.object({
        name: z.string().min(4),
        link: z.string().url(),
        shortLink: z.string(),
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
