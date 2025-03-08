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
    setError,
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
    if (resultLogin.error) {
      const formError = (resultLogin.error as any)?.data?.message || resultLogin.error
      if (formError) {
        if (formError === 'USER_NOT_FOUND') {
          setError('email', {
            message: 'Email không tồn tại',
            type: 'Server'
          })
        }
      }
    }
  }, [resultLogin])

  useEffect(() => {
    // Xử lý email từ state khi chuyển hướng từ trang verify hoặc signup
    if (location.state?.email) {
      setValue('email', location.state.email)

      // Nếu email đã được verify, hiển thị thông báo
      if (location.state?.verified) {
        toast.success(CustomNotification, {
          data: {
            title: 'Email đã xác thực thành công!',
            content: 'Bạn có thể đăng nhập ngay bây giờ'
          }
        })
      }
    }
  }, [location.state, setValue])

  return (
    // <div>
    //   <Helmet>
    //     <title>Đăng nhập - Diagnosis</title>
    //     <meta
    //       name='description'
    //       content='Diagnosis IQ: Smart Clinical Decision Support System for Automated Hospital.'
    //     />
    //   </Helmet>
    //   <div className='flex mt-10'>
    //     <div className='flex items-center justify-center w-full bg-gray-100 --lg:w-1/2'>
    //       <div className='w-full max-w-md p-6'>
    //         <p className='mb-6 text-3xl font-semibold text-center text-black'>Đăng nhập</p>
    //         <p className='mb-6 text-sm font-semibold text-center text-gray-700'>
    //           Bạn có thể đăng nhập vào bằng tài khoản Google{' '}
    //         </p>
    //         <div className='flex flex-col items-center justify-between mt-4 lg:flex-row'>
    //           <div className='w-full mb-2'>
    //             <GoogleOAuthClient />
    //           </div>
    //         </div>
    //         <div className='mt-4 text-sm text-center text-gray-700'>
    //           <p>hoặc bằng tài khoản diagnosisiq của mình</p>
    //         </div>
    //         <form onSubmit={onSubmit} className='space-y-4'>
    //           <Input
    //             name='email'
    //             className='mt-6'
    //             placeholder='Email'
    //             register={register}
    //             // type='email'
    //             errorMessage={errors.email?.message}
    //           />
    //           <Input
    //             name='password'
    //             className='mt-3'
    //             placeholder='Password'
    //             register={register}
    //             type='password'
    //             errorMessage={errors.password?.message}
    //             autoComplete='on'
    //           />
    //           <Button
    //             type='submit'
    //             className='flex items-center justify-center w-full p-2 text-white transition-colors duration-300 rounded-md bg-gradient-to-br to-blue-700 from-blue_app via-blue_app hover:bg-gradient-to-tl focus:outline-none focus:ring-2 focus:ring-offset-2'
    //             isLoading={resultLogin.isLoading}
    //             disabled={resultLogin.isLoading}
    //           >
    //             Đăng nhập
    //           </Button>
    //         </form>
    //         <div className='mt-4 text-sm text-center text-gray-700'>
    //           <p>
    //             Bạn chưa có tài khoản?{' '}
    //             <Link to={'/register'} className='text-black hover:underline'>
    //               Đăng ký ở đây
    //             </Link>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='flex h-screen items-center justify-center'>
      <div className='flex w-3/4 shadow-lg rounded-lg overflow-hidden relative'>
        {/* Left Side - Image */}
        <div className='w-1/2 bg-gray-100'>
          <img src='./dk.svg' alt='Lab Background' className='w-full h-full object-cover' />
        </div>

        {/* Right Side - Login Form */}
        <div className='w-1/2 flex items-center justify-center p-10 bg-white shadow-lg relative'>
          {/* Logo - Diagnosis IQ */}
          <div className='absolute top-6 right-6 flex items-center space-x-1'>
            <img src='./DAIQ.svg' alt='...' className='w-40 h-10' />
          </div>

          <div className='w-full max-w-md'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-6 text-center mt-5'>Log in to your account</h2>

            <form onSubmit={onSubmit} className='space-y-4'>
              <Input
                label={'Email'}
                name='email'
                className='mt-6'
                placeholder='Email'
                register={register}
                type='email'
                errorMessage={errors.email?.message}
              />
              <Input
                label={'Password'}
                name='password'
                className='mt-3'
                placeholder='Password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                autoComplete='on'
              />
              <Button
                type='submit'
                className='flex items-center justify-center w-full p-2 text-white transition-colors duration-300 rounded-md bg-gradient-to-br to-blue-700 from-blue_app via-blue_app hover:bg-gradient-to-tl focus:outline-none focus:ring-2 focus:ring-offset-2'
                isLoading={resultLogin.isLoading}
                disabled={resultLogin.isLoading}
              >
                Đăng nhập
              </Button>
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
