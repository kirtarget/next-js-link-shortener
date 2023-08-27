import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const Slug = () => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const router = useRouter();
  const link = api.links.getOne.useQuery({ shortLink: router.asPath.slice(3) });
  useEffect(() => {
    setDidMount(true);
  }, []);

  if (didMount && link.data) void router.push(link?.data ?? "/404");

  return (
    <div>
      <p>{link.data}</p>
    </div>
  );
};

export default Slug;
