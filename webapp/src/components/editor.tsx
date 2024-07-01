"use client"

import React from 'react'
import Editor from '@monaco-editor/react';

const CodeEditor = ({value,onChange} : {value: string|undefined, onChange : (arg0: string|undefined) => void}) => {
  return (
    <div>
        <Editor 
        height="100vh" 
        theme='vs-dark'
        defaultLanguage="javascript" 
        defaultValue="// some comment" 
        value={value}
        onChange={onChange}
        />
    </div>
  )
}

export default CodeEditor