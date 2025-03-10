import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AppointmentPackage } from '@/types/appointmentPackage.type'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/utils'

const PACKAGES: AppointmentPackage[] = [
  { id: 'single', type: 'single', visits: 1, price: 500000 },
  { id: 'combo3', type: 'combo3', visits: 3, price: 1400000, discount: 0.07 },
  { id: 'combo5', type: 'combo5', visits: 5, price: 2250000, discount: 0.1 },
  { id: 'combo10', type: 'combo10', visits: 10, price: 4000000, discount: 0.2 }
]

interface Props {
  onClose: () => void
  onPurchase: (pkg: AppointmentPackage) => void
}

export default function BuyPackageDialog({ onClose, onPurchase }: Props) {
  const [selectedPackage, setSelectedPackage] = useState<AppointmentPackage | null>(null)

  const handlePurchase = () => {
    if (selectedPackage) {
      onPurchase(selectedPackage)
    }
  }

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-xl font-bold'>Mua lượt khám bệnh</h2>
        <p className='text-sm text-gray-500'>Chọn gói khám phù hợp với nhu cầu của bạn</p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {PACKAGES.map((pkg) => (
          <Card
            key={pkg.id}
            className={`cursor-pointer transition-all ${
              selectedPackage?.id === pkg.id ? 'border-primary ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            <CardHeader>
              <CardTitle className='min-w-[155px]'>
                {pkg.type === 'single' ? 'Khám lẻ' : `Combo ${pkg.visits} lần`}
                {pkg.discount && (
                  <Badge variant='secondary' className='ml-2'>
                    -{(pkg.discount * 100).toFixed(0)}%
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{formatCurrency(pkg.price)}</div>
              <div className='mt-4 space-y-2'>
                <div className='flex items-center text-sm'>
                  <CheckCircle className='w-4 h-4 mr-2 text-green-500' />
                  {pkg.visits} lượt khám
                </div>
                <div className='flex items-center text-sm'>
                  <CheckCircle className='w-4 h-4 mr-2 text-green-500' />
                  Hiệu lực 12 tháng
                </div>
                {pkg.discount && (
                  <div className='flex items-center text-sm'>
                    <CheckCircle className='w-4 h-4 mr-2 text-green-500' />
                    Tiết kiệm {formatCurrency(pkg.price * pkg.discount)}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className='text-sm text-gray-500'>{formatCurrency(pkg.price / pkg.visits)}/lượt</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className='flex justify-end gap-2 pt-4'>
        <Button variant='outline' onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={handlePurchase} disabled={!selectedPackage}>
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  )
}
