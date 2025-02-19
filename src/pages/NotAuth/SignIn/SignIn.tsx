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
    <div>
      <Helmet>
        <title>Đăng nhập - Học liên tục</title>
        <meta
          name='description'
          content='Diagnosis IQ: Smart Clinical Decision Support System for Automated Hospital.'
        />
      </Helmet>
      <div className='flex mt-10'>
        {/* <div className='hidden flex-1 justify-center items-center text-black bg-white lg:flex'>
          <div className='max-w-md text-center'>
            <img src='/assets/svg/login.svg' height={500} width={600} alt='asset' />
          </div>
        </div> */}
        <div className='flex justify-center items-center w-full bg-gray-100 --lg:w-1/2'>
          <div className='p-6 w-full max-w-md'>
            <p className='mb-6 text-3xl font-semibold text-center text-black'>Đăng nhập</p>
            <p className='mb-6 text-sm font-semibold text-center text-gray-700'>
              Bạn có thể đăng nhập vào bằng tài khoản Google{' '}
            </p>
            <div className='flex flex-col justify-between items-center mt-4 lg:flex-row'>
              <div className='mb-2 w-full'>
                <GoogleOAuthClient />
              </div>
            </div>
            <div className='mt-4 text-sm text-center text-gray-700'>
              <p>hoặc bằng tài khoản diagnosisiq của mình</p>
            </div>
            <form onSubmit={onSubmit} className='space-y-4'>
              <Input
                name='email'
                className='mt-6'
                placeholder='Email'
                register={register}
                // type='email'
                errorMessage={errors.email?.message}
              />
              <Input
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
                className='flex justify-center items-center p-2 w-full text-white bg-gradient-to-br to-blue-700 rounded-md transition-colors duration-300 from-blue_app via-blue_app hover:bg-gradient-to-tl focus:outline-none focus:ring-2 focus:ring-offset-2'
                isLoading={resultLogin.isLoading}
                disabled={resultLogin.isLoading}
              >
                Đăng nhập
              </Button>
            </form>
            <div className='mt-4 text-sm text-center text-gray-700'>
              <p>
                Bạn chưa có tài khoản?{' '}
                <Link to={'/register'} className='text-black hover:underline'>
                  Đăng ký ở đây
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
