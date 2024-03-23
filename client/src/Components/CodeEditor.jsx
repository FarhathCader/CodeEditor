import React from 'react'
import { useParams } from 'react-router-dom'
import { useState ,useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import CodingEditor from './CodingEditor';
import axios from 'axios';


export default function CodeEditor() {

    const {id} = useParams();
    const [problem,setProblem] = useState({});

    useEffect( () => {
        const fetchData = async()=> {
            const res =   await fetch(`http://localhost:4000/problems/${id}`);
            const data =  await res.json();
            setProblem(data.problem);

            
        }
        fetchData();

        return async () =>  {
            try{
            const response = await axios.patch(`http://localhost:4000/problems/${id}`,{
                initialCode : localStorage.getItem(`${localStorage.getItem('selectedLanguage')}`),
                programmingLanguage : localStorage.getItem('selectedLanguage')

            }
            )
            console.log(response);
        }catch(err){
            console.log(err);
        };
    }
},[])
  return (
    <div className='container'>
        <div className='box'>
            <div>
                <p>category : {problem.category}</p>
                <p>difficulty : {problem.difficulty}</p>
            </div>
            <h3>{problem.name}</h3>
            <div>
            <p>{problem.description}</p>

            </div>
        </div>
        <div className = 'box2'>
            
     
        {problem && (
    <CodingEditor initialCode={problem.initialCode} pLanguage={problem.programmingLanguage} />
  )}
         
             </div>
      
    </div>
  )
}
