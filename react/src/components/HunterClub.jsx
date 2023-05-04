import { useEffect, useState } from "react"
import AddUserModal from "./AddUserModal"
import StatsItem from "./StatsComponents/StatsItem"
import "./css/HunterClub.css"
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios"
import AddUserToClubModal from "./AddUserToClubModal"

export default function HunterClub(){
    const [userToken,setUserToken]=useStateContext()['userToken'];

    const [usersWithoutClub,setUsersWithoutClub]=useState([]);
    const [teamMainProp,setTeamMainProp]=useState([]);
    const [teamAllProp,setTeamAllProp]=useState([]);
    const [huntsProp,setHuntsProp]=useState([]);
    const [nextMeeting,setNextMeeting]=useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalUserShow, setModalUserShow]=useState(false);
    const [request,setRequest]=useState(false);
    if(request==true){

        const optionsArray = Object.values(selectedOption).map(option => option.value);
        const optionsString=optionsArray.join(',')
        console.log(optionsString)
        axiosClient.post("/AddExistingUserToClub",{
            optionsString,userToken
        })
        
        .then(({data})=>{
           // setRequest(false);
           //setUsersWithoutClub(data[0]);
           console.log(data)
        })
    }

    useEffect(()=>{
        axiosClient.post("/getInformationOnPageLoad",{
        })
        .then(({data})=>{
            setUsersWithoutClub(data[0]);
            setTeamMainProp(data[1]);
            setTeamAllProp(data[2]);
            const formattedData = data[3].map(item => ({
                id: item.id,
                Nazwa: item.Nazwa,
                Data: new Date(item.Data)
            }));
            setHuntsProp(formattedData);
            const newData=data[4].map(item=>({
                id: item.id,
                Nazwa: item.Nazwa,
                Data: new Date(item.Data)
            }))
            setNextMeeting(newData);
        })
    },[userToken])
    return(
        <div className="container-fluid">
            <h1 className="text-uppercase fs-1 text-white text-center my-3">Koło Łowieckie "Bubr"</h1>
            <div className="row pb-5">
                <div className="col-12 col-md-5 pb-5">
                    <h1 className="text-uppercase text-white fs-1 text-center">Zarząd</h1>
                    <table className="table pb-5">
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
                                            <tr key={key}>
                                                <td className="text-center" key={value[1]}>{value[0]}</td>
                                                <td className="text-center" key={value[0]}>{value[1]}</td>
                                            </tr>
                                        ))
                                ))
                            }
                        </tbody>
                    </table>
                    
                    <h1 className="text-uppercase text-white fs-1 text-center">Członkowie</h1>
                    <table className="table">
                        <thead className="table-dark">
                           <tr>
                                <td className="text-center">Stanowisko</td>
                                <td className="text-center">Imię i nazwisko</td> 
                           </tr>
                        </thead>
                        <tbody className="table-light">
                            {
                                teamAllProp.map((value)=>(
                                        Object.entries(value).map((value,key)=>(
                                            <tr key={key}>
                                                <td className="text-center" key={value[1]}>{value[0]}</td>
                                                <td className="text-center" key={value[0]}>{value[1]}</td>
                                            </tr>
                                        ))
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
                           <StatsItem key={value.id} className="my-auto" title={value.Nazwa} date={value.Data} />
                        ))
                    }
                </div>
            </div>
            <div className="row fixed-md">
                <div className="col-12 bg-dark py-2">
                    <h1 className="text-white fs-2 text-center text-uppercase mb-2">Panel administracyjny </h1>
                    <div className="d-flex mx-auto w-100 justify-content-center">
                        <a href="#" className="btn btn-success mx-3"onClick={()=>setModalShow(true)}>Dodaj nowego członka</a>
                        <a href="#" className="btn btn-success mx-3"onClick={()=>setModalUserShow(true)}>Zapisz istniejącego członka do tego Koła</a>
                        <a href="#" className="btn btn-success mx-3">Ustal następne spotkanie</a>
                    </div>
                </div>
            </div>
            <AddUserModal show={modalShow} setModalShow={setModalShow}/>
            <AddUserToClubModal show={modalUserShow} setSelectedOption={setSelectedOption} options={usersWithoutClub} setRequest={setRequest} setModalUserShow={setModalUserShow}/>
        </div>
    )
}