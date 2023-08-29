/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from "next/head";
import { api } from "~/utils/api";
import MainForm from "./components/MainForm";
import MainTable from "./components/MainTable";
import { signIn, useSession, signOut } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const session = useSession();
  const { data, refetch } = api.links.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Сокращатель ссылок </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session.status === "unauthenticated" ? (
        <main
          data-theme="light"
          className="flex min-h-screen flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="text-6xl font-extrabold">Кто ты, воин?</h1>
            <button
              className="btn btn-primary w-1/2 text-slate-100"
              onClick={() => signIn()}
            >
              Войти
            </button>
          </div>
        </main>
      ) : (
        <>
          <div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
          <main
            data-theme="light"
            className="flex min-h-screen flex-col items-center "
          >
            <div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className=" text-lg font-extrabold text-slate-900 ">
                Сокращатель <span className="  text-blue-400">СОТКА</span>{" "}
                ссылок
              </h1>
              <div className="w-full ">
                {session.data?.user.role === "ADMIN" ? (
                  <>
                    <MainForm refetch={() => refetch()} />
                    {data ? (
                      <>
                        <button onClick={() => refetch()}>🔄</button>
                        <MainTable
                          data={data?.sort((a, b) => {
                            return (
                              a.dateCreated.getTime() - b.dateCreated.getTime()
                            );
                          })}
                        />
                      </>
                    ) : (
                      <span className="loading loading-spinner loading-md mt-4 text-info"></span>
                    )}
                  </>
                ) : (
                  <p>
                    Чтобы воспользоваться функционалом сайта, вам нужен статус
                    админа, для этого напишите в телеграм @kirtarget
                  </p>
                )}
              </div>
            </div>
            <button
              className="btn btn-error btn-xs left-0"
              onClick={() => signOut()}
            >
              Выйти
            </button>
          </main>
        </>
      )}
    </>
  );
}
