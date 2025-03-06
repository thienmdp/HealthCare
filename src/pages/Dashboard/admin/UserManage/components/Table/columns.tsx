import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import Actions from './Actions'
import { User } from '@/types/user.type'

export const columns = (onViewUser: (user: User) => void): ColumnDef<User>[] => [
  {
    accessorKey: 'email',
    header: 'Email',
    enableHiding: false
  },
  {
    accessorFn: (row) => `${row?.profile?.firstName || ''} ${row?.profile?.lastName || ''}`,
    header: 'Họ và tên',
    id: 'fullName'
  },
  {
    accessorFn: (row) => row?.profile?.gender,
    header: 'Giới tính',
    meta: { className: 'text-center' },
    id: 'gender',
    cell: ({ row }) => {
      const gender = row.getValue('gender') as string
      return gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : 'Khác'
    }
  },
  {
    accessorFn: (row) => row?.profile?.address || '',
    header: 'Địa chỉ',
    meta: { className: 'text-center min-w-[250px]' },
    id: 'address'
  },
  {
    accessorFn: (row) => row?.profile?.phone || '',
    header: 'Số điện thoại',
    meta: { className: 'text-center min-w-[150px]' },
    id: 'phone'
  },
  {
    accessorKey: 'role',
    header: 'Vai trò',
    meta: { className: 'text-center min-w-[100px]' },
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      return (
        <Badge variant={role === 'admin' ? 'destructive' : role === 'doctor' ? 'default' : 'secondary'}>
          {role.toUpperCase()}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'disabled',
    header: 'Trạng thái',
    meta: { className: 'text-center' },
    cell: ({ row }) => {
      const disabled = row.getValue('disabled') as boolean
      return (
        <Badge className='min-w-[100px] justify-center' variant={disabled ? 'destructive' : 'success'}>
          {disabled ? 'Đã khóa' : 'Hoạt động'}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'isVerified',
    header: 'Xác thực',
    meta: { className: 'text-center' },
    cell: ({ row }) => {
      const isVerified = row.getValue('isVerified') as boolean
      return (
        <Badge className='min-w-[100px] justify-center' variant={isVerified ? 'success' : 'default'}>
          {isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
        </Badge>
      )
    }
  },
  {
    id: 'actions',
    meta: { className: 'w-[80px] text-center' },
    cell: ({ row }) => <Actions user={row.original} onView={onViewUser} />
  }
]
