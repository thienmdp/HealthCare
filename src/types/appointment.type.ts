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

export interface Prescription {
  medicines: {
    id: string
    name: string
    usage: string
    quantity: number
    unit: string
    price: number
  }[]
  totalAmount: number
}

export interface Appointment {
  _id: string
  patient: {
    _id: string
    profile: {
      firstName: string
      lastName: string
    }
  }
  doctor: {
    _id: string
    profile: {
      firstName: string
      lastName: string
    }
    specialties: string[]
  }
  appointmentDate: string
  startTime: string
  endTime: string
  type: 'video_call' | 'in_person'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  symptoms?: string
  diagnosis?: string
  prescription?: Prescription
  createdAt: string
  updatedAt: string
}
