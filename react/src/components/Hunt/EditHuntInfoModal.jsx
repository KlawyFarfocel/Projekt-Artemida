import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import { useEffect, useState } from 'react';
import { pl } from 'date-fns/locale';
import moment from 'moment/moment';
import Select from 'react-select';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';
import AddAnimalsToHuntModal from './AddAnimalsToHuntModal';
export default function EditHuntInfoModal(props){
      const {userToken}=useStateContext() 
      const [show, setShow] = useState();
      const [animalShow,setAnimalShow]=useState();
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
      const [huntName,setHuntName]=useState("");
      const [animalList,setAnimalList]=useState([]);
      const huntTypes=[
        {value:"Indywidualne",label:"Indywidualne"},
        {value:"Zbiorowe",label:"Zbiorowe"},
        {value:"Sokolnicze",label:"Sokolnicze"}
    ]


      const formatDate=(date)=>{//data na string taki do timestampa
        const formattedString = moment(date).format("YYYY.MM.DD HH:mm:ss");
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
                formattedDate = moment(dateString, "YYYY.MM.DD HH:mm:ss").toDate();
                setDateFirst(formattedDate)
                //data zakończenia
                dateString=props.content["Data zakończenia"]
                formattedDate = moment(dateString, "YYYY.MM.DD HH:mm:ss").toDate();
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
            setAction("/AddHunt")
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
        const newAnimalList = animalList.map((obj) => ({
            zwierzeId: obj.zwierze.value,
            ilosc: obj.ilosc,
          }));
        axiosClient.post(action,{//edytuj polowanie
            userToken,formattedDateFirst,formattedDateEnd,huntType,localisation,rallyPoint,supervisor,contact,huntId,huntName,newAnimalList
        })
        props.setReloadRequest(!props.reloadRequest)
        props.setModalShow(false)
      }
      useEffect(()=>{
        console.log("Lista")
       console.log(animalList) 
      })
    return (
        <>
    <Modal bsPrefix="modal" show={show} size="lg" onHide={()=>props.setModalShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
            <Modal.Title bsPrefix="modal-title w-100">Edytuj dane polowania</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-0 pb-0'>
                <form className='m-5 vh-50' onSubmit={handleSubmit}>
                    <div className="form-outline mb-3">
                        <label className="form-label">Nazwa polowania</label>
                        <input onChange={(e)=>setHuntName(e.target.value)} defaultValue={huntName} type="text"  className="form-control" />
                    </div>
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
                    <a className='btn btn-success' onClick={()=>setAnimalShow(true)}>XD</a>
                    <button type='submit' className="btn btn-primary">Submit</button>
                </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
        <AddAnimalsToHuntModal setAnimalList={setAnimalList} show={animalShow} setAnimalShow={setAnimalShow}/>
    </>
    );
}