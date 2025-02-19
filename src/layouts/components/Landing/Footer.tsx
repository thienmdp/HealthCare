import path from '@/constants/path'
import { Globe, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        <div className='footer__section'>
          <h4>CAPTONE 2 PROJECT</h4>
          <p>120 Hoàng Minh Thảo, Đà Nẵng</p>
          <p>
            Hotline: <a href='tel:0356241423'>0356241423</a>
          </p>
          <p>Diagnosis IQ: Smart Clinical Decision Support System for Automated Hospital Administration.</p>
          <p>Sương - Hiếu - Thành - Báu - Hà</p>
        </div>
        <div className='footer__section'>
          <h4>Về CAPSTONE 2 </h4>
          <ul>
            <li>
              <a href='/gioi-thieu'>Giới thiệu về CAPSTONE 2</a>
            </li>
            <li>
              <a href='#'>Thành viên nhóm</a>
            </li>
            <li>
              <a href='#'>Thông tin dự án</a>
            </li>
            <li>
              <a href='tel:+84356241423'>Liên hệ</a>
            </li>
          </ul>
        </div>
        <div className='footer__section'>
          <h4>Dịch vụ</h4>
          <ul>
            <li>
              <a href='/tin-tuc'>Tin tức y tế</a>
              {/* sửa link liên kết tới trang */}
            </li>
            <li>
              <a href='/dat-kham/bac-si/:doctorId'>Tư Vấn Trực Tuyến</a>
            </li>
            <li>
              <a href='#'>Đặt khám Chuyên Khoa</a>
            </li>
            <li>
              <a href='/thong-tin/ho-so-benh-nhan'>Hồ Sơ Bệnh Án</a>
            </li>
            <li>
              <a href='/dich-vu-kham'>Dịch vụ Phòng Khám</a>
            </li>
          </ul>
        </div>
        <div className='footer__section'>
          <h4>Hỗ trợ</h4>
          <ul>
            <li>
              <a href='#'>Điều Khoản Sử Dụng</a>
            </li>
            {/* chuyển link blog về trang blog */}
            <li>
              <a href='#'>Chính Sách Bảo Mật</a>
            </li>
            <li>
              <a href='#'>Chính sách giải quyết khiếu nại</a>
            </li>
            <li>
              <a href='mailto:hophuchieu135@gmail.com'>Hỗ trợ khách hàng</a>
            </li>
            <li>
              <a href='mailto:hophuchieu135@gmail.com'>Tư vấn khách hàng</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer__bottom'>
        <p>
          Các thông tin trên Capstone2 chỉ dành cho mục đích tham khảo, tra cứu và không thay thế cho việc chẩn đoán
          hoặc điều trị y khoa.
        </p>
        <p>Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.</p>
        <p>Copyright © 2018 - 2025 Công ty TNHH Capstone2 Việt Nam.</p>
      </div>
    </footer>
  )
}

export default Footer
