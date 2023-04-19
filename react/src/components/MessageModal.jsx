import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
export default function MessageModal(props) {
  const [show, setShow] = useState();
  useEffect(()=>{
    setShow(props.show);
  })
  
return (
    <>
<Modal bsPrefix="modal" show={show} onHide={()=>props.setModalShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
          <Modal.Title bsPrefix="modal-title w-100">Ogłoszenie</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
          <span>Nadawca: </span> <span>{(props.content)?(props.content.Nadawca):("")}</span>
          <hr className="text-divider" />
          <span>Data wysłania: </span> <span>{(props.content)?(props.content['Data wysłania']):("")}</span>
          <hr className="text-divider" />
          <span>Temat: </span> <span>{(props.content)?(props.content.Temat):("")}</span>
          <hr className="text-divider" />
          <span>Treść: </span>
          <p>{(props.content)?(props.content.Treść):("")}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}