
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleGoogle = () => {
        
        window.location.href = "http://localhost:8080/oauth2/authorization/google" ;





 
        
}
 
    

    const handleLogin = async (e) => {


          e.preventDefault();

          
        try{

           if(!email || !password){
        alert("please enter email & password")
        }

          
        if(email && password){

           const response = await (axios.post("http://localhost:8080/Auth/login",{
               email,
               password


            }))
        
            console.log(response.data)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role" , response.data.role)

            if(response.data.token && response.data.role === "USER"){
              navigate("/Users")
            }

            if(response.data.token && response.data.role === "ADMIN"){
              navigate("/home")
            }

            

            }

           

           
        }catch(error){
          if(error.response.status === 404){
              alert("Provide Correct Email & password")
              
            }
            console.log(error , "User illada Register")
        }

    }
    

    return<>
     <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <input
          className="auth-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <button className="google-btn" onClick={handleGoogle}>
          Continue With Google
        </button>
      </div>
    </div>
    </>
}

export default Login;