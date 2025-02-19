import path from '@/constants/path'
import { logOut } from '@/redux/features/auth.slice'
import { authApi } from '@/redux/services/authApi'
import { useAppSelector } from '@/redux/store'
import { getAvatarUrl } from '@/utils/user'
import { Home, LogOut, User } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { FaCreditCard } from 'react-icons/fa'
// Import các components từ shadcn UI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTranslation } from 'react-i18next'

export default function CardUser() {
  const { i18n, t } = useTranslation('landing')
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const user = useAppSelector((state) => state.authState.user)
  const role = useAppSelector((auth) => auth.authState.role)

  const handleLogout = () => {
    dispatch(logOut())
    dispatch(authApi.util.resetApiState())
  }

  if (!user) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='box-border flex items-center h-full cursor-pointer max-w-fit'>
          <Avatar>
            <AvatarImage src={getAvatarUrl(user ?? undefined)} alt='Avatar' />
            <AvatarFallback>{user?.full_name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <p className='ml-2 text-sm max-w-[180px] truncate'>
            <span className='hidden md:contents'>Hi, </span>
            <span className='hidden overflow-hidden md:contents'>{user?.full_name}</span>
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuGroup>
          {role !== 'USER' && (
            <DropdownMenuItem>
              <Home className='mr-2 w-4 h-4' />
              <Link to={pathname.match('dashboard') ? '/' : role === 'ADMIN' ? path.dashboard_admin : path.dashboard}>
                {pathname.match('dashboard') ? 'Landing' : 'Dashboard'}
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <User className='mr-2 w-4 h-4' />
            <Link to={path.profile}>{t('user.profile')}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <FaCreditCard className='mr-2 w-4 h-4' />
          <Link to={path.payment}>{t('user.payment')}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='text-red-600' onClick={handleLogout}>
          <LogOut className='mr-2 w-4 h-4' />
          <span>{t('header.logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
