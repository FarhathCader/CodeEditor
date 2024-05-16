import './App.css'
import ProblemList from './Components/ProblemList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CodeEditor from './Components/CodeEditor'
import AddProblem from './Components/AddProblem'
import Editor from './Components/CodingEditor'
import CodingEditor from './Components/CodingEditor'
import Sample from './Components/Sample'
import TestCodeEditor from './Components/TestCodeEditor'

function App() {

  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<ProblemList/>}/>
      <Route path='/' element= {<TestCodeEditor/>}/>
      <Route path='/addproblem' element= {<AddProblem/>}/>
      <Route path='/problems/:id' element = {<CodeEditor/>}/>
      <Route path='/editor' element = {<Editor/>}/>
      <Route path="/editproblem/:id" element={<AddProblem />} />
      
    </Routes>
    </BrowserRouter>

    // <ProblemList/>
      
  
  )
}

export default App
