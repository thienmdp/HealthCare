import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Calendar, Clock, Ticket, UserCheck, Users } from 'lucide-react'
import { AppointmentPackage } from '@/types/appointmentPackage.type'
import BuyPackageDialog from '../components/Dialog/BuyPackageDialog'

export default function AppointmentStats() {
  const [showBuyPackage, setShowBuyPackage] = useState(false)

  const handlePurchasePackage = (pkg: AppointmentPackage) => {
    console.log('Purchase package:', pkg)
    // Add API call here
    setShowBuyPackage(false)
  }

  const stats = [
    {
      title: 'Tổng số lần khám',
      value: '25',
      icon: Calendar,
      description: 'Tất cả các lần khám',
      className: 'text-blue-500 bg-blue-50/50'
    },
    {
      title: 'Hoàn thành',
      value: '20',
      icon: UserCheck,
      description: 'Đã khám xong',
      className: 'text-green-500 bg-green-50/50'
    },
    {
      title: 'Chờ khám',
      value: '3',
      icon: Clock,
      description: 'Đang chờ khám',
      className: 'text-yellow-500 bg-yellow-50/50'
    },
    {
      title: 'Đã hủy',
      value: '2',
      icon: Users,
      description: 'Lịch hẹn đã hủy',
      className: 'text-red-500 bg-red-50/50'
    },
    {
      title: 'Lượt khám còn lại',
      value: '5',
      icon: Ticket,
      className: 'text-purple-500 bg-purple-50/50'
    }
  ]

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => (
        <Card key={stat.title} className={stat.className}>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
            <stat.icon className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
            <p className='text-xs text-muted-foreground'>{stat.description}</p>
          </CardContent>
        </Card>
      ))}
      <Button className='col-span-full' onClick={() => setShowBuyPackage(true)}>
        Mua thêm lượt khám
      </Button>

      <Dialog open={showBuyPackage} onOpenChange={setShowBuyPackage}>
        <DialogContent className='max-w-4xl'>
          <BuyPackageDialog onClose={() => setShowBuyPackage(false)} onPurchase={handlePurchasePackage} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
