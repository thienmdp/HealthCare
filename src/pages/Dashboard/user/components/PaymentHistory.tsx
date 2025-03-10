import { DataTable } from '@/components/ui/data-table'
import { paymentColumns } from './columns'

const mockData = [
  {
    id: '1',
    date: '2024-03-15',
    appointmentId: 'APT001',
    amount: 500000,
    status: 'completed',
    method: 'Ví điện tử',
    description: 'Khám tổng quát'
  },
  {
    id: '2',
    date: '2024-03-20',
    appointmentId: 'APT002',
    amount: 300000,
    status: 'pending',
    method: 'Chuyển khoản',
    description: 'Khám da liễu'
  }
  // Add more mock data as needed
]

export default function PaymentHistory() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Lịch sử thanh toán</h2>
      </div>
      <DataTable columns={paymentColumns} data={mockData} />
    </div>
  )
}
