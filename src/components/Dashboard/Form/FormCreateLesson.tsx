import Button from '@/components/Core/Button'
import Input from '@/components/Core/Input'
import { SectionLoading } from '@/components/Core/Loading'
import {
  useGetDetailLessonQuery,
  usePostCreateLessonMutation,
  useUpdateLessonMutation
} from '@/redux/services/courseApi'
import { useUploadFileMutation } from '@/redux/services/uploadApi'
import { schema, Schema } from '@/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsInfoCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormData = Pick<Schema, 'lesson_title' | 'lesson_content' | 'lesson_index'>
const createLessonSchema = schema.pick(['lesson_title', 'lesson_content', 'lesson_index'])

interface CreateLessonProps {
  lessonModuleId?: string
  refetchLessonModule: () => void
  isSelectedLessonModule?: boolean
}
export default function FormCreateLesson({
  lessonModuleId,
  refetchLessonModule,
  isSelectedLessonModule
}: CreateLessonProps) {
  const [uploadFile] = useUploadFileMutation()
  const [createLesson, resultCreateLesson] = usePostCreateLessonMutation()
  const [UpdateLesson, resultUpdateLesson] = useUpdateLessonMutation()

  const {
    data: detailLesson,
    isLoading,
    refetch: refetchDetailLesson
  } = useGetDetailLessonQuery(String(lessonModuleId), {
    skip: !lessonModuleId || isSelectedLessonModule
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(createLessonSchema),
    defaultValues: {
      lesson_title: detailLesson?.data?.title || '',
      lesson_content: detailLesson?.data?.content || '',
      lesson_index: detailLesson?.data?.index ? String(detailLesson?.data?.index) : ''
    }
  })

  const updateLesson = lessonModuleId && detailLesson && detailLesson.data
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (updateLesson) {
      reset({
        lesson_title: detailLesson.data.title || '',
        lesson_content: detailLesson.data.content || '',
        lesson_index: detailLesson.data.index ? String(detailLesson.data.index) : ''
      })
    } else {
      reset({
        lesson_title: '',
        lesson_content: '',
        lesson_index: ''
      })
    }
    setVideoFile(null)
    setSubtitleFile(null)
  }, [updateLesson, lessonModuleId, detailLesson, reset])

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const payload = {
        index: data.lesson_index,
        title: data.lesson_title,
        content: data.lesson_content,
        lessonModuleId: updateLesson ? undefined : String(lessonModuleId)
      }

      const lessonId = updateLesson
        ? (await UpdateLesson({ id: detailLesson.data.id, data: payload }).unwrap(), detailLesson.data.id)
        : (await createLesson(payload).unwrap()).data?.id

      if (!lessonId) {
        toast.error('Không thể lấy ID của bài học')
        return
      }

      // Upload File Promise.all
      const uploadTasks = []
      if (videoFile) uploadTasks.push(uploadFile({ file: videoFile, mimeType: 'VIDEOS', lessonId }))
      if (subtitleFile) uploadTasks.push(uploadFile({ file: subtitleFile, mimeType: 'SUBTITLES', lessonId }))
      await Promise.all(uploadTasks)

      reset()
      refetchLessonModule()

      if (updateLesson) refetchDetailLesson()

      toast.success(`${updateLesson ? 'Cập nhật' : 'Tạo'} thành công bài học ${data.lesson_title}`)
    } catch (error: any) {
      console.error('Error in lesson creation or update:', error)
      toast.error('Đã xảy ra lỗi trong quá trình xử lý.')
    } finally {
      setLoading(false)
    }
  })
  return (
    <form onSubmit={onSubmit} className='relative'>
      {loading && <SectionLoading />}
      {isLoading && <SectionLoading />}
      <div className='col-span-2 md:col-span-1'>
        <Input
          name='lesson_title'
          label='Tên bài học:'
          className='col-span-2 mt-6 md:mt-0'
          placeholder='Tên bài học'
          register={register}
          errorMessage={errors.lesson_title?.message}
          autoComplete='on'
        />
        <Input
          name='lesson_content'
          label='Mô tả bài học:'
          placeholder='Mô tả bài học'
          register={register}
          autoComplete='on'
          errorMessage={errors.lesson_content?.message}
        />
        <Input
          name='lesson_index'
          label='Vị trí bài học:'
          placeholder='Vị trí bài học'
          register={register}
          autoComplete='on'
          errorMessage={errors.lesson_index?.message}
        />
        {updateLesson && (
          <div>
            {detailLesson.data?.medias?.map((item) => (
              <div className='mb-4 text-sm'>
                <span className='font-semibold'>{item.mimeType}: </span>
                <Link to={item.mediaUrl} target='_blank' className='text-blue-600 underline'>
                  {item.mediaUrl}
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className='grid grid-cols-2 gap-8'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Tệp Video:</label>
            <input
              type='file'
              accept='video/*'
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              className='block w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-1 file:px-2 file:text-xs file:rounded-lg file:border-0 file:font-semibold file:bg-blue_app/50 file:text-white hover:file:bg-blue_app/60 file:cursor-pointer'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Tệp Phụ đề:</label>
            <input
              type='file'
              accept='.srt,.vtt'
              onChange={(e) => setSubtitleFile(e.target.files?.[0] || null)}
              className='block w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-1 file:px-2 file:text-xs file:rounded-lg file:border-0 file:font-semibold file:bg-blue_app/50 file:text-white hover:file:bg-blue_app/60 file:cursor-pointer'
            />
          </div>
        </div>
        <div
          className='p-4 my-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'
          role='alert'
        >
          <span className='flex items-center mb-2 font-medium'>
            <BsInfoCircle className='mr-2 text-base' />
            Hướng dẫn
          </span>
          <p>
            * Vị trí bài học xác định thứ tự của bài học trong module, giúp tổ chức nội dung một cách logic và dễ theo
            dõi.
          </p>
          <p>
            * File phụ đề là nội dung văn bản hiển thị trên video, hỗ trợ người xem hiểu rõ hơn nội dung qua lời thoại
            hoặc bản dịch, đặc biệt hữu ích với người dùng ở các quốc gia khác nhau.
          </p>
        </div>
      </div>
      <div className='flex items-center justify-center w-full mt-4'>
        <Button
          type='submit'
          className='flex items-center justify-center w-[220px] p-2 text-white transition-colors duration-300 rounded-md bg-gradient-to-br from-blue_app via-blue_app to-blue-700 hover:bg-gradient-to-tl focus:outline-none focus:ring-2 focus:ring-offset-2'
          isLoading={resultCreateLesson.isLoading || resultUpdateLesson.isLoading}
          disabled={resultCreateLesson.isLoading || resultUpdateLesson.isLoading}
        >
          {updateLesson ? 'Cập nhật' : 'Tạo bài học'}
        </Button>
      </div>
    </form>
  )
}
