import { Menu, MenuIcon, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import CardUser from '../../CardUser'
import { useLocation } from 'react-router-dom'
import path from '@/constants/path'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const breadcrumbNameMap: Record<string, string> = {
  // Doctor
  [path.dashboard]: 'Dashboard',
  // Admin
  [path.dashboard_admin]: 'Admin Dashboard',
  [path.userManage]: 'User Manage'
}

export const Navbar = ({ open, setOpen }: Props) => {
  const location = useLocation()

  const pathSnippets = location.pathname.split('/').filter((i) => i)

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    const title = breadcrumbNameMap[url] || url
    return { href: url, title }
  })

  return (
    <div className='flex items-center fixed w-[-webkit-fill-available] justify-between px-5 py-2 bg-background border-b navbar border-border z-50'>
      <div className='flex items-center'>
        <Button variant='ghost' size='icon' onClick={() => setOpen(!open)}>
          <MenuIcon className='w-5 h-5' />
        </Button>

        <nav className='flex ml-5' aria-label='Breadcrumb'>
          <ol className='flex items-center space-x-2'>
            {breadcrumbItems.map((item, index) => (
              <li key={item.href} className='flex items-center'>
                {index > 0 && <ChevronRight className='mx-1 w-4 h-4 text-muted-foreground' />}
                <a href={item.href} className='text-sm font-medium text-muted-foreground hover:text-foreground'>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className='flex items-center mr-4'>
        <CardUser />
      </div>
    </div>
  )
}
