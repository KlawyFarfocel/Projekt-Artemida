import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import { useEffect, useState } from 'react';
import { pl } from 'date-fns/locale';
import moment from 'moment/moment';
import Select from 'react-select';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';
export default function EditHuntInfoModal(props){
      const {userToken}=useStateContext() 
      const [show, setShow] = useState();
      const [startDate, setStartDate] = useState(new Date());

      const [dateFirst,setDateFirst]=useState(new Date());//data rozpoczęcia
      const [dateEnd,setDateEnd]=useState(new Date());//data zakończenia
      const [huntType,setHuntType]=useState("")
      const [localisation,setLocalisation]=useState("")
      const [rallyPoint,setRallyPoint]=useState("")
      const [supervisor,setSupervisor]=useState("")
      const [contact,setContact]=useState("")
      const [status,setStatus]=useState("")
      const [action,setAction]=useState("")
      const [huntId,setHuntId]=useState()
      const huntTypes=[
        {value:"Indywidualne",label:"Indywidualne"},
        {value:"Zbiorowe",label:"Zbiorowe"},
        {value:"Sokolnicze",label:"Sokolnicze"}
    ]
      const formatDate=(date)=>{//data na string taki do timestampa
        const formattedString = moment(date).format("DD.MM.YYYY HH:mm:ss");
        return formattedString;
      }
      useEffect(()=>{
        setShow(props.show);
      })
      useEffect(()=>{
        let dateString;
        let formattedDate;
        if(props.content){
                //data rozpoczęcia
                dateString=props.content["Data rozpoczęcia"]
                formattedDate = moment(dateString, "DD.MM.YYYY HH:mm:ss").toDate();
                setDateFirst(formattedDate)
                //data zakończenia
                dateString=props.content["Data zakończenia"]
                formattedDate = moment(dateString, "DD.MM.YYYY HH:mm:ss").toDate();
                setDateEnd(formattedDate)
                //Typ polowania
                setHuntType({value:props.content["Typ polowania"],label:props.content["Typ polowania"]})
                //Lokalizacja
                setLocalisation(props.content["Lokalizacja"])
                //Miejsce zbiórki
                setRallyPoint(props.content["Miejsce zbiórki"])
                //Osoba odpowiedzialna
                setSupervisor(props.content["Osoba odpowiedzialna"])
                //Kontakt
                setContact(props.content["Kontakt"])
                //Status
                setStatus(props.content["Status"])
                //Gdzie wysyłamy
                setAction("/EditHunt")
        }
        else{
            setAction("/addHunt")
        }
        (props.huntId
            ?
            setHuntId(props.huntId)
            :
            ""
        )  
      },[props])

      const handleSubmit=(e)=>{//submit formularza
        e.preventDefault();
        const formattedDateFirst=formatDate(dateFirst)//data rozpoczęcia w stringu do timestampa
        const formattedDateEnd=formatDate(dateEnd)
        const huntTypeValue=huntType.value
        axiosClient.post(action,{//edytuj polowanie
            userToken,formattedDateFirst,formattedDateEnd,huntTypeValue,localisation,rallyPoint,supervisor,contact,huntId
        })
      }
    return (
        <>
    <Modal bsPrefix="modal" show={show} size="lg" onHide={()=>props.setModalShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
            <Modal.Title bsPrefix="modal-title w-100">Edytuj dane polowania</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-0 pb-0'>
                <form className='m-5 vh-50' onSubmit={handleSubmit}>
                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="form3Example2">Data rozpoczęcia</label>
                        <DatePicker 
                            className='form-control'                  
                            dateFormat="dd.MM.yyyy HH:mm"
                            selected={dateFirst}
                            onChange={(date) =>setDateFirst(date)}
                            withPortal
                            showTimeSelect
                            locale={pl}
                            timeIntervals={5}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Dzisiaj"
                            timeFormat='HH:mm'
                        />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="form3Example2">Data zakończenia</label>
                        <DatePicker 
                            className='form-control'                  
                            dateFormat="dd.MM.yyyy HH:mm"
                            selected={dateEnd}
                            onChange={(date) =>setDateEnd(date)}
                            withPortal
                            showTimeSelect
                            locale={pl}
                            timeIntervals={5}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Dzisiaj"
                            timeFormat='HH:mm'
                        />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Typ polowania</label>
                        <Select onChange={(choice)=>setHuntType(choice.value)} required="required" className='form-control' options={huntTypes} placeholder={"Wybierz status z listy"}defaultValue={huntType}/>
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Lokalizacja</label>
                        <input onChange={(e)=>setLocalisation(e.target.value)} defaultValue={localisation} type="text"  className="form-control" />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Miejsce zbiórki</label>
                        <input onChange={(e)=>setRallyPoint(e.target.value)} defaultValue={rallyPoint} type="text"  className="form-control" />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Osoba odpowiedzialna</label>
                        <input onChange={(e)=>setSupervisor(e.target.value)} defaultValue={supervisor} type="text"  className="form-control" />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Kontakt</label>
                        <input onChange={(e)=>setContact(e.target.value)} defaultValue={contact} type="text"  className="form-control" />
                    </div>
                    <button type='submit' className="btn btn-primary">Submit</button>
                </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
    </>
    );
}