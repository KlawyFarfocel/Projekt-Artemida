import { useEffect, useState } from "react";
import MessageModal from "./MessageModal";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import "./css/Anno.css";

export default function Foo(){
    const userToken=useStateContext()['userToken'];
    const [annoProp,setAnnoProp]=useState([])
    useEffect(()=>{
        axiosClient
        .post("/ogloszenie",{
            userToken
        })
        .then(({ data }) => {
            setAnnoProp(data[0]);           
          })
        .catch(err => {
        console.log(err);
        });
    },[])
    function handleModalText(key){
        setMessageKey(key);
        setModalShow(true);
    }

    const [modalShow, setModalShow] = useState(false);
    const [messageKey, setMessageKey]=useState(0);
    return(
        <>
                <table className="table mx-auto mt-5 w-100 w-md-75 table-responsive">
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
                                <tr className="text-center">
                                    <td key={key+"st"}>{Object.values(value)[0]}</td>
                                    <td key={key+"nd"}>{Object.values(value)[1]}</td>
                                    <td key={key+"rd"}>{Object.values(value)[2]}</td>
                                    {Object.values(value)[4] == "Niski" ? (
                                        <td key={key} className="text-success text-center">!</td>
                                    ):Object.values(value)[4] == "Średni" ?(
                                        <td key={key} className="text-warning text-center">!</td>
                                    ):<td key={key} className="text-danger text-center">!</td>}
                                    <td>
                                        <a className="btn btn-success w-auto" onClick={() => handleModalText(key) }><i class="bi bi-envelope-fill"></i></a>
                                    </td>
                                </tr>
                            )}
                        
                    </tbody>
                </table>
                <MessageModal show={modalShow} content={annoProp[messageKey]} messageKey={messageKey} setModalShow={setModalShow}/>
        </>
    )
}
{/* <a className="btn btn-success" onClick={() => setModalShow(true)}>XD</a> */}