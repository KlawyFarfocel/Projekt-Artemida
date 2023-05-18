import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HuntTable(props){
    const [id,setId]=useState(0);
    const [navigation,setNavigation]=useState(false)
    const navigate=useNavigate()
    const navigateToInfo=()=>{
        const huntId=id
        navigate("/HuntInfo",{
            state:{
                huntId
            }
        })
    }
    useEffect(() => {
        if (navigation) {
          navigateToInfo();
        }
      }, [navigation]);
    return(
        <>
            <h5 className="text-white fs-2 text-center text-uppercase">{props.title}</h5>
            <table className="table align-middle table-bordered table-dark table-striped table-hover">
                <thead>
                    <tr>
                        {
                            props.headers.map((name,key)=>(
                                <td key={name+key}>{name}</td>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>    
                        {
                            props.content.map((name,outerIndex)=>(
                                <tr key={name["Nazwa"]+outerIndex}>
                                {
                                    Object.entries(name).map((name,key)=>(
                                    (name[0]=="Status"//czy wgl jest active
                                        ?
                                            (props.historyMode
                                                ?
                                                <td key={name+key} className="text-center">
                                                    <a className="btn btn-outline-info">Zobacz podsumowanie</a>
                                                </td>
                                                :
                                                    <td key={name+key} className="text-center">
                                                        <a onClick={()=>setId(props.content[outerIndex].Id)&setNavigation(true)} className="btn btn-success">Przejdź</a>
                                                    </td>
                                            )
                                        :
                                            (props.showFirst
                                                ?
                                                    <td key={name}>{name[1]}</td>
                                                :
                                                (name[0]=="Id"
                                                ?
                                                    ""
                                                :
                                                    <td key={name}>{name[1]}</td>
                                                )
                                            )
                                        )
                                    ))
                                }
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </>
    )
}