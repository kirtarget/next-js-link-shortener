import { useState } from "react";
import { api } from "~/utils/api";
import { createId } from "@paralleldrive/cuid2";

type dataType = {
  name: string;

  link: string;
  shortLink: string;
};

// export type MainFormProps = {
//     submitF: (e:React.FormEvent) => void
// }

const MainForm = () => {
  const [name, setName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dbData, setDbData] = useState<dataType | null>({
    name: "",
    link: "",

    shortLink: createId().slice(19),
  });

  const errorHandler = () => {
    const encodedUri = encodeURI(link ?? "");
    const regex = new RegExp(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );

    const validatedUri = encodedUri.match(regex);
    setIsError(false);
    setError("");
    if (
      typeof name == null ||
      name?.length == 0 ||
      typeof name?.length == undefined
    ) {
      setIsError(true);
      setError("Введите имя");
    }
    if (
      link == undefined ||
      link == null ||
      link?.length < 10 ||
      !validatedUri
    ) {
      setIsError(true);
      setError("Введите ссылку");
    }

    if (name!.length < 4 || name?.length == undefined) {
      setIsError(true);
      setError("Имя должно состоять минимум из 4 знаков");
    }

    if (dbData?.link === undefined || dbData.name === undefined) {
      setIsError(true);
      setError("Введите ссылку и её название");
    }
  };

  const sendLinkMutation = api.links.sendURL.useMutation();

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    errorHandler();

    setDbData({
      ...dbData,
      dateCreated: new Date(),
    } as dataType);

    if (isError) return;

    sendLinkMutation.mutate(dbData!);
    return;
  };

  return (
    <div>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={onSubmitHandler}
        className={`mb-4  rounded border ${
          isError ? "border-rose-500" : ""
        } rounded-lg bg-blue-200 p-2 text-slate-900`}
      >
        <p>{""}</p>
        <label htmlFor="nameInput" className="label">
          Введите название
        </label>
        <input
          type="text"
          name="nameInput"
          id="nameInput"
          placeholder="Чтобы проще искать потом"
          className="input input-bordered my-2 w-full bg-white"
          onChange={(event) => {
            setName(event.target.value);
            setIsError(false);
            setDbData({
              ...dbData!,
              name: event.target.value,
            });
          }}
        />

        <label htmlFor="linkInput" className="label">
          Вставьте ссылку
        </label>
        <input
          type="url"
          name="linkInput"
          id="linkInput"
          placeholder="https://sotkaonline.ru/"
          className="input input-bordered my-2 w-full bg-white"
          onChange={(event) => {
            setLink(event.target.value);
            setDbData({
              ...dbData!,
              link: event.target.value,
            });
          }}
        />

        {sendLinkMutation.isError && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {sendLinkMutation.isSuccess && (
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Ссылка сокращена!</span>
          </div>
        )}

        <button type="submit" className="btn">
          Сократить
        </button>
      </form>
    </div>
  );
};

export default MainForm;
