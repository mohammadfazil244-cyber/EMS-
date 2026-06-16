
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";





function UserPage(){
     const navigate = useNavigate()
    const [user , setUser] = useState(null)
    const [pop , setPop] = useState(false)

   useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("TOKEN =", token);
    axios.get("http://localhost:8080/Auth/profile" , {
      
        headers: {
          Authorization : `Bearer ${token}`
        }

      
    })
    .then((response) => {
      console.log(response.data)

      setUser(response.data)

    const employeeid = localStorage.setItem("employeeid" , response.data.employeeid)

    })

   },[])


   const handleProfile = () =>{

    setPop(true)
        
   }
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

    navigate("/my-attendence")

   } catch(error){

      console.log(error)

   }
}
    const handleQr = async() =>{

      
        navigate("/scan")
      


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
          
        navigate("/about")

        }catch(error){
            console.error(error)
            if (error.response?.status === 401) {
                alert("Session expired, please login again");
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
       
    }
    return<>
   

    <div className="navbar">

      <div className="logo">
        <h2>EMS</h2>
      </div>

      {
        user && (
          <h2
            className="user-avatar"
            onClick={handleProfile}
          >
            {user.name[0].toUpperCase()}
          </h2>
        )
      }

    </div>



    {/* PROFILE DROPDOWN */}
    {
      pop && (
        <div className="dropdown">

          <h1>Employee Details</h1>

          <h2>Emp-id : {user.employeeid}</h2>



          <h2>Employee : {user.name}</h2>

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
          Manage attendance, Assign, generate QR codes,
          and track Employee activity efficiently.
        </p>

        <div className="home-buttons">

          <button onClick={handleQr}>
            SCAN QR
          </button>

          <button onClick={handleAttend}>
            MY ATTENDANCE
          </button>

          <button onClick={handleAbout}>
            ABOUT
          </button>

        </div>

      </div>

    </div>
    </>

}

export default UserPage;