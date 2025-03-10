export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface DoctorScheduleDay {
  date: string
  shifts: {
    shift: 'morning' | 'afternoon' | 'evening'
    startTime: string
    endTime: string
    timeSlots: TimeSlot[]
  }[]
}

export interface AppointmentRequest {
  doctorId: string
  patientId: string
  appointmentDate: string
  timeSlot: {
    startTime: string
    endTime: string
  }
  symptoms?: string
  note?: string
}
