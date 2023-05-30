import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';
import Select from 'react-select';

export default function AddShootedAnimalModal(props){
    const [show,setShow]=useState(false)
    const {userToken,setUserToken}=useStateContext()
    const [animals,setAnimals]=useState(props.animals)
    const [huntId,setHuntId]=useState()

    const [selectedUser,setSelectedUser]=useState()
    const [ilosc,setIlosc]=useState()

    const [animalSelect,setAnimalSelect]=useState(props.animals)
    const [usersList,setUsersList]=useState(props.usersList)
    const [zwierzeValue, setZwierzeValue] = useState(null);
    const [podgrupa,_setPodgrupa]=useState([
        {"value":"daniele","label":"Daniele"},
        {"value":"dziki","label":"Dziki"},
        {"value":"gęsi","label":"Gęsi"},
        {"value":"jelenie","label":"Jelenie"},
        {"value":"kaczki","label":"Kaczki"},
        {"value":"kuny","label":"Kuny"},
        {"value":"muflony","label":"Muflony"},
        {"value":"sarny","label":"Sarny"},
        {"value":"łosie","label":"Łosie"},
        {"value":"pozostałe","label":"Pozostałe"},
    ])
    const [zwierze,setZwierze]=useState()


    const changeAnimalSelect = (name) => {
        setZwierze([])
        setAnimalSelect([]);
        setZwierzeValue(null) 
          let searchName = name.label;
          setAnimalSelect(prevAnimalSelect => [
            ...prevAnimalSelect,
            ...Object.values(animals).filter(obj => obj.label === searchName)
          ]);
      };
    const handleSubmit=(e)=>{
        e.preventDefault();
        let newUser=selectedUser.value
        let newZwierze=zwierzeValue.value
        axiosClient.post("/AddShooting",{
            newUser,ilosc,newZwierze,huntId
        })
        .then(()=>{
            props.setShow(false)
        })
    }
    useEffect(()=>{
        setShow(props.show)
        
    })
    useEffect(()=>{
        (props.animals?
        setAnimals(props.animals)
        :false
        )
        if(props.usersList)
            setUsersList(Object.values(props.usersList).map(item=>({
                value:item.id,
                label:item.łowczy
            })))
        if(props.huntId){
            setHuntId(props.huntId)
        }
    },[props])
    return (
        <>
    <Modal bsPrefix="modal" show={show} onHide={()=>props.setShow(false)}>
            <Modal.Header bsPrefix="modal-header text-center" closeButton>
              <Modal.Title bsPrefix="modal-title w-100">Dodaj odstrzał</Modal.Title>
            </Modal.Header>
            <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
                <form className='w-50 mx-auto' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Kto strzelał</label>
                    <Select
                      className=''
                      closeMenuOnSelect={true}
                      options={usersList}
                      onChange={setSelectedUser}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ilość</label>
                    <input required="required" type="number" min={0} defaultValue="" onChange={(e)=>{setIlosc(e.target.value)}} className="form-control" id="Zezwolenie"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Podgrupa</label>
                    <Select
                      className=''
                      closeMenuOnSelect={true}
                      options={podgrupa}
                      onChange={changeAnimalSelect}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Zwierze</label>
                    <Select
                      className=''
                      closeMenuOnSelect={true}
                      options={animalSelect}
                      onChange={setZwierzeValue}
                      value={zwierzeValue}
                    />
                </div>
                <div className="w-100 text-center">
                    <button type="select" className="btn btn-success">Zatwierdź</button>
                </div>
            </form>
            </Modal.Body>
          </Modal>
        </>
      );
}