import { useGetAppointmentDetailQuery } from '@/redux/services/appointmentApi'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Video, CheckCircle, Loader2 } from 'lucide-react'
import { useJoinVideoCall } from '@/hooks/useJoinVideoCall'
import { bufferToHex } from '@/utils/utils'

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
  const { joinVideoCall, canJoinVideoCall, getTimeUntilJoinable, isLoadingMeetings } = useJoinVideoCall({ isDev: true })

  if (isLoading || !data || isLoadingMeetings)
    return (
      <div className='flex items-center justify-center min-h-[200px]'>
        <div className='w-8 h-8 rounded-full border-b-2 animate-spin border-primary'></div>
      </div>
    )

  const appointment = data.data
  const apptId = bufferToHex(appointment._id)

  // Kiểm tra xem bệnh nhân có thể tham gia cuộc gọi hay không (chỉ đúng giờ hẹn)
  const canJoin = canJoinVideoCall(appointment.appointmentDate, appointment.startTime, false)

  // Tính thời gian còn lại đến giờ hẹn
  const timeUntil = getTimeUntilJoinable(appointment.appointmentDate, appointment.startTime, false)

  // Xử lý tham gia cuộc gọi video
  const handleJoinMeeting = () => {
    joinVideoCall(appointment.videoCallInfo, apptId)
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Chi tiết lịch hẹn</h2>

      {/* Hiển thị button tham gia cuộc gọi video khi đã xác nhận và là khám online */}
      {appointment.status === 'confirmed' && appointment.type === 'video_call' && appointment.videoCallInfo && (
        <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
          <div className='space-y-2'>
            <h3 className='font-medium text-blue-800'>Cuộc gọi video</h3>
            <p className='text-sm text-blue-700'>
              Lịch hẹn của bạn đã được xác nhận vào ngày {format(new Date(appointment.appointmentDate), 'dd/MM/yyyy')}{' '}
              lúc {appointment.startTime}.
            </p>

            {/* Hiển thị thông báo khác nhau tùy vào trạng thái cuộc gọi */}
            {appointment.isVideoCallEnded ? (
              <div className='p-3 text-green-700 bg-green-50 rounded-md border border-green-200'>
                <p className='flex items-center'>
                  <CheckCircle className='mr-2 w-5 h-5 text-green-500' />
                  Cuộc gọi video đã hoàn thành
                </p>
                <p className='mt-1 text-sm'>Cảm ơn bạn đã tham gia cuộc gọi với bác sĩ.</p>
              </div>
            ) : (
              <>
                <p className='text-sm font-medium text-blue-700'>Bạn có thể tham gia cuộc gọi khi đến giờ hẹn.</p>

                {!canJoin && timeUntil && (
                  <div className='p-2 text-sm text-orange-600 bg-orange-50 rounded'>
                    Còn {timeUntil} nữa đến giờ khám. Vui lòng quay lại sau.
                  </div>
                )}

                <Button
                  onClick={handleJoinMeeting}
                  className='mt-2 bg-blue-600 hover:bg-blue-700'
                  disabled={!canJoin || appointment.isVideoCallEnded || !appointment.isVideoCallStarted}
                >
                  <Video className='mr-2 w-4 h-4' /> Tham gia cuộc gọi
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <div className='space-y-4'>
        {/* Basic Info Card */}
        <div className='grid gap-4 p-4 rounded-lg border'>
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
        <Accordion type='multiple' defaultValue={['medical_info', 'more_info']}>
          <AccordionItem value='medical_info'>
            <AccordionTrigger className='text-sm font-medium'>Khai báo y tế</AccordionTrigger>
            <AccordionContent className='space-y-4'>
              <div>
                <p className='mb-1 font-medium'>Triệu chứng</p>
                <p className='text-gray-600 whitespace-pre-wrap'>
                  {(appointment.medicalInfo?.symptoms && appointment.medicalInfo.symptoms) || '--'}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          {appointment.cancelReason && (
            <AccordionItem value='cancel_info'>
              <AccordionTrigger className='text-sm font-medium text-red-500'>Thông tin hủy lịch</AccordionTrigger>
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
              <AccordionTrigger className='text-sm font-medium'>Đơn thuốc</AccordionTrigger>
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
                    <ul className='list-disc list-inside text-gray-600'>
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
            <AccordionTrigger className='text-sm font-medium'>Thông tin thêm</AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-1 text-sm text-gray-600'>
                <li>Đặt lịch lúc: {format(new Date(appointment.createdAt), 'HH:mm dd/MM/yyyy')}</li>
                {appointment.isRescheduled && <li>Đã được đổi lịch</li>}
                {appointment.approvedAt && (
                  <li>Xác nhận lúc: {format(new Date(appointment.approvedAt), 'HH:mm dd/MM/yyyy')}</li>
                )}
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
