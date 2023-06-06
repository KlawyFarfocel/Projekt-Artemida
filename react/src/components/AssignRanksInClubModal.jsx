import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axiosClient from "../axios"
import { useStateContext } from '../contexts/ContextProvider';

export default function AssignRanksClubModal(props){

const [show, setShow] = useState();
const {userToken}=useStateContext();
let validationFlag=true;
const [president,setPresident]=useState();
const [secretary,setSecretary]=useState();
const [cashier,setCashier]=useState();
const [huntsman,setHuntsman]=useState();
const [importantClass,setImportantClass]=useState("form-control")
const [importantTitle,setImportantTitle]=useState("")
const [toggler,setToggler]=useState("");
const handlePresident=(e)=>{
    setPresident(e)
    document.getElementById('presidentWrapper').removeAttribute("data-bs-original-title")
    document.getElementById('sekretarzWrapper').removeAttribute("data-bs-original-title")
    setImportantClass("form-control")
    setImportantTitle("")
    setToggler("")
}
const handleSecretary=(e)=>{
    setSecretary(e)
    document.getElementById('prezesWrapper').removeAttribute("data-bs-original-title")
    document.getElementById('sekretarzWrapper').removeAttribute("data-bs-original-title")
    setImportantClass("form-control")
    setImportantTitle("")
    setToggler("")
}
const handleSubmit=(e)=>{
    e.preventDefault();
    validationFlag=true;
    let newPresident,newSecretary,newCashier,newHuntsman;
    if(president==secretary){
        setImportantClass("form-control is-invalid")
        setImportantTitle("Jedna osoba nie może jednocześnie pełnić funkcji Sekretarza i Prezesa")
        setToggler("tooltip")
        validationFlag=false
    }
    else{
        setImportantClass("form-control")
        setImportantTitle("")
        setToggler("")
        document.getElementById('prezesWrapper').removeAttribute("data-bs-original-title")
        document.getElementById('sekretarzWrapper').removeAttribute("data-bs-original-title")
    }
    if(validationFlag){
        if(typeof(president)=="object"){
            newPresident=president.value
        }else{
            newPresident=president
        }
        if(typeof(secretary)=="object"){
            newSecretary=secretary.value
        }else{
            newSecretary=secretary
        }
        if(typeof(cashier)=="object"){
            newCashier=cashier.value
        }else{
            newCashier=cashier
        }
        if(typeof(huntsman)=="object"){
            newHuntsman=huntsman.value
        }else{
            newHuntsman=huntsman
        }
        axiosClient.post("/AssignRanks",{
            newPresident,newSecretary,newCashier,newHuntsman,userToken
        })
        .then(()=>{
            props.setReloadRequest(!props.reloadRequest);
        })
        props.setModalRanksShow(false);
    }
}

useEffect(()=>{
    if(props.currentSquad){
        setPresident(props.currentSquad[0])
        setSecretary(props.currentSquad[1])
        setCashier(props.currentSquad[2])
        setHuntsman(props.currentSquad[3])
    }
},[props])

useEffect(()=>{
    setShow(props.show);
  })
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  });
return (
    <>
<Modal bsPrefix="modal" show={show} size="lg" onHide={()=>props.setModalRanksShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center">
          <Modal.Title bsPrefix="modal-title w-100">Zarządzaj rangami w kole</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-0 pb-0'>
                <form  onSubmit={handleSubmit} className='w-75 mx-auto'>
                    {(!validationFlag
                    ?
                    <div className="alert alert-danger" role="alert">
                    Popraw pola zaznaczone na czerwono i prześlij formularz ponownie
                    </div>
                    :""
                    )}
                <div className="mb-3">
                        <label className="form-label" >Prezes</label>
                        <div data-bs-toggle={toggler} title={importantTitle} id='prezesWrapper'>
                        <Select data-bs-toggle={toggler} title={importantTitle} defaultValue={president}  onChange={handlePresident} required={true} className={importantClass} options={props.content} placeholder={"Wybierz status z listy"}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Sekretarz</label>
                        <div id='sekretarzWrapper' data-bs-toggle={toggler} title={importantTitle}>
                        <Select defaultValue={secretary}  onChange={handleSecretary} required={true} className={importantClass} options={props.content} placeholder={"Wybierz status z listy"}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Skarbnik</label>
                        <Select defaultValue={cashier} onChange={(choice)=>setCashier(choice.value)} required={true} className='form-control'   options={props.content} placeholder={"Wybierz status z listy"}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Łowczy główny</label>
                        <Select defaultValue={huntsman} onChange={(choice)=>setHuntsman(choice.value)} required={true} className='form-control' options={props.content} placeholder={"Wybierz status z listy"}/>
                    </div>
                    <div className="w-100 d-flex">
                            <button type="submit" onClick={()=>{}} className="btn btn-success mb-5 mx-auto">Zapisz zmiany</button>
                    </div>
                </form>
        </Modal.Body>
      </Modal>
    </>
  );
}