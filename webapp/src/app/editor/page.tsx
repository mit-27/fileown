'use client'
import CodeEditor from '@/components/editor'
import Header from '@/components/header';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { Separator } from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {LANGUAGES,FILE_EXTENSIONS} from '@/utils/language'
import {LoadingSpinner} from '@/components/ui/loading-spinner'
import { toast } from 'sonner';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

const page = () => {

    const [value,setValue] = useState<string|undefined>('');
    const [fileName,setFileName] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(false);
    const [selectedLanguage,setSelectedLanguage] = useState<string>('javascript')

    const upload = async () => {
        try
        {
            setLoading(true);
            const tFileName = fileName +FILE_EXTENSIONS[selectedLanguage];
            const res = await fetch('/api/upload',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        fileName:tFileName,
                        fileContent: value
                    })
                }
            );
            toast.success("Template Uploaded")
            setLoading(false);


            // const response = await res.json();
            // console.log(response);

        }catch(error)
        {
            setLoading(false);
            console.error(error)
        }
    }


  return (
    <div className='flex flex-col'>
        <Header/>
        <Separator className='my-2'/>
        <div className='flex m-5 p-3 items-end gap-5'>
            <div className='flex flex-col gap-2'>
                <label>Select the language</label>
                <Select value={selectedLanguage} onValueChange={(s) => setSelectedLanguage(s)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                    {Object.entries(LANGUAGES).map(([lang, version]) => (
                        <SelectItem key={lang} value={lang}>
                        {lang}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>

            </div>
            <div className='flex flex-col gap-2'>
                <label>Enter Template Name</label>
                <Input type='text' value={fileName} onChange={(e) => setFileName(e.target.value)} />
            </div>

            <Button variant='ringHover' onClick={() => upload()}>{loading ? (
                <span className='flex gap-2 items-center'>
                <LoadingSpinner/>
                <p>Uploading</p>
                </span>
            ) : 'Upload your template'}</Button>

        </div>

        <div className='flex mx-6'>
            <Card className='w-full'>
            <CardHeader>
                <CardTitle>Instruction to create Template</CardTitle>
                <CardDescription>Details on how the user can design the template.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Use '__' <span className='font-semibold'> before </span> any repetitive word to mark as  replaceable in your template!</p>
            </CardContent>

            </Card>
        </div>



        <div className='flex flex-col my-3'>
            <h1 className='text-xl font-semibold ml-5 my-2'>Editor</h1>
            <CodeEditor
            language={selectedLanguage}
            value = {value}
            onChange = {setValue}
            />
        </div>
        {/* <div className='flex flex-col gap-2 flex-1 p-5'>
            <label>Enter File Name</label>
            <Input type='text' value={fileName} onChange={(e) => setFileName(e.target.value)} />
            <Button onClick={() => upload()}>Upload File</Button>
        </div> */}
    </div>
  )
}

export default page