import { Bot } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import ChatbotDialog from './ChatbotDialog'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className='h-12 w-12 min-h-12 min-w-12 cursor-pointer fixed bottom-[40px] left-[80%] xs:left-[84%] sm:left-[86%] md:left-[94%] z-[999] flex items-center justify-center rounded-full bg-primary text-[3rem]'
      >
        <div className='zalozoomzoom bg-primary'></div>
        <div className='zalozoomzoom bg-primary'></div>
        <div className='zalozoomzoom bg-primary'></div>
        <div className='zalozoomzoom bg-primary'></div>
        <Bot className='w-full h-full p-2 text-white' />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='max-w-3xl max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] overflow-y-auto'>
          <ChatbotDialog onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}
