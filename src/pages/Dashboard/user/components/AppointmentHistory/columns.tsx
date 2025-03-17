import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Appointment } from '@/types/appointment.type'
import { formatCurrency } from '@/utils/utils'

export const appointmentColumns: ColumnDef<Appointment, unknown>[] = [
  {
    id: 'date',
    accessorKey: 'appointmentDate',
    header: 'Ngày khám',
    accessorFn: (row) => format(new Date(row.appointmentDate), 'dd/MM/yyyy')
  },
  {
    id: 'time',
    accessorKey: 'startTime',
    header: 'Giờ khám',
    accessorFn: (row) => `${row.startTime} - ${row.endTime}`
  },
  {
    id: 'doctor',
    accessorKey: 'doctor',
    header: 'Bác sĩ',
    accessorFn: (row) => `${row.doctor.profile.firstName} ${row.doctor.profile.lastName}`
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Hình thức',
    cell: ({ row }) => (
      <Badge variant='outline'>{row.getValue('type') === 'video_call' ? 'Trực tuyến' : 'Trực tiếp'}</Badge>
    ),
    accessorFn: (row) => row.type
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue('status') as Appointment['status']

      const variant: any = {
        completed: 'default',
        pending: 'secondary',
        confirmed: 'outline',
        cancelled: 'destructive'
      }[status]

      const label = {
        completed: 'Hoàn thành',
        pending: 'Chờ khám',
        confirmed: 'Đã xác nhận',
        cancelled: 'Đã hủy'
      }[status]

      return <Badge variant={variant}>{label}</Badge>
    },
    accessorFn: (row) => row.status
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
