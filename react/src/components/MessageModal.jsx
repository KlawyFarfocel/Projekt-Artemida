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
<Modal show={show} onHide={()=>props.setModalShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
          <Modal.Title bsPrefix="modal-title w-100">Ogłoszenie</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-0 pb-0'>
          <span>Nadawca: </span> <span>Hodowla bydła</span>
          <hr className="text-divider" />
          <span>Data wysłania: </span> <span>Hodowla bydła</span>
          <hr className="text-divider" />
          <span>Temat: </span> <span>Hodowla bydła</span>
          <hr className="text-divider" />
          <span>Treść: </span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quod voluptatibus saepe, corrupti ullam odio sit totam, explicabo laborum sequi error asperiores odit distinctio eius accusamus ratione velit quisquam voluptate.</p>
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
