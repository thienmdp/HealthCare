import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '@/redux/store';
import { useTranslation } from 'react-i18next';
import { ModeToggleI18n } from '@/components/Global/mode-toggle-i18';
import { buttonVariants } from '@/components/ui/button';
import path from '@/constants/path';

const Container = styled.div`
  .ant-drawer .antd-drawer-content-wrapper .antd-drawer-content .ant-drawer-body {
    padding: 0px !important;
  }
`;

export const Header = () => {
  const { t } = useTranslation('landing');
  const [scrollActive, setScrollActive] = useState(false);
  const user = useAppSelector((auth) => auth.authState.user);

  const handleScroll = useCallback(() => {
    setScrollActive(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-250 ease-out bg-white ${scrollActive ? 'shadow-md' : ''}`}
    >
      <nav className='flex items-center justify-between px-6 py-4 mx-auto max-w-screen-xl'>
        {/* Logo */}
        <Link to={path.landing} className='text-2xl font-bold text-black'>
          <img src='./landing/logo.svg' alt='Logo' className='h-8' />
        </Link>
        
        {/* Navigation Links */}
        <ul className='hidden md:flex space-x-6 text-lg text-black font-regular'>
          <li>
            <Link to={path.landing} className='hover:text-[#00B0AB] '>Home</Link>
          </li>
          <li>
            <Link to={path.about} className='hover:text-[#00B0AB] '>About</Link>
          </li>
          <li>
            <Link to={path.services} className='hover:text-[#00B0AB] '>Services</Link>
          </li>
          <li>
            <Link to={path.contact} className='hover:text-[#00B0AB] '>Contact</Link>
          </li>
        </ul>

        {/* Login / Register Button */}
        <div className='hidden md:block  font-Medium text-lg'>
          {user ? (
              <ModeToggleI18n />
            ) : (
              <Link
                className={`bg-[#00B0AB] text-white px-4 py-2 rounded-full hover:bg-[#1580EB] hover:shadow-lg hover:translate-y-[-2px] transition-all`}
                to={path.register}
              >
                Registered
              </Link>
            )}
        </div>
      </nav>
    </header>
  );
};
