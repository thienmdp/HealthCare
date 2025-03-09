import { useState } from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { AdminDayShift, DoctorShiftRegistration, Shift } from '@/types/workSchedule.type'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'

interface Props {
  date: string
  shifts: AdminDayShift[]
  onClose: () => void
}

export default function DoctorListDialog({ date, shifts, onClose }: Props) {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorShiftRegistration | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const handleRejectDoctor = async () => {
    if (!selectedDoctor || !rejectReason) return

    try {
      // Call API to reject doctor
      console.log('Rejecting doctor:', {
        doctorId: selectedDoctor.doctorId,
        date,
        shift: selectedDoctor.shift,
        reason: rejectReason
      })
      
      setSelectedDoctor(null)
      setRejectReason('')
    } catch (error) {
      console.error('Error rejecting doctor:', error)
    }
  }

  return (
    <>
      <div className='space-y-6'>
        <h2 className='text-xl font-bold'>
          Danh sách bác sĩ làm việc ngày {format(new Date(date), 'dd/MM/yyyy', { locale: vi })}
        </h2>

        <div className='space-y-4'>
          {shifts.map((shift) => (
            <div key={shift.shift} className='p-4 border rounded-lg'>
              <h3 className='mb-4 font-medium'>
                {shift.shift === 'morning' && 'Ca sáng'}
                {shift.shift === 'afternoon' && 'Ca chiều'}
                {shift.shift === 'evening' && 'Ca tối'}
                <span className='ml-2 text-sm text-gray-500'>
                  ({shift.startTime} - {shift.endTime})
                </span>
              </h3>

              <div className='space-y-2'>
                {shift.doctors.map((doctor) => (
                  <div key={doctor.doctorId} className='flex items-center justify-between p-2 border rounded'>
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage src={doctor.avatar} />
                        <AvatarFallback>{doctor.doctorName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-medium'>{doctor.doctorName}</div>
                        <div className='text-sm text-gray-500'>
                          {doctor.startTime} - {doctor.endTime}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Badge 
                        variant={
                          doctor.status === 'approved' 
                            ? 'default' 
                            : doctor.status === 'pending' 
                            ? 'secondary' 
                            : 'destructive'
                        }
                      >
                        {doctor.status === 'approved' && 'Đã duyệt'}
                        {doctor.status === 'pending' && 'Chờ duyệt'}
                        {doctor.status === 'rejected' && 'Đã từ chối'}
                      </Badge>
                      {doctor.status !== 'rejected' && (
                        <Button 
                          variant='ghost' 
                          size='icon'
                          className='text-red-500 hover:text-red-700'
                          onClick={() => setSelectedDoctor({ ...doctor, shift: shift.shift })}
                        >
                          <X className='w-4 h-4' />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Từ chối lịch làm việc</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn từ chối bác sĩ {selectedDoctor?.doctorName} khỏi ca này?
              <Textarea
                className='mt-4'
                placeholder='Nhập lý do từ chối...'
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedDoctor(null)}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleRejectDoctor} disabled={!rejectReason}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
