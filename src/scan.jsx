

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Scan() {
    const navigate = useNavigate();


  useEffect(() => {


    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
         fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true
      }
    );

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      console.log("Scanned:", decodedText);

      // Example: send to backend
      const token = localStorage.getItem("token");
      console.log(token)
        const sessionId = decodedText.split("/").pop();


      axios.get(`http://localhost:8080/Generate/scan/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log("Attendance Marked:", res.data);
        alert("Attendance marked!");
        navigate(`/view-attendence/${sessionId}`)
        
      })
      .catch(err => {
        console.log(err);
      });
    }

    function onScanError(err) {
      console.log(err);
    }

    return () => {
      scanner.clear();
    };

  }, []);

 return (
  <div className="scanner-container">

    <h2 className="scanner-title">
      Scan Attendance QR
    </h2>

    <div id="qr-reader"></div>

    <p className="scanner-text">
      Point your camera at QR code
    </p>

  </div>
);
}

export default Scan;