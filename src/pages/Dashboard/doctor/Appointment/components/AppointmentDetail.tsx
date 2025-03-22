import { Button } from '@/components/ui/button'
import { CustomNotification } from '@/components/CustomReactToastify'
import { Textarea } from '@/components/ui/textarea'
import {
  useApproveAppointmentMutation,
  useCancelAppointmentMutation,
  useGetAppointmentDetailQuery
} from '@/redux/services/appointmentApi'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Video, CheckCircle } from 'lucide-react'
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

export default function AppointmentDetail({ appointmentId, onClose }: Props) {
  const { data, isLoading } = useGetAppointmentDetailQuery(appointmentId)
  const [approveAppointment] = useApproveAppointmentMutation()
  const [cancelAppointment] = useCancelAppointmentMutation()
  const [cancelReason, setCancelReason] = useState('')
  const [showCancelForm, setShowCancelForm] = useState(false)
  const { joinVideoCall, canJoinVideoCall, getTimeUntilJoinable, isLoadingMeetings, hasVideoCallPermission } =
    useJoinVideoCall({ isDev: true })

  if (isLoading || !data || isLoadingMeetings)
    return (
      <div className='flex items-center justify-center min-h-[200px]'>
        <div className='w-8 h-8 rounded-full border-b-2 animate-spin border-primary'></div>
      </div>
    )

  const appointment = data.data
  const apptId = bufferToHex(appointment._id)

  const handleApprove = async () => {
    try {
      await approveAppointment(appointmentId).unwrap()
      toast.success(CustomNotification, {
        data: {
          title: 'Thành công!',
          content: 'Đã xác nhận lịch hẹn'
        }
      })
      onClose()
    } catch (error) {
      toast.error(CustomNotification, {
        data: {
          title: 'Thất bại!',
          content: 'Không thể xác nhận lịch hẹn'
        }
      })
    }
  }

  const handleCancel = async () => {
    try {
      await cancelAppointment({
        id: appointmentId,
        reason: cancelReason
      }).unwrap()
      toast.success(CustomNotification, {
        data: {
          title: 'Thành công!',
          content: 'Đã hủy lịch hẹn'
        }
      })
      onClose()
    } catch (error) {
      toast.error(CustomNotification, {
        data: {
          title: 'Thất bại!',
          content: 'Không thể hủy lịch hẹn'
        }
      })
    }
  }

  // Kiểm tra xem bác sĩ có thể tham gia cuộc gọi hay không (trước 30 phút)
  const canJoin = canJoinVideoCall(appointment.appointmentDate, appointment.startTime, true) && hasVideoCallPermission()

  // Tính thời gian còn lại đến khi có thể tham gia
  const timeUntil = getTimeUntilJoinable(appointment.appointmentDate, appointment.startTime, true)

  // Xử lý tham gia cuộc gọi video
  const handleJoinMeeting = () => {
    joinVideoCall(appointment.videoCallInfo, apptId)
  }

  // Xác định nội dung nút tham gia cuộc gọi dựa vào trạng thái
  const joinButtonText = appointment.isVideoCallStarted ? 'Tham gia cuộc gọi' : 'Bắt đầu cuộc gọi'

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Chi tiết lịch hẹn</h2>

      {/* Hiển thị thông tin cuộc gọi video cho bác sĩ */}
      {appointment.status === 'confirmed' && appointment.type === 'video_call' && appointment.videoCallInfo && (
        <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
          <div className='space-y-2'>
            <h3 className='font-medium text-blue-800'>Cuộc gọi video với bệnh nhân</h3>
            <p className='text-sm text-blue-700'>
              Lịch hẹn đã được xác nhận. Bạn có thể bắt đầu cuộc gọi video vào ngày{' '}
              {format(new Date(appointment.appointmentDate), 'dd/MM/yyyy')} lúc {appointment.startTime}.
            </p>

            {/* Hiển thị thông báo khác nhau tùy vào trạng thái cuộc gọi */}
            {appointment.isVideoCallEnded ? (
              <div className='p-3 text-green-700 bg-green-50 rounded-md border border-green-200'>
                <p className='flex items-center'>
                  <CheckCircle className='mr-2 w-5 h-5 text-green-500' />
                  Cuộc gọi video đã kết thúc
                </p>
              </div>
            ) : appointment.isVideoCallStarted ? (
              <>
                <div className='p-2 mb-2 text-sm text-green-600 bg-green-50 rounded'>
                  <p className='flex items-center'>
                    <CheckCircle className='mr-2 w-4 h-4 text-green-500' />
                    Cuộc gọi đã được bắt đầu
                  </p>
                </div>
                <p className='text-sm font-medium text-blue-700'>
                  Bác sĩ có thể tham gia cuộc gọi trước 30 phút so với giờ hẹn.
                </p>

                {!canJoin && timeUntil && (
                  <div className='p-2 text-sm text-orange-600 bg-orange-50 rounded'>
                    Bạn có thể tham gia cuộc gọi sau: {timeUntil}
                  </div>
                )}

                <div className='flex flex-col gap-2 sm:flex-row'>
                  <Button
                    onClick={handleJoinMeeting}
                    className='bg-blue-600 hover:bg-blue-700'
                    disabled={!canJoin || appointment.isVideoCallEnded}
                  >
                    <Video className='mr-2 w-4 h-4' /> Tham gia cuộc gọi
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => {
                      navigator.clipboard.writeText(appointment.videoCallInfo?.meetingUrl || '')
                      toast.success(CustomNotification, {
                        data: {
                          title: 'Thành công!',
                          content: 'Đã sao chép liên kết cuộc gọi'
                        }
                      })
                    }}
                  >
                    Sao chép liên kết
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className='p-3 mb-2 text-blue-700 bg-blue-50 rounded-md border border-blue-200'>
                  <p className='font-medium'>Cuộc gọi chưa bắt đầu</p>
                  <p className='mt-1 text-sm'>Bạn cần bắt đầu cuộc gọi để bệnh nhân có thể tham gia.</p>
                </div>

                {!canJoin && timeUntil && (
                  <div className='p-2 text-sm text-orange-600 bg-orange-50 rounded'>
                    Bạn có thể tham gia cuộc gọi sau: {timeUntil}
                  </div>
                )}

                <div className='flex flex-col gap-2 sm:flex-row'>
                  <Button
                    onClick={handleJoinMeeting}
                    className='bg-blue-600 hover:bg-blue-700'
                    disabled={!canJoin || appointment.isVideoCallEnded}
                  >
                    <Video className='mr-2 w-4 h-4' /> {joinButtonText}
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => {
                      navigator.clipboard.writeText(appointment.videoCallInfo?.meetingUrl || '')
                      toast.success(CustomNotification, {
                        data: {
                          title: 'Thành công!',
                          content: 'Đã sao chép liên kết cuộc gọi'
                        }
                      })
                    }}
                  >
                    Sao chép liên kết
                  </Button>
                </div>
              </>
            )}
            <p className='text-xs text-blue-700'>ID: {appointment.videoCallInfo.meetingId}</p>
          </div>
        </div>
      )}

      <div className='space-y-4'>
        {/* Basic Info Card */}
        <div className='grid gap-4 p-4 rounded-lg border'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-medium'>Bệnh nhân</p>
              <p>
                {appointment.patient.profile
                  ? `${appointment.patient.profile.firstName} ${appointment.patient.profile.lastName}`
                  : 'Chưa cập nhật'}
              </p>
            </div>
            <div>
              <p className='font-medium'>Trạng thái</p>
              <div>{getStatusBadge(appointment.status)}</div>
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

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-medium'>Hình thức khám</p>
              <p>{appointment.type === 'video_call' ? 'Trực tuyến' : 'Trực tiếp'}</p>
            </div>
            <div>
              <p className='font-medium'>Phí khám</p>
              <p>{formatCurrency(appointment.appointmentFee)}</p>
            </div>
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

      {appointment.status === 'pending' && (
        <div className='flex gap-2'>
          <Button onClick={handleApprove}>Xác nhận lịch hẹn</Button>
          <Button variant='destructive' onClick={() => setShowCancelForm(true)}>
            Từ chối
          </Button>
        </div>
      )}

      {showCancelForm && (
        <div className='space-y-2'>
          <Textarea
            placeholder='Lý do từ chối...'
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => setShowCancelForm(false)}>
              Hủy
            </Button>
            <Button variant='destructive' onClick={handleCancel} disabled={!cancelReason}>
              Xác nhận từ chối
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
