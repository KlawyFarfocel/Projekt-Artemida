import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
export default function ReloadModal(props) {
const [show, setShow] = useState();
useEffect(()=>{
    setShow(props.show);
  })
return (
    <>
<Modal bsPrefix="modal" backdrop={"static"} show={show} keyboard={false}>
        <Modal.Header bsPrefix="modal-header text-center">
          <Modal.Title bsPrefix="modal-title w-100">Proszę czekać</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-0 pb-0'>
            <p className='fs-1 mx-auto text-center'>Trwa odświeżanie...</p>
        </Modal.Body>
      </Modal>
    </>
  );
}