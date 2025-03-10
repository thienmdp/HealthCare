import { ColumnDef } from '@tanstack/react-table'
import { PaymentOrder } from '@/types/payment.type'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { format } from 'date-fns'
import { formatCurrency } from '@/utils/utils'

export const paymentColumns = (onView: (payment: PaymentOrder) => void): ColumnDef<PaymentOrder>[] => [
  {
    accessorKey: 'userName',
    header: 'Khách hàng'
  },
  {
    accessorKey: 'packageType',
    header: 'Gói khám',
    cell: ({ row }) => {
      const type = row.getValue('packageType') as string
      return type === 'single' ? 'Khám lẻ' : `Combo ${type.replace('combo', '')} lần`
    }
  },
  {
    accessorKey: 'amount',
    header: 'Số tiền',
    cell: ({ row }) => formatCurrency(row.getValue('amount'))
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Phương thức',
    cell: ({ row }) => {
      const method = row.getValue('paymentMethod') as string
      return {
        transfer: 'Chuyển khoản',
        cash: 'Tiền mặt',
        'e-wallet': 'Ví điện tử'
      }[method]
    }
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('paymentStatus') as string
      return (
        <Badge variant={status === 'paid' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'}>
          {status === 'paid' && 'Đã thanh toán'}
          {status === 'pending' && 'Chờ thanh toán'}
          {status === 'cancelled' && 'Đã hủy'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'orderDate',
    header: 'Ngày đặt',
    cell: ({ row }) => format(new Date(row.getValue('orderDate')), 'dd/MM/yyyy HH:mm')
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button variant='ghost' size='icon' onClick={() => onView(row.original)}>
        <Eye className='w-4 h-4' />
      </Button>
    )
  }
]
