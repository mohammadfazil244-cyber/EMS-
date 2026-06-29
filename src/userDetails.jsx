import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDetails(){

    const[name , setName] = useState("")
    const [password ,setPassword] = useState("")
    const navigate = useNavigate()
    

   const handleRegisterGoogle = async() => {

    try {

        const token = localStorage.getItem("token");



       const response = await axios.put(
            "https://ems-backend-6-q03r.onrender.com/Auth/completeProfile",
            {
                name,
                password,

            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        navigate("/Users");

        console.log(response.data)
    
    } catch(error){
        console.log(error);
        if(error.response.status === 409){
            alert("USER ALREADY EXIST")
            navigate("/login")
        }
    }


        

    }

    return<>
   <div className="profile-container">

  <div className="profile-card">

    <h1 className="profile-title">
      COMPLETE YOUR PROFILE
    </h1>

    <input
      className="profile-input"
      type="text"
      placeholder="Username"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <input
      className="profile-input"
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      className="profile-btn"
      onClick={handleRegisterGoogle}
    >
      Submit
    </button>

  </div>

</div>
    </>

}

export default UserDetails;