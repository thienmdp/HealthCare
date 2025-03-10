import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import MedicalRecordDetail from './Dialog/MedicalRecordDetail'
import { appointmentColumns } from './columns'

const mockData = [
  {
    id: '1',
    date: '2024-03-15',
    time: '09:00',
    doctor: 'Dr. John Doe',
    department: 'Nội khoa',
    status: 'completed',
    symptoms: 'Đau đầu, sốt',
    diagnosis: 'Cảm cúm',
    prescription: {
      medicines: [
        {
          id: '1',
          name: 'Paracetamol',
          usage: 'Uống sau ăn, 2 viên/lần, 3 lần/ngày',
          quantity: 20,
          unit: 'viên',
          price: 2000
        },
        {
          id: '2',
          name: 'Vitamin C',
          usage: 'Uống sau ăn, 1 viên/lần, 1 lần/ngày',
          quantity: 10,
          unit: 'viên',
          price: 3000
        }
      ],
      totalAmount: 70000
    }
  },
  {
    id: '2',
    date: '2024-03-20',
    time: '14:30',
    doctor: 'Dr. Jane Smith',
    department: 'Da liễu',
    status: 'pending',
    symptoms: 'Nổi mẩn đỏ',
    diagnosis: 'Đang chờ khám',
    prescription: ''
  }
]

export default function AppointmentHistory() {
  const [selectedRecord, setSelectedRecord] = useState<any>(null)

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record)
  }

  const columns = [
    ...appointmentColumns,
    {
      id: 'actions',
      cell: ({ row }: any) => (
        <Button variant='ghost' size='sm' onClick={() => handleViewRecord(row.original)}>
          Xem chi tiết
        </Button>
      )
    }
  ]

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Lịch sử khám bệnh</h2>
      </div>

      <DataTable columns={columns} data={mockData} />

      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className='max-w-4xl'>
          {selectedRecord && <MedicalRecordDetail record={selectedRecord} onClose={() => setSelectedRecord(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
