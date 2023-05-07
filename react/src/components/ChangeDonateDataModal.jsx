import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react';
export default function ChangeDonateDataModal(props){
    const [show, setShow] = useState();
    useEffect(()=>{
      setShow(props.show);
    })
    return(
        <>
            <Modal bsPrefix="modal" scrollable="0" show={show} size="lg" onHide={()=>props.setModalShow(false)}>
                <Modal.Header bsPrefix="modal-header text-center" closeButton>
                    <Modal.Title bsPrefix="modal-title w-100">Edytuj składkę</Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
                <form className='w-50 mx-auto'>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                </Modal.Body>
            </Modal>
        </>
    )
}