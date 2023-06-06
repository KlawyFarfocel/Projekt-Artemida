import { useEffect, useState } from "react"
import AddUserModal from "./AddUserModal"
import StatsItem from "./StatsComponents/StatsItem"
import "./css/HunterClub.css"
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios"
import AddUserToClubModal from "./AddUserToClubModal"
import AssignRanksClubModal from "./AssignRanksInClubModal"
import { id } from "date-fns/locale"
import UserInfoModal from "./userInfoModal"
import SetNextMeetingModal from "./SetNextMeetingModal"

export default function HunterClub(){
    
    const {userToken,president,setPresident,cashier,setCashier,huntsman,setHuntsman,secretary,setSecretary}=useStateContext()
    const [usersWithoutClub,setUsersWithoutClub]=useState([]);
    const [teamMainProp,setTeamMainProp]=useState([]);
    const [teamAllProp,setTeamAllProp]=useState([]);

    const [teamAllSelectProp,setTeamAllSelectProp]=useState([]);
    const [teamMainSelectProp,setTeamMainSelectProp]=useState([]);
    const [userDataProp,setUserDataProp]=useState();
    const [clubName,setClubName]=useState("")

    const [huntsProp,setHuntsProp]=useState([]);
    const [nextMeeting,setNextMeeting]=useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalUserShow, setModalUserShow]=useState(false);
    const [modalRanksShow, setModalRanksShow]=useState(false);
    const [modalUserInfoShow, setModalUserInfoShow]=useState(false);
    const [modalNextMeeting, setModalNextMeeting]=useState(false);

    const [request,setRequest]=useState(false);
    const [reloadRequest,setReloadRequest]=useState(false);

    const kickUserOutOfClub=(teamPropId)=>{
        const kickUserId=teamAllProp[teamPropId].id
        axiosClient.post("/KickUserOutOfClub",{
            kickUserId
        })
        .then(()=>{
            setReloadRequest(!reloadRequest)
        })
    }

    const GetUserDataInClub=(teamPropId)=>{
        const userDataId=teamAllProp[teamPropId].id
        axiosClient.post("/GetUserDataInClub",{
            userDataId
        })
        .then((({data})=>{
            setUserDataProp(data[0]);
            setModalUserInfoShow(true);
        }))
    }


    if(request==true){

        const optionsArray = Object.values(selectedOption).map(option => option.value);
        const optionsString=optionsArray.join(',')
        axiosClient.post("/AddExistingUserToClub",{
            optionsString,userToken
        })
        
        .then(({data})=>{
           setRequest(false);
           (reloadRequest
            ?
              setReloadRequest(false)
            :
              setReloadRequest(true)
          )
        })
    }

    useEffect(()=>{
        axiosClient.post("/getInformationOnPageLoad",{
            userToken
        })
        .then(({data})=>{
            setUsersWithoutClub(data[0]);
            setTeamMainProp(data[1]);
            // setTeamMainSelectProp(data[1].map(item=>({
            //     Object.entries(item).map(innerItem=>({

            //     }))
            // })))
            setTeamMainSelectProp(
                data[1].map(item=>({
                    value:item.id,
                    label:item[Object.keys(item)[1]]
                }))
            )


            setTeamAllProp(data[2]);
            
            setTeamAllSelectProp(data[2].map(item=>({
                value:item.id,
                label:item.łowczy
            })))

            const formattedData = data[3].map(item => ({
                id: item.id,
                Nazwa: item.Nazwa,
                Data: new Date(Date.parse(item.Data))
            }));
            setHuntsProp(formattedData);
            const newData=data[4].map(item=>({
                id: item.id,
                Nazwa: item.Nazwa,
                Data: new Date(item.Data)
            }))
            setNextMeeting(newData);
            setClubName(data[5])
            setReloadRequest(false)
        })
        .catch(err => {
            console.log(err)
        });
    },[userToken,reloadRequest])
    useEffect(()=>{
        axiosClient.post("/CheckPrivileges",{
            userToken
        })
        .then(({data})=>{
            setPresident(data["President"])
            setSecretary(data["Secretary"])
            setHuntsman(data["Huntsman"])
            setCashier(data["Cashier"])
        })
    },[userToken])
    return(
        <div className="container-fluid">
            {
                (clubName==""
                ?
                <h1 className="text-uppercase fs-1 text-white text-center my-3">Nie jesteś przypisany do żadnego koła łowieckiego</h1>
                :
                <h1 className="text-uppercase fs-1 text-white text-center my-3">Koło Łowieckie "{clubName}"</h1>
                )
            }
            {
                (clubName==""
                ?
                <h5 className="text-center text-uppercase text-white">Skontaktuj się z najbliższym Kołem Łowieckim</h5>
                :
                <div className="row pb-5">
                <div className="col-12 col-md-5 pb-5">
                    <h1 className="text-uppercase text-white fs-1 text-center">Zarząd</h1>
                    <table className="table pb-5 mx-auto">
                        <thead className="table-dark">
                           <tr>
                                <td className="text-center">Stanowisko</td>
                                <td className="text-center">Imię i nazwisko</td> 
                           </tr>
                        </thead>
                        <tbody className="table-light">
                            {
                                teamMainProp.map((value)=>(
                                        Object.entries(value).map((value,key)=>(
                                            (value[0]!="id"
                                            ?
                                            <tr key={key}>
                                                <td className="text-center" key={value[1]}>{value[0]}</td>
                                                <td className="text-center" key={value[0]}>{value[1]}</td>
                                            </tr>
                                            :""
                                            )
                                        ))
                                ))
                            }
                        </tbody>
                    </table>
                    
                    <h1 className="text-uppercase text-white fs-1 text-center">Członkowie</h1>
                    <table className="table">
                        <thead className="table-dark">
                           <tr>
                                <td className="text-center">Imię i nazwisko</td>
                                <td className="text-center">Akcja</td> 
                           </tr>
                        </thead>
                        <tbody className="table-light">
                            {
                                teamAllProp.map((value,key)=>(
                                    <tr key={key}>
                                        {
                                            Object.entries(value).map((valueInner,key)=>(
                                                (!key==0
                                                    ?
                                                        <td className="text-center" key={valueInner[0]}>{valueInner[1]}</td>
                                                    :
                                                        ""
                                                )
                                            ))

                                        }
                                            <td className="text-center">
                                                <button onClick={()=>GetUserDataInClub(key)} className="btn btn-success w-45">Wyświetl dane</button>
                                                {(president
                                                    ?
                                                        <button onClick={()=>kickUserOutOfClub(key)} className="btn btn-danger ms-1 w-45">Wyrzuć z koła</button>
                                                    :
                                                        ""
                                                )}
                                            </td>
                                     </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-md-4 mb-5">
                    <h1 className="text-uppercase text-white fs-1 text-center">Najbliższe polowania</h1>
                    {
                        huntsProp.map((value,key)=>(
                           <StatsItem key={value.id} title={value.Nazwa} date={value.Data} />
                        ))
                    }
                </div>
                <div className="col-12 col-md-3">
                    <h1 className="text-uppercase text-white fs-1 text-center">Następne spotkanie</h1>
                    {
                        nextMeeting.map((value,key)=>(
                           <StatsItem key={value.id} mode='hour' className="my-auto" title={value.Nazwa} date={value.Data} />
                        ))
                    }
                </div>
            </div>
            )
            }

            {
                (president | secretary
                    ?
                    <div className="row fixed-md">
                    <div className="col-12 bg-dark py-2">
                        <h1 className="text-white fs-2 text-center text-uppercase mb-2">Panel administracyjny </h1>
                        <div className="d-flex mx-auto w-100 justify-content-center">
                            <a className="btn btn-success mx-3"onClick={()=>setModalShow(true)}>Dodaj nowego członka</a>
                            <a className="btn btn-success mx-3"onClick={()=>setModalUserShow(true)}>Zapisz istniejącego członka do tego Koła</a>
                            <a className="btn btn-success mx-3" onClick={()=>setModalNextMeeting(true)}>Ustal następne spotkanie</a>
                            {
                            (president
                                ?
                                <a className="btn btn-success mx-3" onClick={()=>setModalRanksShow(true)}>Zarządzaj zarządem</a>
                                :""
                            )
                            }
                        </div>
                    </div>
                    </div>
                    :""
                )
                
            }
            <AddUserModal setReloadRequest={setReloadRequest} reloadRequest={reloadRequest} show={modalShow} setModalShow={setModalShow}/>
            <UserInfoModal content={userDataProp} show={modalUserInfoShow} setModalUserInfoShow={setModalUserInfoShow}/>
            <AddUserToClubModal setReloadRequest={setReloadRequest} reloadRequest={reloadRequest} show={modalUserShow} setSelectedOption={setSelectedOption} options={usersWithoutClub} setRequest={setRequest} setModalUserShow={setModalUserShow}/>
            <AssignRanksClubModal setReloadRequest={setReloadRequest} reloadRequest={reloadRequest} content={teamAllSelectProp} currentSquad={teamMainSelectProp} show={modalRanksShow} setModalRanksShow={setModalRanksShow}></AssignRanksClubModal>
            <SetNextMeetingModal setReloadRequest={setReloadRequest} reloadRequest={reloadRequest} setModalNextMeeting={setModalNextMeeting} show={modalNextMeeting}/>
        </div>
    )
}