import { prisma } from "../../server/db";
import type { NextApiRequest } from "next";

export const getServerSideProps = async (context: NextApiRequest) => {
  const slug = context.query.slug as string;

  const url = await prisma.shortLink.findUnique({
    where: {
      shortLink: slug,
    },
  });

  const encodedUrl = encodeURI(url!.link);

  if (url?.link) {
    return {
      redirect: {
        destination: encodedUrl,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Slug = () => {
  return <p>Такого адреса не существует 🥲</p>;
};

export default Slug;
