import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from './customFetchBase'

interface CreateAppointmentInput {
  doctor: string
  patient: string
  appointmentDate: string
  startTime: string
  endTime: string
  type: 'video_call' | 'in_person'
  symptoms?: string
}

interface Appointment {
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
  }
  appointmentDate: string
  startTime: string
  endTime: string
  type: 'video_call' | 'in_person'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: customFetchBase,
  tagTypes: ['Appointment'],
  endpoints: (build) => ({
    createAppointment: build.mutation<{ data: Appointment }, CreateAppointmentInput>({
      query: (data) => ({
        url: 'appointment/create',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Appointment']
    }),
    getMyAppointments: build.query<{ data: Appointment[] }, void>({
      query: () => 'appointment/my-appointment',
      providesTags: ['Appointment']
    })
  })
})

export const { useCreateAppointmentMutation, useGetMyAppointmentsQuery } = appointmentApi
