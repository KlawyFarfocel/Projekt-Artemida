import { useEffect, useState } from "react"
import "./css/Permissions.css"
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios"
const statusTypes=[
    "Opłacona","Nieopłacona"
]
const statusColors=[
    "text-success","text-danger"
]

export default function TableContent(props){
    const {userToken,president,setPresident,cashier,setCashier,huntsman,setHuntsman,secretary,setSecretary}=useStateContext()
    const handleRequestModal=()=>{
        props.setShowRequestModal(!props.showRequestModal)
    }
    const initialValue=""
    const handleClick=(id)=>{
        props.setDonateChangeId(id);
        props.setModalShow(true);
    }
    return(
       
        <div className="container w-75 h-100 mx-auto d-flex flex-column align-items-center justify-content-center ">
            <h1 className="mb-2 shadow-md p-1  rounded fs-1 text-uppercase fw-bold text-white">{props.title}</h1>
            {(props.topButton=="yes"?
                <div className="d-flex w-100">
                    {
                        (cashier | president
                            ?
                                (props.skarbnikMode
                                    ?
                                        <>
                                            <button type="button" className="btn btn-success ms-auto mb-1" onClick={()=>props.setSkarbnikMode(false) & props.setAdminViewHandler(true)}>Przejdź do Twoich składek</button>
                                            <button type="button" className="btn btn-success mb-1 mx-1" onClick={()=>props.setShowDonateModal(true)}>Dodaj składke</button>
                                        </>
                                    :
                                        <button type="button" className="btn btn-success ms-auto mb-1" onClick={()=>props.setSkarbnikMode(true) & props.setAdminViewHandler(true)}>Przejdź do panelu Skarbnika</button>
                                )
                            :
                                ""
                        )
                    }
                </div>
            :"")}
            {
                (secretary | president
                    ?
                        (props.permissionButton=="yes"
                        ?
                            (props.permissionMode
                            ?
                                <button type="button" className="btn btn-success ms-auto mb-1" onClick={()=>props.setPermissionMode(false) & props.setAdminViewHandler(true)}>Wróć do Twoich uprawnień</button>
                            :
                                <button type="button" className="btn btn-success ms-auto mb-1" onClick={()=>props.setPermissionMode(true) & props.setAdminViewHandler(true)}>Przeglądaj wnioski</button>
                            )
                        :
                            ""  
                        )
                    :
                    ""
                )
            }
            <table className="table align-middle table-bordered table-dark table-striped table-hover">
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
        {props.content.map((item, outerIndex) => (
          <tr key={outerIndex}>
                {Object.values(item).map((value, index) => (
                    (!value?<td key={index}><button type="button" className="btn btn-success" onClick={()=>handleClick(outerIndex)} >Zmień status/Usuń</button></td>
                    :
                    (props.hideFirst
                    ?
                        (index!=0
                            ?
                            
                            <td onClick={()=>console.log(value)}  key={index} className={
                                statusTypes.includes(Object.values(value).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)) ? statusColors[statusTypes.indexOf(Object.values(value).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue))]:""}>
                                    {typeof value === 'object' ? Object.values(value)[0] : value}
                            </td>
                            :
                            ""
                        )
                    :
                        (value=="showPermissionModal"
                        ? 
                            <td key={index}>
                                <div className="w-100 d-flex justify-content-center">
                                    <button type="button" onClick={()=>props.setRequestState(true) & props.setRequestId(props.content[0].id) & props.setRequest(true)} className="btn btn-success btn-sm me-1">Zaakceptuj</button>
                                    <button type="button" onClick={()=>props.setRequestState(true) & props.setRequestId(props.content[0].id) & props.setRequest(true)} className="btn btn-danger btn-sm"> Odrzuć</button>
                                </div>
                            </td>
                        :
                            (props.hideFirstPermission
                            ?
                                (index!=0
                                    ?
                                    <td onClick={()=>console.log(value)}  key={index} className={
                                        statusTypes.includes(Object.values(value).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)) ? statusColors[statusTypes.indexOf(Object.values(value).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue))]:""}>
                                            {typeof value === 'object' ? Object.values(value)[0] : value}
                                    </td>
                                    :
                                    ""
                                )
                            :
                                <td key={index} className={
                                    statusTypes.includes(Object.values(value).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)) ? statusColors[statusTypes.indexOf(Object.values(value).reduce((accumulator, currentValue) => accumulator + currentValue, initialValue))]:""}>
                                        {typeof value === 'object' ? Object.values(value)[0] : value}
                                </td>
                            )

                        )
                    )
                    )

                ))}
                
          </tr>
        ))}
      </tbody>
            </table>
            {props.useButton=="yes" ? <a className="btn btn-success w-50" onClick={handleRequestModal}>Złóż wniosek o przyznanie uprawnienia</a> : "" }
            
        </div>
    )
}