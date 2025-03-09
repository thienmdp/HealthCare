import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from './customFetchBase'
import { CreateScheduleRequest, GetDoctorScheduleResponse } from '@/types/workSchedule.type'

export const workScheduleApi = createApi({
  reducerPath: 'workScheduleApi',
  baseQuery: customFetchBase,
  tagTypes: ['WorkSchedule'],
  endpoints: (build) => ({
    getDoctorSchedule: build.query<GetDoctorScheduleResponse, string>({
      query: (doctorId) => ({
        url: `work-schedule/doctor/${doctorId}`,
        method: 'GET'
      }),
      providesTags: ['WorkSchedule']
    }),
    createWorkSchedule: build.mutation<{ message: string }, CreateScheduleRequest>({
      query: (data) => ({
        url: 'work-schedule/create',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['WorkSchedule']
    })
  })
})

export const { useGetDoctorScheduleQuery, useCreateWorkScheduleMutation } = workScheduleApi
