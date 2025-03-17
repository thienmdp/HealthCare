import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DoctorProfile } from '@/types/doctor.type'
import { baseURLAPI } from '@/constants/url'
import { GetDoctorScheduleResponse } from '@/types/workSchedule.type'

interface GetDoctorScheduleParams {
  id: string
  startDate: string
  endDate: string
  includeAll?: boolean
}

const baseUrl = baseURLAPI

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl
  }),
  endpoints: (build) => ({
    getPublicDoctors: build.query<{ data: { data: DoctorProfile[] } }, void>({
      query: () => ({
        url: 'doctor-profile/all',
        method: 'GET'
      })
    }),
    getPublicDoctorProfile: build.query<{ data: DoctorProfile }, string>({
      query: (id) => ({
        url: `doctor-profile/${id}`,
        method: 'GET',
        skip: !id
      })
    }),
    getPublicDoctorSchedule: build.query<GetDoctorScheduleResponse, GetDoctorScheduleParams>({
      query: ({ id, startDate, endDate, includeAll }) => ({
        url: `work-schedule/doctor`,
        method: 'GET',
        params: {
          id,
          startDate,
          endDate,
          includeAll
        },
        skip: !id
      })
    })
  })
})

export const { useGetPublicDoctorsQuery, useGetPublicDoctorProfileQuery, useGetPublicDoctorScheduleQuery } = publicApi
