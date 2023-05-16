import { useEffect, useState } from "react"
import TableContent from "../TableContent"
import TableString from "../TableString"
import HuntTable from "./HuntTable"
import EditHuntInfoModal from "./EditHuntInfoModal"
import { useStateContext } from "../../contexts/ContextProvider"
import axiosClient from "../../axios"

export default function HuntMain(){
    const polowaniaTableHeaders=[
        "Nazwa","Data rozpoczęcia","Data zakończenia","Przejdź do polowania"
    ]
    const {userToken}=useStateContext()
    const [reloadRequest,setReloadRequest]=useState(false)
    const [isAdmin,setIsAdmin]=useState(true)
    const activeHuntsTitle="Aktywne polowania";
    const historyHuntsTitle="Historia polowań";
    const [modalShow, setModalShow] = useState(false);
    const [polowaniaTableProp,setPolowaniaTableProp]=useState([])

    useEffect(()=>{
        axiosClient.post("/GetActiveHunts",{
            userToken
        })
        .then(({data})=>{
            setPolowaniaTableProp(data[0])
        },[userToken])
    },[userToken,reloadRequest])
    return(
        <div className="container-fluid">
            <h1 className="fs-1 text-white text-uppercase text-center py-3">POLOWANIA</h1>
            <div className="row">
                <div className="col-12 col-md-5 offset-md-1">
                    <HuntTable showFirst={false} title={activeHuntsTitle} headers={polowaniaTableHeaders} content={polowaniaTableProp}/>
                    {(isAdmin
                    ?
                    <div className="w-100 text-center">
                        <a className="btn btn-success w-50 " onClick={()=>setModalShow(true)}>Dodaj nowe polowanie</a>
                        <EditHuntInfoModal show={modalShow} setModalShow={setModalShow}/>
                    </div>
                    :
                        ""
                    )}
                </div>
                <div className="col-12  col-md-5 ">
                    <HuntTable showFirst={false} title={historyHuntsTitle} historyMode={true} headers={polowaniaTableHeaders} content={polowaniaTableProp}/>
                </div>
            </div>
        </div>
    )
}