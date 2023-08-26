import { useState } from "react";
import { api } from "~/utils/api";

type dataType = {
  name: string;
  dateCreated: Date;
  link: string;
};

// export type MainFormProps = {
//     submitF: (e:React.FormEvent) => void
// }

const MainForm = () => {
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [dbData, setDbData] = useState<dataType>({
    name,
    link,
    dateCreated: new Date(),
  });

  const errorHandler = () => {
    setIsError(false);
    setError("");
    if (
      typeof name == null ||
      name?.length == 0 ||
      typeof name?.length == undefined
    ) {
      setIsError(true);
      setError("Введите имя");
      return;
    }

    if (name.length < 4 || name?.length == undefined) {
      setIsError(true);
      setError("Имя должно состоять минимум из 4 знаков");
    }
  };

  const sendLinkMutation = api.links.sendURL.useMutation();

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    errorHandler();

    if (isError) return;

    if (typeof name != null && typeof link !== null) {
      setDbData({
        ...dbData,
        dateCreated: new Date(),
      } as dataType);

      if (!isError) sendLinkMutation.mutate(dbData);
      return;
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className={`mb-4  rounded border ${
          isError ? "border-rose-500" : ""
        } bg-slate-400 p-2 text-slate-900`}
      >
        <label htmlFor="nameInput" className="label">
          Введите название
        </label>
        <input
          type="text"
          name="nameInput"
          id="nameInput"
          placeholder="ИМЯ БЛОГЕРА/ПРОМОКОД"
          className="input input-bordered my-2 w-full bg-white"
          onChange={(event) => {
            setName(event.target.value);
            setDbData({
              ...dbData,
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
              ...dbData,
              link: event.target.value,
            });
          }}
        />

        <p className=" mx-auto my-2 text-lg text-rose-600">{error}</p>

        <button type="submit" className="btn">
          Сократить
        </button>
      </form>
    </div>
  );
};

export default MainForm;
