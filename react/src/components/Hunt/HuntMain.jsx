import { useEffect, useState } from "react"
import TableContent from "../TableContent"
import TableString from "../TableString"
import HuntTable from "./HuntTable"
import EditHuntInfoModal from "./EditHuntInfoModal"
import { useStateContext } from "../../contexts/ContextProvider"
import axiosClient from "../../axios"
import Axios from "axios"

export default function HuntMain(){
    const polowaniaTableHeaders=[
        "Nazwa","Data rozpoczęcia","Data zakończenia","Przejdź do polowania"
    ]
    const [reloadRequest,setReloadRequest]=useState(false)
    const activeHuntsTitle="Aktywne polowania";
    const historyHuntsTitle="Historia polowań";
    const [modalShow, setModalShow] = useState(false);
    const [polowaniaTableProp,setPolowaniaTableProp]=useState([])
    const [historyPolowaniaTableProp,setHistoryPolowaniaTableProp]=useState([])
    const {userToken,president,setPresident,cashier,setCashier,huntsman,setHuntsman,secretary,setSecretary,setUserToken}=useStateContext()
    const generateRaport=()=>{
        axiosClient
        .post('/downloadCsv', null, { responseType: 'text', headers: { 'Content-Type': 'text/csv; charset=UTF-8' } })
        .then(response => {
          const blob = new Blob([response.data], { type: 'text/csv; charset=UTF-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'raport.csv');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Error downloading CSV:', error);
        });

    }
    const getFilenameFromHeaders = (headers) => {
        const dispositionHeader = headers['content-disposition'];
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(dispositionHeader);
        if (matches != null && matches[1]) {
          return matches[1].replace(/['"]/g, '');
        }
        return 'raportPolowania.csv'; // Default filename
      };
    useEffect(()=>{
        axiosClient.post("/GetActiveHunts",{
            userToken
        })
        .then(({data})=>{
            setPolowaniaTableProp(data[0])
            setHistoryPolowaniaTableProp(data[1])
        },[userToken])
    },[userToken,reloadRequest])
    return(
        <div className="container-fluid">
            <h1 className="fs-1 text-white text-uppercase text-center py-3">POLOWANIA</h1>
            <div className="row">
                <div className="col-12 col-md-5 offset-md-1">
                    <HuntTable showFirst={false} title={activeHuntsTitle} headers={polowaniaTableHeaders} content={polowaniaTableProp}/>
                    {(huntsman | president
                    ?
                    <div className="w-100 text-center">
                        <a className="btn btn-success w-50 " onClick={()=>setModalShow(true)}>Dodaj nowe polowanie</a>
                        <a className="btn btn-success w-25 ms-5 " onClick={generateRaport}>Wygeneruj raport</a>
                        <EditHuntInfoModal edit={true} reloadRequest={reloadRequest} setReloadRequest={setReloadRequest} show={modalShow} setModalShow={setModalShow}/>
                    </div>
                    :
                        ""
                    )}
                </div>
                <div className="col-12  col-md-5 ">
                    <HuntTable showFirst={false} title={historyHuntsTitle} historyMode={true} headers={polowaniaTableHeaders} content={historyPolowaniaTableProp}/>
                </div>
            </div>
        </div>
    )
}