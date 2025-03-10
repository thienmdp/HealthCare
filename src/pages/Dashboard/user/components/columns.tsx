import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/utils'

export const appointmentColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'date',
    header: 'Ngày khám'
  },
  {
    accessorKey: 'time',
    header: 'Giờ khám'
  },
  {
    accessorKey: 'doctor',
    header: 'Bác sĩ'
  },
  {
    accessorKey: 'department',
    header: 'Chuyên khoa'
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status')
      return (
        <Badge variant={status === 'completed' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'}>
          {status === 'completed' && 'Hoàn thành'}
          {status === 'pending' && 'Chờ khám'}
          {status === 'cancelled' && 'Đã hủy'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'diagnosis',
    header: 'Chẩn đoán'
  }
]

export const paymentColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'date',
    header: 'Ngày thanh toán'
  },
  {
    accessorKey: 'appointmentId',
    header: 'Mã lịch hẹn'
  },
  {
    accessorKey: 'amount',
    header: 'Số tiền',
    cell: ({ row }) => {
      return formatCurrency(row.getValue('amount'))
    }
  },
  {
    accessorKey: 'method',
    header: 'Phương thức'
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status')
      return (
        <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
          {status === 'completed' ? 'Đã thanh toán' : 'Chờ thanh toán'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'description',
    header: 'Mô tả'
  }
]
