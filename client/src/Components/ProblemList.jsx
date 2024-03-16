import React, { useEffect, useState } from 'react'

export default function ProblemList() {

  const [problemList,setProblemList] = useState([])  

  useEffect( () => {

const fetchData = async()=> {
  const res =   await fetch('http://localhost:4000/problems');
  const data =  await res.json();
  setProblemList(data.problems);
}
fetchData();
 
  }

    ,[])


  return (
        <table>

<tr>
<th>Problem Name</th>
<th>Category</th>
<th>Difficulty</th>
<th>Grade</th>
</tr>
      
{ problemList && 
    problemList.map((problem,index)=>{
        return (
            <tr key={index}>
            <td>{problem.name}</td>
            <td>{problem.category}</td>
            <td>{problem.difficulty}</td>
            <td>{problem.grade}</td>
            </tr>
        )

    }

    )

    } 

</table>
  )
}
