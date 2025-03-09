import { Bot, BotMessageSquare, MessageCircle } from 'lucide-react'
import React from 'react'

export default function Chatbot() {
  return (
    <div className='h-12 w-12 min-h-12 min-w-12 cursor-pointer fixed bottom-[40px] left-[80%] xs:left-[84%] sm:left-[86%] md:left-[94%] z-[999] flex items-center justify-center rounded-full bg-primary text-[3rem]'>
      <div className='zalozoomzoom bg-primary'></div>
      <div className='zalozoomzoom bg-primary'></div>
      <div className='zalozoomzoom bg-primary'></div>
      <div className='zalozoomzoom bg-primary'></div>
      <BotMessageSquare className='w-full h-full p-2 text-white' />
    </div>
  )
}
