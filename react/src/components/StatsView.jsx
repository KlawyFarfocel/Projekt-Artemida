import { useEffect, useState } from "react";
import StatsItem from "./StatsComponents/StatsItem";
import "./StatsComponents/styles/Stats.css"
import FilterModal from "./FilterModal";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function StatsView(){
    const {userToken}=useStateContext();
    const [stats,setStats]=useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [animals,setAnimals]=useState([]);
    var selectedOptionPayload;
    const [startDate,setStartDate]=useState(new Date(new Date().getFullYear(), 0, 1));//start date z bazy
    const [endDate,setEndDate]=useState(new Date(new Date().getFullYear(), 11, 31));//start date z bazy
    const [selectedOption, setSelectedOption] = useState(null);//Wybrane opcje
    const [request,setRequest]=useState(false);
    const initialValue = "";
    var valuel;
    if(request==true){
      if(selectedOption!=null){
        selectedOptionPayload=selectedOption.reduce(
          (accumulator, currentValue) => accumulator +","+currentValue.value,
          initialValue
        )
        selectedOptionPayload=selectedOptionPayload.substring(1);
      }
      else  selectedOptionPayload="";
      console.log(selectedOptionPayload);
      axiosClient.post("/changeStatsView",{
        userToken,selectedOptionPayload,startDate,endDate
      })
      .then(({data})=>{
        setStats([]);
            Object.entries(data).map(([key,value])=>{
          const newStats = Object.entries(data).map(([key,value])=>({
            id:value.id,
            title:value.title,
            date:new Date(value.date)
          }));
          setStats(newStats);
        })
        console.log(data)
      })
      setRequest(false);
    }
    useEffect(()=>{
      axiosClient
      .post("/getStatsSelect",{
          userToken
      })
      .then(({ data }) => {
        animals.length=(Object.keys(data).length); 
          Object.entries(data).map(([key,value])=>{
            const newAnimals = animals.push({
              label:key,
              options:value,
            })
            setAnimals(newAnimals)
          })
        })
      .catch(err => {
      console.log(err);
      });
    },[userToken])
    useEffect(()=>{
      axiosClient
      .post("/getStats",{
        userToken
      })
      .then(({data})=>{
        setStats([]);
        Object.entries(data).map(([key,value])=>{
          const newStats = Object.entries(data).map(([key,value])=>({
            id:value.id,
            title:value.title,
            date:new Date(value.date)
          }));
          setStats(newStats);
        })
        stats.length=(Object.keys(data).length); 
      })
      
    },[])
    return(
        <div className="container w-100 ww mx-auto d-flex flex-column align-items-center justify-content-center  mt-5">
            <h1 className="mb-2 shadow-md p-1  rounded fs-1 text-uppercase fw-bold text-white">Statystyki odstrzałów</h1>
            <h1 className="mb-2 shadow-md p-1  rounded fs-3 text-uppercase fw-bold text-white">{startDate.toLocaleDateString('pl-PL',{day:"2-digit",month:"2-digit",year:"numeric"})} - {endDate.toLocaleDateString('pl-PL',{day:"2-digit",month:"2-digit",year:"numeric"})}</h1>
            <h1 className="mb-2 shadow-md p-1  rounded fs-5 text-uppercase fw-bold text-white">Marek Pieczarek</h1>
            <div className="d-flex w-100">       
                <div className="stats w-100">
                {
                    stats.map((stat)=>{
                        return(
                          <StatsItem key={stat.id} title={stat.title} date={stat.date} />

                        )
                    })
                }
                </div>
                <div className="h-1 stickyStick-top">
                    <a className="btn btn-success ms-auto" onClick={()=>setModalShow(true)} >Filtruj</a>
                </div>
            </div>
            <FilterModal show={modalShow} animals={animals} selectedOption={selectedOption} setSelectedOption={setSelectedOption} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setRequest={setRequest} setModalShow={setModalShow}/>
        </div>
    )
}