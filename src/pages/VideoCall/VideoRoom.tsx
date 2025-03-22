import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { zegoCloudAppID, zegoCloudServerSecret } from '@/constants/url'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import { bufferToHex } from '@/utils/utils'
import { useJoinVideoCall } from '@/hooks/useJoinVideoCall'
import {
  useGetVideoCallDataQuery,
  useJoinVideoCallMutation,
  useEndVideoCallMutation
} from '@/redux/services/appointmentApi'
import { toast } from 'react-toastify'

export default function VideoRoom() {
  const { roomId } = useParams<{ roomId: string }>()
  const myMeeting = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.authState)
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Sử dụng isDev khi ở môi trường phát triển
  const { isLoadingMeetings } = useJoinVideoCall({ isDev: true })

  // RTK Query hooks
  const [joinVideoCall] = useJoinVideoCallMutation()
  const [endVideoCall] = useEndVideoCallMutation()
  const {
    data: videoCallData,
    isLoading: isLoadingVideoCallData,
    isError,
    error: videoCallError
  } = useGetVideoCallDataQuery(roomId || '', {
    skip: !roomId
  })

  console.log('videoCallData', videoCallData)
  console.log('videoCallError', videoCallError)
  console.log('error', error)
  console.log('user', user)

  // Xử lý lỗi khi lấy dữ liệu
  useEffect(() => {
    if (isError && videoCallError) {
      setError('Không thể tải thông tin cuộc hẹn')
    }
  }, [isError, videoCallError])

  // Xác định liệu user hiện tại có phải là bác sĩ hoặc admin không
  const isHost = user?.role === 'doctor' || user?.role === 'admin'

  // Kiểm tra xem cuộc gọi đã kết thúc chưa
  const isCallEnded = videoCallData?.data?.isVideoCallEnded || false
  const isCallStarted = videoCallData?.data?.isVideoCallStarted || false

  // Xử lý tạo và tham gia phòng họp video
  useEffect(() => {
    if (!roomId || !user || !myMeeting.current || !videoCallData?.data) return

    // Kiểm tra xem cuộc gọi đã kết thúc chưa
    if (isCallEnded) {
      setError('Cuộc gọi video này đã kết thúc')
      return
    }

    // Kiểm tra xem cuộc gọi đã bắt đầu chưa (trừ khi là bác sĩ/admin)
    if (!isCallStarted && !isHost) {
      setError('Cuộc gọi video chưa được bắt đầu. Vui lòng chờ bác sĩ bắt đầu cuộc gọi.')
      return
    }

    // Kiểm tra xem có thông tin video call không
    if (!videoCallData?.data.videoCallInfo) {
      setError('Thông tin cuộc gọi video không hợp lệ')
      return
    }

    // Lấy meetingId từ API
    const meetingId = videoCallData.data.videoCallInfo.meetingId

    // Lấy appointmentId từ dữ liệu
    const appointmentId = bufferToHex(videoCallData.data.appointmentId)

    // Kiểm tra xem meetingId có hợp lệ không
    if (!meetingId) {
      setError('Thông tin phòng họp không hợp lệ')
      return
    }

    // Tạo instance cho ZegoUIKit
    const createMeeting = async () => {
      setIsCreatingRoom(true)
      try {
        // Tạo một Kit token cho xác thực với ZegoCloud
        const appID = Number(zegoCloudAppID)
        const serverSecret = zegoCloudServerSecret
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          meetingId,
          bufferToHex(user._id), // userID lấy từ redux store
          user.profile?.firstName + ' ' + user.profile?.lastName // userName hiển thị
        )

        // Tạo instance của ZegoUIKitPrebuilt
        const zp = ZegoUIKitPrebuilt.create(kitToken)

        // Khởi tạo phòng video call
        zp.joinRoom({
          container: myMeeting.current,
          sharedLinks: [
            {
              name: 'Copy link',
              url: videoCallData.data.videoCallInfo.meetingUrl || `${window.location.origin}/room/${meetingId}`
            }
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference
          },
          showTurnOffRemoteCameraButton: isHost, // Chỉ bác sĩ/admin có thể tắt camera của người khác
          showTurnOffRemoteMicrophoneButton: isHost, // Chỉ bác sĩ/admin có thể tắt micro của người khác
          showRemoveUserButton: isHost, // Chỉ bác sĩ/admin có thể xóa người tham gia khỏi cuộc gọi
          showUserList: true,
          maxUsers: 10,
          layout: 'Auto', // Bố cục tự động điều chỉnh theo số lượng người tham gia
          showScreenSharingButton: true,
          showRoomDetailsButton: true,
          onLeaveRoom: async () => {
            // Chỉ host (doctor/admin) mới có thể kết thúc cuộc gọi
            if (isHost) {
              // Hỏi người dùng xem họ có muốn kết thúc cuộc gọi không
              const confirmed = window.confirm('Bạn có muốn kết thúc cuộc gọi cho tất cả mọi người không?')
              if (confirmed) {
                try {
                  // Gọi API kết thúc cuộc gọi
                  await endVideoCall(appointmentId).unwrap()
                  toast.success('Cuộc gọi đã kết thúc thành công')
                } catch (error) {
                  console.error('Error ending call:', error)
                  toast.error('Không thể kết thúc cuộc gọi')
                }
              }
            }

            // Chuyển hướng về trang trước đó khi rời phòng
            navigate(-1)
          }
        })
      } catch (error) {
        console.error('Error creating Zego meeting:', error)
        setError('Có lỗi xảy ra khi tạo phòng họp')
      } finally {
        setIsCreatingRoom(false)
      }
    }

    // Nếu là bác sĩ và chưa bắt đầu cuộc gọi hoặc đang ở chế độ phát triển, gọi API để bắt đầu
    const startMeeting = async () => {
      // Ở chế độ phát triển hoặc là bác sĩ mà cuộc gọi chưa bắt đầu
      if (isHost && !videoCallData.data.videoCallInfo.joinedAt) {
        try {
          // Bắt đầu cuộc gọi video cho phòng họp này
          await joinVideoCall(appointmentId).unwrap()
          toast.success('Đã bắt đầu cuộc gọi thành công')
        } catch (error) {
          console.error('Error starting call:', error)
          toast.error('Không thể bắt đầu cuộc gọi')
        }
      }

      // Tạo và tham gia phòng
      createMeeting()
    }

    startMeeting()
  }, [roomId, user, navigate, videoCallData, endVideoCall, joinVideoCall, isHost, isCallEnded])

  // Xử lý quay lại trang trước
  const handleGoBack = () => {
    navigate(-1)
  }

  // Hiển thị loading trong khi kiểm tra roomId và tải dữ liệu cuộc hẹn
  if (isLoadingMeetings || isLoadingVideoCallData) {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
        <Loader2 className='mb-4 w-10 h-10 animate-spin text-primary' />
        <p>Đang tải thông tin cuộc gọi...</p>
      </div>
    )
  }

  // Hiển thị thông báo khi cuộc gọi chưa bắt đầu (chỉ với bệnh nhân)
  if (!isCallStarted && !isHost) {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
        <Loader2 className='mb-4 w-16 h-16 text-blue-500 animate-spin' />
        <h1 className='mb-4 text-2xl font-bold'>Đang chờ bác sĩ bắt đầu cuộc gọi</h1>
        <p className='mb-6 max-w-md text-center'>
          Cuộc gọi video chưa được bắt đầu. Vui lòng đợi trong giây lát, bác sĩ sẽ bắt đầu cuộc gọi sớm.
        </p>
        <Button onClick={handleGoBack} className='mb-4'>
          <ArrowLeft className='mr-2 w-4 h-4' />
          Quay lại
        </Button>
      </div>
    )
  }

  // Hiển thị thông báo khi cuộc gọi đã kết thúc
  if (isCallEnded) {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
        <CheckCircle className='mb-4 w-16 h-16 text-green-500' />
        <h1 className='mb-4 text-2xl font-bold'>Cuộc gọi đã hoàn thành</h1>
        <p className='mb-6 max-w-md text-center'>
          Cuộc gọi video với bệnh nhân đã kết thúc. Cảm ơn bạn đã tham gia cuộc gọi.
        </p>
        <Button onClick={handleGoBack} className='mb-4'>
          <ArrowLeft className='mr-2 w-4 h-4' />
          Quay lại
        </Button>
      </div>
    )
  }

  // Hiển thị lỗi nếu không có thông tin hợp lệ
  if (!roomId || !user || error) {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
        <AlertCircle className='mb-4 w-10 h-10 text-red-500' />
        <h1 className='mb-4 text-2xl font-bold'>Không thể tham gia cuộc gọi</h1>
        <p className='mb-6'>{error || 'Thông tin phòng hoặc người dùng không hợp lệ.'}</p>
        <Button onClick={handleGoBack} className='mb-4'>
          <ArrowLeft className='mr-2 w-4 h-4' />
          Quay lại
        </Button>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex items-center p-4 bg-white border-b'>
        <Button variant='ghost' onClick={handleGoBack} className='mr-4'>
          <ArrowLeft className='mr-2 w-4 h-4' />
          Quay lại
        </Button>
        <h1 className='text-xl font-semibold'>
          Phòng khám trực tuyến - ID: {videoCallData?.data.videoCallInfo?.meetingId || roomId}
        </h1>
      </div>
      {isCreatingRoom ? (
        <div className='flex flex-col flex-1 justify-center items-center'>
          <Loader2 className='mb-4 w-10 h-10 animate-spin text-primary' />
          <p>Đang chuẩn bị phòng khám...</p>
        </div>
      ) : (
        <div ref={myMeeting} className='flex-1' />
      )}
    </div>
  )
}
