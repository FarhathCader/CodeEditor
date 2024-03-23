import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';


export default function ProblemList() {

  const [problemList,setProblemList] = useState([])  
const navigate = useNavigate();



  useEffect( () => {

const fetchData = async()=> {
  const res =   await fetch('http://localhost:4000/problems');
  const data =  await res.json();
  setProblemList(data.problems);
}
fetchData();
 
  }

    ,[])

    const addProblem = ()=>{  
        navigate('/addproblem')
    }

const onClick = async(p)=>{
    console.log(p._id)
    navigate(`/problems/${p._id}`)
}
  return (
    <>  
        <button onClick={addProblem}>Add a Problem</button>
            <table>


<thead>
<tr>
<th>Problem Name</th>
<th>Category</th>
<th>Difficulty</th>
<th>Grade</th>
</tr>
</thead>

      
{ problemList && 
    problemList.map((problem,index)=>{
        return (
            <tbody key={index}>
       <tr   onClick={()=> {onClick(problem)}}>
            <td>{problem.name}</td>
            <td>{problem.category}</td>
            <td>{problem.difficulty}</td>
            <td>{problem.grade}</td>
            </tr>
            </tbody>
     
       
        )

    }

    )

    } 

</table>
    </>

  )
}
