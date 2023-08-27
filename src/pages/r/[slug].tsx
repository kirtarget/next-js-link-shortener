import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const Slug = () => {
  // const [didMount, setDidMount] = useState<boolean>(false);
  const router = useRouter();
  const mutation = api.links.incrementClick.useMutation();
  const path = router.asPath.slice(3);
  const link = api.links.getOne.useQuery({
    shortLink: path,
  });

  useEffect(() => {
    if (path === "[slug]") return;

    if (typeof link.data !== undefined) {
      void mutation.mutate({ shortLink: path });
      void router.replace(link?.data ?? "");
      return;
    }
  }, [link]);

  return;
};

export default Slug;
