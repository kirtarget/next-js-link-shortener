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

      await ctx.prisma.shortLink.update({
        where: {
          shortLink: input?.shortLink,
        },
        data: {
          clicks: { increment: 1 },
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

  sendURL: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        link: z.string(),
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
