import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
import Select from 'react-select'
export default function AddUserToClubModal(props) {
  const [show, setShow] = useState();
  useEffect(()=>{
    setShow(props.show);
  })
  const handleClose=()=>{
    props.setRequest(true)
    props.setModalUserShow(false)
  }
return (
    <>
<Modal bsPrefix="modal" show={show} size="lg" onHide={()=>props.setModalUserShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
          <Modal.Title bsPrefix="modal-title w-100">Dodaj istniejącego Łowczego do Twojego Koła</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
                <form className='m-5 vh-50'>
                <div className="form-outline">
                    <label>Wybierz Łowczego</label>
                    <Select options={props.options} isMulti onChange={props.setSelectedOption}></Select>  
                </div>
                    <button className="btn btn-primary" onClick={handleClose}>Submit</button>
                </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}