import React from 'react'
import { useTranslation } from 'react-i18next'
import { Advance, Hero, ListDoctor, Quality } from './components'
import { DoctorProfile } from '@/types/doctor.type'

const LandingContent: React.FC = () => {
  const { t } = useTranslation('landing')
  const MOCK_DOCTORS: DoctorProfile[] | any = [
    {
      _id: '67c7b7866ecfbe874d2a7009',
      email: 'doctor@gmail.com',
      role: 'doctor',
      lastLogin: '2025-03-10T02:57:12.297Z',
      disabled: false,
      isVerified: true,
      createdAt: '2025-02-26T07:29:28.756Z',
      updatedAt: '2025-03-10T02:57:12.297Z',
      profile: {
        _id: '67c7b7866ecfbe874d2a7009',
        firstName: 'Bác sĩ',
        lastName: 'An',
        avatar: '',
        birth: '2000-12-13T00:00:00.000Z',
        gender: 'male',
        phone: '0782222888',
        createdAt: '2025-03-06T09:17:50.638Z',
        updatedAt: '2025-03-07T08:07:16.340Z'
      },
      doctorProfileId: '67c7b7866ecfbe874d2a7009',
      patientId: null
    },
    {
      _id: '67c7b7866ecfbe874d2a7009',
      email: 'doctor@gmail.com',
      role: 'doctor',
      lastLogin: '2025-03-10T02:57:12.297Z',
      disabled: false,
      isVerified: true,
      createdAt: '2025-02-26T07:29:28.756Z',
      updatedAt: '2025-03-10T02:57:12.297Z',
      profile: {
        _id: '67c7b7866ecfbe874d2a7009',
        firstName: 'Bác sĩ',
        lastName: 'An',
        avatar: '',
        birth: '2000-12-13T00:00:00.000Z',
        gender: 'male',
        phone: '0782222888',
        createdAt: '2025-03-06T09:17:50.638Z',
        updatedAt: '2025-03-07T08:07:16.340Z'
      },
      doctorProfileId: '67c7b7866ecfbe874d2a7009',
      patientId: null
    },
    {
      _id: '67c7b7866ecfbe874d2a7009',
      email: 'doctor@gmail.com',
      role: 'doctor',
      lastLogin: '2025-03-10T02:57:12.297Z',
      disabled: false,
      isVerified: true,
      createdAt: '2025-02-26T07:29:28.756Z',
      updatedAt: '2025-03-10T02:57:12.297Z',
      profile: {
        _id: '67c7b7866ecfbe874d2a7009',
        firstName: 'Bác sĩ',
        lastName: 'An',
        avatar: '',
        birth: '2000-12-13T00:00:00.000Z',
        gender: 'male',
        phone: '0782222888',
        createdAt: '2025-03-06T09:17:50.638Z',
        updatedAt: '2025-03-07T08:07:16.340Z'
      },
      doctorProfileId: '67c7b7866ecfbe874d2a7009',
      patientId: null
    },
    {
      _id: '67c7b7866ecfbe874d2a7009',
      email: 'doctor@gmail.com',
      role: 'doctor',
      lastLogin: '2025-03-10T02:57:12.297Z',
      disabled: false,
      isVerified: true,
      createdAt: '2025-02-26T07:29:28.756Z',
      updatedAt: '2025-03-10T02:57:12.297Z',
      profile: {
        _id: '67c7b7866ecfbe874d2a7009',
        firstName: 'Bác sĩ',
        lastName: 'An',
        avatar: '',
        birth: '2000-12-13T00:00:00.000Z',
        gender: 'male',
        phone: '0782222888',
        createdAt: '2025-03-06T09:17:50.638Z',
        updatedAt: '2025-03-07T08:07:16.340Z'
      },
      doctorProfileId: '67c7b7866ecfbe874d2a7009',
      patientId: null
    },
    {
      _id: '67c7b7866ecfbe874d2a7009',
      email: 'doctor@gmail.com',
      role: 'doctor',
      lastLogin: '2025-03-10T02:57:12.297Z',
      disabled: false,
      isVerified: true,
      createdAt: '2025-02-26T07:29:28.756Z',
      updatedAt: '2025-03-10T02:57:12.297Z',
      profile: {
        _id: '67c7b7866ecfbe874d2a7009',
        firstName: 'Bác sĩ',
        lastName: 'An',
        avatar: '',
        birth: '2000-12-13T00:00:00.000Z',
        gender: 'male',
        phone: '0782222888',
        createdAt: '2025-03-06T09:17:50.638Z',
        updatedAt: '2025-03-07T08:07:16.340Z'
      },
      doctorProfileId: '67c7b7866ecfbe874d2a7009',
      patientId: null
    },
    {
      _id: '67c7b7866ecfbe874d2a7009',
      email: 'doctor@gmail.com',
      role: 'doctor',
      lastLogin: '2025-03-10T02:57:12.297Z',
      disabled: false,
      isVerified: true,
      createdAt: '2025-02-26T07:29:28.756Z',
      updatedAt: '2025-03-10T02:57:12.297Z',
      profile: {
        _id: '67c7b7866ecfbe874d2a7009',
        firstName: 'Bác sĩ',
        lastName: 'An22',
        avatar: '',
        birth: '2000-12-13T00:00:00.000Z',
        gender: 'male',
        phone: '0782222888',
        createdAt: '2025-03-06T09:17:50.638Z',
        updatedAt: '2025-03-07T08:07:16.340Z'
      },
      doctorProfileId: '67c7b7866ecfbe874d2a7009',
      patientId: null
    }
  ]
  return (
    <div className='bg-white text-[#000000] min-h-screen w-full'>
      <Hero />
      <Advance />
      <Quality />
      <ListDoctor listDoctor={MOCK_DOCTORS} />
      <div className='min-h-screen'></div>
    </div>
  )
}

export default LandingContent
