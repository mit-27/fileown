'use client'
import CodeEditor from '@/components/editor'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'



const page = () => {

    const [value,setValue] = useState<string|undefined>('');
    const [fileName,setFileName] = useState<string>('');

    const upload = async () => {
        try
        {
            const res = await fetch('/api/upload',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        fileName,
                        fileContent: value
                    })
                }
            )

            // const response = await res.json();
            // console.log(response);

        }catch(error)
        {
            console.error(error)
        }
    }


  return (
    <div className='flex gap-2'>
        <div className='flex-1'>
            <CodeEditor
            value = {value}
            onChange = {setValue}
            
            />
        </div>
        <div className='flex gap-2 flex-1 p-5'>
            <Input type='text' value={fileName} onChange={(e) => setFileName(e.target.value)} />
            <Button onClick={() => upload()}>Get Value</Button>
        </div>
    </div>
  )
}

export default page