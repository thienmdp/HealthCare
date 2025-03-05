import * as yup from 'yup'

const CCCD_REGX = /^[0-9]{12}$/
const EMAIL_REGX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const schema = yup.object({
  email: yup
    .string()
    .matches(EMAIL_REGX, 'Email không đúng định dạng')
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 đến 160 kí tự')
    .max(160, 'Độ dài từ 5 đến 160 kí tự'),
  fullName: yup.string().required('Nhập vào tên đầy đủ của bạn').min(2, 'Độ dài từ 2 kí tự'),
  firstName: yup.string().required('Nhập vào họ và tên lót của bạn').min(2, 'Độ dài từ 2 kí tự'),
  lastName: yup.string().required('Nhập vào tên của bạn').min(2, 'Độ dài từ 2 kí tự'),
  phone: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(/^(84|0[2|3|5|7|8|9])+([0-9]{8,9})\b$/, 'Số điện thoại không hợp lệ'),
  license_number: yup.string().required('Số CCCD là bắt buộc').matches(CCCD_REGX, 'Số CCCD phải gồm 12 chữ số'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
  birth: yup
    .date()
    .required('Ngày tháng năm sinh là bắt buộc')
    .max(new Date(), 'Ngày tháng năm sinh không thể ở tương lai')
    .typeError('Ngày tháng năm sinh không hợp lệ'),
  yearGraduation: yup
    .number()
    .required('Năm tốt nghiệp là bắt buộc')
    .min(1945, 'Năm tốt nghiệp không thể nhỏ hơn 1945')
    .max(new Date().getFullYear(), `Năm tốt nghiệp không thể lớn hơn ${new Date().getFullYear()}`)
    .typeError('Năm tốt nghiệp phải là số'),
  highestDegree: yup
    .string()
    .required('Trình độ học vấn là bắt buộc')
    .oneOf(['High School', 'Associate', 'Bachelor', 'Master', 'PhD'], 'Trình độ học vấn không hợp lệ'),
  old_password: yup
    .string()
    .required('Mật khẩu cũ là bắt buộc')
    .min(6, 'Độ dài từ 6 đến 160 kí tự')
    .max(160, 'Độ dài từ 6 đến 160 kí tự'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Độ dài từ 6 đến 160 kí tự')
    .max(160, 'Độ dài từ 6 đến 160 kí tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại mật khẩu là bắt buộc')
    .min(6, 'Độ dài từ 6 đến 160 kí tự')
    .max(160, 'Độ dài từ 6 đến 160 kí tự')
    .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp'),
  roles: yup.string().oneOf(['USER', 'ADMIN', 'DOCTOR'], 'Vai trò không hợp lệ').required('Vai trò là bắt buộc'),
  status: yup
    .string()
    .oneOf(['ACTIVE', 'BLOCK', 'UNVERIFY'], 'Trạng thái không hợp lệ')
    .required('Trạng thái là bắt buộc')
})

export type Schema = yup.InferType<typeof schema>
