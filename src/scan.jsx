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
      .get("https://ems-backend-6-q03r.onrender.com/Auth/profile", {
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
        .get(
          `https://ems-backend-6-q03r.onrender.com/Generate/scan/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
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

        <div
          className="user-avatar"
          onClick={() => setPop(!pop)}
        >
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

      </div>

      {/* PROFILE POPUP */}
      {pop && (
        <div className="dropdown">

          <h3>User Details</h3>

          <p>
            <strong>ID:</strong> {user?.id}
          </p>

          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <button
            className="close-btn"
            onClick={() => setPop(false)}
          >
            Close
          </button>

        </div>
      )}

      {/* QR SCANNER */}
      <div className="scanner-container">

        <h1 className="scanner-title">
          Scan Attendance QR
        </h1>

        <div id="qr-reader"></div>

        <p className="scanner-text">
          Point your camera at the QR code
        </p>

      </div>
    </>
  );
}

export default Scan;