import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { createId } from "@paralleldrive/cuid2";
import type { dataType } from "~/utils/app.types";
import toast from "react-hot-toast";

const slugGenerator = (): string => createId().slice(19);

const MainForm = ({ refetch }: { refetch: () => void }) => {
  const [name, setName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dbData, setDbData] = useState<dataType | null>({
    name: "",
    link: "",

    shortLink: slugGenerator(),
  });
  const { mutate, isSuccess } = api.links.sendURL.useMutation();

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

    toast.error(error);
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    errorHandler();

    if (isError) return;

    mutate({
      ...dbData,
      dateCreated: new Date(),
      shortLink: slugGenerator(),
    } as dataType);

    setDbData({
      ...dbData,
      shortLink: slugGenerator(),
    } as dataType);
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Ссылка сокращена");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={onSubmitHandler}
        className={`mb-4  rounded border ${
          isError ? "border-rose-500" : ""
        } rounded-lg bg-blue-200 p-2 text-slate-900`}
      >
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

        <button type="submit" className="btn">
          Сократить
        </button>
      </form>
    </div>
  );
};

export default MainForm;
