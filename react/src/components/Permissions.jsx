import { useEffect, useState } from "react"
import ReloadModal from "./ReloadModal"
import TableContent from "./TableContent"
import { useStateContext } from "../contexts/ContextProvider";
import "./css/Permissions.css"
import axiosClient from "../axios"

const permissionHeaders=[
    "Typ zezwolenia","Organ wydający","Numer zezwolenia","Data uzyskania","Wygasa"
];


export default function Permissions(){
    const [refresh,setRefresh]=useState(false);
    const userToken=useStateContext()['userToken'];
    const [propContent,setPropContent]=useState([]);
    useEffect(()=>{
        setRefresh(true);
        axiosClient
        .post("/showPermissions",{
            userToken
        })
        .then(({ data }) => {
            setPropContent(data[0]);
            setRefresh(false);           
        })
        .catch(err => {
        console.log(err);
        });
    },[])
    return(
        <>
            <TableContent title={"Twoje uprawnienia"} content={propContent} headers={permissionHeaders} useButton="yes"/>
            <ReloadModal show={refresh}/>
        </>
    )
}