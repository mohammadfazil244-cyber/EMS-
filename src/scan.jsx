import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Scan() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
      .get("http://localhost:8080/Auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true,
      }
    );

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      console.log("Scanned:", decodedText);

      const token = localStorage.getItem("token");
      const sessionId = decodedText.split("/").pop();

      scanner.clear();

      axios
        .get(`http://localhost:8080/Generate/scan/${sessionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Attendance Marked:", res.data);

          alert("Attendance Marked!");

          navigate(`/view-attendence/${sessionId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function onScanError(error) {
      console.log(error);
    }

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [navigate]);

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">
          <h2>EMS</h2>
        </div>

         <button onClick={() => setPop(false)}>
            Close
          </button>
          
        
      </div>

      {/* PROFILE POPUP */}
      {pop && (
        <div className="dropdown">
          <h1>User Details</h1>

          <h2>Id : {user?.id}</h2>

          <h2>User : {user?.name}</h2>

          <h2>Email : {user?.email}</h2>

          <button onClick={() => setPop(false)}>
            Close
          </button>
        </div>
      )}

      {/* SCANNER */}
      <div className="scanner-container">
        <h2 className="scanner-title">
          Scan Attendance QR
        </h2>

        <div id="qr-reader"></div>

        <p className="scanner-text">
          Point your camera at QR code
        </p>
      </div>
    </>
  );
}

export default Scan;