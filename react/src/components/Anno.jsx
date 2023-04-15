import { useEffect, useState } from "react";
import MessageModal from "./MessageModal";

export default function Foo(){
    const annoProp=[
        {
            "Nadawca":"Hodowca bydła",
            "Temat":"Hodowla bydła",
            "Data wysłania":"27.06.2023r.",
            "Treść":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "Priorytet":"Niski"
        },
        {
            "Nadawca":"Hodowca bydła",
            "Temat":"Hodowla bydła",
            "Data wysłania":"27.06.2023r.",
            "Treść":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "Priorytet":"Wysoki"
        },
        {
            "Nadawca":"Hodowca bydła",
            "Temat":"Hodowla bydła",
            "Data wysłania":"27.06.2023r.",
            "Treść":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "Priorytet":"Średni"
        }
    ]
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
                                <tr>
                                    <td key={key}>{Object.values(value)[0]}</td>
                                    <td key={key}>{Object.values(value)[1]}</td>
                                    <td key={key}>{Object.values(value)[2]}</td>
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