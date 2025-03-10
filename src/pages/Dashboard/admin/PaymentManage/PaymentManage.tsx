import React, { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { paymentColumns } from './components/columns'
import { PaymentOrder } from '@/types/payment.type'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { mockPayments } from './mockData'
import PaymentDetail from './components/PaymentDetail'

export default function PaymentManage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentOrder | null>(null)

  const handleViewPayment = (payment: PaymentOrder) => {
    setSelectedPayment(payment)
  }

  const handleUpdateStatus = (payment: PaymentOrder) => {
    // In real app, call API to update status
    console.log('Update payment status:', payment)
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
      </div>

      <DataTable
        columns={paymentColumns(handleViewPayment)}
        data={mockPayments}
        // isLoading={isFetching}
        // onReload={() => refetch()}
        headerClassName='bg-gray-200 text-sm !font-semibold'
      />

      <Dialog open={!!selectedPayment} onOpenChange={(open) => !open && setSelectedPayment(null)}>
        <DialogContent className='max-w-3xl max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] overflow-y-auto'>
          {selectedPayment && (
            <PaymentDetail
              payment={selectedPayment}
              onUpdateStatus={handleUpdateStatus}
              onClose={() => setSelectedPayment(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
