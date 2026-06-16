import { useEffect } from "react"
import { useNavigate } from "react-router-dom";



function Oauth(){

    const navigate = useNavigate()

    useEffect(() =>{
        const params = new URLSearchParams(window.location.search)
        const token = params.get("token");
         const profileCompleted = params.get("profileCompleted"); 

        if(token){
            localStorage.setItem("token", token)
            console.log(token)

        if (!profileCompleted === "true") {
            navigate("/UserDetails");
          } else {
         navigate("/Users");
           }

        }
        
    },[] )
    
    return<>
    <h1>Logging In...</h1>
</>

}

export default Oauth;