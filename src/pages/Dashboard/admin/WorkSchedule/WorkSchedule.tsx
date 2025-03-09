import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { generateAdminMockSchedule } from './mockData'
import { AdminDaySchedule } from '@/types/workSchedule.type'
import DoctorListDialog from './components/DoctorListDialog'
import { MonthPickerPopover } from '@/components/ui/month-picker-popover'
import { Badge } from '@/components/ui/badge'

export default function WorkSchedule() {
  const [selectedDay, setSelectedDay] = useState<AdminDaySchedule | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [schedule, setSchedule] = useState<AdminDaySchedule[]>(generateAdminMockSchedule())

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date)
    setSchedule(generateAdminMockSchedule(date)) // In real app, fetch from API
  }

  const handleDayClick = (day: AdminDaySchedule) => {
    if (day.shifts.length > 0) {
      setSelectedDay(day)
    }
  }

  const getPendingCount = (shifts: AdminDaySchedule['shifts']) => {
    return shifts.reduce((acc, shift) => {
      return acc + shift.doctors.filter((doc) => doc.status === 'pending').length
    }, 0)
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Quản lý lịch làm việc</h1>
        <MonthPickerPopover date={currentDate} onDateChange={handleMonthChange} />
      </div>

      <div className='grid grid-cols-7 gap-4'>
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
        {schedule.map((day) => {
          const pendingCount = getPendingCount(day.shifts)

          return (
            <Card
              key={day.date}
              className={`h-40 transition-shadow ${day.shifts.length > 0 ? 'cursor-pointer hover:shadow-lg' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <CardContent className='p-2'>
                <div className='text-center'>
                  <div className='text-sm font-medium'>{format(new Date(day.date), 'EEEE', { locale: vi })}</div>
                  <div className='text-xl font-bold'>{format(new Date(day.date), 'd')}</div>
                  {day.shifts.length > 0 ? (
                    <div className='mt-1 space-y-1'>
                      {pendingCount > 0 && (
                        <Badge variant='secondary' className='w-full justify-center !text-center'>
                          {pendingCount} chờ duyệt
                        </Badge>
                      )}
                      <div className='mt-1 text-xs text-gray-600'>
                        {day.shifts.map((shift) => (
                          <div key={shift.shift} className='mb-0.5'>
                            {shift.shift === 'morning' && 'Sáng'}
                            {shift.shift === 'afternoon' && 'Chiều'}
                            {shift.shift === 'evening' && 'Tối'}: {shift.doctors.length} bác sĩ
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className='mt-1 text-xs text-gray-400'>Chưa có lịch</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className='lg:max-w-3xl'>
          {selectedDay && (
            <DoctorListDialog
              date={selectedDay.date}
              shifts={selectedDay.shifts}
              onClose={() => setSelectedDay(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
