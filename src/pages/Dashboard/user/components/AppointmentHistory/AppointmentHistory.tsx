import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { appointmentColumns } from '../columns'
import { useGetMyAppointmentsQuery } from '@/redux/services/appointmentApi'
import { Appointment } from '@/types/appointment.type'
import { ColumnDef } from '@tanstack/react-table'
import MedicalRecordDetail from '../Dialog/MedicalRecordDetail'

export default function AppointmentHistory() {
  const { data: appointmentsData, isFetching, refetch } = useGetMyAppointmentsQuery()
  const [selectedRecord, setSelectedRecord] = useState<Appointment | null>(null)

  const columns: ColumnDef<any>[] = [
    ...appointmentColumns,
    {
      id: 'actions',
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => (
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setSelectedRecord(row.original)}
          disabled={row.original.status === 'pending'}
        >
          Xem chi tiết
        </Button>
      ),
      accessorFn: (row) => row._id
    }
  ]

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Lịch sử khám bệnh</h2>
      </div>

      <DataTable columns={columns} data={appointmentsData?.data || []} isLoading={isFetching} onReload={refetch} />

      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className='max-w-4xl'>
          {selectedRecord && <MedicalRecordDetail record={selectedRecord} onClose={() => setSelectedRecord(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
