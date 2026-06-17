import axios from "axios";
import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";


function ViewAttendence() {
    const token = localStorage.getItem("token");

    const [data, setData] = useState(null);
    const [task, setTask] = useState([]);
    const [taskStatus , setTaskstatus] = useState("")
    const [remarks , setRemarks] = useState("");
    const { sessionId } = useParams();

   const called = useRef(false);

   const handleStatus = () => {


      axios.post("http://localhost:8080/Employee/UpdateStatus" ,

              {
                email: data.email,
                employee: data.name,
                completedStatus: taskStatus,
                remarks: remarks
        },
        
        {
            headers:{
                Authorization: `Bearer ${token}`,
            } ,
         
        }
    )
    

    alert("SUBMITTED")

   }

   
useEffect(() => {
    if (!sessionId) return;
    if (called.current) return;

    called.current = true;

    
    axios.get("http://localhost:8080/Employee/Details" ,
        {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
    ).then((res) => {
        setTask(res.data)
        console.log(res.data)
    })
    axios
        .get(`http://localhost:8080/Generate/scan/${sessionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setData(response.data);

            const voice = new SpeechSynthesisUtterance("Attendance Marked");
            voice.rate = 1;
            voice.pitch = 1;
            window.speechSynthesis.speak(voice);
        })
        .catch(console.log);

}, [sessionId]);

return (
    <div className="success-page">
        <div className="success-card">

            <div className="success-icon">
                <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                >
                    <circle
                        className="checkmark-circle"
                        cx="26"
                        cy="26"
                        r="25"
                    />

                    <path
                        className="checkmark-check"
                        d="M14 27l7 7 17-17"
                    />
                </svg>
            </div>

            <h1>Attendance Marked</h1>

            <p className="success-status">
                {data?.status} • {data?.localDate}
            </p>

            <div className="success-employee-card">
                <h2>{data?.name}</h2>
                <span>{data?.email}</span>
            </div>

            <div>
                {
                    data?.attendencestatus === "OUT" &&(
                        <>
                         
                            <input
  className="remarks-input"
  type="text"
  placeholder="REMARKS"
  value={remarks}
  onChange={(e) => setRemarks(e.target.value)}
/>

<select
  className="status-select"
  value={taskStatus}
  onChange={(e) => setTaskstatus(e.target.value)}
>
  <option value="NOT_COMPLETED">NOT COMPLETED</option>
  <option value="COMPLETED">COMPLETED</option>
</select>
             <button onClick={handleStatus} className="btn-viewattendence">Submit</button>
                
                        </>
                    )

                    
                   
                }
               
                
            </div>

            <div className="success-task-card">
                <h3>Today's Task</h3>

                {task
                    ?.filter(
                        (item) => item.email === data?.email
                    )
                    .map((item) => (
                        <div
                            className="task-item"
                            key={item.id}
                        >
                            <h4>{item.role}</h4>

                            <p>
                                {item.task ||
                                    "No Task Assigned"}
                            </p>

                            

                        
                        </div>
                    ))}

                {task?.filter(
                    (item) => item.email === data?.email
                ).length === 0 && (
                    <p>No Task Assigned</p>
                )}
            </div>

        </div>
    </div>
);


}

export default ViewAttendence;