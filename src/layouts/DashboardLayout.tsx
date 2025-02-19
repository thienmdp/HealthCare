import React, { useState, useEffect, useLayoutEffect, useRef, memo } from 'react'
import Sidebar from './components/Dashboard/Sidebar'
import Navbar from './components/Dashboard/Navbar'

interface Props {
  children?: React.ReactNode
}

function DashboardLayoutInner({ children }: Props) {
  const [open, setOpen] = useState<boolean>(true)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    function updateSize() {
      setOpen(window.innerWidth >= 640)
    }
    updateSize()
  }, [])

  useEffect(() => {
    function handleResize() {
      setOpen(window.innerWidth >= 640)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth < 640 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)
    if (window.innerWidth < 640 && !open && sidebarRef.current) {
      sidebarRef.current.classList.add('hidden')
    } else {
      sidebarRef.current?.classList.remove('hidden')
    }
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])
  console.log('DashboardLayout')
  return (
    <section className='flex w-full h-screen overflow-hidden bg-gray-50'>
      <div ref={sidebarRef}>
        <Sidebar open={open} />
      </div>
      <div className='w-full h-full overflow-y-auto'>
        <Navbar open={open} setOpen={setOpen} />
        <div className='p-10 mt-[59px]'>{children}</div>
      </div>
    </section>
  )
}
const DashboardLayout = memo(DashboardLayoutInner)
export default DashboardLayout
