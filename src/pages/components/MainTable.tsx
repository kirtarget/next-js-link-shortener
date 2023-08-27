export type mainTableProps = {
  name: string;
  link: string;
  shortLink: string;
  clicks: number;
  dateCreated: Date;
}[];

const MainTable = ({ data }: { data: mainTableProps }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-md border">
        <thead className="text-sm text-slate-900">
          <tr>
            <th>Название</th>
            <th>Длинная ссылка</th>
            <th>Сокращённая ссылка</th>
            <th>Кол-во кликов</th>
            <th>Дата создания</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {data
            ?.map((link) => (
              <tr key={link.dateCreated.toISOString()}>
                <th>{link.name} </th>
                <td>{link.link}</td>
                <td className="align-center flex">
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `${
                          process.env.NODE_ENV === "development"
                            ? "http://localhost:3000"
                            : "https://sotka.xyz"
                        }/r/${link.shortLink}`
                      );
                      return;
                    }}
                    className=" btn btn-xs mx-2 aspect-square border-none bg-slate-300 p-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="black"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                  </button>
                  {`${
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000"
                      : "https://sotka.xyz"
                  }/r/${link.shortLink}`}
                </td>
                <td>{link.clicks}</td>
                <td>{link.dateCreated.toLocaleString()}</td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
