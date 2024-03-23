import React from 'react'
import {Editor} from '@monaco-editor/react'
import { useState } from 'react'
import LanguageSelector from './LanguageSelector'
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';
export default function CodingEditor(props) {

  const {initialCode,pLanguage} = props;
  const editorRef = React.useRef();
  const [value,setValue]  = useState(localStorage.getItem('codeValue') ||  initialCode || CODE_SNIPPETS['javascript'] || '')
  const [language,setLanguage] = useState(localStorage.getItem('selectedLanguage') || pLanguage || 'javascript')


  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    console.log('editor mounted',initialCode);
    localStorage.setItem('selectedLanguage', language);
    localStorage.setItem('codeValue', value);
    localStorage.setItem(language, value); 
  }

  // const onSelect = (language) => {
  //   setLanguage(language);
  //   setValue(initialCode || CODE_SNIPPETS[language] || ''
  //   )
  //   localStorage.setItem('selectedLanguage', language);

  // }

  const onSelect = (language) => {
    setLanguage(language);
    const codeForLanguage = CODE_SNIPPETS[language] || '';
    // Get previously edited code for the selected language if available
    const previouslyEditedCode = localStorage.getItem(language) || initialCode || '';
    // Set value to previously edited code if available, otherwise use code snippet
    setValue(previouslyEditedCode || codeForLanguage);
    localStorage.setItem('selectedLanguage', language);
  };
  
  // const handleCodeChange = (newValue) => {
  //   setValue(newValue);
  //   localStorage.setItem('codeValue', newValue);
  // };
  const handleCodeChange = (newValue) => {
    setValue(newValue);
    localStorage.setItem('codeValue', newValue);
    localStorage.setItem(language, newValue); // Save edited code for the selected language
  };
  


  
  return (
    <div className='code-container'>
      <div className='code-editor'>
      <LanguageSelector language = {language} onSelect = {onSelect}/>
       <Editor 
       height={'90vh'} 
       language={language}
       theme='vs-dark'
       value={value}
       onChange = {handleCodeChange}
        onMount = {onMount}
       />

      <p>{value}</p>
      <p>{language}</p>
      </div>

      <Output value = {value} language = {language} />

    </div>
  )
}
