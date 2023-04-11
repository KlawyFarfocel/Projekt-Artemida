import "./css/Permissions.css"
export default function Permissions(){
    const prop=[//To jak to nazwiesz to najmniejszy problem
        [
            {"Typ zezwolenia": "Polowania indywidualne"},
            {"Organ wydający": "Komisja policji w Wałbrzychu"},
            {"Numer zezwolenia":"121/bogu/rodzica/dziewica"},
            {"Data uzyskania": "12.02.2002"},
            {"Wygasa": "19.09.2023"}
        ],
        [
            {"Typ zezwolenia": "Polowania indywidualne"},
            {"Organ wydający": "Komisja policji w Wałbrzychu"},
            {"Numer zezwolenia":"121/bogu/rodzica/dziewica"},
            {"Data uzyskania": "12.02.2002"},
            {"Wygasa": "19.09.2023"}
        ],
        [
            {"Typ zezwolenia": "Polowania indywidualne"},
            {"Organ wydający": "Komisja policji w Wałbrzychu"},
            {"Numer zezwolenia":"121/bogu/rodzica/dziewica"},
            {"Data uzyskania": "12.02.2002"},
            {"Wygasa": "19.09.2023"}
        ],
        [
            {"Typ zezwolenia": "Polowania indywidualne"},
            {"Organ wydający": "Komisja policji w Wałbrzychu"},
            {"Numer zezwolenia":"121/bogu/rodzica/dziewica"},
            {"Data uzyskania": "12.02.2002"},
            {"Wygasa": "19.09.2023"}
        ],
        [
            {"Typ zezwolenia": "Polowania indywidualne"},
            {"Organ wydający": "Komisja policji w Wałbrzychu"},
            {"Numer zezwolenia":"121/bogu/rodzica/dziewica"},
            {"Data uzyskania": "12.02.2002"},
            {"Wygasa": "19.09.2023"}
        ],
        [
            {"Typ zezwolenia": "Polowania indywidualne"},
            {"Organ wydający": "Komisja policji w Wałbrzychu"},
            {"Numer zezwolenia":"121/bogu/rodzica/dziewica"},
            {"Data uzyskania": "12.02.2002"},
            {"Wygasa": "19.09.2023"}
        ],        [
            {"Typ zezwolenia": "Polowania indywidualne"},
            {"Organ wydający": "Komisja policji w Wałbrzychu"},
            {"Numer zezwolenia":"121/bogu/rodzica/dziewica"},
            {"Data uzyskania": "12.02.2002"},
            {"Wygasa": "19.09.2023"}
        ],

    ]
    return(
       
        <div className="container w-50 h-100 mx-auto d-flex flex-column align-items-center justify-content-center ">
            <h1 className="mb-5 shadow-md p-1 mb-2  rounded fs-1 text-uppercase fw-bold text-white">Twoje uprawnienia</h1>
            <table className="table table-bordered table-dark table-striped table-hover">
                <thead>
                    <tr>
                        <td>Typ zezwolenia</td>
                        <td>Organ wydający</td>
                        <td>Numer zezwolenia</td>
                        <td>Data uzyskania</td>
                        <td>Wygasa</td>
                    </tr>
                </thead>
                        <tbody>
                            {prop.map((value,key)=>
                                     <tr>
                                        <td>{value[0][Object.keys(value[0])]}</td>
                                        <td>{value[1][Object.keys(value[1])]}</td>
                                        <td>{value[2][Object.keys(value[2])]}</td>
                                        <td>{value[3][Object.keys(value[3])]}</td>
                                        <td>{value[4][Object.keys(value[4])]}</td>
                                    </tr>
                            )}
                        </tbody>
            </table>
            <a className="btn btn-success w-50">Złóż wniosek o przyznanie uprawnienia</a>
        </div>
    )
}