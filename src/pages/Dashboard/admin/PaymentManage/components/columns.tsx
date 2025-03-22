import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/utils'
import { Eye } from 'lucide-react'

interface PaymentData {
  id: string
  packageId: string
  packageName: string
  userId: string
  userName: string
  date: string
  amount: number
  status: 'pending' | 'paid' | 'cancelled'
  method: string
  paymentDate?: string
}

export const paymentColumns = (onView: (payment: PaymentData) => void): ColumnDef<PaymentData>[] => [
  {
    accessorKey: 'id',
    header: 'Mã giao dịch',
    cell: ({ row }) => {
      const id = row.getValue('id') as string
      return <div className='font-medium'>{id.substring(0, 8)}...</div>
    }
  },
  {
    accessorKey: 'userName',
    header: 'Khách hàng',
    cell: ({ row }) => {
      const userName = row.getValue('userName') as string
      return <div>{userName}</div>
    }
  },
  {
    accessorKey: 'packageName',
    header: 'Gói khám',
    cell: ({ row }) => {
      const packageName = row.getValue('packageName') as string
      return <div>{packageName}</div>
    }
  },
  {
    accessorKey: 'date',
    header: 'Ngày tạo',
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      return <div>{format(new Date(date), 'dd/MM/yyyy HH:mm')}</div>
    }
  },
  {
    accessorKey: 'amount',
    header: 'Số tiền',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      return <div className='font-medium'>{formatCurrency(amount)}</div>
    }
  },
  {
    accessorKey: 'method',
    header: 'Phương thức',
    cell: ({ row }) => {
      const method = row.getValue('method') as string
      return <div>{method}</div>
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
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
    id: 'actions',
    header: 'Thao tác',
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Button variant='ghost' size='icon' onClick={() => onView(payment)}>
          <Eye className='w-4 h-4' />
        </Button>
      )
    }
  }
]
