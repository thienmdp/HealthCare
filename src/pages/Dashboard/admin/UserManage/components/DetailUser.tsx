import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User } from '@/types/user.type'
import Information from './Detail/Information'
import History from './Detail/History'

interface Props {
  user: User
  onClose?: () => void
}

export default function DetailUser({ user, onClose }: Props) {
  return (
    <Tabs defaultValue='information' className='w-full'>
      <TabsList>
        <TabsTrigger value='information'>Thông tin</TabsTrigger>
        <TabsTrigger value='history'>Lịch sử</TabsTrigger>
      </TabsList>
      <TabsContent value='information'>
        <Information user={user} onClose={onClose} />
      </TabsContent>
      <TabsContent value='history'>
        <History />
      </TabsContent>
    </Tabs>
  )
}
