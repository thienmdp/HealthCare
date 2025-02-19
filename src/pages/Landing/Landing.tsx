import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface User {
  id: number
  name: string
  avatar: string
  email: string
  phone: string
  position: string
}

export default function Landing() {
  const { t } = useTranslation('landing')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Dummy data
  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://watermark.lovepik.com/photo/20211201/large/lovepik-male-doctor-image-picture_501367339.jpg',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      position: 'Software Engineer'
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://watermark.lovepik.com/photo/20211201/large/lovepik-male-doctor-image-picture_501367339.jpg',
      email: 'jane@example.com',
      phone: '+1 345 678 901',
      position: 'Product Manager'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      avatar: 'https://watermark.lovepik.com/photo/20211201/large/lovepik-male-doctor-image-picture_501367339.jpg',
      email: 'nene@gmail.com',
      phone: '+1 456 789 012',
      position: 'UX Designer'
    },
    {
      id: 4,
      name: 'Alice Johnson',
      avatar: 'https://watermark.lovepik.com/photo/20211201/large/lovepik-male-doctor-image-picture_501367339.jpg',
      email: 'nene@gmail.com',
      phone: '+1 456 789 012',
      position: 'UX Designer'
    },
    {
      id: 5,
      name: 'Alice Johnson',
      avatar: 'https://watermark.lovepik.com/photo/20211201/large/lovepik-male-doctor-image-picture_501367339.jpg',
      email: 'nene@gmail.com',
      phone: '+1 456 789 012',
      position: 'UX Designer'
    },
    {
      id: 6,
      name: 'Alice Johnson',
      avatar: 'https://watermark.lovepik.com/photo/20211201/large/lovepik-male-doctor-image-picture_501367339.jpg',
      email: 'nene@gmail.com',
      phone: '+1 456 789 012',
      position: 'UX Designer'
    },
    {
      id: 7,
      name: 'Alice Johnson',
      avatar: 'https://watermark.lovepik.com/photo/20211201/large/lovepik-male-doctor-image-picture_501367339.jpg',
      email: 'nene@gmail.com',
      phone: '+1 456 789 012',
      position: 'UX Designer'
    },
    {
      id: 8,
      name: 'Alice Johnson',
      avatar: 'https://watermark.lovepik.com/photo/20211201/large/lovepik-male-doctor-image-picture_501367339.jpg',
      email: 'nene@gmail.com',
      phone: '+1 456 789 012',
      position: 'UX Designer'
    },
    {
      id: 9,
      name: 'Alice Johnson',
      avatar: 'https://watermark.lovepik.com/photo/20211201/large/lovepik-male-doctor-image-picture_501367339.jpg',
      email: 'nene@gmail.com',
      phone: '+1 456 789 012',
      position: 'UX Designer'
    }
    // Add more users as needed
  ]

  return (
    <div className='relative flex w-full h-screen overflow-y-auto antialiased rounded-md md:items-center md:justify-center bg-white-900'>
      <div className='relative z-10 w-full p-4 pt-20 mx-auto max-w-7xl md:pt-10'>
        {/* <h1 className='text-4xl font-bold text-center text-transparent bg-opacity-50 md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500 mb-12'>
          {t('homepage.title')} <br /> Diagnosis IQ
        </h1> */}

        {/* User List Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {users.map((user) => (
            <div key={user.id} className='p-6 rounded-lg bg-grey-800 hover:bg-blue-700 transition-colors shadow-lg'>
              <div className='flex flex-col items-center'>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-24 h-24 rounded-full mb-4 object-cover border-2 border-neutral-500'
                />
                <h3 className='text-xl font-semibold text-black-200 mb-2'>{user.name}</h3>
                <button
                  onClick={() => setSelectedUser(user)}
                  className='px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors'
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* User Detail Modal */}
        {selectedUser && (
          <div className='fixed inset-0 bg-green bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <div className='bg-green-800 rounded-lg p-6 max-w-md w-full shadow-xl'>
              <div className='flex justify-between items-start mb-4'>
                <h2 className='text-2xl font-bold text-neutral-200'>{selectedUser.name}</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className='text-neutral-400 hover:text-white transition-colors'
                >
                  ✕
                </button>
              </div>
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className='w-32 h-32 rounded-full mx-auto mb-4 object-cover'
              />
              <div className='space-y-2 text-neutral-300'>
                <p>
                  <span className='font-semibold'>Email:</span> {selectedUser.email}
                </p>
                <p>
                  <span className='font-semibold'>Phone:</span> {selectedUser.phone}
                </p>
                <p>
                  <span className='font-semibold'>Position:</span> {selectedUser.position}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
