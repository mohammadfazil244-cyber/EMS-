import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Home(){
    const navigate = useNavigate()
    const [user , setUser] = useState(null)
    const [pop , setPop] = useState(false)

   useEffect(() => {
    const token = localStorage.getItem("token")
    
    if(!token){
      return;
    }
    
      
       console.log("TOKEN =", token);
    axios.get("http://localhost:8080/Auth/profile" , {
      
        headers: {
          Authorization : `Bearer ${token}`
        }

      
    })
    .then((response) => {
      console.log(response.data)

      setUser(response.data)
    })

    
   

   },[])


 
   const handleAttend = async () => {

   try{

      const token = localStorage.getItem("token")

      const response = await axios.get(
         "http://localhost:8080/Generate/GetAttendence",
         {
            headers:{
               Authorization:`Bearer ${token}`
            }
         }
      )

      localStorage.setItem("response",response.data)

      console.log(response.data)

      navigate("/AP" , {
         state: response.data
      })

   } catch(error){

      console.log(error)

   }
}
    const handleQr = async() =>{

      
        navigate("/QR")
      


    }
    
    const handleAbout = async(e) =>{
        e.preventDefault();

        
        try{

            const token = localStorage.getItem("token");

           const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

            const AboutResponse = await axios.get("http://localhost:8080/Auth/users" , config)
          
            console.log( AboutResponse.data)
          
        navigate("/addTask")

        }catch(error){
            console.error(error)
            if (error.response?.status === 401) {
                alert("Session expired, please login again");
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
       
    }
 return (
  <>

    {/* NAVBAR */}
    <div className="navbar">

      <div className="logo">
        <h2>EMS</h2>
      </div>

      

    </div>



    {/* PROFILE DROPDOWN */}
    {
      pop && (
        <div className="dropdown">

          <h1>User Details</h1>

          <h2>Id : {user.id}</h2>

          <h2>User : {user.name}</h2>

          <h2>Email : {user.email}</h2>

          <button onClick={() => setPop(false)}>
            Close
          </button>

        </div>
      )
    }



    {/* HOME SECTION */}
    <div className="home-container">

      <div className="home-content">

        <h1>
          Employee Management System
        </h1>

        <p>
          Manage attendance, generate QR codes, assign tasks
          and track employee activity efficiently.
        </p>

        <div className="home-buttons">

          <button onClick={handleQr}>
            GENERATE QR
          </button>

          <button onClick={handleAbout}>
            ADD TASK
          </button>

          <button onClick={handleAttend}>
            EMPLOYEE DETAILS
          </button>

        </div>

      </div>

    </div>

  </>
);
}

export default Home;