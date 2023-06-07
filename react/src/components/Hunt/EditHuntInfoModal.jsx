import Modal from 'react-bootstrap/Modal'
import DatePicker from "react-datepicker";
import { useEffect, useState } from 'react';
import { pl } from 'date-fns/locale';
import moment from 'moment/moment';
import Select from 'react-select';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';
import AddAnimalsToHuntModal from './AddAnimalsToHuntModal';
import InputMask from 'react-input-mask';
export default function EditHuntInfoModal(props){
      const {userToken}=useStateContext() 
      const [show, setShow] = useState();
      const [animalShow,setAnimalShow]=useState();
      const [startDate, setStartDate] = useState(new Date());
      let validateFormFlag=true;
      const [dateEndToggler,setDateEndToggler]=useState("")
      const [dateEndTitle,setDateEndTitle]=useState("")
      const [wrongData,setWrongData]=useState(false)
      const [dateFirst,setDateFirst]=useState(new Date());//data rozpoczęcia
      const [dateEnd,setDateEnd]=useState(new Date());//data zakończenia
      const [dateEndClassName,setDateEndClassName]=useState("form-control")


      const [huntType,setHuntType]=useState("")
      const [localisation,setLocalisation]=useState("")
      const [rallyPoint,setRallyPoint]=useState("")
      const [supervisor,setSupervisor]=useState("")
      const [supervisorProp,setSupervisorProp]=useState("")
      const [contact,setContact]=useState("")
      const [status,setStatus]=useState("")
      const [action,setAction]=useState("")
      const [huntId,setHuntId]=useState()
      const [huntName,setHuntName]=useState("");
      const [animalList,setAnimalList]=useState([]);

      const [buttonName,setButtonName]=useState("Dodaj polowanie")

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
                setSupervisor({label:props.content["Osoba odpowiedzialna"],value:props.content["IdSupervisor"]})
                //Kontakt
                setContact(props.content["Kontakt"])
                //Status
                setStatus(props.content["Status"])
                setHuntName(props.content["Nazwa"])
                //Gdzie wysyłamy
                setAction("/EditHunt")
                setButtonName("Edytuj polowanie")
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
        axiosClient.post("/GetOnlyMainSquadFromClub",{
            userToken
        })
        .then(({data})=>{
            setSupervisorProp(data[0])
        })  
      },[props])
      const handleDateEnd=(e)=>{
        setDateEnd(e)
        if(e<dateFirst){
            setDateEndTitle("Data zakończenia nie może być wcześniej niż data rozpoczęcia")
            setDateEndToggler("tooltip")
            setDateEndClassName(dateEndClassName+" is-invalid")
            validateFormFlag=false;
        }else{
            const tooltipTriggerList = document.querySelectorAll('.tooltip-inner,.tooltip-arrow');
            tooltipTriggerList.forEach(tooltipTriggerEl => {
              tooltipTriggerEl.classList.add("d-none")
            });
            setDateEndClassName("form-control")
            setDateEndToggler("")
            setDateEndTitle("")
            document.getElementById("dateEndWrapper").removeAttribute("data-bs-original-title")
        }
      }

      const handleHuntName=(e)=>{
        setHuntName(e.target.value)
        const regexp=/^[\s\S]{1,255}$/
        const invalidText="Sprawdź poprawność danych. Pole nazwa nie może być puste"
        startValidationProcess(regexp,e,invalidText)
      }
      const handleLocalisation=(e)=>{
        setLocalisation(e.target.value)
        const regexp=/^(?!^\d+$)(?:[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]*(?:-[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)?)?(?:,?\s*[-a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]+)*\s*(?:-?\d+(?:\.\d+)?°?\s*[NS]?,?\s*-?\d+(?:\.\d+)?°?\s*[EW]?)?$/
        const invalidText="Sprawdź poprawność danych. Dopuszczone znaki specjalne: \n',' \n'-'\n Dopuszcza się podanie koordynatów, jednak należy pamiętać o pominięciu znaku stopni '°'. Błędem jest również wprowadzenie samych cyfr"
        startValidationProcess(regexp,e,invalidText)
      }
      const handleRallyPoint=(e)=>{
        setRallyPoint(e.target.value)
        const regexp=/^(?:[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]*(?:-[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)?)?(?:,?\s*[-a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż\s]+)*$/
        const invalidText="Sprawdź poprawność danych. Dopuszczone znaki specjalne: \n',' \n'-'\n Dopuszcza się podanie koordynatów, jednak należy pamiętać o pominięciu znaku stopni '°'. Błędem jest również wprowadzenie samych cyfr"
        startValidationProcess(regexp,e,invalidText)
      }
      const startValidationProcess=(regexp,e,invalidText)=>{
        if(validateInput(regexp,e.target.value)){
          changeInputAttributes("valid",e.target)
        }
        else{
          changeInputAttributes("invalid",e.target,invalidText)
        }
      }
      const validateInput=(regexp,value)=>{
        if(regexp.test(value)){
          return true
        }
        else return false;
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
      const validateAtSubmit=(e)=>{
        validateFormFlag=true;
        //nazwa
        let regexp=/^[\s\S]{1,255}$/
        let invalidText="Sprawdź poprawność danych. Pole nazwa nie może być puste"
        validateInputOnSubmit(regexp,e,1,invalidText)
        //data rozpoczęcia - daj is valid
        e.target[1].classList.add("is-valid")
        //data zakończenia - sprawdź czy nie jest przed rozpoczęciem
        if(e<dateFirst){
            setDateEndTitle("Data zakończenia nie może być wcześniej niż data rozpoczęcia")
            setDateEndToggler("tooltip")
            setDateEndClassName(dateEndClassName+" is-invalid")
            setValidateFormFlag(false);
        }else{
            const tooltipTriggerList = document.querySelectorAll('.tooltip-inner,.tooltip-arrow');
            tooltipTriggerList.forEach(tooltipTriggerEl => {
              tooltipTriggerEl.classList.add("d-none")
            });
            setDateEndClassName("form-control")
            setDateEndToggler("")
            setDateEndTitle("")
            document.getElementById("dateEndWrapper").removeAttribute("data-bs-original-title")
        }
        //typ polowania daj na valid
        e.target[3].classList.add("is-valid")
        //lokalizacja
        regexp=/^(?!^\d+$)(?:[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]*(?:-[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)?)?(?:,?\s*[-a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż0-9\s]+)*\s*(?:-?\d+(?:\.\d+)?°?\s*[NS]?,?\s*-?\d+(?:\.\d+)?°?\s*[EW]?)?$/
        invalidText="Sprawdź poprawność danych. Dopuszczone znaki specjalne: \n',' \n'-'\n Dopuszcza się podanie koordynatów, jednak należy pamiętać o pominięciu znaku stopni '°'. Błędem jest również wprowadzenie samych cyfr"
        validateInputOnSubmit(regexp,e,4,invalidText)
        //miejsce zbiorki
        regexp=/^(?:[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]*(?:-[A-ZĄĆĘŁŃÓŚŹŻ][a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)?)?(?:,?\s*[-a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż\s]+)*$/
        invalidText="Sprawdź poprawność danych. Dopuszczone znaki specjalne: \n',' \n'-'\n Dopuszcza się podanie koordynatów, jednak należy pamiętać o pominięciu znaku stopni '°'. Błędem jest również wprowadzenie samych cyfr"
        validateInputOnSubmit(regexp,e,5,invalidText)
        //osoba odpowiedzialna daj na valid
        e.target[6].classList.add("is-valid")
        //nr tel daj na valid
        if(e.target[7].length==12 && e.target[7].value[11]!="_"){
            e.target[7].classList.add("is-valid")

        }
      }
      const validateInputOnSubmit=(regexp,e,number,invalidText)=>{
        if(validateInput(regexp,e.target[number].value)){
          changeInputAttributes("valid",e.target[number])
        }
        else{
          changeInputAttributes("invalid",e.target[number],invalidText)
        }
      }
      const handleSubmit=(e)=>{//submit formularza
        e.preventDefault();
        validateAtSubmit(e)
        if(validateFormFlag){
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
        setWrongData(false)
        }
        else{
            setWrongData(true)
        }
       }
    const editHuntType=(choice)=>{
        (typeof huntType === "object"
            ?
                setHuntType("") &
                setHuntType(choice.value)
            :
            setHuntType(choice.value)
        )
      }
      
      useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
      });
    return (
        <>
    <Modal bsPrefix="modal" show={show} size="lg" onHide={()=>props.setModalShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
            <Modal.Title bsPrefix="modal-title w-100">Edytuj dane polowania</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-0 pb-0'>
                <form className=' vh-50' onSubmit={handleSubmit}>
                    {(wrongData)
                        ?
                        <div className="alert alert-danger" role="alert">
                        Popraw pola zaznaczone na czerwono i prześlij formularz ponownie
                        </div>
                        :""
                    }
                    <div className="form-outline mb-3">
                        <label className="form-label">Nazwa polowania</label>
                        <input required onChange={handleHuntName} defaultValue={huntName} type="text"  className="form-control" />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="form3Example2">Data rozpoczęcia</label>
                        <DatePicker 
                            className="form-control"                 
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
                        <div id="dateEndWrapper" className='' data-bs-toggle={dateEndToggler} title={dateEndTitle}>
                        <DatePicker 
                            className={dateEndClassName}                 
                            dateFormat="dd.MM.yyyy HH:mm"
                            selected={dateEnd}
                            onChange={(e)=>handleDateEnd(e)}
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
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Typ polowania</label>
                        <Select onChange={(choice)=>editHuntType(choice)} required="required" className='form-control' options={huntTypes} placeholder={"Wybierz status z listy"}defaultValue={huntType}/>
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Lokalizacja</label>
                        <input onChange={handleLocalisation} defaultValue={localisation} type="text"  className="form-control" />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Miejsce zbiórki</label>
                        <input onChange={handleRallyPoint} defaultValue={rallyPoint} type="text"  className="form-control" />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Osoba odpowiedzialna</label>
                        <Select
                            required
                            className=''
                            defaultValue={supervisor}
                            closeMenuOnSelect={true}
                            options={supervisorProp}
                            onChange={(choice)=>setSupervisor(choice.value)}
                        />
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label">Kontakt</label> 
                        <i data-bs-toggle="tooltip" title="Numer telefonu używany w razie potrzeby kontaktu" className="bi bi-question-circle-fill ms-2 fs-5"></i>
                        <InputMask required mask={"+99999999999"} onChange={(e)=>setContact(e.target.value)} value={contact} placeholder="+48212121212" className="form-control" />
                    </div>
                    <a className='btn btn-success' onClick={()=>setAnimalShow(true)}>Dodaj zwierzęta do odstrzału</a>
                    <button type='submit' className="btn btn-primary">{buttonName}</button>
                </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
        <AddAnimalsToHuntModal setAnimalList={setAnimalList} show={animalShow} setAnimalShow={setAnimalShow}/>
    </>
    );
}