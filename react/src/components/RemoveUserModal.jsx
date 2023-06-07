import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import DatePicker from 'react-datepicker';
import { pl } from 'date-fns/locale';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import moment from 'moment';
export default function RemoveUserModal(props){
    const {userToken}=useStateContext();
    const [show, setShow] = useState();
    const [deleteUser,setDeleteUser]=useState(false);
    useEffect(()=>{
      setShow(props.show);
    })
    const handleSubmit=(e)=>{
        e.preventDefault();
        const kickUserId=props.allUsers[props.id].id;
        axiosClient.post("/KickUserOutOfClub",{
            kickUserId,deleteUser
        })
        .then(()=>{
            props.setModalDeleteUser(false)
            props.setReloadRequest(!props.reloadRequest)
            props.setModalDeleteUser(false)
        })
    }
    return(
        <Modal bsPrefix="modal" show={show} onHide={()=>props.setModalDeleteUser(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
            <Modal.Title bsPrefix="modal-title w-100">Czy usunąć także użytkownika?</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
        <form className='w-50 mx-auto' onSubmit={handleSubmit}>
            <p className='text-muted text-center'>Po zaznaczeniu poniższego okna, użytkownik zostanie również usunięty z bazy danych</p>
            <p className='text-danger text-center'>UWAGA! Operacja jest nieodwracalna</p>

            <div className="form-check mx-auto mb-3">
              <input onChange={(choice)=>setDeleteUser(choice.target.checked)} className="form-check-input" type="checkbox" />
              <label className="form-check-label">
                Usuń użytkownika z bazy
              </label>
            </div>

            <div className="w-100 text-center">
                <button type="select" className="btn btn-danger">Zatwierdź</button>
            </div>
        </form>
        </Modal.Body>
    </Modal>
    );
}