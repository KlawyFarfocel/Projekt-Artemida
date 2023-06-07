import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./css/AddAnimalsToHuntModal.css";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
import Select from "react-select";
import TableContent from "../TableContent";
export default function AddAnimalsToHuntModal(props){
    const {userToken}=useStateContext();
    const [show,setShow]=useState(false)
    useEffect(()=>{
        setShow(props.show)
    })
    const tableHeadings=["Podgrupa","Zwierze","Ilość","Akcja"];
    const [tableContent,setTableContent]=useState([])
    const [zwierze,setZwierze]=useState()
    const [alert,setAlert]=useState(false);
    const [ilosc,setIlosc]=useState(0)
    const [zwierzeValue, setZwierzeValue] = useState(null);
    const [animals,setAnimals]=useState([])
    const [animalSelect,setAnimalSelect]=useState(animals)
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
        const newObject = {
            podgrupa: animalSelect[0].label,
            zwierze: zwierzeValue,
            ilosc: ilosc
          };
          setAlert(false);
          setTableContent(prevTableContent => [...prevTableContent, newObject]);
          props.setAnimalList(prevTableContent => [...prevTableContent, newObject]);
          (props.onSubmit
            ?
            props.handleSubmit()
            :""
            )
      }
      useEffect(()=>{
        axiosClient
      .post("/getStatsSelect",{
          userToken
      })
      .then(({ data }) => {
          Object.entries(data).map(([key,value])=>{
            const animalEntries = Object.entries(data).map(([key, value]) => ({
                label: key,
                options: value
              }));
               setAnimals(animalEntries);
          })
        })
      .catch(err => {
      console.log(err);
      });
    },[userToken])

    const deleteAnimalFromList=(index)=>{
        const updatedArray = [...tableContent];
        const shiftedArray = updatedArray.slice(0, index).concat(updatedArray.slice(index+1));
        setTableContent(shiftedArray);
        props.setAnimalList(shiftedArray);
    }
    const handleHide=()=>{
        if(props.animalList.length==0){
            setAlert(true)
        }
        else{
            props.setAnimalShow(false)
            setAlert(false)
        }
    }
    return(
        <>
        <Modal bsPrefix="modal" show={show} onHide={handleHide}>
                <Modal.Header bsPrefix="modal-header text-center" closeButton>
                  <Modal.Title bsPrefix="modal-title w-100">Dodaj zwierzęta</Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix='modal-body mb-3 pb-0'>
                    {
                        (alert?
                            <div className="alert alert-danger" role="alert">
                            A simple danger alert—check it out!
                          </div>
                        :
                        "")
                    }
                <form onSubmit={handleSubmit}>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Podgrupa</label>
                                <Select required
                                className=''
                                closeMenuOnSelect={true}
                                options={podgrupa}
                                onChange={changeAnimalSelect}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Zwierze</label>
                                <Select required
                                className=''
                                closeMenuOnSelect={true}
                                options={animalSelect}
                                onChange={setZwierzeValue}
                                value={zwierzeValue}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                            <label className="form-label">Ilość</label>
                            <input required defaultValue={ilosc} onChange={(e)=>{setIlosc(e.target.value)}} className="form-control" type="number" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 text-center">
                        <button className="btn btn-success" type="submit">Dodaj zwierze</button>
                    </div>
                </form>
                <div className="row">
                    <div className="col-12">
                    <h5 className="fs-5 text-white text-uppercase text-center mb-0">Dodane zwierzęta</h5>
                        <table className="w-75 text-center mx-auto table align-middle table-bordered table-dark table-striped table-hover">
                            <thead>
                                <tr>
                                    {
                                        tableHeadings.map((value,key)=>(
                                                <td key={key}>{value}</td>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.values(tableContent).map((outerValue,outerKey)=>(
                                        <tr key={outerKey}>
                                        {
                                            Object.values(outerValue).map((innerValue, innerKey) => (  
                                                (typeof innerValue==='object' & innerValue !==null
                                                    ?
                                                    <td key={innerKey}>{innerValue.label}</td>
                                                    :
                                                    <td key={innerKey}>{innerValue}</td>
                                                )
                                            ))
                                        }
                                        <td key={outerKey+1}><a onClick={()=>deleteAnimalFromList(outerKey)} className="btn btn-danger mx-auto">Usuń</a></td>
                                          </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                </Modal.Body>
              </Modal>
            </>
    )
}