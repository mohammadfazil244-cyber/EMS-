import axios from "axios";
import { useEffect, useState } from "react";


function AddTask(){
    const [employee , setEmployee] = useState("")
    const [role,setRole ] = useState("")
    const [task , setTask] = useState("")
    const [employees , setEmployees] = useState([])
    const [email , setEmail] = useState("")
    const [date ,setDate] = useState(new Date())
    const [employeeid , setemployeeid] = useState("")

    const onChange = (value) => {
      setDate(value)
    }

  const handleUpdate = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `http://localhost:8080/Employee/TaskUpdate/${employeeid}`,
      {
        employee,
        role,
        task,
        email,
        date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedTask = response.data;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeid === employeeid ? updatedTask : emp
      )
    );

    setemployeeid("");

    setEmployee("");
    setEmail("");
    setRole("");
    setTask("");

  } catch (err) {
    console.log(err);
  }
};

const handleEdit = (emp) => {
  setEmployee(emp.employee);
  setEmail(emp.email);
  setRole(emp.role);
  setTask(emp.task);

  setemployeeid(emp.employeeid);
};



    const handleDelete = async(employeeid) => {
      const token = localStorage.getItem("token")

      try{

        await axios.delete("http://localhost:8080/Employee/TaskDelete",
           {
    data: employeeid,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
        )
    setEmployees((prev)=> prev.filter((emp) => emp.employeeid !== employeeid))


      }catch(err){
        console.log(err)
      }
      
    }

    useEffect(() => {
        const token = localStorage.getItem("token")

        axios.get("http://localhost:8080/Employee/AllTasks",
            {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
        ).then((res) => {
            setEmployees(res.data)
        }).catch((err) =>{

            console.log(err)
        })

    } , [])


    const handleSubmit = async() => {
        const token = localStorage.getItem("token")
        try{
         const response = await axios.post(
      "http://localhost:8080/Employee/Task",
      {
        employee,
        role,
        task,
        email,
        date
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    
    
     console.log(response.data);



     

     setEmployees((prev) => [...prev, response.data]);

     
    setEmployee("");
    setEmail("");
    setRole("");
    setTask("");


    }
    catch(err){

        console.log(err)
    }

    } 
    

    
    return<>
<div className="page">
  <div className="card">
    <h1>Add Task</h1>

    <div className="form">
      <input
        type="text"
        placeholder="Employee Name"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
      />

       
      <input
        type="email"
        placeholder="Employee Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <div style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </div>

      {employeeid ? (
  <button onClick={handleUpdate}>Update Task</button>
) : (
  <button onClick={handleSubmit}>Add Task</button>
)}
    </div>

    
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Task</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
  {employees.map((emp) => (
    <tr key={emp.employeeid}>
      <td>{emp.employee}</td>
      <td>{emp.email}</td>
      <td>{emp.role}</td>
      <td>{emp.task}</td>
      <td><button onClick={() =>handleDelete(emp.employeeid)}>❌</button></td>
      <td><button onClick={() => handleEdit(emp)}>✏️</button></td>

    </tr>
  ))}
</tbody>
      </table>
    
  </div>
</div>


    </>
}

export default AddTask;