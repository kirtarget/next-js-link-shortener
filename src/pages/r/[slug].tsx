import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { AppRouter } from "~/server/api/root";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { trpc } from "~/utils/trpc";

const Slug = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { slug }: { slug: string | undefined } = props;
  const linkQuery = trpc.links.getOne.useQuery({
    shortLink: slug!,
  });
  // trpc.links.incrementClick.useMutation().mutate({ shortLink: slug ?? "" });
  if (linkQuery.status !== "success") {
    // won't happen since we're using `fallback: "blocking"`
    return <></>;
  }
  const { data } = linkQuery;
  void router.replace(data ?? "/404");

  return <></>;
  // const [didMount, setDidMount] = useState<boolean>(false);
  // const mutation = api.links.incrementClick.useMutation();
  // const path = router.asPath.slice(3);
  // const link = api.links.getOne.useQuery({
  //   shortLink: path,
  // });

  // useEffect(() => {
  //   if (path === "[slug]") return;

  //   if (typeof link.data !== undefined) {
  //     void mutation.mutate({ shortLink: path });
  //
  //     return;
  //   }
  // }, [link]);

  return <></>;
};

export default Slug;

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma,
    },
    transformer: superjson, // optional - adds superjson serialization
  });
  const slug = context.params?.slug;
  // prefetch `post.byId`
  await helpers.links.getAllSlugs.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug,
    },
    revalidate: 1,
  };
}
export const getStaticPaths: GetStaticPaths = async () => {
  const links = await prisma.shortLink.findMany({
    select: {
      shortLink: true,
    },
  });

  return {
    paths: links.map((link) => ({
      params: {
        slug: link.shortLink,
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: "blocking",
  };
};
