import { useState } from "react";
import axios from "axios";


function Myattendence(){
    const [firstDate,setFirstDate] = useState(new Date())
    const [secondDate,setSecondDate] = useState(new Date())
    const [taskData,setTaskData] = useState([])
    const [qrData,setqrData] = useState([])


    const handleSearch = async() => {
 
      const startDate = firstDate.toISOString().split("T")[0];
      const endDate = secondDate.toISOString().split("T")[0];

      try{

        const employeeid = localStorage.getItem("employeeid")
        const token = localStorage.getItem("token")
        const response = await axios.get(`http://localhost:8080/Employee/myattendence/${startDate}/${endDate}/${employeeid}`,
          {
          headers: {
          Authorization: `Bearer ${token}`,
        }
          }  
        )
        
        console.log(response.data);
        setTaskData(response.data.taskData)
        setqrData(response.data.qrData)

      } 
      catch(err){

        console.log(err.response?.data)
        console.log(err.response?.status)


      }
      
    
    }
                                         
    return <>
    <div className="myattendance-container">

    <h1 className="myattendance-title">
        My Attendance
    </h1>

    <div className="date-filter">

        <input
            type="date"
            value={firstDate.toISOString().split("T")[0]}
            onChange={(e)=>
                setFirstDate(new Date(e.target.value))
            }
        />

        <input
            type="date"
            value={secondDate.toISOString().split("T")[0]}
            onChange={(e)=>
                setSecondDate(new Date(e.target.value))
            }
        />

       <button
        className="attendance-search-btn"
        onClick={handleSearch}
          >
       Search
      </button>

    </div>

    <div className="attendance-table1">

        <div className="attendance-header1">

            <h4>ID</h4>
            <h4>Name</h4>
            <h4>Task</h4>
            <h4>Role</h4>
            <h4>Remarks</h4>
            <h4>Date</h4>
            <h4>Status</h4>
            

        </div>

        {taskData.map((task,index) => (

            <div
                className="attendance-row1"
                key={task.employeeid}
            >

                <p>{task.employeeid}</p>

                <p>{task.employee}</p>

                <p>{task.task}</p>

                <p>{task.role}</p>

                <p>{task.remarks || "-"} </p>

                <p>{task.date}</p>

                <p
                    className={
                        qrData[index]?.status === "PRESENT"
                        ? "present"
                        : "absent"

                    }
                >
                    {qrData[index]?.status || "ABSENT"}
                </p>

            </div>

        ))}

    </div>

</div>
    </>

}

export default Myattendence;