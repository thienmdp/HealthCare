import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'
import { vi } from 'date-fns/locale'
import { DaySchedule, Shift, ShiftDetail, WeekSchedule } from '@/types/workSchedule.type'
import { MonthPickerPopover } from '@/components/ui/month-picker-popover'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import CreateScheduleDialog from './components/CreateScheduleDialog'
import { useAppSelector } from '@/redux/store'
import { useGetDoctorScheduleQuery } from '@/redux/services/workScheduleApi'
import { bufferToHex } from '@/utils/utils'

export default function WorkSchedule() {
  const { user } = useAppSelector((state) => state.authState)
  const doctorId = user?._id ? bufferToHex(user._id) : ''

  const { data: scheduleData, isLoading } = useGetDoctorScheduleQuery(doctorId, {
    skip: !doctorId
  })

  const [currentDate, setCurrentDate] = useState(new Date())
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  // Trong thực tế sẽ fetch từ API
  const [schedule, setSchedule] = useState<DaySchedule[]>([])

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date)
    // Fetch schedule for new month
  }

  useEffect(() => {
    if (scheduleData?.data) {
      // Find schedule entries that overlap with current month
      const monthStart = startOfMonth(currentDate)
      const monthEnd = endOfMonth(currentDate)

      const relevantSchedules = scheduleData.data.flatMap((schedule) =>
        schedule.scheduleEntries.filter((entry) => {
          const entryStart = new Date(entry.weekStart)
          const entryEnd = new Date(entry.weekEnd)
          return entryStart <= monthEnd && entryEnd >= monthStart
        })
      )

      // Create daily schedule array
      const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
      const newSchedule: DaySchedule[] = monthDays.map((date) => {
        const dateStr = format(date, 'yyyy-MM-dd')
        const matchingEntry = relevantSchedules.find((entry) => {
          const entryStart = new Date(entry.weekStart)
          const entryEnd = new Date(entry.weekEnd)
          return date >= entryStart && date <= entryEnd
        })

        if (!matchingEntry) return { date: dateStr, shifts: [] }

        const dayOfWeek = format(date, 'EEEE').toLowerCase() as keyof WeekSchedule
        const daySchedule = matchingEntry.dailySchedules[dayOfWeek]

        const shifts: any[] = ['morning', 'afternoon', 'evening']
          // const shifts: ShiftDetail[] = ['morning', 'afternoon', 'evening']
          .filter((shift) => daySchedule[shift as Shift])
          .map((shift) => ({
            id: `${shift}-${dateStr}`,
            shift: shift as Shift,
            date: dateStr,
            doctors: [],
            startTime: daySchedule[`${shift}Start` as keyof typeof daySchedule],
            endTime: daySchedule[`${shift}End` as keyof typeof daySchedule]
          }))

        return {
          date: dateStr,
          shifts
        }
      })

      setSchedule(newSchedule)
    }
  }, [scheduleData, currentDate])

  return (
    <div className='p-4 sm:p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Lịch làm việc</h1>
        <div className='flex items-center gap-4'>
          <MonthPickerPopover date={currentDate} onDateChange={handleMonthChange} />
          <Button className='h-8 ' size={'sm'} onClick={() => setCreateDialogOpen(true)}>
            <Plus className='w-4 h-4 mr-2' />
            Tạo lịch làm việc
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center min-h-[200px]'>
          <div className='w-8 h-8 border-b-2 rounded-full border-primary animate-spin'></div>
        </div>
      ) : (
        <div className='grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-5 lg:grid-cols-7'>
          {/* Calendar header */}
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
            <div key={day} className='p-2 font-medium text-center'>
              {day}
            </div>
          ))}

          {/* Empty cells */}
          {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }).map(
            (_, index) => (
              <div key={`empty-${index}`} className='h-32' />
            )
          )}

          {/* Calendar days */}
          {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() }).map(
            (_, index) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1)
              const daySchedule = schedule.find((s) => s.date === format(date, 'yyyy-MM-dd'))

              return (
                <Card key={index} className='h-36'>
                  <CardContent className='p-2'>
                    <div className='text-center'>
                      <div className='text-sm font-medium'>{format(date, 'EEEE', { locale: vi })}</div>
                      <div className='text-xl font-bold'>{format(date, 'd')}</div>
                      {daySchedule?.shifts.length ? (
                        <div className='mt-1 text-xs text-gray-600'>
                          {daySchedule.shifts.map((shift) => (
                            <div key={shift.id} className='mb-0.5 px-2 py-0.5 rounded bg-primary/10'>
                              {shift.shift === 'morning' && `Sáng (${shift.startTime}-${shift.endTime})`}
                              {shift.shift === 'afternoon' && `Chiều (${shift.startTime}-${shift.endTime})`}
                              {shift.shift === 'evening' && `Tối (${shift.startTime}-${shift.endTime})`}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              )
            }
          )}
        </div>
      )}

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className='lg:max-w-3xl'>
          <CreateScheduleDialog onClose={() => setCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
