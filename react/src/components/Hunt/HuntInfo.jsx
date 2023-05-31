import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CustomTooltip from "./Bootstrap-React-components/CustomTooltip";
import { useEffect, useState } from "react";
import EditHuntInfoModal from "./EditHuntInfoModal";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";

export default function HuntInfo(){
    let location = useLocation();
    const navigate=useNavigate();
    const huntId=location.state['huntId'];
    const [reloadRequest,setReloadRequest]=useState(false);
    const [modalShow, setModalShow] = useState(false);
    const huntHeaders=['Data rozpoczęcia',"Data zakończenia","Typ polowania","Lokalizacja","Miejsce zbiórki","Osoba odpowiedzialna","Kontakt"]
    const [huntProp,setHuntProp]=useState([]);
    const [huntTitle,setHuntTitle]=useState(`Polowanie id ${huntId} - wstaw nazwę polowania`)
    const {userToken,president,setPresident,cashier,setCashier,huntsman,setHuntsman,secretary,setSecretary}=useStateContext()
    const [userJoin,setUserJoin]=useState(false);
    const [IdSupervisor,setIdSupervisor]=useState()
    const changeParticipationInHunt=()=>{//Odchodzenie i dołączanie - dodać back
        setUserJoin(!userJoin)

    }
    useEffect(()=>{
        axiosClient.post("/ChangeHuntParticipation",{
            huntId,userToken,userJoin
        })
    },[userJoin])
    const goToActiveHunt=()=>{
        navigate("/ActiveHunt",{
            state:{
                huntId,
                IdSupervisor
            }
        })
    }

    const deleteHunt=()=>{//Usuwanie polowania
        axiosClient.post("/DeleteHunt",{
            huntId
        })
        .then(({data})=>{
            
            navigate("/Hunt")
        })
    }

    useEffect(()=>{
        axiosClient.post("/GetCurrentHunt",{
            huntId
        })
        .then(({data})=>{
            setHuntProp(data[0])
        })
    },[userToken,reloadRequest])
    useEffect(()=>{
        setIdSupervisor(huntProp["IdSupervisor"])
        setHuntTitle(huntProp["Nazwa"])
    },[huntProp])
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <h1 className="fs-1 text-white text-uppercase text-center">{huntTitle}</h1>
                    <table className="table align-middle table-bordered table-dark table-striped table-hover">
                        <tbody>
                        {Object.entries(huntProp).map(([key, value]) => (
                            <tr key={key}>
                                {(key=="IdSupervisor" || key=="Id")
                                ?
                                    ""
                                :
                                <td>{key}</td>
                                }
                                {
                                    (key=="IdSupervisor"|| key=="Id"
                                    ?
                                        ""
                                    :
                                        <td>
                                            {key=="Status"
                                            ?
                                            (value?"Aktywne":"Nieaktywne")
                                            :
                                            value
                                            }
                                        </td>
                                    )
                                }

                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <h5 className="text-white fs-3 text-uppercase text-center">Dostępne akcje</h5>
                    <div className="d-flex justify-content-center">
                        {(huntProp.Status)
                            ?
                            <a className="btn btn-success" onClick={goToActiveHunt}>Przejdź do polowania</a>
                            :
                            <CustomTooltip isDisabled={false} placement="top" tooltipBody={"Polowanie niedostępne - poczekaj na rozpoczęcie polowania"} buttonClassNameString="btn btn-secondary" buttonText={"Przejdź do polowania"}/>
                        }
                        {
                            (userJoin
                                ?
                                <a onClick={changeParticipationInHunt} className="btn btn-danger mx-1">Opuść polowanie</a>
                                :
                                <a onClick={changeParticipationInHunt} className="btn btn-success ms-1">Dołącz do polowania</a>
                            )
                        }
                        {
                            (president | huntsman
                                ?
                                    <>
                                        <a className="btn btn-danger mx-1" onClick={deleteHunt}>Usuń polowanie</a>
                                        <a className="btn btn-primary me-1" onClick={()=>setModalShow(true)}>Edytuj dane polowania</a>
                                    </>
                                :
                                    ""
                            )
                        }

                    </div>
                </div>
            </div>
            { <EditHuntInfoModal reloadRequest={reloadRequest} setReloadRequest={setReloadRequest} huntId={huntId} content={huntProp} show={modalShow} setModalShow={setModalShow}/> }
        </div>
    )
}