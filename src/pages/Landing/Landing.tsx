import React from 'react'
import { Advance, Hero, ListDoctor, Quality } from './components'
import { useGetPublicDoctorsQuery } from '@/redux/services/publicApi'
import { Skeleton } from '@/components/ui/skeleton'

const LandingContent: React.FC = () => {
  const { data: doctors, isLoading } = useGetPublicDoctorsQuery()
  console.log('doctors', doctors)
  return (
    <div className='bg-white text-[#000000] min-h-screen w-full'>
      <Hero />
      <Advance />
      <Quality />
      {isLoading ? (
        <div className='container px-4 py-16 mx-auto'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className='h-[200px] w-full' />
            ))}
          </div>
        </div>
      ) : (
        <ListDoctor listDoctor={doctors?.data?.data || []} />
      )}
      <div className='min-h-screen'></div>
    </div>
  )
}

export default LandingContent
