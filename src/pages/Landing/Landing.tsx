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
  const [searchQuery, setSearchQuery] = useState('')

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
    <div className=''>
      {/*  */}
      {/* Banner với hình ảnh và search bar */}
      <div className='relative w-ful -mx-80'>
        <img
          src='https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp' // Thay bằng URL hình ảnh thực tế
          alt='Banner'
          className='w-full h-80 object-cover'
        />
        <div className='absolute inset-0 bg-transparent flex items-center justify-center p-4'>
          <div className='w-full max-w-2xl'>
            <input
              type='text'
              placeholder='Tìm kiếm bác sĩ...'
              className='w-full px-6 py-3 rounded-full border-0 focus:ring-2 focus:ring-indigo-600'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Phần text dưới banner */}
      <div className='text-center py-8 px-4'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>Đội ngũ bác sĩ chuyên nghiệp</h1>
        <p className='text-gray-600 text-lg'>Luôn sẵn sàng hỗ trợ và chăm sóc sức khỏe của bạn</p>
      </div>

      {/* Danh sách bác sĩ ngang */}
      <div className='flex overflow-x-auto pb-8 px-4 scrollbar-hide'>
        <div className='flex flex-nowrap gap-6 mx-auto'>
          {users.map((user) => (
            <div
              key={user.id}
              className='flex-shrink-0 w-72 p-6 rounded-lg bg-gray-100 hover:bg-blue-100 transition-colors shadow-lg'
            >
              <div className='flex flex-col items-center'>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-24 h-24 rounded-full mb-4 object-cover border-2 border-neutral-500'
                />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>{user.name}</h3>
                <p className='text-gray-600 mb-3'>{user.position}</p>
                <button
                  onClick={() => setSelectedUser(user)}
                  className='px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors'
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Phần text dưới banner */}
      <div className='text-center py-8 px-4'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>Đây là thuốc</h1>
        <p className='text-gray-600 text-lg'>demo rồi chỉnh sửa cho phù hợp giao diên</p>
      </div>

      {/* Danh sách bác sĩ ngang */}
      <div className='flex overflow-x-auto pb-8 px-4 scrollbar-hide'>
        <div className='flex flex-nowrap gap-6 mx-auto'>
          {users.map((user) => (
            <div
              key={user.id}
              className='flex-shrink-0 w-72 p-6 rounded-lg bg-gray-100 hover:bg-blue-100 transition-colors shadow-lg'
            >
              <div className='flex flex-col items-center'>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-24 h-24 rounded-full mb-4 object-cover border-2 border-neutral-500'
                />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>{user.name}</h3>
                <p className='text-gray-600 mb-3'>{user.position}</p>
                <button
                  onClick={() => setSelectedUser(user)}
                  className='px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors'
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
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
  )
}
