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
        <Modal.Body bsPrefix='modal-body mb-0 pb-0'>
          <span>Nadawca: </span> <span>{(props.content)?(props.content.Nadawca):("")}</span>
          <hr className="text-divider" />
          <span>Data wysłania: </span> <span>{(props.content)?(props.content['Data wysłania']):("")}</span>
          <hr className="text-divider" />
          <span>Temat: </span> <span>{(props.content)?(props.content.Temat):("")}</span>
          <hr className="text-divider" />
          <span>Treść: </span>
          <p>{(props.content)?(props.content.Treść):("")}</p>
        </Modal.Body>
        <Modal.Footer bsPrefix="modal-footer w-100 mx-auto">
            <div className='w-50 mx-auto d-flex'>
              <Button bsPrefix="btn btn-success" variant="secondary" onClick={()=>props.setModalShow(false)}>
              Odpisz
            </Button>
            <div className='w-25 mx-auto'></div>
            <Button  bsPrefix="btn btn-danger" variant="primary" onClick={()=>props.setModalShow(false)}>
              Zamknij
            </Button>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}