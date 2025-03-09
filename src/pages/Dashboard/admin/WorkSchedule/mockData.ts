import { DaySchedule, ShiftDetail, Shift, AdminDaySchedule, AdminDayShift } from '@/types/workSchedule.type'
import { addDays, format, getDaysInMonth } from 'date-fns'

const DEFAULT_SHIFT_TIMES = {
  morning: { start: '08:00', end: '12:00' },
  afternoon: { start: '13:00', end: '17:00' },
  evening: { start: '18:00', end: '21:00' }
} as const

export const generateMockSchedule = (startDate: Date = new Date()): DaySchedule[] => {
  const schedule: DaySchedule[] = []
  const daysInMonth = getDaysInMonth(startDate)
  const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1)

  for (let i = 0; i < daysInMonth; i++) {
    const currentDate = addDays(firstDayOfMonth, i)
    const dateStr = format(currentDate, 'yyyy-MM-dd')

    // Random có hoặc không có ca làm việc
    const hasShifts = Math.random() > 0.3

    const shifts: ShiftDetail[] = hasShifts
      ? (
          Object.entries(DEFAULT_SHIFT_TIMES) as [
            Shift,
            (typeof DEFAULT_SHIFT_TIMES)[keyof typeof DEFAULT_SHIFT_TIMES]
          ][]
        ).map(([shiftKey, times]) => ({
          id: `${shiftKey}-${dateStr}`,
          shift: shiftKey,
          date: dateStr,
          doctors: [],
          startTime: times.start,
          endTime: times.end
        }))
      : []

    schedule.push({
      date: dateStr,
      shifts
    })
  }

  return schedule
}

// Mock danh sách bác sĩ
export const mockDoctors = [
  {
    _id: '1',
    email: 'doctor1@example.com',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      avatar: '',
      gender: 'male'
    },
    role: 'doctor'
  },
  {
    _id: '2',
    email: 'doctor2@example.com',
    profile: {
      firstName: 'Jane',
      lastName: 'Smith',
      fullName: 'Jane Smith',
      avatar: '',
      gender: 'female'
    },
    role: 'doctor'
  }
  // Thêm các bác sĩ khác...
] as any[]

const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. John Doe', avatar: '/avatars/doctor-1.png' },
  { id: '2', name: 'Dr. Jane Smith', avatar: '/avatars/doctor-2.png' },
  { id: '3', name: 'Dr. Bob Johnson', avatar: '/avatars/doctor-3.png' }
]

export const generateAdminMockSchedule = (startDate: Date = new Date()): AdminDaySchedule[] => {
  const schedule: AdminDaySchedule[] = []
  const daysInMonth = getDaysInMonth(startDate)
  const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1)

  for (let i = 0; i < daysInMonth; i++) {
    const currentDate = addDays(firstDayOfMonth, i)
    const dateStr = format(currentDate, 'yyyy-MM-dd')

    // Random whether this day has registrations
    const hasRegistrations = Math.random() > 0.5

    if (hasRegistrations) {
      const shifts: AdminDayShift[] = []

      // Morning shift
      if (Math.random() > 0.3) {
        shifts.push({
          shift: 'morning',
          startTime: '08:00',
          endTime: '12:00',
          doctors: MOCK_DOCTORS.slice(0, Math.floor(Math.random() * 3) + 1).map((doc) => ({
            doctorId: doc.id,
            doctorName: doc.name,
            avatar: doc.avatar,
            startTime: '08:00',
            endTime: '12:00',
            status: Math.random() > 0.3 ? 'approved' : 'pending',
            shift: 'morning' // Add this
          }))
        })
      }

      // Afternoon shift
      if (Math.random() > 0.3) {
        shifts.push({
          shift: 'afternoon',
          startTime: '13:00',
          endTime: '17:00',
          doctors: MOCK_DOCTORS.slice(0, Math.floor(Math.random() * 3) + 1).map((doc) => ({
            doctorId: doc.id,
            doctorName: doc.name,
            avatar: doc.avatar,
            startTime: '13:00',
            endTime: '17:00',
            status: Math.random() > 0.3 ? 'approved' : 'pending',
            shift: 'afternoon' // Add this
          }))
        })
      }

      // Evening shift
      if (Math.random() > 0.3) {
        shifts.push({
          shift: 'evening',
          startTime: '18:00',
          endTime: '21:00',
          doctors: MOCK_DOCTORS.slice(0, Math.floor(Math.random() * 3) + 1).map((doc) => ({
            doctorId: doc.id,
            doctorName: doc.name,
            avatar: doc.avatar,
            startTime: '18:00',
            endTime: '21:00',
            status: Math.random() > 0.3 ? 'approved' : 'pending',
            shift: 'evening' // Add this
          }))
        })
      }

      schedule.push({
        date: dateStr,
        shifts
      })
    } else {
      schedule.push({
        date: dateStr,
        shifts: []
      })
    }
  }

  return schedule
}
