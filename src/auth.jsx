import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [name , setName] = useState("")
  const navigate = useNavigate();

  
    const handleGoogle = () => {
      
       

        window.location.href = "http://localhost:8080/oauth2/authorization/google" ;

       
}
  
  
  const clickLogin = () =>{
      navigate("/login")
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
 
 
    try {

       

      if(email && password){

        const response = await axios.post("http://localhost:8080/Auth/Register", {
        email ,
        password,
        name
      });

      const token = localStorage.setItem("token" , response.data.token)
      const role = localStorage.setItem("role" , response.data.role)

      console.log(response.data)
      console.log(response.data.token);
      console.log(response.data.role);
               
    
      
      if(response.data.role === "USER"){
        navigate("/Users")
      }
      }
      
    } catch (error) {
        if(error.response){
            setErrorMsg(error.response.data)
        }
        else{
            setErrorMsg("Server not reachable")
        }
      console.error(error);
    }
  };

  return (
    <>
    
      <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>

        <input
          className="auth-input"
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="auth-btn" onClick={handleSubmit}>
          Register
        </button>

        {errorMsg && <p className="error-text">{errorMsg}</p>}

        <button className="auth-btn" onClick={clickLogin}>
          Already Registered? Login
        </button>

        <button className="google-btn" onClick={handleGoogle}>
          Continue With Google
        </button>
      </div>
    </div>
    </>
    
  );
}

export default Register;