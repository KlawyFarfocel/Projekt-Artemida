import { useRef } from "react";
import "./css/sharedComponent.css"
export default function UserData(){
  const ref=useRef(null)
  const copyLegitymacjaNumber=(e)=>{
    navigator.clipboard.writeText(e.view.document.all[55].value);
    ref.current.setAttribute('class','me-2 text-success')
    setTimeout(()=>{ref.current.setAttribute('class','me-2 text-success d-none')},750)
  }
    return(
        <div className="container w-50 h-100 mx-auto d-flex align-items-center justify-content-center ">
          
        <form className="h-75 mt-2 my-auto d-flex flex-column">
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Dane</h5>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input type="text" id="form3Example1" className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Imię</label>
               
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input type="text" id="form3Example2" className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Nazwisko</label>
              </div>
            </div>
          </div>
        
          <div className="form-outline mb-2">
            <input type="text" id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">PESEL</label>
          </div>
          <div className="input-group mb-3">
            <input type="text" id="legitymacja" className="form-control" value="123-ANBS-HD5" disabled="disabled" />
            
            <span onClick={copyLegitymacjaNumber} className="input-group-text">
            <span className="me-2 text-success d-none" ref={ref} id="copyText">Skopiowano!</span>
              <i className="bi bi-clipboard-fill"></i>
            </span>
          </div>
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Adres</h5>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input type="text" id="form3Example1" className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Miasto</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input type="text" id="form3Example2" className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Kod Pocztowy</label>
              </div>
            </div>
          </div>
          <div className="form-outline mb-2">
            <input type="text" id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">Ulica</label>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input type="text" id="form3Example1" className="form-control" />
                <label className="form-label" htmlFor="form3Example1">Nr. mieszkania</label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input type="text" id="form3Example2" className="form-control" />
                <label className="form-label" htmlFor="form3Example2">Nr. budynku</label>
              </div>
            </div>
          </div>
          <h5 className="text-center fw-bold fs-2 text-uppercase text-white">Kontakt</h5>
          <div className="form-outline mb-2">
            <input type="text" id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">E-mail</label>
          </div>
          <div className="form-outline mb-2">
            <input type="text" id="form3Example3" placeholder="789 887 888" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">Nr.telefonu</label>
          </div>
          <button type="submit" className="btn btn-success mb-2 mx-auto">Zapisz zmiany</button>
        </form>
      </div>
    )
}