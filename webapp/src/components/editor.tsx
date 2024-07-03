"use client"

import React from 'react'
import Editor from '@monaco-editor/react';

const CodeEditor = ({value,onChange,language} : {value: string|undefined, onChange : (arg0: string|undefined) => void,language:string}) => {
  return (
    <div className='w-[1000px] ml-5'>
        <Editor 
        height="100vh" 
        theme='vs-dark'
        defaultLanguage={language} 
        value={value}
        onChange={onChange}
        />
    </div>
  )
}

export default CodeEditor