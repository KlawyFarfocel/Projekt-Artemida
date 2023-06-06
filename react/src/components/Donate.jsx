import { useEffect, useState } from "react"
import ReloadModal from "./ReloadModal"
import TableContent from "./TableContent"
import "./css/Permissions.css"
import axiosClient from "../axios"
import { useStateContext } from "../contexts/ContextProvider";
import ChangeDonateDataModal from "./changeDonateDataModal"
import AddDonateModal from "./AddDonateModal"
import FilterDonateModal from "./FilterDonateModal"
export default function Donate(){
    const userToken=useStateContext()['userToken'];
    const [headers,setHeaders]=useState([]);
    const [title,setTitle]=useState("");


const [refresh,setRefresh]=useState(false);
const [propContent,setPropContent]=useState([]);
const [refreshUserDonate,setRefreshUserDonate]=useState(false);
const [donateChangeId, setDonateChangeId]=useState(0);

const [modalShow,setModalShow]=useState(false);
const [showDonateModal,setShowDonateModal]=useState(false);
const [filterModalShow,setFilterModalShow]=useState(false);

const [startDate,setStartDate]=useState(new Date(new Date().getFullYear(), 0, 1));
const [endDate,setEndDate]=useState(new Date(new Date().getFullYear(), 11, 31));

const [skarbnikMode, setSkarbnikMode]=useState(false);
const [adminViewHandler,setAdminViewHandler]=useState(true);
    

    if(adminViewHandler){
        if(skarbnikMode){
            setHeaders(["Imię i nazwisko","Opis","Termin","Kwota","Data zapłaty","Status","Akcja"])
            setTitle("Wszystkie składki Twojego klubu")
            setRefresh(true);
            alert(userToken)  
            axiosClient.post("/showSkarbnikDonate",{
                userToken
            })
            .then(({data})=>{
                setPropContent(data[0])
                setRefresh(false);  
            })
            setSkarbnikMode(true)
            setAdminViewHandler(false)
        }
        else{
            setHeaders([
                "Opis","Termin","Kwota","Data zapłaty","Status"
            ])
            setTitle("Twoje składki")
            setAdminViewHandler(false)
                setRefreshUserDonate(!refreshUserDonate)
        }
    }
    useEffect(()=>{
        setRefresh(true);
        axiosClient
        .post("/showDonate",{
            userToken
        })
        .then(({ data }) => {       
            setPropContent(data[0]);
            setRefresh(false);  
        })
        .catch(err => {
        console.log(err);
        });
    },[refreshUserDonate])
    return((
        <>       
            <TableContent hideFirst={true} setFilterModalShow={setFilterModalShow} setShowDonateModal={setShowDonateModal} setModalShow={setModalShow} setDonateChangeId={setDonateChangeId} skarbnikMode={skarbnikMode} setSkarbnikMode={setSkarbnikMode} setAdminViewHandler={setAdminViewHandler} title={title} content={propContent} headers={headers} useButton={'no'} topButton={"yes"}/>
            <ReloadModal show={refresh}/>
            <ChangeDonateDataModal setAdminViewHandler={setAdminViewHandler} adminViewHandler={adminViewHandler} userToken={userToken} id={donateChangeId} content={propContent[donateChangeId]} show={modalShow} setModalShow={setModalShow}/>
            <AddDonateModal show={showDonateModal} setShowDonateModal={setShowDonateModal}/>
            <FilterDonateModal setPropContent={setPropContent} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} show={filterModalShow} setFilterModalShow={setFilterModalShow}/>
        </>
    ))
    }