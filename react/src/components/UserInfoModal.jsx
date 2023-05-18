import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
import { tr } from 'date-fns/locale';
export default function UserInfoModal(props) {
  const [show, setShow] = useState();
  useEffect(()=>{
    setShow(props.show);
  })
  const [dataTableContent,setDataTableContent]=useState([]);

    useEffect(()=>{
        (props.content
        ?
            setDataTableContent(props.content)
        :
        ""   
        )
  },[props])
return (
    <>
<Modal bsPrefix="modal" show={show} onHide={()=>props.setModalUserInfoShow(false)}>
        <Modal.Header bsPrefix="modal-header text-center" closeButton>
          <Modal.Title bsPrefix="modal-title w-100">Dane członka koła</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
            <table className="table align-middle table-bordered table-light table-striped table-hover">
                <tbody>
                {Object.entries(dataTableContent).map(([key, value]) => (
                    <tr>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Modal.Body>
      </Modal>
    </>
  );
}