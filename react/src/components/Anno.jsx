import { useEffect, useState } from "react";
import MessageModal from "./MessageModal";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import "./css/Anno.css";
import ReloadModal from "./ReloadModal";
import AddAnimalsToHuntModal from "./Hunt/AddAnimalsToHuntModal";
import AddAnnouncementModal from "./AddAnnouncementModal";

export default function Foo(){
    const {userToken,president,cashier,huntsman,secretary}=useStateContext()
    const [show,setShow]=useState(false)


    const [annoProp,setAnnoProp]=useState([])
    const [refresh,setRefresh]=useState(false);
    const [reload,setReload]=useState(false);
    useEffect(()=>{
        setRefresh(true);
        axiosClient
        .post("/ogloszenie",{
            userToken
        })
        .then(({ data }) => {
            setRefresh(false);
            setAnnoProp(data[0]);  
                    
          })
        .catch(err => {
        console.log(err);
        });
    },[userToken,reload])
    function handleModalText(key){
        setMessageKey(key);
        setModalShow(true);
    }

    const [modalShow, setModalShow] = useState(false);
    const [messageKey, setMessageKey]=useState(0);
    return(
        <> 
                <h1 className="mb-2 shadow-md p-1 mt-3 text-center rounded fs-1 text-uppercase fw-bold text-white">Ogłoszenia</h1>
                <div className="d-flex flex-column justify-content-start">
                <div className="w-75 mx-auto d-flex">
                    {
                        (president | secretary | huntsman | cashier 
                            ?
                                <a className="btn btn-success ms-auto mb-1" onClick={()=>{setShow(true)}}>Dodaj ogłoszenie</a> 
                            : false
                        )
                    }   
                </div>
                <table className="table table-hover mx-auto w-75 table-responsive">
                    <thead className="table-dark">     
                        <tr className="text-center">
                            <td>Nadawca</td>
                            <td>Temat</td>
                            <td>Data wysłania</td>
                            <td>Priorytet</td>
                            <td>Pokaż</td>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {annoProp.map((value,key)=>
                                <tr key={key} onClick={() => handleModalText(key) } className="text-center table-light">
                                    <td key={key+"st"}>{Object.values(value)[0]}</td>
                                    <td key={key+"nd"}>{Object.values(value)[1]}</td>
                                    <td key={key+"rd"}>{Object.values(value)[2]}</td>
                                    {Object.values(value)[4] == "niski" ? (
                                        <td key={key} className="text-success text-center fs-3"><i className="bi bi-exclamation-circle-fill "></i></td>
                                    ):Object.values(value)[4] == "średni" ?(
                                        <td key={key} className="text-warning text-center fs-3"><i className="bi bi-exclamation-circle-fill"></i></td>
                                    ):<td key={key} className="text-danger text-center fs-3"><i className="bi bi-exclamation-circle-fill"></i></td>}
                                    <td>
                                        <a className="btn btn-success w-auto" onClick={() => handleModalText(key) }><i className="bi bi-envelope-fill"></i></a>
                                    </td>
                                </tr>
                            )}
                        
                    </tbody>
                </table>
                </div>
                
                <MessageModal show={modalShow} content={annoProp[messageKey]} messageKey={messageKey}setModalShow={setModalShow}/>
                <ReloadModal show={refresh}/>
                <AddAnnouncementModal reload={reload} setReload={setReload} show={show} setShow={setShow}/>
        </>
    )
}
{/* <a className="btn btn-success" onClick={() => setModalShow(true)}>XD</a> */}