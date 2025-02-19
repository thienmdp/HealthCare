import path from '@/constants/path'

export const sidebarAdmin = [
  {
    id: 1,
    name: 'Dashboard',
    icon: <img src='/assets/svg/logo_cme.svg' alt='logo' height={24} width={24} />,
    link: path.dashboard_admin
  },
  {
    id: 2,
    name: 'Quản lý người dùng',
    icon: <img src='/assets/svg/dashboard/userManage.svg' alt='logo' height={24} width={24} />,
    link: path.userManage
  },
  {
    id: 7,
    name: 'Tài khoản',
    icon: <img src='/assets/svg/dashboard/account.svg' alt='logo' height={24} width={24} />,
    link: path.profileAdmin
  }
]
export const sidebarDoctor = [
  {
    id: 1,
    name: 'Dashboard',
    icon: <img src='/assets/svg/logo_cme.svg' alt='logo' height={24} width={24} />,
    link: path.dashboard
  },
  {
    id: 4,
    name: 'Tài khoản',
    icon: <img src='/assets/svg/dashboard/account.svg' alt='logo' height={24} width={24} />,
    link: path.profileExpert
  }
]
