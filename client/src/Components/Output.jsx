import React, { useEffect } from 'react'
import { executeCode } from '../api';
import { useState } from 'react';

export default function Output(props) {

    const {value,language} = props;
    const [output,setOutput] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    
    const runCode = async ()=>{
        const sourceCode = value;
        if(!sourceCode) return;
        try{
            setIsLoading(true);
            const response = await executeCode(sourceCode,language);
            console.log(response);
            if(response.run.stderr) {

              
                console.log(response.run.output)
                setOutput("Error : "+response.run.output)
                
            }
            else setOutput(response.run.output.split('\n'));
            

        }catch(error){
            setOutput('Internal Error : '+error.response.data.message)
           
        }
        finally{
            setIsLoading(false);
        }
    }



    useEffect(() => {
        // Reset output when editorRef changes
        setOutput('');
    }, [value,language]);

  return (
    <div className='code-output'>
      <div className='output-btn'>
        <button onClick={runCode}>RUN</button>
        <button>SUBMIT</button>
      </div>
    <div className='result'>
        {output && !isLoading && 
    
            output.map((line,index) => <p key={index}>{line}</p>)
       
        }
        {isLoading && <p>Running...</p>}
    </div>

    </div>
  )
}
