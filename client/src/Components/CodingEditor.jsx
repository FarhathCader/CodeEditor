import React, { useEffect } from 'react'
import {Editor} from '@monaco-editor/react'
import { useState } from 'react'
import LanguageSelector from './LanguageSelector'
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';
export default function CodingEditor(props) {
  const {initialCode,onUpdateInitialCode,showOutput,problem} = props  
  const [language,setLanguage] = useState(`javascript`);
  const [value,setValue] = useState(``); 
  const onSelect = (language)=> {
    setLanguage(language)
    localStorage.setItem('currentLanguage', language);
  }



  // useEffect(()=>{
  //   const storedCode = localStorage.getItem('codes');
  //   console.log('initial code',initialCode)
  //   console.log('stored code',storedCode)
  //   if (storedCode !== null) {
  //     setValue(storedCode);
  //     return;
  //   }
  //     setValue(CODE_SNIPPETS[language] || CODE_SNIPPETS['javascript']);
  //     setLanguage(language || 'javascript')
   
  // },[initialCode,language])

 

  useEffect(() => {
   
    console.log("initial code changed",language,initialCode)
    if(initialCode && initialCode.length > 0) { // If codes array is not present in localStorage
    // if(localStorage.getItem('codes') === null)localStorage.setItem('codes', JSON.stringify(initialCode));
    localStorage.setItem('codes', JSON.stringify(initialCode));
    const index = initialCode.findIndex(item => item.language === language);
    console.log("code and index",initialCode,index)
    setValue(initialCode[index].code);
    setLanguage(initialCode[index].language);

   // Store updated codes array in localStorage
    }
    return 
  
  }, [initialCode]);

  useEffect(() => {
    const storedCodes =  JSON.parse(localStorage.getItem('codes'));
    // console.log('initial code', initialCode);
    // console.log('stored codes', storedCodes);
    if (storedCodes !== null) {
      const storedCode = storedCodes.find((code) => code.language === language);
      if (storedCode) {
        setValue(storedCode.code);
        return;
      }
    }
    setValue(CODE_SNIPPETS[language] || CODE_SNIPPETS['javascript']);
    setLanguage(language || 'javascript');
  }, [language]);
  
  
  // const handleCodeChange = (newValue) => {
  //   setValue(newValue); 
  //   localStorage.setItem('codes', [...initialCode, newValue]);
  // };

  // const handleCodeChange = (newValue) => {
  //   setValue(newValue);
  //   const updatedInitialCode = initialCode.map((code) => {
  //     return code.language === language ? {...code,code : newValue} : code;
  //   });
  //   localStorage.setItem('codes', JSON.stringify(updatedInitialCode)); // Store updated initialCode in localStorage
  // };
  const handleCodeChange = (newValue) => {
    console.log("code changed")
    setValue(newValue);
    const storedCodes = JSON.parse(localStorage.getItem('codes')) || [];
    const updatedCodes = storedCodes.map((code) => {
      return code.language === language ? { ...code, code: newValue } : code;
    });
    localStorage.setItem('codes', JSON.stringify(updatedCodes));
    onUpdateInitialCode(updatedCodes); // Store updated codes array in localStorage
  };
  
  const handleReset = () => {
    const defaultCode = CODE_SNIPPETS[language];
    setValue(defaultCode);
    // Update the stored code to the default code
    const storedCodes = JSON.parse(localStorage.getItem('codes')) || [];
    const updatedCodes = storedCodes.map((code) => {
      return code.language === language ? { ...code, code: defaultCode } : code;
    });
    localStorage.setItem('codes', JSON.stringify(updatedCodes));
    onUpdateInitialCode(updatedCodes);
  };
 



 
  
  return (

     
    <div className='code-container'>
      <div className='code-editor'>

       <LanguageSelector language = {language} onSelect = {onSelect} />
       <Editor 
       height={'20vh'} 
       theme='vs-dark'
       value={value}
       onChange={handleCodeChange}
       language={language}
       />
        <button type='button' onClick={handleReset}>Reset</button>
      </div>
      {showOutput && <Output  language = {language} value = {value} problem = {problem}/>}
          
    

    </div>
  )
}
