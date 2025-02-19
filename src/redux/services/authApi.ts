// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createApi } from '@reduxjs/toolkit/query/react'

import customFetchBase from './customFetchBase'
import { userApi } from './userApi'
import { AuthResponse, LoginInput, RegisterInput } from '@/types/auth.type'
import { setAccessToken, setRoleUser } from '../features/auth.slice'
import Cookies from 'js-cookie'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    loginUser: build.mutation<AuthResponse, LoginInput>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log('LOGIN DATA', data)
          await dispatch(setAccessToken(data.accessToken))
          Cookies.set('accessToken', data.accessToken)
          Cookies.set('isAuthenticated', 'true')
          await dispatch(userApi.endpoints.getMe.initiate(null, { forceRefetch: true }))
        } catch (error) {
          console.error('Error in loginUser:', error)
        }
      }
    }),
    changePassword: build.mutation<AuthResponse, { oldPassword: string; newPassword: string }>({
      query(data) {
        return {
          url: `auth/change-password`,
          method: 'POST',
          body: data
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (error) {
          console.error('Error in changePassword:', error)
        }
      }
    }),
    registerAccount: build.mutation<AuthResponse, RegisterInput>({
      query(data) {
        return {
          url: 'auth/register',
          method: 'POST',
          body: data
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (error) {
          console.error('Error in registerAccount onQueryStarted:', error)
        }
      }
    }),
    confirmToken: build.mutation<AuthResponse, { token: string }>({
      query: (token) => ({
        url: 'auth/google',
        method: 'POST',
        body: token
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          await dispatch(setAccessToken(data.accessToken))
          Cookies.set('accessToken', data.accessToken)
          Cookies.set('isAuthenticated', 'true')
        } catch (error) {
          console.error('Error in confirmToken:', error)
        }
      }
    }),
    verifyEmail: build.mutation<AuthResponse, { token: string }>({
      query: ({ token }) => ({
        url: `auth/verify-email${token ? `?token=${token}` : ''}`,
        method: 'GET'
      })
    })
  })
})

export const {
  useLoginUserMutation,
  useRegisterAccountMutation,
  useChangePasswordMutation,
  useConfirmTokenMutation,
  useVerifyEmailMutation
} = authApi
