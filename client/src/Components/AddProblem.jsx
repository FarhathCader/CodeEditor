import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
// import 'codemirror/keymap/sublime';
// import 'codemirror/theme/monokai.css';

const AddProblem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [grade,setGrade] = useState(0);
    const [language, setLanguage] = useState('javascript');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle the form submission
        // For example, you can send the data to an API or update the state in a parent component
    };

    return (
        <div>
            <h2>Add Problem</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
           
  
    <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    </div>
    <div>
        <label htmlFor="grade">Grade:</label>
        <input
            type="number"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
        />
    </div>
    <div>
        <label htmlFor="language">Language:</label>
        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
        </select>
    </div>

    <button type="submit">Add Problem</button>
    </form>

    <CodeMirror/>
    
    </div>
    );
            }
export default AddProblem;