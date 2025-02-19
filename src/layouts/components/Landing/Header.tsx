import { useState, useEffect, useCallback } from 'react'
import { MobileMenu } from './MobileMenu'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import { useAppSelector } from '@/redux/store'
import CardUser from '../CardUser'
import path from '@/constants/path'
import { ModalSearch } from '../Modal'
import { useTranslation } from 'react-i18next'
import { ModeToggleI18n } from '@/components/Global/mode-toggle-i18'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const Container = styled.div`
  .ant-drawer .antd-drawer-content-wrapper .antd-drawer-content .ant-drawer-body {
    padding: 0px !important;
  }
`

export const Header = () => {
  const { i18n, t } = useTranslation('landing')
  const [scrollActive, setScrollActive] = useState(false)
  const user = useAppSelector((auth) => auth.authState.user)

  useEffect(() => {
    localStorage.setItem('preferredTheme', 'light')
  }, [])

  const handleScroll = useCallback(() => {
    setScrollActive(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleScrollToTop = useCallback(() => {
    scroll.scrollToTop({ duration: 300, smooth: true })
  }, [])

  return (
    <header
      className={
        'fixed top-0 z-50 shadow-md w-full border-b-1 transition-all duration-250 ease-out' +
        (scrollActive ? ' pt-0 shadow-sm' : '')
      }
    >
      <nav className='bg-white border-gray-200'>
        <Container className='flex items-center justify-between px-6 py-4 mx-auto containerr max-w-screen-xl min-h-[70px]'>
          <div className='flex items-center justify-between w-full md:justify-start'>
            <MobileMenu />
            <Link
              to={path.landing}
              aria-label='logo_home'
              className='flex items-center text-2xl font-bold cursor-pointer text-blue_app'
              onClick={() => handleScrollToTop}
            >
              Diagnosis IQ
            </Link>
            <ModalSearch />
            {/* <SearchHeader /> */}
          </div>
          <div className='flex items-center justify-end text-sm'>
            <ModeToggleI18n />
            <ul className='hidden ml-4 w-max md:flex'>
              <li>
                <Link
                  className='mr-4 text-gray-700 cursor-pointer hover:text-blue_app min-w-fit'
                  to={path.about}
                  onClick={() => handleScrollToTop}
                  aria-current='page'
                >
                  {t('header.about')}
                </Link>
              </li>
              <li>
                <Link
                  className='mr-4 text-gray-700 cursor-pointer hover:text-blue_app min-w-fit'
                  to={'#contact'}
                  onClick={() => handleScrollToTop}
                  aria-current='page'
                >
                  {t('header.contact')}
                </Link>
              </li>
            </ul>
            <span className='hidden w-max md:block'>
              {user && <CardUser />}
              {!user && (
                <div className='flex items-center w-max'>
                  <Link
                    className={cn(buttonVariants({ variant: 'gooeyLeft' }), '!rounded-full !px-3 !py-2 min-w-[98px]')}
                    to={path.signin}
                    onClick={() => handleScrollToTop}
                  >
                    {t('header.login')}
                  </Link>
                </div>
              )}
            </span>
          </div>
        </Container>
      </nav>
    </header>
  )
}
