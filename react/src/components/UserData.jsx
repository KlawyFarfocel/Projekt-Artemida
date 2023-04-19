import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./css/sharedComponent.css"
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import ReloadModal from "./ReloadModal";
export default function UserData(){
  const userToken=useStateContext()['userToken'];
  const ref=useRef(null)
  const [userDataProp,setUserDataProp]=useState([]);
  const [refresh,setRefresh]=useState(false);
  useEffect(()=>{
    setRefresh(true);
    axiosClient
    .post("/userData", {
      userToken
    })
    .then(({ data }) => {
      setUserDataProp(data[0])
      setRefresh(false);
    })
    .catch((error) => {
      if (error.response) {
        const finalErrors = Object.values(error.response.data.errors || {}).reduce(
          (accum, next) => [...accum, ...next],
          []
        );
      }
      console.error(error);
    });
},[])

  console.log(userDataProp)
  const copyLegitymacjaNumber=(e)=>{
    navigator.clipboard.writeText(e.target.parentNode.parentNode.children[0].value);
    ref.current.setAttribute('class','me-2 text-success')
    setTimeout(()=>{ref.current.setAttribute('class','me-2 text-success d-none')},750)
  }
    return(
        <div className="container w-50 h-100 mx-auto d-flex align-items-center justify-content-center ">
        <form className="h-75 mt-2 my-auto d-flex flex-column">
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Dane</h5>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input value={userDataProp.imie} type="text" id="form3Example1" className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Imię</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input value={userDataProp.nazwisko} type="text" id="form3Example2" className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Nazwisko</label>
              </div>
            </div>
          </div>
        
          <div className="form-outline mb-2">
            <input value={userDataProp.pesel} type="text" id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">PESEL</label>
          </div>
          <div className="input-group mb-0">
            <input value={userDataProp.legitymacja} type="text" id="legitymacja" className="form-control" disabled="disabled" /> 
            <span onClick={copyLegitymacjaNumber} className="input-group-text">
            <span className="me-2 text-success d-none" ref={ref} id="copyText">Skopiowano!</span>
              <i className="bi bi-clipboard-fill"></i>
            </span>
          </div>
          <label className="form-label" htmlFor="form3Example2">Numer legitymacji</label>
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Adres</h5>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input value={userDataProp.miasto} type="text" id="form3Example1" className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Miasto</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input value={userDataProp.kod} type="text" id="form3Example2" className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Kod Pocztowy</label>
              </div>
            </div>
          </div>
          <div className="form-outline mb-2">
            <input value={userDataProp.ulica} type="text" id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">Ulica</label>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input value={userDataProp.mieszkanie} type="text" id="form3Example1" className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Nr. mieszkania</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input value={userDataProp.budynek} type="text" id="form3Example2" className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Nr. budynku</label>
              </div>
            </div>
          </div>
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Kontakt</h5>
          <div className="form-outline mb-2">
            <input value={userDataProp.mail} type="text" id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">E-mail</label>
          </div>
          <div className="form-outline mb-2">
            <input value={userDataProp.telefon} type="text" id="form3Example3" placeholder="789 887 888" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">Nr.telefonu</label>
          </div>
          <button type="submit" className="btn btn-success mb-2 mx-auto">Zapisz zmiany</button>
        </form>
        <ReloadModal show={refresh}/>
      </div>
    )
}