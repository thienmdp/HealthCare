import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format, addDays } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import DoctorSchedule from './components/DoctorSchedule'
import { generateTimeSlots } from '@/utils/schedule'
import BookingDialog from './components/BookingDialog'
import { useAppSelector } from '@/redux/store'
import { useGetDoctorProfileQuery } from '@/redux/services/doctorApi'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { formatCurrency } from '@/utils/utils'
import { Page_403 } from '@/pages/NotFound'

export default function DoctorProfile() {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state) => state.authState.isAuthenticated)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')
  const [showBooking, setShowBooking] = useState(false)

  const { data: doctorProfile, isLoading: isLoadingDoctor } = useGetDoctorProfileQuery(doctorId || '')

  const doctorSchedule = {
    shifts: [
      {
        shift: 'morning',
        startTime: '08:00',
        endTime: '12:00'
      },
      {
        shift: 'afternoon',
        startTime: '13:00',
        endTime: '17:00'
      }
    ]
  }

  const timeSlots = doctorSchedule.shifts.flatMap((shift) => generateTimeSlots(shift.startTime, shift.endTime))

  const handleTimeSlotClick = (timeSlot: string) => {
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: `/doctor/${doctorId}` } })
      return
    }
    setSelectedTimeSlot(timeSlot)
    setShowBooking(true)
  }

  const isLoading = isLoadingDoctor
  if (!doctorProfile) return <Page_403 />
  return (
    <div className='container py-8'>
      <div className='grid gap-6 lg:grid-cols-3'>
        <Card className='lg:col-span-2'>
          <CardContent className='p-6'>
            {isLoading ? (
              <div className='space-y-4'>
                <Skeleton className='w-32 h-32 rounded-full' />
                <Skeleton className='w-48 h-6' />
                <Skeleton className='w-full h-24' />
              </div>
            ) : (
              <div className='space-y-6'>
                <div className='flex flex-col items-center gap-6 md:flex-row md:items-start'>
                  <Avatar className='w-32 h-32 border-4 border-primary/10'>
                    <AvatarImage src={doctorProfile?.data.profileImage || doctorProfile?.data.profileImage} />
                    <AvatarFallback>{doctorProfile?.data?.doctorName || 'BS'}</AvatarFallback>
                  </Avatar>

                  <div className='flex-1 text-center md:text-left'>
                    <h1 className='text-2xl font-bold'>{doctorProfile?.data?.doctorName || 'Tên đầy đủ Doctor'}</h1>
                    <p className='text-gray-500'>Số giấy phép: {doctorProfile?.data.licenseNumber}</p>

                    <div className='flex flex-wrap gap-2 mt-2'>
                      {doctorProfile?.data.specialties.map((specialty) => (
                        <Badge key={specialty} variant='secondary'>
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className='flex items-center gap-2 mt-4'>
                      <Badge variant='outline' className='text-green-600 bg-green-50'>
                        {doctorProfile?.data.isAvailable ? 'Đang làm việc' : 'Tạm nghỉ'}
                      </Badge>
                      <Badge variant='outline'>{doctorProfile?.data.yearsOfExperience} năm kinh nghiệm</Badge>
                      <Badge variant='outline'>{formatCurrency(doctorProfile?.data.consultationFee || 0)}/lượt</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className='mb-2 text-lg font-semibold'>Giới thiệu</h2>
                  <p className='text-gray-600'>{doctorProfile?.data.biography}</p>
                </div>

                <div>
                  <h2 className='mb-2 text-lg font-semibold'>Ngôn ngữ</h2>
                  <div className='flex flex-wrap gap-2'>
                    {doctorProfile?.data.languages.map((language) => (
                      <Badge key={language} variant='outline'>
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className='mb-2 text-lg font-semibold'>Thành tựu</h2>
                  <ul className='pl-5 space-y-1 text-gray-600 list-disc'>
                    {doctorProfile?.data.achievements.map((achievement, index) => <li key={index}>{achievement}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Học vấn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {doctorProfile?.data.education.map((edu, index) => (
                  <div key={index} className='space-y-1'>
                    <div className='font-medium'>{edu.degree}</div>
                    <div className='text-sm text-gray-500'>{edu.university}</div>
                    <div className='text-sm text-gray-500'>
                      Chuyên ngành: {edu.specialization} ({edu.graduationYear})
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chứng chỉ</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea>
                <div className='space-y-4'>
                  {doctorProfile?.data.certificates.map((cert, index) => (
                    <div key={index} className='p-3 border rounded-lg'>
                      <div className='font-medium'>{cert.name}</div>
                      <div className='text-sm text-gray-500'>Cấp bởi: {cert.issuedBy}</div>
                      <div className='text-sm text-gray-500'>
                        {format(new Date(cert.issueDate), 'MM/yyyy')} -
                        {cert.expiryDate ? format(new Date(cert.expiryDate), 'MM/yyyy') : 'Không thời hạn'}
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation='vertical' />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className='mt-6'>
        <CardHeader>
          <CardTitle>Lịch khám bệnh</CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          <DoctorSchedule
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            timeSlots={timeSlots}
            onTimeSlotSelect={handleTimeSlotClick}
          />
        </CardContent>
      </Card>

      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className='max-w-lg'>
          <BookingDialog
            doctorId={doctorId!}
            date={selectedDate}
            timeSlot={selectedTimeSlot}
            onClose={() => setShowBooking(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
