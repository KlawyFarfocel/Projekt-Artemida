import Modal from 'react-bootstrap/Modal'
import { forwardRef, useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import moment from 'moment/moment';
export default function ChangeDonateDataModal(props){
    const [show, setShow] = useState();

    const [startDate, setStartDate] = useState(new Date());
    const [selectedOption,setSelectedOption]=useState()
    const [kwota,setKwota]=useState(0);
    const [opis,setOpis]=useState("")

    const [disabled,setDisabled]=useState(false)
    const [datePlaceholder,setDatePlaceholder]=useState("")
    useEffect(()=>{
      setShow(props.show);
      (props.content
        ?
                setKwota(props.content["Kwota"]) &
                setOpis(props.content["Opis"]) &
                setStartDate(new Date(props.content['Data zapłaty']))
        :
        ""
      )
    },[props])

    const handleSubmit=(e)=>{
        e.preventDefault()
        let combinedDate;
        if(disabled){
            combinedDate=moment('0001-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        }
        else{
            const newDate=new Date();
            combinedDate = moment(startDate).set({
                hour: moment(newDate).hours(),
                minute: moment(newDate).minutes(),
                second: moment(newDate).seconds()
            }).format('YYYY-MM-DD HH:mm:ss');
        }
        const imieINazwisko=props.content["Imię i nazwisko"]
        const idSkladki=props.content["Id"]
        const termin=props.content['Termin'];
        
        axiosClient.post("/EditDonate",{
            idSkladki,termin,kwota,opis,combinedDate,selectedOption,disabled
        })
        .then(({ data }) => { 
            props.setModalShow(false)
            props.setAdminViewHandler(!props.adminViewHandler)
        })

    }
    const handleDisable=(e)=>{
        setDisabled(!disabled)
        setDatePlaceholder("Brak wpłaty")
        if(disabled){
            setStartDate(new Date())
        }else{
            setStartDate(new Date(Date.parse("0001-01-01")))
        }
    }
    const handleChange=(e)=>{
        if(e.target.id=="Description"){
            setOpis(e.target.value)
        }
        else{
            setKwota(e.target.value)
        }

    }
    const DonateStatus=[
        {value:"Opłacona",label:"Opłacona"},
        {value:"Nieopłacona",label:"Nieopłacona"}
    ]
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="btn btn-primary mx-auto" onClick={onClick} ref={ref}>
          {value}
        </button>
      ));
    return(
        <>
            <Modal bsPrefix="modal" scrollable="0" show={show} size="lg" onHide={()=>props.setModalShow(false)}>
                <Modal.Header bsPrefix="modal-header text-center" closeButton>
                    <Modal.Title bsPrefix="modal-title w-100">Edytuj składkę</Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
                <form  onSubmit={handleSubmit} className='w-50 mx-auto'>
                    <div className="mb-3">
                        <label htmlFor="NameSurname" className="form-label">Imię i nazwisko</label>
                        <input type="text" className="form-control" id="NameSurname" defaultValue={
                            (props.content
                            ?
                                props.content["Imię i nazwisko"]
                            :
                                ""
                            )
                    } disabled='disabled'/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Opis</label>
                        <input type="text" defaultValue={opis} onChange={handleChange} className="form-control" id="Description"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Kwota" className="form-label">Kwota</label>
                        <input type="number" defaultValue={kwota} min={0} onChange={handleChange} className="form-control" id="Kwota"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Data wpłaty</label>
                        <DatePicker
                                  disabled={disabled}    
                                  className='form-control'                  
                                  dateFormat="dd.MM.yyyy"
                                  selected={(disabled?"":startDate)}
                                  onChange={(date) =>setStartDate(date)}
                                  withPortal
                                  placeholderText={datePlaceholder}
                                />
                        <div className="form-check form-switch">
                            <input className="form-check-input"  onClick={handleDisable} type="checkbox" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Brak wpłaty</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status składki</label>
                        <Select onChange={(choice)=>setSelectedOption(choice.value)} required="required" className='form-control' options={DonateStatus} placeholder={"Wybierz status z listy"}/>
                    </div>
                    <div className="w-100 text-center">
                            <button type="submit" className="btn btn-success mb-5">Zapisz zmiany</button>
                    </div>
                </form>
                </Modal.Body>
            </Modal>
        </>
    )
}