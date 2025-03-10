import { Button } from '@/components/ui/button'
import { PaymentOrder } from '@/types/payment.type'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { formatCurrency } from '@/utils/utils'
import { Download, Printer } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { exportPaymentInvoice } from '@/utils/pdfExport'

interface Props {
  payment: PaymentOrder
  onUpdateStatus: (payment: PaymentOrder) => void
  onClose: () => void
}

export default function PaymentDetail({ payment, onUpdateStatus, onClose }: Props) {
  const [note, setNote] = useState(payment.note || '')
  const [isRejecting, setIsRejecting] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleExportPDF = () => {
    exportPaymentInvoice(payment)
  }

  const handleReject = () => {
    onUpdateStatus({
      ...payment,
      paymentStatus: 'cancelled',
      note: note || 'Đã từ chối thanh toán'
    })
  }

  return (
    <div className='space-y-6 print:p-8'>
      {/* Header */}
      <div className='space-y-2 text-center'>
        <h1 className='text-2xl font-bold'>DIAGNOSIS IQ</h1>
        <p className='text-gray-500'>120 Hoàng Minh Thảo, Liên Chiểu, Đà Nẵng</p>
        <p className='text-gray-500'>Hotline: 1900 1234</p>
      </div>

      <div className='text-center'>
        <h2 className='text-xl font-bold'>HÓA ĐƠN THANH TOÁN</h2>
        <p className='text-sm text-gray-500'>Mã hóa đơn: {payment.id}</p>
        <p className='text-sm text-gray-500'>Ngày: {format(new Date(payment.orderDate), 'dd/MM/yyyy HH:mm')}</p>
      </div>

      <Separator />

      {/* Customer Info */}
      <div className='space-y-4'>
        <h3 className='font-semibold'>Thông tin khách hàng:</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-gray-500'>Họ tên:</p>
            <p className='font-medium'>{payment.userName}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Mã khách hàng:</p>
            <p className='font-medium'>{payment.userId}</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Package Details */}
      <div className='space-y-4'>
        <h3 className='font-semibold'>Chi tiết gói khám:</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-gray-500'>Gói dịch vụ:</p>
            <p className='font-medium'>
              {payment.packageType === 'single' ? 'Khám lẻ' : `Combo ${payment.packageType.replace('combo', '')} lần`}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Số lượt khám:</p>
            <p className='font-medium'>{payment.visits} lượt</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Hạn sử dụng:</p>
            <p className='font-medium'>{format(new Date(payment.expiryDate), 'dd/MM/yyyy')}</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment Info */}
      <div className='space-y-4'>
        <h3 className='font-semibold'>Thông tin thanh toán:</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-gray-500'>Phương thức:</p>
            <p className='font-medium'>
              {
                {
                  transfer: 'Chuyển khoản',
                  cash: 'Tiền mặt',
                  'e-wallet': 'Ví điện tử'
                }[payment.paymentMethod]
              }
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Trạng thái:</p>
            <Badge
              variant={
                payment.paymentStatus === 'paid'
                  ? 'default'
                  : payment.paymentStatus === 'pending'
                    ? 'secondary'
                    : 'destructive'
              }
            >
              {payment.paymentStatus === 'paid' && 'Đã thanh toán'}
              {payment.paymentStatus === 'pending' && 'Chờ thanh toán'}
              {payment.paymentStatus === 'cancelled' && 'Đã hủy'}
            </Badge>
          </div>
          {payment.transactionId && (
            <div className='col-span-2'>
              <p className='text-sm text-gray-500'>Mã giao dịch:</p>
              <p className='font-medium'>{payment.transactionId}</p>
            </div>
          )}
        </div>
      </div>

      {/* Total Amount */}
      <div className='flex items-center justify-between py-4 border-t border-b'>
        <h3 className='text-lg font-semibold'>Tổng tiền:</h3>
        <p className='text-2xl font-bold'>{formatCurrency(payment.amount)}</p>
      </div>

      {/* Admin Actions */}
      <div className='space-y-4 print:hidden'>
        {payment.paymentStatus === 'pending' && (
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Ghi chú:</label>
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder='Nhập ghi chú...' rows={3} />
          </div>
        )}

        {payment.note && payment.paymentStatus !== 'pending' && (
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Ghi chú:</label>
            <p className='p-3 text-sm border rounded-md bg-muted'>{payment.note}</p>
          </div>
        )}

        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button size='sm' variant='outline' onClick={handlePrint}>
              <Printer className='w-4 h-4 mr-2' />
              In hồ sơ
            </Button>
            <Button size='sm' onClick={handleExportPDF}>
              <Download className='w-4 h-4 mr-2' />
              Xuất PDF
            </Button>
          </div>

          <div className='flex gap-2'>
            <Button variant='outline' onClick={onClose}>
              Đóng
            </Button>
            {payment.paymentStatus === 'pending' && (
              <>
                <Button variant='destructive' onClick={handleReject}>
                  Từ chối
                </Button>
                <Button onClick={() => onUpdateStatus({ ...payment, paymentStatus: 'paid', note })}>
                  Xác nhận thanh toán
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Print Footer */}
      <div className='hidden pt-8 text-sm text-center text-gray-500 print:block'>
        <p>Xin cảm ơn quý khách!</p>
        <p>Vui lòng giữ hóa đơn để đối chiếu khi cần thiết.</p>
      </div>
    </div>
  )
}
