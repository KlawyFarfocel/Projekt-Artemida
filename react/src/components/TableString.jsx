export default function TableString(props){
    return(
        <>
        <h1 className="text-uppercase text-white fs-1 text-center">{props.title}</h1>
        <table className="table pb-5">
            
            <thead className="table-dark">
                <tr>
                    {props.headers.map((value,key)=>(
                        <td key={key} className="text-center">{value}</td>
                    ))}
                </tr>
            </thead>
            <tbody className="table-light">
                {
                    props.content.map((value,key)=>(
                                <tr key={key}>
                                    <td className="text-center" key={value[1]}>{key+1}</td>
                                    <td className="text-center" key={value[0]}>{value}</td>
                                </tr>
                    ))
                }
            </tbody>
        </table>
    </>
    )
}