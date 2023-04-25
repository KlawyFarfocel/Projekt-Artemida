import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React,{ forwardRef, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";

export default function FilterModal(props) {
  const [show, setShow] = useState();
  useEffect(()=>{
    setShow(props.show);
  })
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  useEffect(()=>{
    setStartDate(props.startDate);
    setEndDate(props.endDate);
    setSelectedOption(props.selectedOption);
  })
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="btn btn-primary mx-auto" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  const [options,setOptions]=useState(props.animals)
  const [selectedOption, setSelectedOption] = useState(props.selectedOption);
  const handleClose=()=>{
    props.setRequest(true)
    props.setModalShow(false)
  }
return (
    <>
<Modal bsPrefix="modal" size="xl" show={show} onHide={()=>props.setModalShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
          <Modal.Title bsPrefix="modal-title w-100">Flitruj</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
          <div className="container">
            <div className="row">
                <div className="col-1 offset-3">
                      <p className='w-25 text-end'>Od:</p>
                </div>
                <div className="col-1">             
                      <DatePicker
                                  dateFormat="dd.MM.yyyy"
                                  selected={startDate}
                                  onChange={(date) => props.setStartDate(date)}
                                  selectsStart
                                  startDate={startDate}
                                  endDate={endDate}
                                  customInput={<ExampleCustomInput />}
                      />
                </div>
            </div>
            <div className="row">
              <div className="col-1 offset-3">
                    <div className="w-25">Do:</div>
              </div>
              <div className="col-1">
                    <DatePicker
                              dateFormat="dd.MM.yyyy"
                              className='mx-auto'
                              selected={endDate}
                              onChange={(date) => props.setEndDate(date)}
                              selectsEnd
                              startDate={startDate}
                              endDate={endDate}
                              minDate={startDate}
                              customInput={<ExampleCustomInput />}
                      />
              </div>
            </div>
            <div className="row">
              <div className="col-1 offset-3">
                  <div className="w-25">Zwierzę:</div>
              </div>
              <div className="col-5">
                    <Select
                      className=''
                      closeMenuOnSelect={false}
                      isMulti
                      options={options}
                      onChange={props.setSelectedOption}
                    />
              </div>
            </div>
            <div className="row">
              <div className="col-1 offset-5">
                    <a className='btn btn-success mx-auto' onClick={()=>handleClose()}>Zastosuj</a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}