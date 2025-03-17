import { CustomCalendar } from '@/components/ui/custom-calendar'
import { cn } from '@/lib/utils'
import { differenceInMinutes, parse, isToday } from 'date-fns'

interface Props {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  timeSlots: string[]
  onTimeSlotSelect: (slot: string) => void
  isLoading?: boolean
}

export default function DoctorSchedule({ selectedDate, onDateSelect, timeSlots, onTimeSlotSelect, isLoading }: Props) {
  const isTimeSlotValid = (timeSlot: string) => {
    // If not today, all slots are valid
    if (!isToday(selectedDate)) return true

    const currentTime = new Date()
    const [hours, minutes] = timeSlot.split(':').map(Number)
    const slotTime = new Date(selectedDate)
    slotTime.setHours(hours, minutes)

    // Check if slot is at least 1 hour ahead
    return differenceInMinutes(slotTime, currentTime) >= 60
  }

  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      <CustomCalendar selectedDate={selectedDate} onDateSelect={onDateSelect} />

      <div className='p-4 border rounded-lg'>
        <h3 className='mb-4 font-medium'>Chọn giờ khám</h3>
        {isLoading ? (
          <div className='grid h-[200px] place-items-center'>
            <div className='w-8 h-8 border-b-2 rounded-full border-primary animate-spin'></div>
          </div>
        ) : timeSlots.length > 0 ? (
          <div className='grid grid-cols-3 gap-2'>
            {timeSlots.map((slot) => {
              const isValid = isTimeSlotValid(slot)
              return (
                <button
                  key={slot}
                  onClick={() => isValid && onTimeSlotSelect(slot)}
                  className={cn(
                    'p-2 text-sm rounded-md transition-colors',
                    'border border-primary/20',
                    isValid ? 'hover:bg-primary/10 cursor-pointer' : 'opacity-50 cursor-not-allowed bg-gray-50',
                    'focus:outline-none focus:ring-2 focus:ring-primary/20'
                  )}
                  disabled={!isValid}
                  title={!isValid ? 'Thời gian đặt lịch phải trước ít nhất 1 tiếng' : undefined}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        ) : (
          <div className='grid h-[200px] place-items-center'>
            <p className='text-gray-500'>Không có ca khám trong ngày này</p>
          </div>
        )}
      </div>
    </div>
  )
}
