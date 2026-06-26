import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [pop, setPop] = useState(false);

  const handleProfile = () => {
    setPop(!pop);
  };

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
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAttend = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://ems-backend-6-q03r.onrender.com/Generate/GetAttendence",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/AP", {
        state: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleQr = () => {
    navigate("/QR");
  };

  const handleAbout = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.get("https://ems-backend-6-q03r.onrender.com/Auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/addTask");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  return (
    <>
      {/* Navbar */}
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

      {/* Profile Popup */}
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

      {/* Hero Section */}
      <div className="home-container">

        <div className="home-content">

          <h1>
            Employee Management
            <br />
            System
          </h1>

          <p>
            Manage attendance, generate QR codes,
            assign tasks and track employee activity
            efficiently.
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