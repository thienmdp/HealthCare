import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

interface Props {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  timeSlots: string[]
  onTimeSlotSelect: (time: string) => void
}

export default function DoctorSchedule({ selectedDate, onDateSelect, timeSlots, onTimeSlotSelect }: Props) {
  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      <div>
        <h3 className='mb-4 text-lg font-semibold'>Chọn ngày khám</h3>
        <Calendar
          mode='single'
          selected={selectedDate}
          onSelect={(date) => date && onDateSelect(date)}
          locale={vi}
          fromDate={new Date()}
          className='border rounded-md'
        />
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>
          Chọn giờ khám - {format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: vi })}
        </h3>
        <ScrollArea className='h-[400px] rounded-md border p-4'>
          <div className='grid grid-cols-3 gap-2'>
            {timeSlots.map((time) => (
              <Button key={time} variant='outline' className='w-full' onClick={() => onTimeSlotSelect(time)}>
                {time}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
