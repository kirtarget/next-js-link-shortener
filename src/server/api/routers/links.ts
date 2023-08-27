import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const router = t.router({
  // Create procedure at path 'greeting'
  greeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query((opts) => `Hello ${opts.input.name}`),
});

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
