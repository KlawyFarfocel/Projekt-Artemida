import { useEffect, useState } from "react";
import MessageModal from "./MessageModal";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Foo(){
    const userToken=useStateContext()['userToken'];
    const [annoProp,setAnnoProp]=useState([])
        axiosClient
        .post("/ogloszenie",{
            userToken
        })
        .then(({ data }) => {
            console.log(annoProp)
            setAnnoProp(data[0]);
            console.log(annoProp)
          })


    const [modalShow, setModalShow] = useState(false);
    return(
        <>
                <table className="table w-75 mx-auto mt-5">
                    <thead className="table-dark">     
                        <tr className="text-center">
                            <td>Nadawca</td>
                            <td>Temat</td>
                            <td>Data wysłania</td>
                            <td>Priorytet</td>
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
                                </tr>
                            )}
                        
                    </tbody>
                </table>
                <MessageModal show={modalShow} content={annoProp} setModalShow={setModalShow}/>
        </>
    )
}
{/* <a className="btn btn-success" onClick={() => setModalShow(true)}>XD</a> */}