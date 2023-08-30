import Link from "next/link";

const NotAdmin = () => {
  return (
    <div className="min-w-screen flex justify-center">
      <p className="mx-auto w-1/2">
        Чтобы воспользоваться функционалом сайта, вам нужен статус админа, для
        этого напишите в телеграм
        <Link href={"https://t.me/kirtarget"} className="link-primary link">
          @kirtarget
        </Link>
      </p>
    </div>
  );
};

export default NotAdmin;
