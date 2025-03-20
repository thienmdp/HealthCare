import { useGetAppointmentDetailQuery } from '@/redux/services/appointmentApi'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface Props {
  appointmentId: string
  onClose: () => void
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

const getStatusBadge = (status: string) => {
  const styles = {
    pending: '!bg-yellow-100 text-yellow-800',
    confirmed: '!bg-blue-100 text-blue-800',
    completed: '!bg-green-100 text-green-800',
    cancelled: '!bg-red-100 text-red-800'
  }[status]

  const labels = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    completed: 'Đã hoàn thành',
    cancelled: 'Đã hủy'
  }[status]

  return <Badge className={styles}>{labels}</Badge>
}

export default function AppointmentDetail({ appointmentId }: Props) {
  const { data, isLoading } = useGetAppointmentDetailQuery(appointmentId)

  if (isLoading || !data)
    return (
      <div className='flex items-center justify-center min-h-[200px]'>
        <div className='w-8 h-8 border-b-2 rounded-full animate-spin border-primary'></div>
      </div>
    )

  const appointment = data.data

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Chi tiết lịch hẹn</h2>

      <div className='space-y-4'>
        {/* Basic Info Card */}
        <div className='grid gap-4 p-4 border rounded-lg'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-medium'>Bác sĩ</p>
              <p>
                {appointment.doctor.profile
                  ? `${appointment.doctor.profile.firstName} ${appointment.doctor.profile.lastName}`
                  : 'N/A'}
              </p>
            </div>
            <div>
              <p className='font-medium'>Bệnh nhân</p>
              <p>
                {appointment.patient.profile
                  ? `${appointment.patient.profile.firstName} ${appointment.patient.profile.lastName}`
                  : 'Chưa cập nhật'}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-medium'>Trạng thái</p>
              <div>{getStatusBadge(appointment.status)}</div>
            </div>
            <div>
              <p className='font-medium'>Phí khám</p>
              <p>{formatCurrency(appointment.appointmentFee)}</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-medium'>Ngày khám</p>
              <p>{format(new Date(appointment.appointmentDate), 'dd/MM/yyyy')}</p>
            </div>
            <div>
              <p className='font-medium'>Thời gian</p>
              <p>
                {appointment.startTime} - {appointment.endTime}
              </p>
            </div>
          </div>

          <div>
            <p className='font-medium'>Hình thức khám</p>
            <p>{appointment.type === 'video_call' ? 'Trực tuyến' : 'Trực tiếp'}</p>
          </div>
        </div>

        {/* Accordion Sections */}
        <Accordion type='multiple' defaultValue={['medical_info']}>
          <AccordionItem value='medical_info'>
            <AccordionTrigger className='text-base font-medium'>Khai báo y tế</AccordionTrigger>
            <AccordionContent className='space-y-4'>
              {appointment.medicalInfo?.symptoms && (
                <div>
                  <p className='mb-1 font-medium'>Triệu chứng</p>
                  <p className='text-gray-600 whitespace-pre-wrap'>{appointment.medicalInfo.symptoms}</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
          {appointment.cancelReason && (
            <AccordionItem value='cancel_info'>
              <AccordionTrigger className='text-base font-medium text-red-500'>Thông tin hủy lịch</AccordionTrigger>
              <AccordionContent>
                <p className='mb-2'>
                  <span className='font-medium'>Lý do:</span> {appointment.cancelReason}
                </p>
                {appointment.cancelledAt && (
                  <p>
                    <span className='font-medium'>Thời gian hủy:</span>{' '}
                    {format(new Date(appointment.cancelledAt), 'HH:mm dd/MM/yyyy')}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          )}

          {appointment.status === 'completed' && (
            <AccordionItem value='prescription'>
              <AccordionTrigger className='text-base font-medium'>Đơn thuốc</AccordionTrigger>
              <AccordionContent>
                {appointment.medicalInfo?.reason && (
                  <div>
                    <p className='mb-1 font-medium'>Chuẩn đoán</p>
                    <p className='text-gray-600 whitespace-pre-wrap'>{appointment.medicalInfo.reason}</p>
                  </div>
                )}
                {appointment.medicalInfo?.currentMedications && (
                  <div>
                    <p className='mb-1 font-medium'>Thuốc</p>
                    <ul className='text-gray-600 list-disc list-inside'>
                      {appointment.medicalInfo.currentMedications.map((med, index) => (
                        <li key={index}>{med}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {appointment.medicalInfo?.notes && (
                  <div>
                    <p className='mb-1 font-medium'>Ghi chú</p>
                    <p className='text-gray-600 whitespace-pre-wrap'>{appointment.medicalInfo.notes}</p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value='more_info' className='border-b-0'>
            <AccordionTrigger className='text-base font-medium'>Thông tin thêm</AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-1 text-sm text-gray-600'>
                <li>Đặt lịch lúc: {format(new Date(appointment.createdAt), 'HH:mm dd/MM/yyyy')}</li>
                {appointment.isRescheduled && <li>Đã được đổi lịch</li>}
                {appointment.type === 'video_call' && (
                  <>
                    <li>Trạng thái cuộc gọi: {appointment.isVideoCallStarted ? 'Đã bắt đầu' : 'Chưa bắt đầu'}</li>
                    {appointment.isVideoCallEnded && <li>Cuộc gọi đã kết thúc</li>}
                  </>
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
