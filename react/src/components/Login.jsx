import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
export default function Login(){
  const { setCurrentUser, setUserToken } = useStateContext();
  const [legitymacja, setLegitymacja] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });
  function onSubmit(ev){
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/login", {
        legitymacja,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response.data.error=="Wrong data") {
          setError({ __html: "Podano błędne dane. Sprawdź poprawność danych"});
        }
        //
      });
  }
    return(
<section className="gradient-custom w-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4">

              <h2 className="fw-bold mb-2 text-uppercase">zaloguj się</h2>
              <p className="text-white-50">Zaloguj się przy użyciu numeru legitymacji i hasła</p>
              {error.__html && (
                <div
                  className="alert alert-danger"
                  dangerouslySetInnerHTML={{ __html: error.__html }}
                ></div>
              )}
              <form onSubmit={onSubmit}>
              <div className="form-outline form-white mb-4">

              <label className="form-label" htmlFor="typeEmailX">Numer legitymacji</label>
              <input type="text" id="typeEmailX" value={legitymacja} onChange={(ev) => setLegitymacja(ev.target.value)} className="form-control form-control-lg" /> 
              </div>

              <div className="form-outline form-white mb-4">
              <label className="form-label" htmlFor="typePasswordX">Hasło</label>
              <input type="password" id="typePasswordX" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control form-control-lg" />
              </div>
              <button className="btn btn-outline-light btn-lg px-5" type="submit">Zaloguj się</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}