import Button from '@/components/Core/Button'
import Input from '@/components/Core/Input'
import { CustomNotification } from '@/components/CustomReactToastify'
import { useRegisterAccountMutation } from '@/redux/services/authApi'
import { Schema, schema } from '@/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password' | 'full_name' | 'phone'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password', 'full_name', 'phone'])

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
    registerAccount({
      full_name: data.full_name,
      email: data.email,
      phone_number: data.phone,
      password: data.password
    })
  })

  useEffect(() => {
    if (resultRegister.data) {
      console.log('resultRegister.data', resultRegister.data)
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
    console.log('resultRegister=>', resultRegister)
  }, [resultRegister])

  return (
    <div className='flex mt-10'>
      <Helmet>
        <title>Đăng ký - Học liên tục</title>
        <meta
          name='description'
          content='Diagnosis IQ: Smart Clinical Decision Support System for Automated Hospital.'
        />
      </Helmet>
      {/* <div className='hidden flex-1 justify-between items-center text-black bg-white lg:flex'>
        <div className='max-w-md text-center'>
          <img src='/assets/svg/register.svg' height={500} width={600} alt='' />
        </div>
      </div> */}
      <div className='flex justify-center items-center w-full bg-gray-100 --lg:w-1/2'>
        <div className='p-6 w-full max-w-md xl:max-w-xl'>
          <p className='mb-6 text-3xl font-semibold text-center text-black'>Đăng ký</p>
          <p className='mb-6 text-sm font-semibold text-center text-gray-700'>
            Tham gia Cộng đồng của chúng tôi với quyền truy cập mọi lúc và miễn phí{' '}
          </p>
          <form onSubmit={onSubmit} className='space-y-4'>
            <Input
              name='email'
              className='mt-6'
              placeholder='Email'
              register={register}
              type='email'
              errorMessage={errors.email?.message}
            />
            <Input
              name='phone'
              className='mt-6'
              placeholder='Phone Number'
              register={register}
              type='phone'
              errorMessage={errors.phone?.message}
            />
            <Input
              name='full_name'
              className='mt-6'
              placeholder='Full name'
              register={register}
              errorMessage={errors.full_name?.message}
            />
            <div className='grid grid-cols-2 gap-x-4 mt-6'>
              <Input
                name='password'
                placeholder='Password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                autoComplete='on'
              />
              <Input
                name='confirm_password'
                placeholder='Confirm Password'
                register={register}
                type='password'
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
                // rules={rules.confirm_password}
              />
            </div>
            <Button
              type='submit'
              className='flex justify-center items-center p-2 w-full text-white bg-gradient-to-br to-blue-700 rounded-md transition-colors duration-300 from-blue_app via-blue_app hover:bg-gradient-to-tl focus:outline-none focus:ring-2 focus:ring-offset-2'
              isLoading={resultRegister.isLoading}
              disabled={resultRegister.isLoading}
            >
              Đăng ký
            </Button>
          </form>
          <div className='mt-4 text-sm text-center text-gray-700'>
            <p>
              Đã có tài khoản?{' '}
              <Link to={'/sign-in'} className='text-black hover:underline'>
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
