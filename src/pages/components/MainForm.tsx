import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { createId } from "@paralleldrive/cuid2";
import type { dataType } from "~/utils/app.types";
import toast from "react-hot-toast";

const slugGenerator = (): string => createId().slice(19);
const initialData: dataType = {
  name: "",
  link: "",
  shortLink: slugGenerator(),
};

const MainForm = ({ refetch }: { refetch: () => void }) => {
  //State
  const [isError, setIsError] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dbData, setDbData] = useState<dataType>(initialData);

  const { name, link }: { name: string | null; link: string | null } = dbData;

  //Server
  const { mutate, isSuccess } = api.links.sendURL.useMutation();

  //Toasts
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Ссылка сокращена");
    }
    if (isError) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsError(false);
    setDbData((prev: dataType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onErrorHandler = () => {
    const encodedUri = encodeURI(link ?? "");
    const regex = new RegExp(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    const validatedUri = regex.test(encodedUri);

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

    if (name?.length == undefined || name.length < 4) {
      setIsError(true);
      setError("Имя должно состоять минимум из 4 знаков");
    }

    if (link === undefined || name === undefined) {
      setIsError(true);
      setError("Введите ссылку и её название");
    }
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onErrorHandler();

    if (isError) return;

    mutate({
      ...dbData,
      dateCreated: new Date(),
    } as dataType);

    setDbData(initialData);
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
        <label htmlFor="nameInput" className="label">
          Введите название
        </label>
        <input
          type="text"
          name="name"
          id="nameInput"
          value={dbData.name}
          placeholder="Чтобы проще искать потом"
          className="input input-bordered my-2 w-full bg-white"
          onChange={handleChange}
        />

        <label htmlFor="linkInput" className="label">
          Вставьте ссылку
        </label>
        <input
          type="url"
          name="link"
          id="linkInput"
          value={dbData.link}
          placeholder="https://sotkaonline.ru/"
          className="input input-bordered my-2 w-full bg-white"
          onChange={handleChange}
        />
        <div className="flex justify-between">
          <button type="submit" className="btn">
            Сократить
          </button>
          <button
            type="button"
            className="btn btn-neutral"
            onClick={() => refetch()}
          >
            Обновить таблицу
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainForm;
