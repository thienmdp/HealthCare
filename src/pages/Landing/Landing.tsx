import { CiSearch } from 'react-icons/ci'
import { ToastContainer } from 'react-toastify'
// import './Landing.css'

function HomePage() {
  return (
    <>
      <div className='relative flex justify-center items-center w-full h-[796px] border border-blue-600 bg-blue-600 text-white gap-5'>
        <div className='absolute flex flex-col items-center z-10'>
          <p className='font-roboto text-[40px] font-semibold leading-[58.44px] text-center'>Ứng dụng đặt khám</p>
          <p className='w-4/5 text-center my-2 font-roboto text-[24px] font-normal leading-[33.13px] max-w-[801px] mb-5'>
            Đặt khám với hơn 600 bác sỹ, 160 bệnh nhân, 56 phòng khám trên Pandora để có số thứ tự và khung giờ khám
            trước.
          </p>
          <div className='relative w-[809px]'>
            <input
              type='text'
              className='w-full h-[70px] px-[26px] pr-[60px] rounded-full border-none outline-none font-roboto text-[18px] font-normal leading-[18.75px] bg-white text-black'
              placeholder='Nhập bác sĩ và khoa muốn tìm kiếm... '
            />
            <CiSearch className='absolute top-1/2 transform -translate-y-1/2 text-[30px] text-blue-600 cursor-pointer right-[25px]' />
          </div>
        </div>
        <img
          src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
          className='absolute w-[800px] h-[615.38px] z-0 right-[60px]'
        />
      </div>
      <div className='h-auto'>
        <div className='text-center mt-[50px]'>
          <p className='font-roboto text-[41px] uppercase font-bold leading-[49.62px]'>
            Đặt lịch phòng khám trực tuyến
          </p>
          <p className='font-roboto text-[16px] italic font-normal leading-[19.36px]'>
            Tìm bác sĩ chính xác - Đặt lịch khám dễ dàng
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex justify-between items-center px-[320px]'>
            <div>
              <p className='font-roboto text-[27px] italic font-semibold leading-[32.68px]'>Đặt khám bác sĩ</p>
              <p className='font-roboto text-[16px] font-normal leading-[19.36px]'>
                Đa dạng phòng khám với nhiều chuyên khoa khác nhau như Sản - Nhi, Tai Mũi họng, Da Liễu, Tiêu Hoá...
              </p>
            </div>
            <div>
              <button className='bg-blue-600 text-white rounded-full w-[136px] h-[36px] transition-colors duration-300 hover:bg-blue-800'>
                Xem Thêm &gt;
              </button>
            </div>
          </div>
          <div className='flex justify-start items-stretch gap-5 p-5 overflow-x-auto whitespace-nowrap max-w-[1470px] mx-auto'>
            <div className='min-w-[330px] bg-white rounded-lg shadow-md text-center p-5 transition-transform duration-300 hover:translate-y-[-5px] inline-block border border-gray-400'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='Doctor Avatar'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <h3 className='text-[18px] text-gray-900'>Hồ Phúc Hiếu</h3>
                <p className='text-[14px] text-gray-600'>thần kinh</p>
                <p className='text-[14px] text-gray-600'>Nghệ an</p>
              </div>
              <div className='mt-3'>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-800'>
                  Đặt lịch khám
                </button>
              </div>
            </div>
            <div className='min-w-[330px] bg-white rounded-lg shadow-md text-center p-5 transition-transform duration-300 hover:translate-y-[-5px] inline-block border border-gray-400'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='Doctor Avatar'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <h3 className='text-[18px] text-gray-900'>Hồ Phúc Hiếu</h3>
                <p className='text-[14px] text-gray-600'>thần kinh</p>
                <p className='text-[14px] text-gray-600'>Nghệ an</p>
              </div>
              <div className='mt-3'>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-800'>
                  Đặt lịch khám
                </button>
              </div>
            </div>
            <div className='min-w-[330px] bg-white rounded-lg shadow-md text-center p-5 transition-transform duration-300 hover:translate-y-[-5px] inline-block border border-gray-400'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='Doctor Avatar'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <h3 className='text-[18px] text-gray-900'>Hồ Phúc Hiếu</h3>
                <p className='text-[14px] text-gray-600'>thần kinh</p>
                <p className='text-[14px] text-gray-600'>Nghệ an</p>
              </div>
              <div className='mt-3'>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-800'>
                  Đặt lịch khám
                </button>
              </div>
            </div>
            <div className='min-w-[330px] bg-white rounded-lg shadow-md text-center p-5 transition-transform duration-300 hover:translate-y-[-5px] inline-block border border-gray-400'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='Doctor Avatar'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <h3 className='text-[18px] text-gray-900'>Hồ Phúc Hiếu</h3>
                <p className='text-[14px] text-gray-600'>thần kinh</p>
                <p className='text-[14px] text-gray-600'>Nghệ an</p>
              </div>
              <div className='mt-3'>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300 hover:bg-blue-800'>
                  Đặt lịch khám
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-center'>
            <p className='font-roboto text-[27px] italic font-semibold leading-[32.68px]'>Đặt Lịch theo Chuyên khoa</p>
            <p className='font-roboto text-[16px] font-normal leading-[19.36px]'>
              Danh sách bác sĩ, bệnh viện, phòng khám, theo chuyên khoa
            </p>
          </div>
          <div className='flex flex-wrap justify-center gap-5'>
            <div className='w-[200px] h-[200px] bg-white rounded-lg shadow-md text-center p-5'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='Specialty'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <span className='text-[16px] text-gray-900'>Chuẩn Đoán Hình Ảnh</span>
              </div>
            </div>
            {/* Add more specialty cards as needed */}
          </div>
          <div className='mt-5'>
            <button className='bg-blue-600 text-white rounded-full w-[136px] h-[36px] transition-colors duration-300 hover:bg-blue-800'>
              Xem thêm
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-center'>
            <p className='font-roboto text-[27px] italic font-semibold leading-[32.68px]'>Đội ngũ chuyên gia</p>
          </div>
          <div className='flex flex-wrap justify-center gap-5'>
            <div className='w-[200px] h-[200px] bg-white rounded-lg shadow-md text-center p-5'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='Doctor'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <p className='text-[16px] text-gray-900'>Ths.Bs Hiếu nè</p>
                <p className='text-[14px] text-gray-600'>Hồ phúc hiếu</p>
              </div>
            </div>
            {/* Add more doctor cards as needed */}
          </div>
          <div className='mt-5'>
            <p className='text-center'>
              Hội đồng tham vấn y khoa cùng đội ngũ biên tập viên và bác sĩ, dược sĩ đảm bảo nội dung chúng tôi cung cấp
              chính xác về mặt y khoa và cập nhập những thông tin chính xác nhất
            </p>
            <button className='bg-blue-600 text-white rounded-full w-[136px] h-[36px] transition-colors duration-300 hover:bg-blue-800 mt-3'>
              Đội ngũ chuyên gia &gt;
            </button>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='font-roboto text-[41px] uppercase font-bold leading-[49.62px] text-center mt-[50px]'>
            DANH MỤC THUỐC
          </h1>
          <p className='font-roboto text-[16px] italic font-normal leading-[19.36px] text-center'>
            Chính thống - Minh bạch - Trung lập
          </p>
          <div className='flex flex-col items-center'>
            <div className='flex gap-5'>
              <button className='bg-blue-600 text-white rounded-full w-[136px] h-[36px] transition-colors duration-300 hover:bg-blue-800'>
                Thuốc
              </button>
              <button className='bg-blue-600 text-white rounded-full w-[136px] h-[36px] transition-colors duration-300 hover:bg-blue-800'>
                Dược liệu
              </button>
              <button className='bg-blue-600 text-white rounded-full w-[136px] h-[36px] transition-colors duration-300 hover:bg-blue-800'>
                Bệnh
              </button>
              <button className='bg-blue-600 text-white rounded-full w-[136px] h-[36px] transition-colors duration-300 hover:bg-blue-800'>
                Cơ thể
              </button>
            </div>
            <div className='relative w-[809px] mt-5'>
              <input
                type='text'
                className='w-full h-[70px] px-[26px] pr-[60px] rounded-full border-none outline-none font-roboto text-[18px] font-normal leading-[18.75px] bg-white text-black'
                placeholder='Nhập tên thuốc...'
              />
              <button className='absolute top-1/2 transform -translate-y-1/2 text-[30px] text-blue-600 cursor-pointer right-[25px]'>
                <i className='fa fa-search'></i>
              </button>
            </div>
          </div>
          <div className='flex flex-wrap justify-center gap-5 mt-5'>
            <div className='w-[200px] h-[200px] bg-white rounded-lg shadow-md text-center p-5'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='Medicine'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <h3 className='text-[16px] text-gray-900'>thuốc ho</h3>
                <p className='text-[14px] text-gray-600'>
                  <strong>Mô tả:</strong> ...
                </p>
                <p className='text-[14px] text-gray-600'>
                  <strong>Giá:</strong> 10đ
                </p>
                <button className='bg-blue-600 text-white rounded-full w-[136px] h-[36px] transition-colors duration-300 hover:bg-blue-800 mt-3'>
                  Xem chi tiết
                </button>
              </div>
            </div>
            {/* Add more medicine cards as needed */}
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='font-roboto text-[41px] uppercase font-bold leading-[49.62px] text-center mt-[50px]'>
            GIẤY PHÉP CHỨNG NHẬN ĐẠT CHUẨN GPP
          </h1>
          <p className='font-roboto text-[16px] italic font-normal leading-[19.36px] text-center'>
            Đội ngũ chuyên gia chứng nhận phòng khám đạt chuẩn GPP
          </p>
          <div className='flex flex-wrap justify-center gap-5 mt-5'>
            <div className='w-[200px] h-[200px] bg-white rounded-lg shadow-md text-center p-5'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='icon'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <p className='text-[16px] text-gray-900 font-semibold'>
                  Hạ tầng đạt tiêu chuẩn
                  <br />
                  ISO 15189:2012
                </p>
              </div>
            </div>
            <div className='w-[200px] h-[200px] bg-white rounded-lg shadow-md text-center p-5'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='icon'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <p className='text-[16px] text-gray-900 font-semibold'>
                  Thông tin sức khỏe được
                  <br />
                  đảm bảo tốt nhất
                  <br />
                  <a href='#'>HIPAA</a>
                </p>
              </div>
            </div>
            <div className='w-[200px] h-[200px] bg-white rounded-lg shadow-md text-center p-5'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='icon'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <p className='text-[16px] text-gray-900 font-semibold'>
                  Thành viên
                  <br />
                  VNISA
                </p>
              </div>
            </div>
            <div className='w-[200px] h-[200px] bg-white rounded-lg shadow-md text-center p-5'>
              <div className='flex justify-center'>
                <img
                  src={'https://cdn.youmed.vn/wp-content/themes/youmed/images/your-medical-booking.webp'}
                  alt='icon'
                  className='w-[100px] h-[100px] rounded-full'
                />
              </div>
              <div className='mt-2'>
                <p className='text-[16px] text-gray-900 font-semibold'>
                  Pentest định kì
                  <br />
                  hằng năm
                </p>
              </div>
            </div>
          </div>
          <p className='text-center mt-5'>
            Với nhiều năm kinh nghiệm trong lĩnh vực Y tế, chúng tôi hiểu rằng, dữ liệu sức khỏe của bạn chỉ thuộc về
            bạn, và tuân thủ các chính sách bảo mật dữ liệu cao nhất trên thế giới.
          </p>
        </div>
      </div>
    </>
  )
}

export default HomePage
