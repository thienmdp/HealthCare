import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from './customFetchBase'
import { logOut, setAuthenticated, setRoleUser, setUser } from '../features/auth.slice'
import { CreateUserInput, ICourseOfUserPublic, UpdateInfoUserInput, User } from '@/types/user.type'
import Cookies from 'js-cookie'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (build) => ({
    getMe: build.query<{ data: User }, null>({
      query: () => 'users/token',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // console.log('LOG ', data)
          await dispatch(setRoleUser(data.data.roles))
          dispatch(setUser(data.data))
          dispatch(setAuthenticated(true))
          Cookies.set('userRole', data.data.roles)
          Cookies.set('currentUser', JSON.stringify(data.data))
        } catch (error) {
          dispatch(setUser(null))
          dispatch(setAuthenticated(false))
          dispatch(logOut())
        }
      }
    }),
    updateMe: build.mutation<{ data: User }, { id: string; data: UpdateInfoUserInput }>({
      query({ id, data }) {
        return {
          url: `users/${id}`,
          method: 'PATCH',
          body: data
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (error) {
          console.error('Error in updateMe:', error)
        }
      }
    }),
    getProfileUser: build.query<{ data: User }, string>({
      query: (id) => `users/${id}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (error) {
          console.log('ERROR: ', error)
        }
      }
    }),
    getCourseUser: build.query<{ data: ICourseOfUserPublic[] }, string | null>({
      query: (id) => `users/courses${id === null ? '' : '?userId=' + id}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (error) {
          console.log('ERROR: ', error)
        }
      }
    }),
    getAllUser: build.query<{ data: User[] }, null>({
      query: (branchId) => `users`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (error) {
          console.log('ERROR: ', error)
        }
      }
    }),
    createUser: build.mutation<{ data: User }, CreateUserInput>({
      query(data) {
        return {
          url: 'users',
          method: 'POST',
          body: data
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (error) {
          console.error('Error in createUser:', error)
        }
      }
    })
  })
})
export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useGetProfileUserQuery,
  useGetCourseUserQuery,
  useCreateUserMutation,
  useGetAllUserQuery
} = userApi
