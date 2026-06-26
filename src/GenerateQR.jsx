import axios from "axios";
import { useEffect, useState } from "react";

function Qr() {
  const [qrImage, setQrImage] = useState("");
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
    return () => {
      if (qrImage) {
        URL.revokeObjectURL(qrImage);
      }
    };
  }, [qrImage]);

  const handleProfile = () => {
    setPop(!pop);
  };

  const getQr = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found");
        return;
      }

      const response = await axios.post(
        "https://ems-backend-6-q03r.onrender.com/Generate/Qr",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);

      setQrImage(imageUrl);
    } catch (err) {
      console.log(err);
      alert("Failed to generate QR");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">

        <div className="logo">
          <h2>EMS</h2>
        </div>

        {user && (
          <div
            className="user-avatar"
            onClick={handleProfile}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

      </div>

      {/* PROFILE DROPDOWN */}
      {pop && (
        <div className="dropdown">

          <h3>User Details</h3>

          <p>
            <strong>ID :</strong> {user?.id}
          </p>

          <p>
            <strong>Name :</strong> {user?.name}
          </p>

          <p>
            <strong>Email :</strong> {user?.email}
          </p>

          <button
            className="close-btn"
            onClick={() => setPop(false)}
          >
            Close
          </button>

        </div>
      )}

      {/* QR SECTION */}
      <div className="qr-container">

        <div className="qr-card">

          <h1 className="qr-title">
            Generate Attendance QR
          </h1>

          <p className="qr-subtitle">
            Click the button below to generate
            a new attendance QR code.
          </p>

          <button
            className="qr-button"
            onClick={getQr}
          >
            Generate QR
          </button>

          {qrImage && (
            <div className="qr-image-wrapper">

              <img
                src={qrImage}
                alt="QR Code"
                className="qr-image"
              />

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Qr;