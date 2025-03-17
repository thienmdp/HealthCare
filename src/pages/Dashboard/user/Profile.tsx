import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppSelector } from '@/redux/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PersonalInfo from '@/components/Dashboard/Form/PersonalInfo'
import { ScrollArea } from '@/components/ui/scroll-area'
import ProfilePatient from '../admin/UserManage/components/Detail/ProfilePatient'
import { AppointmentStats } from './AppointmentStats'
import { AppointmentHistory } from './AppointmentHistory'
import { PaymentHistory } from './PaymentHistory'

export default function ProfileDoctor() {
  const user = useAppSelector((state) => state.authState.user)
  if (!user) return null
  return (
    <div>
      <Tabs defaultValue='personal' className='w-full'>
        <TabsList className='flex-wrap min-w-[380px] !justify-start'>
          <TabsTrigger value='personal'>Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value='user'>Hồ sơ bệnh nhân</TabsTrigger>
          <TabsTrigger value='number_appointment'>Lượt khám bệnh</TabsTrigger>
          <TabsTrigger value='history_appoinment'>Lịch sử khám bệnh</TabsTrigger>
          <TabsTrigger value='history_payment'>Lịch sử thanh toán</TabsTrigger>
        </TabsList>
        <TabsContent value='personal'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent>
              <PersonalInfo user={user} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='user'>
          <ScrollArea className='h-full mb-4'>
            <Card>
              <CardHeader>
                <CardTitle>Hồ sơ bệnh nhân</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfilePatient user={user} />
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>
        <TabsContent value='number_appointment'>
          <Card>
            <CardHeader>
              <CardTitle>Thống kê lượt khám</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentStats />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='history_appoinment'>
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử khám bệnh</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentHistory />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='history_payment'>
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
