import { useNavigate } from "react-router-dom";
import './navbar.css';
import logo from "./logo.png"


function Info(){
    const navigate = useNavigate()

    const handleinfo= () =>{

        navigate("/signup")

    }

    const handleLog = () =>{

        navigate("/login")

    }

    return<>
    <nav className="navbar">

         <div className="logo">
            <img src={logo} alt="Logo" />
        <h2>EMS</h2>

       
      </div>
    <div className="nav-buttons">
        <button onClick={handleLog} className="login-btn">Login</button>
        <button onClick={handleinfo} className="signup-btn">Sign-Up</button>
    </div>

    </nav>
    
    </>
}

export default Info;