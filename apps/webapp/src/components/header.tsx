import React from 'react'
import { Button } from './ui/enhanced-button'
import {Star} from 'lucide-react'

const Header = () => {

    const openInNewWindow = (url : string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };


  return (
    <div className='flex justify-between items-center mx-5 mt-2'>
        <h1 className='text-2xl font-bold'>Boilgen</h1>
        <Button variant='shine' onClick={() => openInNewWindow('https://github.com/mit-27/boilgen')} >Star on Github</Button>

    </div>
  )
}

export default Header