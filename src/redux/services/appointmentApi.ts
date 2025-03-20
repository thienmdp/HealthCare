import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from './customFetchBase'
import { PaginationResponse, AppointmentResponse, Appointment } from '@/types/appointment.type'

interface CreateAppointmentInput {
  doctor: string
  patient: string
  appointmentDate: string
  startTime: string
  endTime: string
  type: 'video_call' | 'in_person'
  medicalInfo?: {
    symptoms?: string
    reason?: string
    notes?: string
  }
}

interface GetAppointmentsParams {
  page?: number
  limit?: number
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
    getMyAppointments: build.query<AppointmentResponse, GetAppointmentsParams>({
      query: (params) => ({
        url: 'appointment/my-appointment',
        params
      }),
      providesTags: ['Appointment']
    }),
    getAllAppointments: build.query<AppointmentResponse, GetAppointmentsParams>({
      query: (params) => ({
        url: 'appointment/all',
        params
      }),
      providesTags: ['Appointment']
    }),
    getAppointmentDetail: build.query<{ data: Appointment }, string>({
      query: (id) => `appointment/${id}`,
      providesTags: ['Appointment']
    }),
    approveAppointment: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `appointment/approve/${id}`,
        method: 'POST'
      }),
      invalidatesTags: ['Appointment']
    }),
    cancelAppointment: build.mutation<{ message: string }, { id: string; reason: string }>({
      query: (body) => ({
        url: 'appointment/cancel',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Appointment']
    })
  })
})

export const {
  useCreateAppointmentMutation,
  useGetMyAppointmentsQuery,
  useGetAllAppointmentsQuery,
  useGetAppointmentDetailQuery,
  useApproveAppointmentMutation,
  useCancelAppointmentMutation
} = appointmentApi
