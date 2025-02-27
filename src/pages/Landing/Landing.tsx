import { Button } from '@/components/ui/button'
import { ArrowBigDown, Search } from 'lucide-react'
// import { CiSearch } from 'react-icons/ci'
import { ToastContainer } from 'react-toastify'

function HomePage() {
  return (
    <>
      <div className='relative flex justify-center items-center w-full h-[796px] border border-blue-600 bg-blue-600 text-white gap-5'>
        <div className='absolute flex flex-col items-center z-10'>
          <p className='text-[40px] leading-[58.44px] text-center'>Ứng dụng đặt khám</p>
          <p className='w-4/5 text-center my-2 text-[24px] leading-[33.13px] max-w-6xl mb-5'>
            Đặt khám với hơn 600 bác sỹ, 160 bệnh nhân, 56 phòng khám trên Pandora để có số thứ tự và khung giờ khám
            trước.
          </p>
          <div className='relative w-[809px]'>
            <input
              type='text'
              className='w-full h-[70px] px-[26px] pr-[60px] rounded-full border-none outline-none text-[18px] font-normal leading-[18.75px] bg-white text-black'
              placeholder='Nhập bác sĩ và khoa muốn tìm kiếm... '
            />
            <Search className='absolute top-1/2 transform -translate-y-1/2 text-[30px] text-blue-600 cursor-pointer right-[25px]' />
            {/* <CiSearch className='absolute top-1/2 transform -translate-y-1/2 text-[30px] text-blue-600 cursor-pointer right-[25px]' /> */}
          </div>
        </div>
        <img
          src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
          className='absolute w-[800px] h-[615.38px] z-0 right-[60px]'
        />
      </div>
      <div className='h-auto'>
        <div className='text-center mt-[50px]'>
          <p className='text-[41px] uppercase font-bold leading-[49.62px]'>Đặt lịch phòng khám trực tuyến</p>
          <p className='text-[16px] italic font-normal leading-[19.36px]'>
            Tìm bác sĩ chính xác - Đặt lịch khám dễ dàng
          </p>
        </div>
      </div>
    </>
  )
}

export default HomePage
