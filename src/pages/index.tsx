/* eslint-disable @typescript-eslint/no-misused-promises */
import Head from "next/head";
import { api } from "~/utils/api";
import MainForm from "./components/MainForm";
import MainTable from "./components/MainTable";
import { signIn, useSession, signOut } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Auth from "./components/Auth";
import NotAdmin from "./components/NotAdmin";

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
      <Toaster position="top-center" reverseOrder={false} />

      <main
        data-theme="light"
        className="flex min-h-screen flex-col items-center justify-center"
      >
        {session.status === "unauthenticated" ? (
          <Auth signIn={signIn} />
        ) : (
          <>
            <div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16 ">
              <h1 className="text-2xl font-extrabold ">
                Сокращатель <span className="  text-blue-400">СОТКА</span>{" "}
                ссылок
              </h1>
              <div className="w-full ">
                {session.data?.user.role === "ADMIN" ? (
                  <>
                    <MainForm refetch={() => refetch()} />
                    {data ? (
                      <>
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
                  <NotAdmin />
                )}
              </div>
            </div>
            <button
              className="btn btn-error btn-xs left-0"
              onClick={() => signOut()}
            >
              Выйти
            </button>
          </>
        )}
      </main>
    </>
  );
}
