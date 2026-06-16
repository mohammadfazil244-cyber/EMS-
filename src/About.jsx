function About() {
  return (
  <div className="about-page">

    <h1>About EMS</h1>

    <p>
        Employee Management System is a web application
        built to simplify attendance tracking, task
        assignment, and employee management through
        QR-based authentication.
    </p>

    <div className="features">

        <div>
            <h3>QR Attendance</h3>
            <p>
                Employees can scan QR codes to mark
                attendance securely.
            </p>
        </div>

        <div>
            <h3>Task Assignment</h3>
            <p>
                Assign and monitor daily employee tasks.
            </p>
        </div>

        <div>
            <h3>Role Based Access</h3>
            <p>
                Separate dashboards for Admin and Users.
            </p>
        </div>

        <div>
            <h3>JWT Security</h3>
            <p>
                Secure authentication using JWT tokens.
            </p>
        </div>

    </div>

    <div className="tech-stack">
        <span>React</span>
        <span>Spring Boot</span>
        <span>MySQL</span>
        <span>JWT</span>
    </div>

</div>
  );
}

export default About;