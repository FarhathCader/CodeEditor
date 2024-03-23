import './App.css'
import ProblemList from './Components/ProblemList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CodeEditor from './Components/CodeEditor'
import AddProblem from './Components/AddProblem'
import Editor from './Components/CodingEditor'
import CodingEditor from './Components/CodingEditor'
import Sample from './Components/Sample'

function App() {

  return (
   
    <BrowserRouter>
    <Routes>
      <Route path='/m' element= {<ProblemList/>}/>
      <Route path='/problems/:id' element = {<CodeEditor/>}/>
      <Route path='/editor' element = {<Editor/>}/>
      <Route path='/' element = {<Sample/>}/>
      
    </Routes>
    </BrowserRouter>

    // <ProblemList/>
      
  
  )
}

export default App
