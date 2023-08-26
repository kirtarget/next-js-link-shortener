export type mainTableProps = {
  name: string;
  link: string;
  shortLink: string;
  clicks: number;
  dateCreated: Date;
}[];

const MainTable = ({ data }: { data: mainTableProps }) => {
  if (data.length == 0) return;
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra border ">
        <thead>
          <tr>
            <th>Название</th>
            <th>Длинная ссылка</th>
            <th>Сокращённая ссылка</th>
            <th>Кол-во кликов</th>
            <th>Дата создания</th>
          </tr>
        </thead>
        <tbody>
          {data.map((link) => (
            <tr key={link.name}>
              <th>{link.name}</th>
              <td>{link.link}</td>
              <td>{link.shortLink}</td>
              <td>{link.clicks}</td>
              <td>
                {link.dateCreated.getDay()}-{link.dateCreated.getMonth()}-
                {link.dateCreated.getFullYear()}
              </td>
            </tr>
          ))}
          {/* {JSON.stringify(data)} */}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
