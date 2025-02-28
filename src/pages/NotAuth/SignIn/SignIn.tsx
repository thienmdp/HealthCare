import { useLoginUserMutation } from '@/redux/services/authApi'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from '@/utils/rules'
import Input from '@/components/Core/Input'
import Button from '@/components/Core/Button'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import GoogleOAuthClient from '@/components/Auth/GoogleOAuthClient'
import { Helmet } from 'react-helmet-async'
import { CustomNotification } from '@/components/CustomReactToastify'
import '../../../../public/sigin.png'
import '../../../../public/Group 3_I.png'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loginUser, resultLogin] = useLoginUserMutation()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })

  const onSubmit = handleSubmit((data) => {
    loginUser({
      email: data.email,
      password: data.password
    })
  })

  useEffect(() => {
    if (resultLogin.data) {
      toast.dismiss()
      toast(CustomNotification, {
        data: {
          title: 'Welcome back!',
          content: `⭐ Hi,  ${getValues('email')} `
        }
      })

      const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard'
      navigate(redirectPath)
      sessionStorage.removeItem('redirectAfterLogin')
    }
  }, [resultLogin])

  useEffect(() => {
    if (location.state?.email && location.state?.password) {
      setValue('email', location.state.email)
      setValue('password', location.state.password)
    }
  }, [location, setValue])

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex w-3/4 shadow-lg rounded-lg overflow-hidden relative'>
        {/* Left Side - Image */}
        <div className='w-1/2 bg-gray-100'>
          <img src='./sigin.png' alt='Lab Background' className='w-full h-full object-cover' />
        </div>

        {/* Right Side - Login Form */}
        <div className='w-1/2 flex items-center justify-center p-10 bg-white shadow-lg relative'>
          {/* Logo - Diagnosis IQ */}
          <div className='absolute top-6 right-6 flex items-center space-x-1'>
            <span className='text-lg font-bold text-gray-800'>Diagnosis</span>
            <img src='./Group 3_I.png' alt='I icon' className='h-5 w-5' />
            {/* sương ơi chỉnh sửa lại chữ I nhé */}
            <span className='text-lg font-bold text-gray-800'>Q</span>
          </div>

          <div className='w-full max-w-md'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-6 text-center'>Log in to your account</h2>

            <form>
              <div className='mb-4'>
                <label className='block text-gray-700'>Email</label>
                <input
                  type='email'
                  placeholder='Enter your Email here'
                  className='w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div className='mb-4 relative'>
                <label className='block text-gray-700'>Password</label>
                <input
                  type='password'
                  placeholder='Enter your Password'
                  className='w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div className='flex items-center justify-between mb-6'>
                <div>
                  <input type='checkbox' id='remember' className='mr-2' />
                  <label htmlFor='remember' className='text-gray-700'>
                    Remember me
                  </label>
                </div>
                <a href='#' className='text-blue-600 hover:underline'>
                  Forgot Password?
                </a>
              </div>

              <button
                type='submit'
                className='w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-300'
              >
                Login
              </button>
            </form>

            <p className='text-center text-gray-600 mt-4'>
              Don't have an account?
              <a href='/register' className='text-blue-600 hover:underline ml-1'>
                Register Now
              </a>
            </p>

            <p className='text-center text-gray-500 text-sm mt-28'>
              Copyright ©C2SE.48. All rights reserved.
              <a href='/register' className='text-blue-600 hover:underline ml-1'>
                Terms & Conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
