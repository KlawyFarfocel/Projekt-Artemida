import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import DatePicker, { registerLocale } from "react-datepicker";
import Select from "react-select";
import pl from "date-fns/locale/pl"
import axiosClient from "../axios";
export default function RequestModal(props){
    registerLocale("pl",pl)
    const [show, setShow] = useState();
    useEffect(()=>{
      setShow(props.show);
    })
    const options=[
        {"value":"podstawowe","label":"Podstawowe"},
        {"value":"selekcjonerskie","label":"Selekcjonerskie"},
        {"value":"sokolnicze","label":"Sokolnicze"},
    ]
    const [organ,setOrgan]=useState("")
    const [selectedOption,setSelectedOption]=useState("")
    const [zezwolenie,setZezwolenie]=useState("")
    const [startDate, setStartDate] = useState(new Date());
    const handleSubmit=(e)=>{
        e.preventDefault()
        const userToken=props.userToken;
        const data_uzyskania=startDate.toISOString().split('T')[0]
        axiosClient.post("/AddPermissionRequest",{
            userToken,organ,zezwolenie,data_uzyskania
        })
    }
    return (
        <>
            <Modal bsPrefix="modal" show={show} onHide={()=>props.setShowRequestModal(false)}>
                <Modal.Header bsPrefix="modal-header text-center" closeButton>
                    <Modal.Title bsPrefix="modal-title w-100">Złóż wniosek o przyznanie uprawnienia</Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
                <form className='w-50 mx-auto' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Typ zezwolenia</label>
                        <Select onChange={(choice)=>setSelectedOption(choice.value)} required="required" className='form-control' options={options} placeholder={"Wybierz status z listy"}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Organ wydający</label>
                        <input required="required" type="text" onChange={(e)=>{setOrgan(e.target.value)}} defaultValue="" className="form-control" id="Organ"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Numer zezwolenia</label>
                        <input required="required" type="text" defaultValue="" onChange={(e)=>{setZezwolenie(e.target.value)}} className="form-control" id="Zezwolenie"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Data uzyskania</label>
                        <DatePicker
                                  locale={"pl"}
                                  required="required"
                                  className='form-control'                  
                                  dateFormat="dd.MM.yyyy"
                                  selected={startDate}
                                  onChange={(date) =>setStartDate(date)}
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                        />
                    </div>
                    <div className="w-100 text-center">
                        <button type="select" className="btn btn-success">Złóż wniosek</button>
                    </div>
                </form>
                </Modal.Body>
            </Modal>
        </>
      );
}