import path from '@/constants/path'
import { LayoutDashboard, Settings, UsersRound } from 'lucide-react'

export const sidebarAdmin = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard className='flex-shrink-0 w-5 h-5' />,
    href: path.dashboard_admin
  },
  {
    label: 'Quản lý người dùng',
    icon: <UsersRound className='flex-shrink-0 w-5 h-5' />,
    href: path.userManage
  },
  {
    label: 'Tài khoản',
    icon: <Settings className='flex-shrink-0 w-5 h-5' />,
    href: '#path.profileAdmin'
  }
]
export const sidebarDoctor = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard className='flex-shrink-0 w-5 h-5' />,
    href: path.dashboard
  },
  {
    label: 'Tài khoản',
    icon: <Settings className='flex-shrink-0 w-5 h-5' />,
    href: path.profileDoctor
  }
]
