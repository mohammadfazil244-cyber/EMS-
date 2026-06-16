import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Qr() {

  const [qrImage, setQrImage] = useState("");
  const [user, setUser] = useState(null);
  const [pop, setPop] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    

    if(!token){
      return;
    }
    

      axios.get("http://localhost:8080/Auth/profile", {

      headers: {
        Authorization: `Bearer ${token}`
      }

    })
    .then((response) => {

      setUser(response.data);

    })
    .catch((err) => {
      console.log(err);
    });

    

    

    
  }, []);




  const handleProfile = () => {

    setPop(!pop);

  };




  const getQr = (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {

      console.log("NO TOKEN FOUND");
      return;

    }

    axios.post(
      "http://localhost:8080/Generate/Qr",
      {},
      {

        headers: {
          Authorization: `Bearer ${token}`
        },

        responseType: "blob"

      }
    )
    .then((response) => {

      const imageUrl = URL.createObjectURL(response.data);

      setQrImage(imageUrl);

    })
    .catch((err) => {

      console.log(err);

    });

  };





  return (
    <>

      {/* NAVBAR */}
      <div className="navbar-qr">

        {user && (

          <h2
            className="user-avatar-qr"
            onClick={handleProfile}
          >
            {user.name[0].toUpperCase()}
          </h2>

        )}

      </div>




      {/* DROPDOWN */}
      {
        pop && (

          <div className="dropdown-qr">

            <h1>User Details</h1>

            <h2>Id : {user.id}</h2>

            <h2>User : {user.name}</h2>

            <h2>Email : {user.email}</h2>

            <button onClick={() => setPop(false)}>
              X
            </button>

          </div>

        )
      }




      {/* QR SECTION */}
 <div className="qr-container">

  <h1 className="qr-title">
    Generate QR
  </h1>

  <button
    className="qr-button"
    onClick={getQr}
  >
    Click Here
  </button>

</div>




      {
        qrImage && (

          <img
          className="qr-image"
            src={qrImage}
            alt="QR CODE"
          />

        )
      }

    </>
  );
}

export default Qr;