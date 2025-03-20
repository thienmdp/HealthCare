import { useCreateAppointmentMutation } from '@/redux/services/appointmentApi'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { CustomNotification } from '@/components/CustomReactToastify'
import { Textarea } from '@/components/ui/textarea'
import { vi } from 'date-fns/locale'
import { useAppSelector } from '@/redux/store'
import { bufferToHex } from '@/utils/utils'

interface Props {
  doctorId: string
  doctorProfileId: string | Buffer<ArrayBufferLike>
  date: Date
  timeSlot: string
  onClose: () => void
}

export default function BookingDialog({ doctorId, doctorProfileId, date, timeSlot, onClose }: Props) {
  const user = useAppSelector((state) => state.authState.user)
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation()
  const [type, setType] = useState<'video_call' | 'in_person'>('video_call')
  const [symptoms, setSymptoms] = useState('')
  console.log('user:', user)
  const handleSubmit = async () => {
    try {
      // Calculate endTime (assuming 30 min duration)
      const [hours, minutes] = timeSlot.split(':').map(Number)
      const endTimeDate = new Date(date)
      endTimeDate.setHours(hours, minutes + 30)
      const endTime = format(endTimeDate, 'HH:mm')

      await createAppointment({
        patient: bufferToHex(user?._id!),
        doctor: bufferToHex(doctorProfileId),
        appointmentDate: format(date, 'yyyy-MM-dd'),
        startTime: timeSlot,
        endTime,
        type,
        medicalInfo: {
          symptoms
        }
      }).unwrap()

      toast.success(CustomNotification, {
        data: {
          title: 'Thành công!',
          content: 'Đặt lịch khám thành công'
        }
      })
      onClose()
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-semibold'>Xác nhận đặt lịch khám</h2>
      <div className='space-y-2'>
        <p>Ngày khám: {format(date, 'dd/MM/yyyy')}</p>
        <p>Thời gian: {timeSlot}</p>
        <div className='space-y-2'>
          <p className='font-medium'>Hình thức khám:</p>
          <div className='flex gap-4'>
            <Button
              type='button'
              variant={type === 'video_call' ? 'default' : 'outline'}
              onClick={() => setType('video_call')}
            >
              Khám trực tuyến
            </Button>
            <Button
              type='button'
              variant={type === 'in_person' ? 'default' : 'outline'}
              onClick={() => setType('in_person')}
            >
              Khám trực tiếp
            </Button>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Mô tả triệu chứng:</label>
        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder='Vui lòng mô tả triệu chứng của bạn...'
          className='min-h-[100px]'
        />
      </div>

      <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>
      </div>
    </div>
  )
}
