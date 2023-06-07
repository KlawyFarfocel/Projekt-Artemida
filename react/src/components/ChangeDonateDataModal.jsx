import Modal from 'react-bootstrap/Modal'
import {useEffect, useState } from 'react';
import Select from 'react-select';
import axiosClient from '../axios';
export default function ChangeDonateDataModal(props){
    const [show, setShow] = useState();
    const [sendDirection,setSendDirection]=useState("")
    const [selectedOption,setSelectedOption]=useState()
    const [deletion,setDeletion]=useState(false)
    const [required,setRequired]=useState("required")

    useEffect(()=>{
      setShow(props.show);
    },[props])

    const handleSubmit=(e)=>{
        e.preventDefault()
        const idSkladki=props.content["Id"]       
        axiosClient.post(sendDirection,{
            idSkladki,selectedOption
        })
        .then(({ data }) => { 
            props.setModalShow(false)
            props.setAdminViewHandler(!props.adminViewHandler)
        })
    }
    const DonateStatus=[
        {value:"Opłacona",label:"Opłacona"},
        {value:"Nieopłacona",label:"Nieopłacona"}
    ]
    useEffect(()=>{
        if(deletion){
            setRequired("")
            let idSkladki;
            (props.content?
            idSkladki=props.content["Id"] :"")
            axiosClient.post(sendDirection,{
                idSkladki
            })
            .then(({ data }) => { 
                props.setModalShow(false)
                props.setAdminViewHandler(!props.adminViewHandler)
                setRequired("required")
                setDeletion(false)
            })
        }
    },[deletion])
    return(
        <>
            <Modal bsPrefix="modal" scrollable="0" show={show} size="lg" onHide={()=>props.setModalShow(false)}>
                <Modal.Header bsPrefix="modal-header text-center" closeButton>
                    <Modal.Title bsPrefix="modal-title w-100">Edytuj składkę</Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
                <form  onSubmit={handleSubmit} className='w-75 mx-auto'>
                    <div className="mb-3">
                        <label className="form-label">Status składki</label>
                        <Select onChange={(choice)=>setSelectedOption(choice.value)} required={required} className='form-control' options={DonateStatus} placeholder={"Wybierz status z listy"}/>
                    </div>
                    <div className="w-100 d-flex">
                            <button type="submit" onClick={()=>{setSendDirection("/EditDonate")}} className="btn btn-success mb-5 mx-auto">Zapisz zmiany</button>
                            <button onClick={()=>{setSendDirection("/DeleteDonate") & setDeletion(!deletion)}} className='btn btn-danger me-auto mb-5 ml-5'>Usuń składkę</button>
                    </div>
                </form>
                </Modal.Body>
            </Modal>
        </>
    )
}