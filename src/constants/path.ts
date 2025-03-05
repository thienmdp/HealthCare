const path = {
  landing: '/',
  about: '/about',
  signin: '/sign-in',
  register: '/register',
  verifyEmail: '/verify-email',
  logout: '/logout',
  // User
  profile: '/profile',
  // Doctor
  dashboard: '/dashboard',
  profileDoctor: '/profile-doctor',
  // Admin
  dashboard_admin: '/dashboard-admin',
  userManage: '/user-manage',
  profileAdmin: '/profile-admin'
} as const
export default path
