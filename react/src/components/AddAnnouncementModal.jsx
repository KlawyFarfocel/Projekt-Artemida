import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import DatePicker from 'react-datepicker';
import { pl } from 'date-fns/locale';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import moment from 'moment';
import Select from 'react-select';
export default function AddAnnouncementModal(props){
    const {userToken}=useStateContext();
    const [show, setShow] = useState();

    const recipient=[
        {"value":0,"label":"Zarząd Koła"},
        {"value":1,'label':"Wszyscy członkowie Koła"}
    ]
    const priority=[
        {"value":"niski","label":"Niski"},
        {"value":"sredni","label":"Średni"},
        {"value":"wysoki","label":"Wysoki"}
    ]

    const sendDate=moment(new Date()).format("YYYY-MM-DD")
    const [temat,setTemat]=useState("")
    const [tresc,setTresc]=useState("")
    const [odbiorca,setOdbiorca]=useState()
    const [priorytet,setPriorytet]=useState()

    useEffect(()=>{
      setShow(props.show);
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        axiosClient.post("/SendAnno",{
            userToken,sendDate,odbiorca,tresc,temat,priorytet
        })
        .then(
            props.setReload(!props.reload) &
            props.setShow(false)
        )
    }
    return(
        <Modal bsPrefix="modal" show={show} onHide={()=>props.setShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
            <Modal.Title bsPrefix="modal-title w-100">Wyślij ogłoszenie</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
        <form className='w-50 mx-auto' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Odbiorca</label>
                <Select required options={recipient}  onChange={(choice)=>setOdbiorca(choice.value)}></Select>  
            </div>
            <div className="mb-3">
                <label className="form-label">Temat</label>
                <input required="required" type="text" onChange={(e)=>{setTemat(e.target.value)}} defaultValue={temat} className="form-control" id="Temat"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Treść</label>
                <textarea required="required" rows={10} type="text" onChange={(e)=>{setTresc(e.target.value)}} defaultValue={tresc} className="form-control" id="Tresc"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Priorytet</label>
                <Select required options={priority}  onChange={(choice)=>setPriorytet(choice.value)}></Select>  
            </div>
            <div className="mb-3 text-center">
                <button type='submit' className='btn btn-success'>Wyślij ogłoszenie</button>
            </div>
        </form>
        </Modal.Body>
    </Modal>
    );
}