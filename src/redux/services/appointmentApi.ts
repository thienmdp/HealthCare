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

interface VideoMeeting {
  appointmentId: {
    buffer: {
      type: 'Buffer'
      data: number[]
    }
  }
  meetingId: string
}

interface VideoCallsResponse {
  data: VideoMeeting[]
}

// Response khi tham gia cuộc gọi video
interface JoinVideoCallResponse {
  data: Appointment
}

// Response khi lấy thông tin video call
interface VideoCallData {
  appointmentId: {
    buffer: {
      type: 'Buffer'
      data: number[]
    }
  }
  videoCallInfo: {
    provider: string
    meetingUrl: string
    meetingId: string
    password: string | null
    joinedAt: string
  }
  isVideoCallStarted: boolean
  isVideoCallEnded: boolean
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
    }),
    getVideoMeetings: build.query<VideoCallsResponse, void>({
      query: () => 'appointment/video-calls/meetings',
      providesTags: ['Appointment']
    }),
    joinVideoCall: build.mutation<JoinVideoCallResponse, string>({
      query: (appointmentId) => ({
        url: `appointment/join/${appointmentId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Appointment']
    }),
    endVideoCall: build.mutation<{ message: string }, string>({
      query: (appointmentId) => ({
        url: `appointment/end/${appointmentId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Appointment']
    }),
    getVideoCallData: build.query<{ data: VideoCallData }, string>({
      query: (meetingId) => ({
        url: `appointment/video-calls/meetings/${meetingId}`,
        method: 'GET'
      }),
      providesTags: ['Appointment']
    })
  })
})

export const {
  useCreateAppointmentMutation,
  useGetMyAppointmentsQuery,
  useGetAllAppointmentsQuery,
  useGetAppointmentDetailQuery,
  useApproveAppointmentMutation,
  useCancelAppointmentMutation,
  useGetVideoMeetingsQuery,
  useJoinVideoCallMutation,
  useEndVideoCallMutation,
  useGetVideoCallDataQuery
} = appointmentApi
