import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import AddShootedAnimalModal from "./AddShootedAnimalModal";
import axiosClient from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ActiveHunt(){

    const [show, setShow]=useState(false)
    const [animals,setAnimals]=useState([]);
    const {userToken,president,setPresident,cashier,setCashier,huntsman,setHuntsman,secretary,setSecretary,setUserToken}=useStateContext()
    const [usersList,setUsersList]=useState()
    let location = useLocation();
    const navigate=useNavigate()
    const huntId=location.state['huntId'];
    const supervisorId=location.state['IdSupervisor'];
    const [tableProp,setTableProp]=useState([{}]);
    const [huntAnimalsProp,setHuntAnimalsProp]=useState([{}])
    // const tableProp=[
    //     {
    //         "Kto strzelał":"Alberto Kozak",
    //         "Kiedy":"23.05.2023 23:05",
    //         "Podgrupa":"Dziki",
    //         "Zwierzyna":"pozostały",
    //         "ilość":7
    //     },
    //     {
    //         "Kto strzelał":"Alberto Kozak",
    //         "Kiedy":"23.05.2023 23:05",
    //         "Podgrupa":"Dziki",
    //         "Zwierzyna":" lochy",
    //         "ilość":1
    //     },
    // ]
    // const huntAnimalsProp=[
    //     {
    //         "Podgrupa":"Dziki",
    //         "Zwierze":"Lochy",
    //         "Założono do odstrzału":7,
    //         "Odstrzelono":1
    //     },
    //     {
    //         "Podgrupa":"Dziki",
    //         "Zwierze":"pozostałe",
    //         "Założono do odstrzału":5,
    //         "Odstrzelono":4
    //     }
    // ]
    const EndShootingEarly=()=>{
        axiosClient.post("/EndShootingEarly",{
            huntId
        })
        .then(()=>{
            navigate("/Hunt")
        })
    }
    useEffect(()=>{
        axiosClient.post("/GetActiveHuntInfo",{
            huntId
        })
        .then((({data})=>{
            setTableProp(data[0])
            setHuntAnimalsProp(data[1])
        }))
        axiosClient
      .post("/getStatsSelect",{
          userToken
      })
      .then(({ data }) => {
          Object.entries(data).map(([key,value])=>{
            const animalEntries = Object.entries(data).map(([key, value]) => ({
                label: key,
                options: value
              }));
               setAnimals(animalEntries);
          })
        })
      .catch(err => {
      console.log(err);
      });

      axiosClient
      .post("/GetAllHuntersFromClub",{
          userToken
      })
      .then(({ data }) => {
        setUsersList(data[0])
        })
      .catch(err => {
      console.log(err);
      });
    },[userToken])
    return(
        <div className="container-fluid">
            <h1 className="fs-1 text-white text-uppercase text-center py-3">Zwierzęta do odstrzału podczas tego polowania</h1>
            <table className="w-75 text-center mx-auto table align-middle table-bordered table-dark table-striped table-hover">
            <thead>
                    <tr>
                        {Object.keys(huntAnimalsProp[0]).map((header, index) => (
                            <th key={index}>{String(header)}</th>
                        ))}
                        <th>Do odstrzału</th>
                    </tr>
                </thead>
                <tbody>
                {huntAnimalsProp.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((value, columnIndex) => (
                            <td key={columnIndex}>{String(value)}</td>
                        ))}
                        <td>{String(huntAnimalsProp[rowIndex]["Założono do odstrzału"]-huntAnimalsProp[rowIndex]["Odstrzelono"])}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h1 className="fs-1 text-white text-uppercase text-center py-3">Dotychczasowe odstrzały</h1>
            <table className="w-75 text-center mx-auto table align-middle table-bordered table-dark table-striped table-hover">
                <thead>
                    <tr>
                        {Object.keys(tableProp[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {tableProp.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((value, columnIndex) => (
                            <td key={columnIndex}>{value.toString()}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {
                (supervisorId==userToken
                ?
                    <>
                    <h5 className="fs-3 text-white text-uppercase text-center py-3">Dostępne akcje</h5>
                    <div className="w-25 mx-auto text-center">
                        <a className="btn btn-success mx-2" onClick={()=>setShow(true)}>Dodaj odstrzał</a>
                        <a className="btn btn-danger" onClick={EndShootingEarly}>Zakończ polowanie wcześniej</a>
                    </div>
                    </>
                :
                    false
                )
            }
            <AddShootedAnimalModal huntId={huntId} usersList={usersList} animals={animals} show={show} setShow={setShow}/>
        </div>
        
    )
}