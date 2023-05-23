import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axiosClient from "../axios"
import { useStateContext } from '../contexts/ContextProvider';

export default function AssignRanksClubModal(props){

const [show, setShow] = useState();
const {userToken}=useStateContext();

const [president,setPresident]=useState();
const [secretary,setSecretary]=useState();
const [cashier,setCashier]=useState();
const [huntsman,setHuntsman]=useState();
const handleSubmit=(e)=>{
    e.preventDefault();
    props.setModalRanksShow(false);
    let newPresident,newSecretary,newCashier,newHuntsman;
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
return (
    <>
<Modal bsPrefix="modal" show={show} size="lg" onHide={()=>props.setModalRanksShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center">
          <Modal.Title bsPrefix="modal-title w-100">Zarządzaj rangami w kole</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-0 pb-0'>
                <form  onSubmit={handleSubmit} className='w-75 mx-auto'>
                <div className="mb-3">
                        <label className="form-label">Prezes</label>
                        <Select defaultValue={president}  onChange={(choice)=>setPresident(choice.value)} required={true} className='form-control' options={props.content} placeholder={"Wybierz status z listy"}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Sekretarz</label>
                        <Select defaultValue={secretary}  onChange={(choice)=>setSecretary(choice.value)} required={true} className='form-control' options={props.content} placeholder={"Wybierz status z listy"}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Skarbnik</label>
                        <Select defaultValue={cashier} onChange={(choice)=>setCashier(choice.value)} required={true} className='form-control' options={props.content} placeholder={"Wybierz status z listy"}/>
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