import React from 'react'
import Editor, { loader } from '@monaco-editor/react';

loader.config({
  paths: {
    vs: '/monaco-editor/min/vs'
  }
});
export default function TestCodeEditor() {
  return (
    <div>
       <Editor 
       height={'20vh'} 
       theme='vs-dark'
       language='javascript'
       />
       <button>Check</button>
    </div>
  )
}
