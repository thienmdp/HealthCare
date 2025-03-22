import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from './customFetchBase'
import { ApiResponse } from '@/types/api.type'

export interface Package {
  _id: {
    buffer: {
      type: string
      data: number[]
    }
  }
  name: string
  description: string
  appointmentCount: number
  price: number
  isActive: boolean
  validityPeriod: number
  features: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface PackageParams {
  name: string
  description: string
  appointmentCount: number
  price: number
  isActive: boolean
  validityPeriod: number
  features: string[]
}

export const packageApi = createApi({
  reducerPath: 'packageApi',
  baseQuery: customFetchBase,
  tagTypes: ['Package'],
  endpoints: (builder) => ({
    getAllPackages: builder.query<ApiResponse<Package[]>, null>({
      query: () => ({
        url: '/appointment-package/all',
        method: 'GET'
      }),
      providesTags: ['Package']
    }),
    getAllActivePackages: builder.query<ApiResponse<Package[]>, null>({
      query: () => ({
        url: '/appointment-package/all-active',
        method: 'GET'
      }),
      providesTags: ['Package']
    }),
    getPackageById: builder.query<ApiResponse<Package>, string>({
      query: (id: string) => ({
        url: `/appointment-package/${id}`,
        method: 'GET'
      }),
      providesTags: (_: any, __: any, id: string) => [{ type: 'Package', id }]
    }),
    createPackage: builder.mutation<ApiResponse<Package>, PackageParams>({
      query: (body: PackageParams) => ({
        url: '/appointment-package',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Package']
    }),
    updatePackage: builder.mutation<ApiResponse<Package>, { id: string; body: Partial<PackageParams> }>({
      query: ({ id, body }: { id: string; body: Partial<PackageParams> }) => ({
        url: `/appointment-package/update/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: (_: any, __: any, { id }: { id: string }) => [{ type: 'Package', id }, 'Package']
    }),
    deletePackage: builder.mutation<ApiResponse<null>, string>({
      query: (id: string) => ({
        url: `/appointment-package/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Package']
    })
  })
})

export const {
  useGetAllPackagesQuery,
  useGetAllActivePackagesQuery,
  useGetPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation
} = packageApi
