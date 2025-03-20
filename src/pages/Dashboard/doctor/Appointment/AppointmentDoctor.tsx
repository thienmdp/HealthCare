import React, { useState } from 'react'
import { useGetAllAppointmentsQuery } from '@/redux/services/appointmentApi'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './components/columns'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import AppointmentDetail from './components/AppointmentDetail'
import { Appointment } from '@/types/appointment.type'

const PAGE_SIZE = 10

export default function AppointmentDoctor() {
  const [page, setPage] = useState(1)
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null)

  const { data, isFetching, refetch } = useGetAllAppointmentsQuery({
    page,
    limit: PAGE_SIZE
  })

  return (
    <div className='p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Quản lý lịch hẹn</h1>

      <DataTable<Appointment, unknown>
        columns={columns((id) => setSelectedAppointment(id))}
        data={data?.data?.appointments || []}
        onReload={refetch}
        isLoading={isFetching}
        pagination={{
          pageSize: PAGE_SIZE,
          total: data?.data?.pagination.total || 0,
          current: page,
          onChange: (newPage) => setPage(newPage)
        }}
      />

      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className='max-w-3xl'>
          {selectedAppointment && (
            <AppointmentDetail appointmentId={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
