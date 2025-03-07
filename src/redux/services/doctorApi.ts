import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from './customFetchBase'
import { CreateDoctorProfileInput, DoctorProfile } from '@/types/doctor.type'

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: customFetchBase,
  tagTypes: ['Doctor'],
  endpoints: (build) => ({
    getDoctorProfile: build.query<{ data: DoctorProfile }, string>({
      query: (id) => `doctor-profile/${id}`,
      providesTags: ['Doctor']
    }),
    createDoctorProfile: build.mutation<{ data: DoctorProfile }, CreateDoctorProfileInput>({
      query: (data) => ({
        url: 'doctor-profile/create',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Doctor']
    }),
    updateDoctorProfile: build.mutation<{ data: DoctorProfile }, { id: string; data: Partial<CreateDoctorProfileInput> }>({
      query: ({ id, data }) => ({
        url: `doctor-profile/update/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Doctor']
    })
  })
})

export const { 
  useGetDoctorProfileQuery, 
  useCreateDoctorProfileMutation, 
  useUpdateDoctorProfileMutation 
} = doctorApi
