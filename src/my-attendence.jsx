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

        const email = localStorage.getItem("email")
        const token = localStorage.getItem("token")
        const response = await axios.get(`https://ems-backend-6-q03r.onrender.com/Employee/myattendence/${startDate}/${endDate}/${email}`,
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

        


       
    </div>

   {
  qrData.map((qr) => {

    const task = taskData.find(
      t =>
        t.employeeid === qr.employeeid &&
        t.date === qr.localDate
    );

    return (
      <div
        className="attendance-row1"
        key={qr.id}
      >
        <p>{qr.employeeid}</p>

        <p>{qr.name}</p>

        <p>{task?.task || "-"}</p>

        <p>{task?.role || "-"}</p>

        <p>{task?.remarks || "-"}</p>

        <p>{qr.localDate}</p>

        <p>{qr.status}</p>
      </div>
    );
  })
}
</div>
    </>

}

export default Myattendence;