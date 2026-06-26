import axios from "axios";
import { useEffect, useState } from "react";

function AttendencePercent() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [qrData, setQrData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    

    axios
      .get("https://ems-backend-6-q03r.onrender.com/Employee/Details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);

      })
      .catch((err) => console.log(err));
      
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const selectedDate = date.toISOString().split("T")[0];

    axios
      .get("https://ems-backend-6-q03r.onrender.com/Employee/ByDate", {
        params: {
          date: selectedDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setQrData(response.data.qrData || []);
        setTaskData(response.data.taskData || []);

      })
      .catch((err) => console.log(err));
  }, [date]);

  return (
    <div className="attendance-page">
      <h1 className="attendance-title">
        Employee Details
      </h1>

      <div style={{ marginBottom: "20px" }} className="date-filter">
        <input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </div>

      <div className="attendance-table">
        <div className="attendance-header">
          <h3>ID</h3>
          <h3>Name</h3>
          <h3>Email</h3>
          <h3>Status</h3>
          <h3>Date</h3>
          <h3>Task</h3>
          <h3>Completed <br />Status</h3>
          <h3>Remarks</h3>
        </div>

        {data.map((item) => {
          const attendance = qrData.find(
            (qr) => qr.email === item.email
          );

          const employeeTask = taskData.find(
            (task) => task.employeeid === item.employeeid
          );

          return (
            <div
              className="attendance-row"
              key={item.employeeid}
            >
              <p>{item.employeeid}</p>

              <p>{item.name}</p>

              <p>{item.email}</p>

              <p
                className={
                  attendance ? "present" : "absent"
                }
              >
                {attendance ? "PRESENT" : "ABSENT"}
              </p>

              <p>
                {attendance?.localDate || date.toISOString().split("T")[0]}
              </p>

              <p>
                {employeeTask?.task || "No Task"}
              </p>

              <p>
                {employeeTask?.completedStatus || "-"}
              </p>

              <p>
                {employeeTask?.remarks || "-"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AttendencePercent;