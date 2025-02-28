import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const SignUp = () => {
  interface FormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    gender: string
    day: string
    month: string
    year: string
    password: string
    confirmPassword: string
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    day: '',
    month: '',
    year: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let newErrors: { [key: string]: string } = {}
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData]) {
        newErrors[key] = 'This field is required'
      }
    })
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully')
    }
  }

  const DatePicker = () => {
    const [date, setDate] = useState({ day: '', month: '', year: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setDate({ ...date, [e.target.name]: e.target.value })
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-3xl'>
        <h2 className='text-center text-2xl font-bold text-gray-800'>Register for a Participant Account</h2>
        <p className='text-center text-gray-600 mb-6'>Create your Account</p>

        <form>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
              <input
                type='text'
                className='w-full p-2 border rounded bg-gray-100'
                placeholder='Enter your first name'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
              <input type='text' className='w-full p-2 border rounded bg-gray-100' placeholder='Enter your last name' />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
              <input
                type='email'
                className='w-full p-2 border rounded bg-gray-100'
                placeholder='Enter your Email Address'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Date of Birth</label>
              <input type='date' className='w-full p-2 border rounded bg-gray-100' />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Phone</label>
              <input
                type='text'
                className='w-full p-2 border rounded bg-gray-100'
                placeholder='Enter your phone number'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Gender</label>
              <select className='w-full p-2 border rounded bg-gray-100'>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
              <input
                type='password'
                className='w-full p-2 border rounded bg-gray-100'
                placeholder='Enter your password'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-00 mb-2'>Confirm Password</label>
              <input
                type='password'
                className='w-full p-2 border rounded bg-gray-100'
                placeholder='Confirm your password'
              />
            </div>
          </div>

          <div className='flex justify-between mt-6'>
            <Button type='button' className='px-6 py-2 border border-gray-700 rounded text-gray-50 hover:bg-gray-500'>
              CANCEL
            </Button>
            <Button type='submit' className='px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-800'>
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
