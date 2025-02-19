import { hideErrorToast, showErrorToast } from '@/redux/features/errorToast.slice'
import { RootState } from '@/redux/store'
import { ErrorData } from '@/types/utils.type'
import { format, parseISO } from 'date-fns'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const getAccessToken = () => {
  const accessTokenString = Cookies.get('accessToken')
  // console.log('accessTokenString', accessTokenString)
  if (accessTokenString) {
    try {
      const accessToken = accessTokenString
      return accessToken
    } catch (error) {
      console.error('Error parsing access token from cookie:', error)
      return null
    }
  }
  return null
}

export function extractErrorMessage(error: any): string {
  console.log('[INFO] Extracting error message:', error)

  if (error instanceof Error) {
    return error.message
  }

  const errorData = error as ErrorData

  // Xử lý các trường hợp message có thể là mảng
  const possibleMessages = [
    errorData?.data?.data?.message,
    errorData?.data?.message,
    errorData?.message,
    errorData?.error
  ]

  for (const message of possibleMessages) {
    if (Array.isArray(message)) {
      return message.join(', ')
    }
    if (typeof message === 'string' && message) {
      return message
    }
  }

  return 'Có lỗi xảy ra trong quá trình xử lý.'
}

export const myPromiseHandle = (timeout: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5
      if (success) {
        resolve('Thành công!')
      } else {
        reject(new Error('Thất bại!'))
      }
    }, timeout)
  })
}

export function HandleSubmitPromise({ promise, title, thenFunc }: any) {
  const dispatch = useDispatch()
  const isErrorToastDisplayed = useSelector((state: RootState) => state.errorToast.isErrorToastDisplayed)
  if (!isErrorToastDisplayed) {
    toast
      .promise(promise, {
        pending: 'Đang xử lý...',
        success: title,
        error: {
          render({ data }) {
            console.log('ERROR', data)
            dispatch(showErrorToast())
            dispatch(hideErrorToast())
            return extractErrorMessage(data)
          }
        }
      })
      .then((response) => {
        console.log('response', response)
        thenFunc()
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}
export function formatDateOfBirth(dateOfBirth?: string, formatString: string = 'dd/MM/yyyy'): string {
  try {
    if (!dateOfBirth) {
      return '--'
    }
    const parsedDate = parseISO(dateOfBirth)
    return format(parsedDate, formatString)
  } catch (error) {
    console.error('Lỗi định dạng ngày:', error)
    return '--'
  }
}
