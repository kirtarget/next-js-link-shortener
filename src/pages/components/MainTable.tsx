type mainTableProps = {data:{
    name: string
    link: string
    shortLink: string
    clicks: number
    dateAdded: string
}[]}


const MainTable = ({data}:mainTableProps) => {


    return (

            <div className="overflow-x-auto">
  <table className="table table-zebra">
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
      {data.map((link) => (<tr key={link.name}>

        <th>{link.name}</th> 
        <td>{link.link}</td> 
        <td>{link.shortLink}</td> 
        <td>{link.clicks}</td> 
        <td>{link.dateAdded}</td> 

      </tr>)
      )}
      {/* {JSON.stringify(data)} */}
      
    </tbody> 

  </table>
</div>

    );
}

export default MainTable;