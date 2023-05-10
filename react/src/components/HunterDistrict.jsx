import TableContent from "./TableContent";
import TableString from "./TableString";

export default function HunterDistrict(){
    const tableHeaders=["Lp.","Imię i nazwisko"];
    const tableContent=[
        "Endrju Golara",
        "Bob Marlay",
        "Bob Marley"
    ]
    return(
        <div className="container-fluid">
            <h1 className="text-uppercase fs-1 text-white text-center my-3">Zarząd okręgowy Nowy Sącz</h1>
            <div className="row">
                <div className="col-12 col-md-3 offset-md-1">
                    <TableString title={"Zarząd okręgowy"} headers={tableHeaders} content={tableContent}/>
                </div>
                <div className="col-12 col-md-6 offset-md-1">
                    <h1 className="text-uppercase text-white fs-1 text-center">Kontakt</h1>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card">
                                <i class="bi bi-compass fs-1 text-center"></i>
                                <div class="card-body">
                                    <h3 class="card-title text-center text-uppercase fw-bold">Adres</h3>
                                    <div className="text-center">
                                        <p className="card-text mb-0">ul. Kusocińskiego 47</p>
                                        <p className="card-text">33-300 Nowy Sącz</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card pb-4">
                                <i class="bi bi-telephone fs-1 text-center"></i>
                                <div class="card-body">
                                    <h3 class="card-title text-center text-uppercase fw-bold">Telefon</h3>
                                    <div className="text-center">
                                        <p className="card-text">+48 18 449 04 10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <i class="bi bi-clock fs-1 text-center"></i>
                                <div class="card-body">
                                    <h3 class="card-title text-center text-uppercase fw-bold">Godziny urzędowania</h3>
                                    <div className="text-center">
                                        <p className="card-text mb-0">Poniedziałek - Piątek</p>
                                        <p className="card-text">7.30 - 15.30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}