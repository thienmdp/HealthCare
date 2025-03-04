import Button from '@/components/Core/Button'
import Input from '@/components/Core/Input'
import { CustomNotification } from '@/components/CustomReactToastify'
import { useRegisterAccountMutation } from '@/redux/services/authApi'
import { Schema, schema } from '@/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormData = Pick<Schema, 'firstName' | 'lastName' | 'email' | 'password' | 'confirm_password' | 'phone'>
const registerSchema = schema.pick(['firstName', 'lastName', 'email', 'password', 'confirm_password', 'phone'])

export default function SignUp() {
  const navigate = useNavigate()
  const [registerAccount, resultRegister] = useRegisterAccountMutation()

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(registerSchema) })

  const onSubmit = handleSubmit((data: FormData) => {
    // registerAccount({
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   phone: data.phone,
    //   password: data.password
    // })
  })

  useEffect(() => {
    if (resultRegister.data) {
      toast.success(CustomNotification, {
        data: {
          title: 'Đăng ký thành công!',
          content: 'Vui lòng kiểm tra email để kích hoạt tài khoản'
        }
      })
      navigate('/sign-in', { state: { email: getValues('email'), password: getValues('password') } })
    }
    if (resultRegister.error) {
      const formError = (resultRegister.error as any)?.data?.message || resultRegister.error
      if (formError) {
        if (formError === 'Email này đã sử dụng bởi người dùng khác.') {
          setError('email', {
            message: 'Email đã tồn tại',
            type: 'Server'
          })
        } else if (formError === 'Số điện thoại đã được sử dụng bởi người dùng khác.') {
          setError('phone', {
            message: 'Số điện thoại đã được sử dụng',
            type: 'Server'
          })
        } else {
          toast.error(formError)
        }
      }
    }
  }, [resultRegister, setError, getValues, navigate])

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-3xl'>
        <h2 className='text-center text-2xl font-bold text-gray-800'>Register for a Participant Account</h2>
        <p className='text-center text-gray-600 mb-6'>Create your Account</p>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
              <Input
                name='firstName'
                register={register}
                errorMessage={errors.firstName?.message}
                type='text'
                className='w-full rounded-sm'
                placeholder='Enter your first name'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
              <Input
                name='lastName'
                register={register}
                errorMessage={errors.lastName?.message}
                type='text'
                className='w-full rounded'
                placeholder='Enter your last name'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
              <Input
                name='email'
                register={register}
                errorMessage={errors.email?.message}
                type='email'
                className='w-full'
                placeholder='Enter your Email Address'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Date of Birth</label>
              <Input type='date' className='w-full' />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Phone</label>
              <Input
                name='phone'
                register={register}
                errorMessage={errors.phone?.message}
                type='phone'
                className='w-full rounded'
                placeholder='Enter your phone number'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Gender</label>
              <select className='w-full p-3 border rounded bg-gray-100'>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <Input
                name='password'
                register={register}
                errorMessage={errors.password?.message}
                type='password'
                className='w-full'
                placeholder='Enter your password'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Confirm Password</label>
              <Input
                name='confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                type='password'
                className='w-full'
                placeholder='Confirm your password'
              />
            </div>
          </div>

          <div className='flex justify-between mt-6'>
            <Button type='button' className='px-6 py-2 border border-gray-700 rounded bg-cyan-500 hover:bg-gray-500'>
              CANCEL
            </Button>
            <Button
              isLoading={resultRegister.isLoading}
              disabled={resultRegister.isLoading}
              type='submit'
              className='px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-800'
            >
              SUBMIT
            </Button>
          </div>

          <div className='mt-4 text-sm text-center text-gray-700'>
            <p>
              Đã có tài khoản?{' '}
              <Link to={'/sign-in'} className='text-black hover:underline'>
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
