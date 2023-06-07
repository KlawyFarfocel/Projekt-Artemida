import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React,{ forwardRef, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import { pl } from 'date-fns/locale';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import moment from 'moment';

export default function FilterDonateModal(props) {
  const {userToken}=useStateContext();
  const [show, setShow] = useState();
  useEffect(()=>{
    setShow(props.show);
  })
  let validateFormFlag=true;
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [usersList,setUsersList]=useState();
  const [selectedUser,setSelectedUser]=useState();
  const [manipulateUserListFlag,setManipulateUserListFlag]=useState(false)
  const [dateEndToggler,setDateEndToggler]=useState("")
  const [dateEndTitle,setDateEndTitle]=useState("")
  const [dateEndClassName,setDateEndClassName]=useState("form-control")
  const [wrongData,setWrongData]=useState(false);
  useEffect(()=>{
    setStartDate(props.startDate);
    setEndDate(props.endDate);
    setSelectedOption(props.selectedOption);
  })
  const [selectedOption, setSelectedOption] = useState(props.selectedOption);
  const handleClose=()=>{
    props.setRequest(true)
    props.setModalShow(false)
  }
  const formatDate=(date)=>{//data na string taki do timestampa
    const formattedString = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return formattedString;
  }
  const handleSubmit=(e)=>{
    validateFormFlag=true;
    setWrongData(false)
    e.preventDefault(); 
    if(props.startDate>props.endDate){
      validateFormFlag=false
    }
    if(validateFormFlag){
      const newUsersList = selectedUser.map(obj => obj.value);
      const newStartDate=formatDate(startDate);
      const formattedEndDate=formatDate(endDate);
      const newEndDate=moment(formattedEndDate).add({ hours: 23, minutes: 59, seconds: 59 }).format("YYYY-MM-DD HH:mm:ss");
      axiosClient.post("/FilterDonate",{
          userToken,newUsersList,newStartDate,newEndDate
      })
      .then(({data})=>{
        props.setPropContent(data)
        props.setFilterModalShow(false)
      })
    }
    else{
      setWrongData(true)
    }
  }
  useEffect(()=>{
  axiosClient
  .post("/GetAllHuntersFromClub",{
      userToken
  })
  .then(({ data }) => {
    setUsersList(data[0])
    setManipulateUserListFlag(true)
    })
  .catch(err => {
  console.log(err);
  });
},[userToken])
useEffect(()=>{
    if(manipulateUserListFlag){
        setUsersList(Object.values(usersList).map(item=>({
            value:item.id,
            label:item.łowczy
        })))
        setManipulateUserListFlag(false)
    }
},[usersList])
const handleDateEnd=(e)=>{
  props.setEndDate(e)
  if(e<props.startDate){
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
useEffect(() => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
});
return (
    <>
<Modal bsPrefix="modal" size="xl" show={show} onHide={()=>props.setFilterModalShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
          <Modal.Title bsPrefix="modal-title w-100">Flitruj składki</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
        <form className='w-50 mx-auto' onSubmit={handleSubmit}>
            {wrongData
            ?
              <div className="alert alert-danger" role="alert">
              Popraw pola zaznaczone na czerwono i prześlij formularz ponownie
              </div>
            :
              ""}
            <div className="mb-3">
                <label className="form-label">Od:</label>
                <DatePicker 
                            className='form-control'                  
                            dateFormat="dd.MM.yyyy"
                            selected={startDate}
                            onChange={(date) =>props.setStartDate(date)}
                            withPortal
                            locale={pl}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Dzisiaj"
                        />
            </div>
            <div className="mb-3">
                <label className="form-label">Do:</label>
                  <div  id="dateEndWrapper" className='' data-bs-toggle={dateEndToggler} title={dateEndTitle}>
                  <DatePicker 
                            className={dateEndClassName}                 
                            dateFormat="dd.MM.yyyy"
                            selected={endDate}
                            onChange={(e)=>handleDateEnd(e)}
                            withPortal
                            locale={pl}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Dzisiaj"
                        />
                  </div>
            </div>
            <div className="mb-3">
            <label className="form-label">Imie i nazwisko</label>
                    <Select
                      required
                      className=''
                      closeMenuOnSelect={true}
                      options={usersList}
                      onChange={setSelectedUser}
                      isMulti
                    />
            </div>
            <div className="w-100 text-center">
                <button type="select" className="btn btn-success">Zatwierdź</button>
            </div>
        </form>
        </Modal.Body>
      </Modal>
    </>
  );
}