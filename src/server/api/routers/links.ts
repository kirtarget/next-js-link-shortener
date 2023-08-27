import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const linksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shortLink.findMany();
  }),

  getOne: publicProcedure
    .input(
      z.object({
        shortLink: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const link = await ctx.prisma.shortLink.findUnique({
        where: {
          shortLink: input?.shortLink || "404",
        },
      });

      return link?.link;
    }),
  incrementClick: publicProcedure
    .input(
      z.object({
        shortLink: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const link = await ctx.prisma.shortLink.update({
        where: {
          shortLink: input?.shortLink,
        },
        data: {
          clicks: { increment: 1 },
        },
      });

      return link?.link;
    }),

  sendURL: publicProcedure
    .input(
      z.object({
        name: z.string(),
        link: z.string(),
        dateCreated: z.date(),
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
