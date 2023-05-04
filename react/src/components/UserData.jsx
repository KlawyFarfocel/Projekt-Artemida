import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./css/sharedComponent.css"
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import ReloadModal from "./ReloadModal";
export default function UserData(props){
  const userToken=useStateContext()['userToken'];
  const ref=useRef(null)
  const [userDataProp,setUserDataProp]=useState([]);

  const [imie,setImie]=useState("");
  const [nazwisko,setNazwisko]=useState("");
  const [pesel,setPesel]=useState("");
  const [legitymacja,setLegitymacja]=useState("");
  const [miasto,setMiasto]=useState("");
  const [kod,setKod]=useState("");
  const [ulica,setUlica]=useState("");
  const [mieszkanie,setMieszkanie]=useState("");
  const [mail,setMail]=useState("");
  const [telefon,setTelefon]=useState("");
  const [haslo, setHaslo]=useState("");
  const [budynek, setBudynek]=useState("");
  
  const [userInfo, setUserInfo]=useState(props.userInfo);
  const [action, setAction]=useState(props.action);
  const [password, setPassword]=useState(props.setPassword)
  const [modifyLegi,setModifyLegi]=useState(props.modifyLegi)


  const [refresh,setRefresh]=useState(false);

  const handleSubmit=(e)=>{
      e.preventDefault();
      setRefresh(true);
      axiosClient
      .post(action, {
        userToken,imie,nazwisko,pesel,legitymacja,miasto,kod,ulica,mieszkanie,budynek,mail,telefon,haslo
      })
      .then(({ data }) => {
        setRefresh(false);
        console.log(data)
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors || {}).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
        }
      });
  }
  const handleImie=e=>{setImie(e.target.value);}
  const handleNazwisko=e=>{setNazwisko(e.target.value);}
  const handlePesel=e=>{setPesel(e.target.value);}
  const handleLegitymacja=e=>{setLegitymacja(e.target.value);}
  const handleMiasto=e=>{setMiasto(e.target.value);}
  const handleKod=e=>{setKod(e.target.value);}
  const handleUlica=e=>{setUlica(e.target.value);}
  const handleMieszkanie=e=>{setMieszkanie(e.target.value);}
  const handlBudynek=e=>{setBudynek(e.target.value);}
  const handleMail=e=>{setMail(e.target.value);}
  const handleTelefon=e=>{setTelefon(e.target.value);}
  const handleHaslo=e=>{setHaslo(e.target.value);}
  if(userInfo==true){
      useEffect(()=>{
        setRefresh(true);
        axiosClient
        .post("/userData", {
          userToken
        })
        .then(({ data }) => {
          setUserDataProp(data[0]);
          setRefresh(false);
        })
        .catch((error) => {
          if (error.response) {
            const finalErrors = Object.values(error.response.data.errors || {}).reduce(
              (accum, next) => [...accum, ...next],
              []
            );
          }
        });
    },[])
  }
  const copyLegitymacjaNumber=(e)=>{
    navigator.clipboard.writeText(e.target.parentNode.parentNode.children[0].value);
    ref.current.setAttribute('class','me-2 text-success')
    setTimeout(()=>{ref.current.setAttribute('class','me-2 text-success d-none')},750)
  }
    return(
        <div className="container w-100 h-100 mx-auto d-flex align-items-center justify-content-center ">
        <form className="h-75 mt-2 my-auto d-flex flex-column" onSubmit={handleSubmit}>
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Dane</h5>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input defaultValue={userDataProp.imie} onChange={handleImie} type="text" id="form3Example1" className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Imię</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input defaultValue={userDataProp.nazwisko} onChange={handleNazwisko} type="text" id="form3Example2" className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Nazwisko</label>
              </div>
            </div>
          </div>
        
          <div className="form-outline mb-2">
            <input defaultValue={userDataProp.pesel} type="text" onChange={handlePesel} id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">PESEL</label>
          </div>
          <div className="input-group mb-0">
            <input defaultValue={userDataProp.legitymacja} type="text" id="legitymacja" onChange={handleLegitymacja} className="form-control"
            disabled={!modifyLegi ? "disabled" : undefined}
            /> 
            {(!modifyLegi?
              <span onClick={copyLegitymacjaNumber} className="input-group-text">
              <span className="me-2 text-success d-none" ref={ref} id="copyText">Skopiowano!</span>
                <i className="bi bi-clipboard-fill"></i>
              </span>:""
            )}
          </div>
          <label className="form-label" htmlFor="form3Example2">Numer legitymacji</label>
          {
            (password==true?
              <div className="form-outline mb-2">
              <input defaultValue={userDataProp.ulica} type="password" id="form3Example3" onChange={handleHaslo} className="form-control" />
              <label className="form-label" htmlFor="form3Example3">Hasło</label>
            </div>:"")
          }
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Adres</h5>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input defaultValue={userDataProp.miasto} type="text" id="form3Example1" onChange={handleMiasto} className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Miasto</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input defaultValue={userDataProp.kod} type="text" id="form3Example2" onChange={handleKod} className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Kod Pocztowy</label>
              </div>
            </div>
          </div>
          <div className="form-outline mb-2">
            <input defaultValue={userDataProp.ulica} type="text" id="form3Example3" onChange={handleUlica} className="form-control" />
            <label className="form-label" htmlFor="form3Example3">Ulica</label>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input defaultValue={userDataProp.mieszkanie} type="text" id="form3Example1" onChange={handleMieszkanie} className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Nr. mieszkania</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input defaultValue={userDataProp.budynek} type="text" id="form3Example2" onChange={handlBudynek} className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Nr. budynku</label>
              </div>
            </div>
          </div>
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Kontakt</h5>
          <div className="form-outline mb-2">
            <input defaultValue={userDataProp.mail} type="text" id="form3Example3" onChange={handleMail} className="form-control" />
            <label className="form-label" htmlFor="form3Example3">E-mail</label>
          </div>
          <div className="form-outline mb-2">
            <input defaultValue={userDataProp.telefon} type="text" id="form3Example3" onChange={handleTelefon} placeholder="789 887 888" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">Nr.telefonu</label>
          </div>
          <button type="submit" className="btn btn-success mb-2 mx-auto">Zapisz zmiany</button>
        </form>
        <ReloadModal show={refresh}/>
      </div>
    )
}