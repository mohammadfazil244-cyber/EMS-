import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import stock1 from "./stock1.png";
import stock2 from "./stock2.png";
import stock3 from "./stock3.png";
import "./navbar.css";

function Info() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-section">
          <div className="logo-wrapper">
            <img src={logo} alt="EMS Logo" className="app-logo" />
          </div>
          <span className="brand-name">EMS</span>
        </div>
        <div className="nav-actions">
          <button className="btn-secondary" onClick={() => navigate("/login")}>Login</button>
          <button className="btn-primary" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero-section">
        <h1 className="hero-title">
          Smart Employee <br />
          <span>Management System</span>
        </h1>
        <p className="hero-subtitle">
          Manage attendance, track tasks, and supercharge team productivity in one clean, unified dashboard.
        </p>
        <button className="btn-cta" onClick={() => navigate("/signup")}>
          Get Started for Free
        </button>
      </header>

      {/* FEATURE PREVIEW GRID */}
      <section className="preview-section">
        <div className="preview-grid">
          <div className="preview-card">
            <div className="img-frame">
              <img src={stock1} alt="Scan QR Feature" />
            </div>
            <h3>Scan Attendance</h3>
            <p>Seamless touchless check-ins using dynamic QR codes.</p>
          </div>
          <div className="preview-card">
            <div className="img-frame">
              <img src={stock2} alt="Task Management" />
            </div>
            <h3>Task Assignment</h3>
            <p>Assign tasks, monitor roles, and manage operations in real-time.</p>
          </div>
          <div className="preview-card">
            <div className="img-frame">
              <img src={stock3} alt="QR Generation" />
            </div>
            <h3>Generate QR Codes</h3>
            <p>Instantly spawn secure attendance codes for your workforce.</p>
          </div>
        </div>
      </section>

      {/* FOOTER (Fixes the unfinished feel) */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-wrapper subtle">
              <img src={logo} alt="EMS Logo" className="app-logo" />
            </div>
            <span>EMS</span>
          </div>
          <p className="footer-credits">© 2026 EMS Platforms Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Info;