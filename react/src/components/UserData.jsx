import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./css/sharedComponent.css"
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import ReloadModal from "./ReloadModal";
import { el } from "date-fns/locale";
import InputMask from 'react-input-mask';
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
  const [sendFlag, setSendFlag] = useState(false);
  const [refresh,setRefresh]=useState(false);

  let validateFormFlag=true;


    if(sendFlag){
      axiosClient
      .post(action, {
        userToken,imie,nazwisko,pesel,legitymacja,miasto,kod,ulica,mieszkanie,budynek,mail,telefon,haslo
      })
      .then(({ data }) => {
        setRefresh(false);
        setSendFlag(false);
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
    useEffect(()=>{
      setImie(userDataProp.imie);
      setNazwisko(userDataProp.nazwisko)
      setPesel(userDataProp.pesel)
      setLegitymacja(userDataProp.legitymacja)
      setMiasto(userDataProp.miasto)
      setKod(userDataProp.kod)
      setUlica(userDataProp.ulica)
      setMieszkanie(userDataProp.mieszkanie)
      setMail(userDataProp.mail)
      setTelefon(userDataProp.telefon)
      setBudynek(userDataProp.budynek)
    },[userDataProp])

  const handleSubmit=(e)=>{
      console.log(e)
      e.preventDefault();
      
      const tar=e;
      validateBeforeSend(tar);
      
      if(validateFormFlag){
        (!props.toReload?setAction("/changeUserData"):"")
        setRefresh(true);
        setSendFlag(true);
        (props.toReload
        ?
        (props.reloadRequest
          ?
            props.setReloadRequest(false)
          :
            props.setReloadRequest(true)
        )
        :""
        )
        (props.show
          ?
          props.setShow(false)
          :"")
      }
  }
  const validateBeforeSend=(e)=>{
    validateFormFlag=true;
    //imie
    let invalidText="Imię nie powinno zawierać znaków specjalnych oraz powinno mieć maksymalną długość 50 znaków";
    let regexp=/^(?:\p{Lu}){1}(?:\p{Ll}){1,49}$/u
    validateInputOnSubmit(invalidText,regexp,e,0);
    //nazwisko
    invalidText='Nazwisko powinno mieć maksymalną długość 50 znaków oraz rozpoczynać się wielką literą. W przypadku podwójnych nazwisko, po znaku "-" powinna zostać powtórzona wielka litera. Dopuszczone znaki specjalne to "-" oraz \'';
    regexp=/^(?:\p{Lu}){1}(?:\p{Ll}){1,49}$/u;
    validateInputOnSubmit(invalidText,regexp,e,1);
    //miasto lub haslo
    if(password==true){
    //haslo
    invalidText="Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę, jedną małą literę, jedną cyfrę oraz jeden znak specjalny";
    regexp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    validateInputOnSubmit(invalidText,regexp,e,4);
    //miasto
    invalidText='Pole miasto powinno się rozpoczynać z wielkiej litery. Jeśli nazwa miasta zawiera znak "-", to każdy człon również powinien rozpoczynać się z wielkiej litery. Sytuacja wygląda tak samo w przypadku członów miast oddzielonych spacją. Błędem jest też pozostawienie znaku spacji na końcu';
    regexp=/^(?:[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]*)(?:-[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)*(?: [A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+(?:-[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)*)*$/;
    validateInputOnSubmit(invalidText,regexp,e,5);
    //mieszkanie
    invalidText="Numer mieszkania może zawierać maksymalnie 10 znaków. Dopuszczalne znaki specjalne to '-' oraz '.'";
    regexp=/^([0-9]+[A-Za-z]?(\.[0-9A-Za-z]+)*(-[0-9A-Za-z]+(\.[0-9A-Za-z]+)?)*|)$/gm;
    validateInputOnSubmit(invalidText,regexp,e,8);
    //budynek
    regexp=/^[0-9]+[A-Za-z]?(\.[0-9A-Za-z]+)*(-[0-9A-Za-z]+(\.[0-9A-Za-z]+)?)*$/gm;
    invalidText="Numer budynku może zawierać maksymalnie 10 znaków. Dopuszczalne znaki specjalne to '-' oraz '.'";
    validateInputOnSubmit(invalidText,regexp,e,9);
    //mail
    regexp=/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    invalidText="Sprawdź poprawność adresu e-mail"
    validateInputOnSubmit(invalidText,regexp,e,10);
    //ulica
    invalidText="Pole ulica powinno się rozpoczynać od wielkiej litery bądź cyfry. Upewnij się, że w nazwie ulicy nie występuje więcej niż jedna spacja. Dopuszczalne znaki specjalne to '.' oraz '-'"
    regexp=/^[\p{Lu}d][\p{L}0-9.\-]*(?:\s[[\p{L}\d][\p{L}0-9.\-]*)*$/u
    validateInputOnSubmit(invalidText,regexp,e,7);
    changeInputAttributes("valid",e.target[6])//kod
    changeInputAttributes("valid",e.target[11])//nr tel
    }else{
      invalidText='Pole miasto powinno się rozpoczynać z wielkiej litery. Jeśli nazwa miasta zawiera znak "-", to każdy człon również powinien rozpoczynać się z wielkiej litery. Sytuacja wygląda tak samo w przypadku członów miast oddzielonych spacją. Błędem jest też pozostawienie znaku spacji na końcu';
      regexp=/^(?:[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]*)(?:-[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)*(?: [A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+(?:-[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)*)*$/;
      validateInputOnSubmit(invalidText,regexp,e,4);
          //mieszkanie
    invalidText="Numer mieszkania może zawierać maksymalnie 10 znaków. Dopuszczalne znaki specjalne to '-' oraz '.'";
    regexp=/^([0-9]+[A-Za-z]?(\.[0-9A-Za-z]+)*(-[0-9A-Za-z]+(\.[0-9A-Za-z]+)?)*|)$/gm;
    validateInputOnSubmit(invalidText,regexp,e,7);
    //budynek
    regexp=/^[1-9]+[A-Za-z]?(\.[0-9A-Za-z]+)*(-[0-9A-Za-z]+(\.[0-9A-Za-z]+)?)*$/gm;
    invalidText="Numer budynku może zawierać maksymalnie 10 znaków. Dopuszczalne znaki specjalne to '-' oraz '.'";
    validateInputOnSubmit(invalidText,regexp,e,8);
    //mail
    regexp=/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    invalidText="Sprawdź poprawność adresu e-mail"
    validateInputOnSubmit(invalidText,regexp,e,9);
    //ulica
    invalidText="Pole ulica powinno się rozpoczynać od wielkiej litery bądź cyfry. Upewnij się, że w nazwie ulicy nie występuje więcej niż jedna spacja. Dopuszczalne znaki specjalne to '.' oraz '-'"
    regexp=/^[\p{Lu}d][\p{L}0-9.\-]*(?:\s[[\p{L}\d][\p{L}0-9.\-]*)*$/u
    validateInputOnSubmit(invalidText,regexp,e,6);
    changeInputAttributes("valid",e.target[5])//kod
    changeInputAttributes("valid",e.target[10])//nr tel
    }
    changeInputAttributes("valid",e.target[2])//pesel
    changeInputAttributes("valid",e.target[3])//legi


  }
  const validateInputOnSubmit=(invalidText,regexp,e,number)=>{
    if(validateInput(regexp,e.target[number].value)){
      changeInputAttributes("valid",e.target[number])
    }
    else{
      changeInputAttributes("invalid",e.target[number],invalidText)
    }
  }
  const validateInput=(regexp,value)=>{
    if(regexp.test(value)){
      return true
    }
    else return false;
  }

  const startValidationProcess=(regexp,value,e,invalidText)=>{
    if(validateInput(regexp,e.target.value)){
      changeInputAttributes("valid",e.target)
    }
    else{
      changeInputAttributes("invalid",e.target,invalidText)
    }
  }
  const changeInputAttributes=(state,target,title="")=>{
    if(state=="valid"){

        const tooltipTriggerList = document.querySelectorAll('.tooltip-inner,.tooltip-arrow');
        tooltipTriggerList.forEach(tooltipTriggerEl => {
          tooltipTriggerEl.classList.add("d-none")
        });
        target.removeAttribute("data-bs-toggle")
        target.removeAttribute("title")
        target.removeAttribute("aria-label")
        target.removeAttribute("data-bs-original-title")
        if(target.classList.contains("is-invalid")){
          target.classList.replace("is-invalid","is-valid")
        }
        else{
          target.classList.add("is-valid")
        }
    }
    else{//invalid
      validateFormFlag=false;
        target.setAttribute("data-bs-toggle","tooltip")
        target.setAttribute("title",title)
        if(target.classList.contains("is-valid")){
          target.classList.replace("is-valid","is-invalid")
        }
        else{
          target.classList.add("is-invalid")
        }
    }
  }

  const handleImie=e=>{
    const invalidText="Imię nie powinno zawierać znaków specjalnych oraz powinno mieć maksymalną długość 50 znaków";
    setImie(e.target.value);
    startValidationProcess(/^(?:\p{Lu}){1}(?:\p{Ll}){1,49}$/u,e.target.value,e,invalidText)
  }
  const handleNazwisko=e=>{
    const invalidText='Nazwisko powinno mieć maksymalną długość 50 znaków oraz rozpoczynać się wielką literą. W przypadku podwójnych nazwisko, po znaku "-" powinna zostać powtórzona wielka litera. Dopuszczone znaki specjalne to "-" oraz \''
    setNazwisko(e.target.value);
    startValidationProcess(/^(?:\p{Lu}){1}(?:\p{Ll}){1,49}$/u,e.target.value,e,invalidText)
  }
  const handlePesel=e=>{setPesel(e.target.value);}
  const handleLegitymacja=e=>{setLegitymacja(e.target.value);}
  const handleMiasto=e=>{
    setMiasto(e.target.value);
    const invalidText='Pole miasto powinno się rozpoczynać z wielkiej litery. Jeśli nazwa miasta zawiera znak "-", to każdy człon również powinien rozpoczynać się z wielkiej litery. Sytuacja wygląda tak samo w przypadku członów miast oddzielonych spacją. Błędem jest też pozostawienie znaku spacji na końcu'
    startValidationProcess(/^(?:[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]*)(?:-[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)*(?: [A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+(?:-[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)*)*$/,e.target.value,e,invalidText)
  }
  const handleKod=e=>{setKod(e.target.value);}
  const handleUlica=e=>{
    setUlica(e.target.value);
    const invalidText="Pole ulica powinno się rozpoczynać od wielkiej litery bądź cyfry. Upewnij się, że w nazwie ulicy nie występuje więcej niż jedna spacja. Dopuszczalne znaki specjalne to '.' oraz '-'"
    setUlica(e.target.value);
    startValidationProcess(/^[\p{Lu}d][\p{L}0-9.\-]*(?:\s[[\p{L}\d][\p{L}0-9.\-]*)*$/u,e.target.value,e,invalidText)
  }
  const handleMieszkanie=e=>{
    setMieszkanie(e.target.value);
    const invalidText="Numer mieszkania może zawierać maksymalnie 10 znaków. Dopuszczalne znaki specjalne to '-' oraz '.'";
    startValidationProcess(/^([0-9]+[A-Za-z]?(\.[0-9A-Za-z]+)*(-[0-9A-Za-z]+(\.[0-9A-Za-z]+)?)*|)$/gm
    ,e.target.value,e,invalidText)
  }
  const handlBudynek=e=>{
    setBudynek(e.target.value);
    const invalidText="Numer budynku może zawierać maksymalnie 10 znaków. Dopuszczalne znaki specjalne to '-' oraz '.'";
    startValidationProcess(/^[1-9]+[A-Za-z]?(\.[0-9A-Za-z]+)*(-[0-9A-Za-z]+(\.[0-9A-Za-z]+)?)*$/gm,e.target.value,e,invalidText)
  }
  const handleMail=e=>{
    setMail(e.target.value);
    const invalidText="Sprawdź poprawność adresu e-mail"
    startValidationProcess(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,e.target.value,e,invalidText)
  }
  const handleTelefon=e=>{setTelefon(e.target.value);}
  const handleHaslo=e=>{
    setHaslo(e.target.value);
    const invalidText="Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę, jedną małą literę, jedną cyfrę oraz jeden znak specjalny";
    startValidationProcess(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,e.target.value,e,invalidText)
  }
  const [dupa,setDupa]=useState("form-control")

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
    },[userToken])
  }
  const copyLegitymacjaNumber=(e)=>{
    navigator.clipboard.writeText(e.target.parentNode.parentNode.children[0].value);
    ref.current.setAttribute('class','me-2 text-success')
    setTimeout(()=>{ref.current.setAttribute('class','me-2 text-success d-none')},750)
  }

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  });

    return(
        <div className="container w-100 h-100 mx-auto d-flex align-items-center justify-content-center ">
        <form className="h-75 mt-2 my-auto d-flex flex-column" onSubmit={handleSubmit}>
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Dane</h5>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input required maxLength={50} defaultValue={imie} onChange={handleImie} type="text" id="form3Example1" className={dupa} />
                <label className="form-label" htmlFor="form3Example1">Imię</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input required maxLength={50} defaultValue={nazwisko} onChange={handleNazwisko} type="text" id="form3Example2" className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Nazwisko</label>
              </div>
            </div>
          </div>
        
          <div className="form-outline mb-2">
            <InputMask required mask="99999999999" placeholder="12345678912" value={pesel} onChange={handlePesel} className="form-control"/>
            <label className="form-label" htmlFor="form3Example3">PESEL</label>
          </div>
          <div className="input-group mb-0">
            <input required defaultValue={legitymacja} type="text" id="legitymacja" onChange={handleLegitymacja} className="form-control"
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
              <input required defaultValue={haslo} type="password" id="form3Example3" onChange={handleHaslo} className="form-control" />
              <label className="form-label" htmlFor="form3Example3">Hasło</label>
            </div>:"")
          }
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Adres</h5>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input required defaultValue={miasto} type="text" id="form3Example1" onChange={handleMiasto} className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Miasto</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <InputMask required mask="99-999"  value={kod} onChange={handleKod} className="form-control"/>
                <label className="form-label" >Kod Pocztowy</label>
              </div>
            </div>
          </div>
          <div className="form-outline mb-2">
            <input required defaultValue={ulica} type="text" id="form3Example3" onChange={handleUlica} className="form-control" />
            <label className="form-label" htmlFor="form3Example3">Ulica</label>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input defaultValue={mieszkanie} type="text" id="form3Example1" maxLength={10} onChange={handleMieszkanie} className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Nr. mieszkania</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input maxLength={10} required defaultValue={budynek} type="text" id="form3Example2" onChange={handlBudynek} className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Nr. budynku</label>
              </div>
            </div>
          </div>
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Kontakt</h5>
          <div className="form-outline mb-2">
            <input required defaultValue={mail} type="text" id="form3Example3" onChange={handleMail} className="form-control" />
            <label className="form-label" htmlFor="form3Example3">E-mail</label>
          </div>
          <div className="form-outline mb-2">
            <InputMask required mask={"+99999999999"} value={telefon} onChange={handleTelefon} placeholder="+48212121212" className="form-control" />

            <label className="form-label" htmlFor="form3Example3">Nr.telefonu</label>
          </div>
          <button type="submit" className="btn btn-success mb-2 mx-auto">Zapisz zmiany</button>
        </form>
        <ReloadModal show={refresh}/>
      </div>
    )
}