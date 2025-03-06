import { useDeleteQuizOfLessonMutation, useGetQuizOfLessonQuery } from '@/redux/services/courseApi'
import { Button, Checkbox, List, Empty, Dropdown, MenuProps, Popconfirm } from 'antd'
import ModalCreateQuiz from '../Modal/ModalCreateQuiz'
import ModalCreateQuestion from '../Modal/ModalCreateQuestion'
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import styled from 'styled-components'

interface CreateQuizProps {
  lessonModuleId?: string
  refetchLessonModule: () => void
  isSelectedLessonModule?: boolean
}

interface QuizItemType {
  length?: number
  // ...other properties
}

const StyledListItem = styled.div`
  &.ant-list-item {
    border-block-end: unset; /* Loại bỏ border-block-end */
  }
`

export default function FormCreateQuiz({ lessonModuleId, isSelectedLessonModule }: CreateQuizProps) {
  const {
    data: detailQuiz,
    isLoading,
    refetch
  } = useGetQuizOfLessonQuery(String(lessonModuleId), {
    skip: !lessonModuleId || isSelectedLessonModule
  })

  const [deleteQuiz] = useDeleteQuizOfLessonMutation()
  const quizData = detailQuiz ? detailQuiz.data : null

  if (!lessonModuleId || isSelectedLessonModule) {
    return <Empty description='Không có bài học được chọn' />
  }

  if (!quizData || (quizData as QuizItemType).length === 0) {
    return (
      <div className='flex items-center justify-end'>
        <ModalCreateQuiz lessonModuleId={lessonModuleId} />
      </div>
    )
  }

  const handleDeleteLessonModule = async () => {
    try {
      const res = await deleteQuiz(quizData.id)
      if (res.data) {
        refetch()
        toast.success('Đã xóa Quiz & Test!')
      } else {
        toast.error('Không thể xóa Quiz & Test!')
      }
    } catch (error) {
      console.error('Error deleting quiz:', error)
      toast.error('Có lỗi xảy ra khi xóa quiz.')
    }
  }

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: <ModalCreateQuiz lessonModuleId={lessonModuleId || ''} dataQuiz={quizData} />
    },
    {
      key: '2',
      label: (
        <Popconfirm title='Xoá Quiz & Test' onConfirm={handleDeleteLessonModule} okText='Yes' cancelText='No'>
          <div className='text-default'>
            <DeleteOutlined className='mr-1' />
            Xoá
          </div>
        </Popconfirm>
      )
    }
  ]

  return (
    <div>
      <div className='mb-5'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='text-base font-semibold'>{quizData?.title}</div>
            <div>
              <b>Description:</b> {quizData?.description}
            </div>
          </div>
          <Dropdown menu={{ items: menuItems }} placement='bottomRight' arrow={{ pointAtCenter: true }}>
            <MoreOutlined className='text-lg font-semibold hover:text-blue-700' />
          </Dropdown>
        </div>
      </div>
      <List
        header={
          <div className='flex items-center justify-between'>
            <b>Questions</b>
            <ModalCreateQuestion quizId={quizData.id} lessonModuleId={lessonModuleId || ''} />
          </div>
        }
        bordered
        dataSource={quizData.questions}
        renderItem={(question, index) => (
          <List.Item>
            <div>
              <p>
                <b>
                  {index + 1}. {question.content}
                </b>
              </p>
              <List
                dataSource={question.options}
                renderItem={(option) => (
                  <StyledListItem>
                    <List.Item>
                      <Checkbox checked={option.isCorrect}>{option.content}</Checkbox>
                    </List.Item>
                  </StyledListItem>
                )}
              />
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}
