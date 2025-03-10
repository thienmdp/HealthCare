import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Printer } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/utils/utils'

interface Props {
  record: any // Replace with proper type
  onClose: () => void
}

export default function MedicalRecordDetail({ record, onClose }: Props) {
  const handleExportPDF = () => {
    // Add PDF export logic
    console.log('Export PDF:', record)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className='mt-4 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-bold'>Chi tiết bệnh án</h2>
          <p className='text-sm text-gray-500'>Mã hồ sơ: {record.id}</p>
        </div>
        <div className='flex gap-2'>
          <Button size='sm' variant='outline' onClick={handlePrint}>
            <Printer className='w-4 h-4 mr-2' />
            In hồ sơ
          </Button>
          <Button size='sm' onClick={handleExportPDF}>
            <Download className='w-4 h-4 mr-2' />
            Xuất PDF
          </Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Thông tin khám bệnh</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <div className='text-gray-500'>Ngày khám:</div>
              <div>
                {record.date} {record.time}
              </div>
              <div className='text-gray-500'>Bác sĩ:</div>
              <div>{record.doctor}</div>
              <div className='text-gray-500'>Chuyên khoa:</div>
              <div>{record.department}</div>
              <div className='text-gray-500'>Trạng thái:</div>
              <div>
                <Badge
                  variant={
                    record.status === 'completed'
                      ? 'default'
                      : record.status === 'pending'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {record.status === 'completed' && 'Hoàn thành'}
                  {record.status === 'pending' && 'Chờ khám'}
                  {record.status === 'cancelled' && 'Đã hủy'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Triệu chứng & Chẩn đoán</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <div className='mb-2 text-sm text-gray-500'>Triệu chứng:</div>
              <p className='text-sm'>{record.symptoms}</p>
            </div>
            <div>
              <div className='mb-2 text-sm text-gray-500'>Chẩn đoán:</div>
              <p className='text-sm'>{record.diagnosis}</p>
            </div>
          </CardContent>
        </Card>

        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Đơn thuốc</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {record.prescription?.medicines?.map((medicine: any) => (
                <div key={medicine.id} className='p-4 border rounded-lg'>
                  <div className='flex items-start justify-between'>
                    <div>
                      <div className='font-medium'>{medicine.name}</div>
                      <div className='text-sm text-gray-500'>{medicine.usage}</div>
                    </div>
                    <div className='text-right'>
                      <div className='font-medium'>
                        {medicine.quantity} {medicine.unit}
                      </div>
                      <div className='text-sm text-gray-500'>{formatCurrency(medicine.price)}</div>
                    </div>
                  </div>
                </div>
              ))}
              <Separator />
              <div className='flex justify-between'>
                <div className='font-medium'>Tổng tiền:</div>
                <div className='font-medium'>{formatCurrency(record.prescription?.totalAmount || 0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
