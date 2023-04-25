import { useEffect, useState } from "react"
import ReloadModal from "./ReloadModal"
import TableContent from "./TableContent"
import "./css/Permissions.css"
import axiosClient from "../axios"
import { useStateContext } from "../contexts/ContextProvider";
export default function Donate(){
    const headers=[
        "Opis","Termin","Kwota","Data zapłaty","Status"
    ]
const userToken=useStateContext()['userToken'];
const [refresh,setRefresh]=useState(false);
const [propContent,setPropContent]=useState([]);
    useEffect(()=>{
        setRefresh(true);
        axiosClient
        .post("/showDonate",{
            userToken
        })
        .then(({ data }) => {            
            console.log(data);
            setPropContent(data[0]);
            
            setRefresh(false);  
        })
        .catch(err => {
        console.log(err);
        });
    },[])
    console.log(propContent);
    return((
        <>
            <TableContent title={"Twoje składki"} content={propContent} headers={headers} useButton={'no'}/>
            <ReloadModal show={refresh}/>
        </>
    ))
    }