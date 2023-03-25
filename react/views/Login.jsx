import { Link } from "react-router-dom"
export default function Login(){
    const onSumbit= (e) =>{
        e.preventDefault()
    }
    return(
        <div className="login-signup-form animated fadeInDown">      
            <div className="form">
                <form onSubmit={onSumbit}>
                    <h1 className="title">Log into your account</h1>
                    <input type="email" placeholder="Email" />
                    <input type="passsword" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/Signup">Create an account</Link>
                    </p>
                </form>
            </div>
             <p className="message" style={{"margin":"50px"},{"width":"350px"}}>Wchodzisz w \react\context\ContextProvider.jsx i w linii 14 wpisujesz cokolwiek w te nawiasy okrągłe - wtedy cię loguje</p>   
        </div>
       
    )
}