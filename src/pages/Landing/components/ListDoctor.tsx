import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { User } from '@/types/user.type'
import { bufferToHex } from '@/utils/utils'
import { ArrowRight, Search } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { DoctorProfile } from '@/types/doctor.type'

export default function ListDoctor({ listDoctor }: { listDoctor: DoctorProfile[] }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDoctors = listDoctor.filter((doctor) => {
    const fullName = `${doctor.doctorName}`.toLowerCase()
    const searchLower = searchTerm.toLowerCase()
    return fullName.includes(searchLower)
  })

  return (
    <section className='px-6 py-16 sm:px-0 bg-gray-50 sm:-mx-1/1'>
      <div className='container px-4 mx-auto'>
        <div className='max-w-2xl mx-auto mb-16 text-center'>
          <h2 className='text-3xl font-bold md:text-4xl'>Đặt lịch khám trực tuyến</h2>
          <p className='mt-4 text-gray-500'>
            Đặt lịch khám với các bác sĩ chuyên khoa hàng đầu, tiết kiệm thời gian chờ đợi
          </p>

          {/* Add search input */}
          <div className='relative max-w-md mx-auto mt-8 bg-white'>
            <Search className='absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2' />
            <Input
              type='text'
              placeholder='Tìm kiếm theo tên bác sĩ hoặc chuyên khoa...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 rounded-full '
            />
          </div>
        </div>

        <div className='relative'>
          <Carousel
            opts={{
              align: 'start',
              loop: filteredDoctors.length > 4
            }}
            className='w-full'
          >
            <CarouselContent className='-ml-4'>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor, index) => (
                  <CarouselItem
                    key={bufferToHex(doctor._id) + index}
                    className='pl-4 basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/5'
                  >
                    <Card className='h-full overflow-hidden'>
                      <div className='flex flex-col h-full '>
                        <div className='flex items-center w-full p-4 pb-0'>
                          <Avatar className='w-16 h-16 border-4 border-white'>
                            <AvatarImage src={doctor.doctor?.profile?.avatar} />
                            <AvatarFallback>{doctor.doctor?.profile?.lastName}</AvatarFallback>
                          </Avatar>
                          <div className='ml-4'>
                            <h3 className='text-lg font-semibold capitalize'>
                              {doctor.doctor?.profile?.firstName + ' ' + doctor.doctor?.profile?.lastName}
                            </h3>
                            <p className='text-sm font-light'>{doctor.doctor?.role}</p>
                          </div>
                        </div>
                        <div className='flex flex-wrap gap-2 p-4'>
                          <Badge variant='secondary'>Thần kinh</Badge>
                          <Badge variant='outline'>Nội tổng hợp</Badge>
                        </div>
                        <div>
                          <div className='h-[1px] w-full bg-gray-200' />
                          <Button
                            className='w-full justify-between !no-underline text-primary hover:!text-primary'
                            size='sm'
                            variant='link'
                            effect='expandIcon'
                            Icon={ArrowRight}
                            iconPlacement='right'
                            onClick={() => navigate(`/doctor/${bufferToHex(doctor._id)}`)}
                          >
                            Đặt lịch khám
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className='pl-4 basis-full'>
                  <div className='py-8 text-center text-gray-500'>
                    Không tìm thấy bác sĩ phù hợp với tìm kiếm của bạn
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            {filteredDoctors.length > 4 && (
              <>
                <CarouselPrevious className='absolute -left-12 top-1/2' />
                <CarouselNext className='absolute -right-12 top-1/2' />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
