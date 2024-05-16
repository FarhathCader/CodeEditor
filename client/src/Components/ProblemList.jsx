import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';


const ProblemList = () => {
  const [problemList, setProblemList] = useState([]);
  const [name, setName] = useState('');
  const [likes, setLikes] = useState([]);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();


  const fetchData = async () => {
    const res = await fetch('http://localhost:4000/problems');
    const data = await res.json();
    setProblemList(data.problems);
  };





  useEffect(() => {
   fetchData();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:4000/subscribe');
    eventSource.onmessage = function (event) {
      const notification = JSON.parse(event.data);
      setNotification(notification);
      console.log("hehe",notification);
    };
    return () => {
      eventSource.close();
    };
  }, [notification]);
  const addProblem = () => {
    navigate('/addproblem');
  };

  const editProblem = (problem, e) => {
    e.stopPropagation();
    navigate(`/editproblem/${problem._id}`);
  };

 

  const deleteProblem = async (problem, e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`http://localhost:4000/problems/${problem._id}`);
      console.log(response.data.msg);
      fetchData();
    } catch (err) {
      alert(err);
    }
  };

  const onClick = (p) => {
    console.log(p._id);
    navigate(`/problems/${p._id}`);
  };

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
            <th>Action</th>
          </tr>
        </thead>
        {problemList &&
          problemList.map((problem, index) => (
            <tbody key={index}>
              <tr onClick={() => onClick(problem)}>
                <td>{problem.name}</td>
                <td>{problem.category}</td>
                <td>{problem.difficulty}</td>
                <td>{problem.grade}</td>
                <td>
                  <button onClick={(e) => deleteProblem(problem, e)}>Delete</button>
                  <button onClick={(e) => editProblem(problem, e)}>Edit</button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
  
    </>
  );
};

export default ProblemList;
