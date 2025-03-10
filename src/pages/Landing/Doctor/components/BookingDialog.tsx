import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface Props {
  doctorId: string
  date: Date
  timeSlot: string
  onClose: () => void
}

export default function BookingDialog({ doctorId, date, timeSlot, onClose }: Props) {
  const [symptoms, setSymptoms] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Call API to create appointment
      console.log('Booking appointment:', {
        doctorId,
        date: format(date, 'yyyy-MM-dd'),
        timeSlot,
        symptoms
      })
      onClose()
    } catch (error) {
      console.error('Error booking appointment:', error)
    }
    setIsSubmitting(false)
  }

  return (
    <div className='space-y-4'>
      <div>
        <h2 className='text-lg font-semibold'>Xác nhận đặt lịch khám</h2>
        <p className='text-sm text-gray-500'>
          {format(date, 'EEEE, dd/MM/yyyy', { locale: vi })} - {timeSlot}
        </p>
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

      <div className='flex justify-end gap-2 pt-4'>
        <Button variant='outline' onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>
      </div>
    </div>
  )
}
