// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import CodeEditor from './CodeEditor';
// import CodingEditor from './CodingEditor';
// import { CODE_SNIPPETS } from '../constants';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

// const AddProblem = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     difficulty: '',
//     category: '',
//     description: '',
//     initialCode: [
//       {language : "javascript", code : CODE_SNIPPETS['javascript']},
//       {language : "python", code : CODE_SNIPPETS['python']},
//       {language : "java", code : CODE_SNIPPETS['java']},
//       {language : "cpp", code : CODE_SNIPPETS['cpp']},
//       {language : "c", code : CODE_SNIPPETS['c']},
//       {language : "csharp", code : CODE_SNIPPETS['csharp']},
//     ]
//     ,
//     testCases: [[]],
//     grade: 0,
//   });
//   const { id } = useParams();
//   const navigate = useNavigate()
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     if (id) {
//       fetchProblemDetails(id);
//     }
//   }, [id]);

//   const fetchProblemDetails = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/problems/${id}`);
//       const problem = response.data.problem;
//       setFormData({
//         name: problem.name,
//         difficulty: problem.difficulty,
//         category: problem.category,
//         description: problem.description,
//         initialCode: problem.initialCode,
//         testCases: problem.testCases,
//         grade: problem.grade,
//       });
//     } catch (error) {
//       console.error('Error fetching problem details:', error);
//     }
//   };
//   useEffect(() => {
    
//     if(localStorage.getItem('codes')){
//       console.log("rerender",JSON.parse(localStorage.getItem('codes')))
//       setFormData({...formData, initialCode :JSON.parse(localStorage.getItem('codes'))});

//     }
//   }, []);


//   const updateInitialCode = (newInitialCode) => {
//     setFormData({
//       ...formData,
//       initialCode: newInitialCode
//     });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(!formData.name){
//       toast.error('Name is required');
//       return;
//     }
//     if(!formData.difficulty){
//       toast.error('Difficulty is required');
//       return;
//     }
//     if(!formData.category){
//       toast.error('Category is required');
//       return;
//     }
//     if(!formData.description){
//       toast.error('Description is required');
//       return;
//     }
//     if(!formData.grade){
//       toast.error('Grade is required');
//       return;
//     }
//     const url = id ? `http://localhost:4000/problems/${id}` : 'http://localhost:4000/problems';
//     const method = id ? 'PUT' : 'POST';

//     try {
//       await axios({
//         method: method,
//         url: url,
//         data: formData,
//       });
//       toast.success(`${id ? 'Problem updated' : 'Problem added'} successfully!`);
//       localStorage.clear();
//       navigate('/');
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error(`Error ${id ? 'updating' : 'adding'} problem. Please try again.`);
//     }
    
//     // try {
//     //   // setFormData({...formData, initialCode : JSON.parse(localStorage.getItem('codes'))});
//     //   await axios.post('http://localhost:4000/problems', formData);
//     //   alert('Problem added successfully!');
//     //   localStorage.clear()
//     //   // Clear form data after successful submission
//     //   setFormData({
//     //     name: '',
//     //     difficulty: '',
//     //     category: '',
//     //     description: '',
//     //     initialCode: [{ code: '', language: '' }],
//     //     testCases: [[]],
//     //     grade: 0,
//     //   });
//     //   navigate('/')
//     // } catch (error) {
//     //   console.error('Error adding problem:', error);
//     //   alert('Error adding problem. Please try again.');
//     // }
//   };



//   return (
//     <div>
//       <h2>{id ? 'Edit Problem' : 'Add Problem'}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Difficulty:</label>
//           <input type="text" name="difficulty" value={formData.difficulty} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Category:</label>
//           <input type="text" name="category" value={formData.category} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea name="description" value={formData.description} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Initial Code:</label>
          
   
//             <CodingEditor   onUpdateInitialCode={updateInitialCode} initialCode = {formData.initialCode}/>     

//         </div>
//         <div>
//           <label>Test Cases:</label>
//           {/* Add input fields for test cases */}
//         </div>
//         <div>
//           <label>Grade:</label>
//           <input type="number" name="grade" value={formData.grade} onChange={handleChange} required />
//         </div>
//         <button type="submit">{id ? 'Update Problem' : 'Add Problem'}</button>
//       </form>
//       <ToastContainer
//     position="top-right"
//     autoClose={500}
//     hideProgressBar={false}
//     newestOnTop={false}
//     closeOnClick
//     rtl={false}
//     pauseOnFocusLoss
//     draggable
//     pauseOnHover
//     theme="light"
//   />

//       {/* {formData.initialCode.length > 0 && 
//       <table>
//         <tbody>
//         <tr>
//             <th>Code</th>
//             <th>Language</th>
//             <th>Action</th>
//         </tr>
//         </tbody>
      

//         {formData.initialCode.map(
//             (code, index) => (
//                 <tbody key={index}>
//      <tr >
//                   <td>
//                         {code.code}
//                   </td>
//                   <td>
//                         {code.language}
//                   </td>
//                   <td>
//                     <button type="button" onClick={() => handleEditCode(index)}>Edit</button>
//                     <button type="button" onClick={() => handleDeleteInitialCode(index)}>Delete</button>
//                   </td>
//                 </tr>
//                 </tbody>
           
//         )
//     )}
//         </table>} */}
//     </div>
//   );
// };

// export default AddProblem;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeEditor from './CodeEditor';
import CodingEditor from './CodingEditor';
import { CODE_SNIPPETS } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AddProblem = () => {
  const [formData, setFormData] = useState({
    name: '',
    difficulty: '',
    category: '',
    description: '',
    initialCode: [
      { language: "javascript", code: CODE_SNIPPETS['javascript'] },
      { language: "python", code: CODE_SNIPPETS['python'] },
      { language: "java", code: CODE_SNIPPETS['java'] },
      { language: "cpp", code: CODE_SNIPPETS['cpp'] },
      { language: "c", code: CODE_SNIPPETS['c'] },
      { language: "csharp", code: CODE_SNIPPETS['csharp'] },
    ],
    testCases: [],
    grade: 0,
    examples: []
  });
  const { id } = useParams();
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleExampleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExamples = [...formData.examples];
    updatedExamples[index][name] = value;
    setFormData({
      ...formData,
      examples: updatedExamples
    });
  };



  const addExample = () => {
    setFormData({
      ...formData,
      examples: [...formData.examples, { input: '', output: '', explanation: '' }]
    });
  };

  const removeExample = (index) => {
    const updatedExamples = [...formData.examples];
    updatedExamples.splice(index, 1);
    setFormData({
      ...formData,
      examples: updatedExamples
    });
  };

  

  const handleTestCaseChange = (e, index, field) => {
    const { value } = e.target;
    const updatedTestCases = [...formData.testCases];
    updatedTestCases[index][field] = value;
    console.log(updatedTestCases[index])
    setFormData({
      ...formData,
      testCases: updatedTestCases
    });
  };
  
  const handleCheckboxChange = (e, index) => {
    const { checked } = e.target;
    const updatedTestCases = [...formData.testCases];
    updatedTestCases[index].isSample = checked;
    setFormData({
      ...formData,
      testCases: updatedTestCases
    });
  };
  
  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', expectedOutput: '', isSample: false, weight: 0 }]
    });
  };
  
  const removeTestCase = (index) => {
    const updatedTestCases = [...formData.testCases];
    updatedTestCases.splice(index, 1);
    setFormData({
      ...formData,
      testCases: updatedTestCases
    });
  };
  

  useEffect(() => {
    if (id) {
      fetchProblemDetails(id);
    }
  }, [id]);

  const fetchProblemDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/problems/${id}`);
      const problem = response.data.problem;
      setFormData({
        name: problem.name,
        difficulty: problem.difficulty,
        category: problem.category,
        description: problem.description,
        initialCode: problem.initialCode,
        testCases: problem.testCases,
        grade: problem.grade,
        examples: problem.examples || [] // Ensure examples exist before setting
      });
    } catch (error) {
      console.error('Error fetching problem details:', error);
    }
  };
    useEffect(() => {
    
    if(localStorage.getItem('codes')){
      setFormData({...formData, initialCode :JSON.parse(localStorage.getItem('codes'))});

    }
  }, []);

  
  const updateInitialCode = (newInitialCode) => {
    setFormData({
      ...formData,
      initialCode: newInitialCode
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation code here...
        if(!formData.name){
      toast.error('Name is required');
      return;
    }
    if(!formData.difficulty){
      toast.error('Difficulty is required');
      return;
    }
    if(!formData.category){
      toast.error('Category is required');
      return;
    }
    if(!formData.description){
      toast.error('Description is required');
      return;
    }
    if(!formData.grade){
      toast.error('Grade is required');
      return;
    }

    const url = id ? `http://localhost:4000/problems/${id}` : 'http://localhost:4000/problems';
    const method = id ? 'PUT' : 'POST';

    try {
      await axios({
        method: method,
        url: url,
        data: formData,
      });
      toast.success(`${id ? 'Problem updated' : 'Problem added'} successfully!`);
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error ${id ? 'updating' : 'adding'} problem. Please try again.`);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Problem' : 'Add Problem'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for name, difficulty, category, description, initial code, test cases, and grade... */}
              <div>
           <label>Name:</label>
           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
         </div>
         <div>
           <label>Difficulty:</label>
           <input type="text" name="difficulty" value={formData.difficulty} onChange={handleChange} required />
         </div>
         <div>
           <label>Category:</label>
           <input type="text" name="category" value={formData.category} onChange={handleChange} required />
         </div>
         <div>
           <label>Description:</label>
           <textarea name="description" value={formData.description} onChange={handleChange} required />
         </div>
         <div>
           <label>Initial Code:</label>
  
 
             <CodingEditor   onUpdateInitialCode={updateInitialCode} initialCode = {formData.initialCode} showOutput = {false}/>     
         </div>

<div>
  <label>Test Cases:</label>
  {formData.testCases.map((testCase, index) => (
    <div key={index}>
      <input
        type="text"
        name="input"
        value={testCase.input} // Input value
        onChange={(e) => handleTestCaseChange(e, index, 'input')} // Update input
        placeholder="Input"
      />
      <input
        type="text"
        name="expectedOutput"
        value={testCase.expectedOutput} // Expected output value
        onChange={(e) => handleTestCaseChange(e, index, 'expectedOutput')} // Update expected output
        placeholder="Expected Output"
      />
       <label>
        <span>Sample</span> {/* Sample label */}
        <input
          type="checkbox"
          name="isSample"
          checked={testCase.isSample} // Whether it's a sample test case
          onChange={(e) => handleCheckboxChange(e, index)} // Update isSample
        />
      </label>
      <input
        type="number"
        name="weight"
        value={testCase.weight} // Weight value
        onChange={(e) => handleTestCaseChange(e, index, 'weight')} // Update weight
        placeholder="Weight"
      />
      <button type="button" onClick={() => removeTestCase(index)}>Remove</button>
    </div>
  ))}
  <button type="button" onClick={addTestCase}>Add Test Case</button>
</div>

         <div>
           <label>Grade:</label>
           <input type="number" name="grade" value={formData.grade} onChange={handleChange} required />
         </div>
        {/* Input fields for examples */}
        <div>
          <label>Examples:</label>
          {formData.examples.map((example, index) => (
            <div key={index}>
              <input
                type="text"
                name="input"
                value={example.input}
                onChange={(e) => handleExampleChange(e, index)}
                placeholder="Input"
              />
              <input
                type="text"
                name="output"
                value={example.output}
                onChange={(e) => handleExampleChange(e, index)}
                placeholder="Expected Output"
              />
              <input
                type="text"
                name="explanation"
                value={example.explanation}
                onChange={(e) => handleExampleChange(e, index)}
                placeholder="Explanation"
              />
              <button type="button" onClick={() => removeExample(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addExample}>Add Example</button>
        </div>

        {/* Submit button */}
        <button type="submit">{id ? 'Update Problem' : 'Add Problem'}</button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AddProblem;
