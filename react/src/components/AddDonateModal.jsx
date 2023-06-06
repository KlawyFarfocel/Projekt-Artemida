import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import DatePicker from 'react-datepicker';
import { pl } from 'date-fns/locale';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import moment from 'moment';
export default function AddDonateModal(props){
    const {userToken}=useStateContext();
    const [show, setShow] = useState();
    const [startDate,setStartDate]=useState(new Date())

    const [opis,setOpis]=useState()
    const [kwota,setKwota]=useState()

    useEffect(()=>{
      setShow(props.show);
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        const dataString = moment(startDate).format("YYYY.MM.DD HH:mm:ss");
        axiosClient.post("/AddDonate",{
            userToken,opis,kwota,dataString
        })
        .then(()=>{
            props.setShowDonateModal(false)
        })
    }
    return(
        <Modal bsPrefix="modal" show={show} onHide={()=>props.setShowDonateModal(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
            <Modal.Title bsPrefix="modal-title w-100">Dodaj składkę</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
        <form className='w-50 mx-auto' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Opis</label>
                <input required="required" type="text" onChange={(e)=>{setOpis(e.target.value)}} defaultValue={opis} className="form-control" id="Organ"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Kwota</label>
                <input required="required" type="number" min={0} defaultValue="" onChange={(e)=>{setKwota(e.target.value)}} className="form-control" id="Zezwolenie"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Termin</label>
                <DatePicker  required
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
            <div className="w-100 text-center">
                <button type="select" className="btn btn-success">Zatwierdź</button>
            </div>
        </form>
        </Modal.Body>
    </Modal>
    );
}