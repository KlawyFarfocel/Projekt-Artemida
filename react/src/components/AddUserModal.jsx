import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
import UserData from './UserData';
export default function AddUserModal(props) {
  const [show, setShow] = useState();
  useEffect(()=>{
    setShow(props.show);
  })
return (
    <>
<Modal bsPrefix="modal" scrollable="0" show={show} size="lg" onHide={()=>props.setModalShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
          <Modal.Title bsPrefix="modal-title w-100">Dodaj nowego Łowczego</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
                <UserData userInfo={false} action="addNewUser" setPassword={true} modifyLegi={true}/>
        </Modal.Body>
      </Modal>
    </>
  );
}