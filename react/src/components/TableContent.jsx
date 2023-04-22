import "./css/Permissions.css"
const statusTypes=[
    "Opłacona w terminie","Do zapłaty","Opłacona z opóźnieniem","Nieopłacona"
]
const statusColors=[
    "text-success","text-secondary","text-warning","text-danger"
]
export default function TableContent(props){
    const initialValue=""
    return(
       
        <div className="container w-50 h-100 mx-auto d-flex flex-column align-items-center justify-content-center ">
            <h1 className="mb-2 shadow-md p-1  rounded fs-1 text-uppercase fw-bold text-white">{props.title}</h1>
            <table className="table table-bordered table-dark table-striped table-hover">
                <thead>
                    <tr>
                        {
                            props.headers.map((name)=>(
                                <td key={name}>{name}</td>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
        {props.content.map((item, index) => (
          <tr key={index}>
                {Object.values(item).map((value, index) => (
                    <td key={index} className={
                    statusTypes.includes(Object.values(value).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)) ? statusColors[statusTypes.indexOf(Object.values(value).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue))]:""}>
                        {typeof value === 'object' ? Object.values(value)[0] : value}
                    </td>
                ))}
                
          </tr>
        ))}
      </tbody>
            </table>
            {props.useButton=="yes" ? <a className="btn btn-success w-50">Złóż wniosek o przyznanie uprawnienia</a> : "" }
            
        </div>
    )
}