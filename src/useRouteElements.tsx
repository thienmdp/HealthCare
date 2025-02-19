import { memo, useMemo } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import { useAppSelector } from './redux/store'
import DefaultLayout from './layouts/DefaultLayout'
import DashboardLayout from './layouts/DashboardLayout'
import { DashboardAdmin } from './pages/Dashboard/admin'
import { DashboardDoctor } from './pages/Dashboard/doctor'
import { Page_404 } from './pages/NotFound'
import { SignIn, SignUp } from './pages/NotAuth'
import { About, Landing } from './pages/Landing'
import { Profile } from './pages/Dashboard/user'

type ProtectedRouteProps = {
  allowedRole: 'USER' | 'ADMIN' | 'DOCTOR'
}

function useAuth() {
  const { isAuthenticated, role: roleUser } = useAppSelector((state) => state.authState)

  const isAdmin = isAuthenticated && roleUser === 'ADMIN'
  const isDoctor = isAuthenticated && roleUser === 'DOCTOR'
  const isUser = isAuthenticated && roleUser === 'USER'
  const isAuth = isAuthenticated && (isAdmin || isUser || isDoctor)

  return { isAuthenticated, roleUser, isAdmin, isDoctor, isUser, isAuth }
}

const rejectedRoutes = [
  {
    path: path.signin,
    element: <SignIn />
  },
  {
    path: path.register,
    element: <SignUp />
  }
]

const publicRoutes = [
  {
    path: path.about,
    element: <About />
  }
]

const userRoutes = [
  {
    path: path.profile,
    element: (
      <div className='max-w-screen-xl pt-8 mx-auto'>
        <Profile />
      </div>
    )
  }
]

const adminRoutes = [
  {
    path: path.dashboard_admin,
    element: <DashboardAdmin />
  }
]

const doctorRoutes = [
  {
    path: path.dashboard,
    element: <DashboardDoctor />
  }
]

const ProtectedRoute = memo(({ allowedRole }: ProtectedRouteProps) => {
  const { isAuthenticated, roleUser } = useAuth()
  const isAllowed = isAuthenticated && roleUser === allowedRole

  if (!isAllowed) {
    return <Navigate to={allowedRole === 'USER' ? path.signin : path.landing} replace />
  }

  const Layout = allowedRole === 'USER' ? DefaultLayout : DashboardLayout
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
})

const RejectedRoute = memo(() => {
  const { isAuth } = useAuth()
  if (isAuth) return <Navigate to={path.landing} />

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
})

const PublicRoute = memo(() => (
  <DefaultLayout>
    <Outlet />
  </DefaultLayout>
))

export default function useRouteElements() {
  const routes = useMemo(
    () => [
      {
        path: '',
        element: <RejectedRoute />,
        children: rejectedRoutes
      },
      {
        path: '',
        index: true,
        element: (
          <DefaultLayout>
            <Landing />
          </DefaultLayout>
        )
      },
      {
        path: '',
        element: <PublicRoute />,
        children: publicRoutes
      },
      {
        path: '',
        element: <ProtectedRoute allowedRole='USER' />,
        children: userRoutes
      },
      {
        path: '',
        element: <ProtectedRoute allowedRole='ADMIN' />,
        children: adminRoutes
      },
      {
        path: '',
        element: <ProtectedRoute allowedRole='DOCTOR' />,
        children: doctorRoutes
      },
      {
        path: '*',
        element: (
          <DefaultLayout>
            <Page_404 />
          </DefaultLayout>
        )
      }
    ],
    []
  )
  return useRoutes(routes)
}
