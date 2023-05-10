import { useEffect, useState } from "react"
import ReloadModal from "./ReloadModal"
import TableContent from "./TableContent"
import { useStateContext } from "../contexts/ContextProvider";
import "./css/Permissions.css"
import axiosClient from "../axios"
import RequestModal from "./RequestModal";

export default function Permissions(){
    const [permissionHeaders,setPermissionHeaders]=useState();
    const defaultPermissionHeaders=[
        "Typ zezwolenia","Organ wydający","Numer zezwolenia","Data uzyskania","Wygasa"
    ];
    const permissionRequestHeaders=[
        "Imię i nazwisko","Typ zezwolenia","Organ wydający","Numer zezwolenia","Data uzyskania","Wygasa","Akcja"
    ];
    
    const [refresh,setRefresh]=useState(false);
    const userToken=useStateContext()['userToken'];
    const [propContent,setPropContent]=useState([]);

    const [showRequestModal, setShowRequestModal]=useState(false);
    const [hideFirstPermission, setHideFirstPermission]=useState(false)

    const [request,setRequest]=useState(false);
    const [requestState,setRequestState]=useState(false);
    const [requestId, setRequestId]=useState(0);

    const [refreshUserPermission,setRefreshUserPermission]=useState(false)
    const [title,setTitle]=useState("Twoje uprawnienia")
    const [permissionMode, setPermissionMode]=useState(false)
    const [adminViewHandler,setAdminViewHandler]=useState(true);
    if(adminViewHandler){
        if(permissionMode){
            setTitle("Wnioski o przyznanie uprawnień")
            setPermissionHeaders(permissionRequestHeaders)
            setHideFirstPermission(true)
            axiosClient.post("/showPermissionRequest",{
                userToken
            })
            .then(({data})=>{    
                setPropContent(data[0])
                setRefresh(false);  
            })
            setAdminViewHandler(false)
        }
        else{
            setTitle("Twoje uprawnienia")
            setPermissionHeaders(defaultPermissionHeaders)
            setAdminViewHandler(false)
            setHideFirstPermission(false)
            setRefreshUserPermission(!refreshUserPermission)
        }
    }
    if(request){
        axiosClient.post("/EditPermissionStatus"),{
            
        }
        setRequest(false)
    }
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
    },[refreshUserPermission])
    return(
        <>
            <TableContent setRequest={setRequest} setRequestId={setRequestId} setRequestState={setRequestState} hideFirstPermission={hideFirstPermission} permissionTable={true} permissionButton="yes" adminViewHandler={adminViewHandler} setAdminViewHandler={setAdminViewHandler} permissionMode={permissionMode} setPermissionMode={setPermissionMode} showRequestModal={showRequestModal} setShowRequestModal={setShowRequestModal} title={title} content={propContent} headers={permissionHeaders} useButton="yes"/>
            <ReloadModal show={refresh}/>
            <RequestModal userToken={userToken} show={showRequestModal} setShowRequestModal={setShowRequestModal}/>
        </>
    )
}