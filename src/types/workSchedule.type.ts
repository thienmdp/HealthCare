import { User } from './user.type'

export type Shift = 'morning' | 'afternoon' | 'evening'

export interface ShiftDetail {
  id: string
  shift: Shift
  doctors: User[]
  date: string
}

export interface DaySchedule {
  date: string
  shifts: ShiftDetail[]
}

export const SHIFTS: { label: string; value: Shift }[] = [
  { label: 'Ca sáng (7:00 - 11:00)', value: 'morning' },
  { label: 'Ca chiều (13:00 - 17:00)', value: 'afternoon' },
  { label: 'Ca tối (18:00 - 21:00)', value: 'evening' }
]
