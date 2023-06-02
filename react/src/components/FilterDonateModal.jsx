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
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [usersList,setUsersList]=useState();
  const [selectedUser,setSelectedUser]=useState();
  const [manipulateUserListFlag,setManipulateUserListFlag]=useState(false)
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
    e.preventDefault();
    console.log("Lista userow")
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
return (
    <>
<Modal bsPrefix="modal" size="xl" show={show} onHide={()=>props.setFilterModalShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
          <Modal.Title bsPrefix="modal-title w-100">Flitruj składki</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
        <form className='w-50 mx-auto' onSubmit={handleSubmit}>
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
                <DatePicker 
                            className='form-control'                  
                            dateFormat="dd.MM.yyyy"
                            selected={endDate}
                            onChange={(date) =>props.setEndDate(date)}
                            withPortal
                            locale={pl}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Dzisiaj"
                        />
            </div>
            <div className="mb-3">
            <label className="form-label">Imie i nazwisko</label>
                    <Select
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