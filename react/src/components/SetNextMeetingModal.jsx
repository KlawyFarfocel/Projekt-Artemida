import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
import { pl } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { useStateContext } from '../contexts/ContextProvider';
import moment from 'moment';
import axiosClient from '../axios';
export default function SetNextMeetingModal(props) {
    const {userToken}=useStateContext();
  const [show, setShow] = useState();
  const [startDate,setStartDate]=useState(new Date())
  const [meetingPlace,setMeetingPlace]=useState("");
  let wrongData=false;
  useEffect(()=>{
    setShow(props.show);
  })
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(meetingPlace)
    const meetingDate=moment(startDate).format('YYYY-MM-DD HH:mm:ss')
    axiosClient.post("/SetNextMeeting",{
        userToken,meetingPlace,meetingDate
    })
    .then(({data})=>{
        props.setReloadRequest(!props.reloadRequest);
        props.setModalNextMeeting(false)
    })
  }
return (
    <>
<Modal bsPrefix="modal" show={show} onHide={()=>props.setModalNextMeeting(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
          <Modal.Title bsPrefix="modal-title w-100">Ustal następne spotkanie</Modal.Title>
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
                <label className="form-label">Data</label>
                <DatePicker 
                            required
                            className='form-control'                  
                            dateFormat="dd.MM.yyyy HH:mm"
                            selected={startDate}
                            onChange={(date) =>setStartDate(date)}
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
            <div className="mb-3">
                <label className='form-label'>Miejsce spotkania: </label>
                <input type="text" onChange={(e)=>setMeetingPlace(e.target.value    )} className='form-control' />
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