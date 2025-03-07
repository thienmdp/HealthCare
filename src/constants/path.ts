const path = {
  landing: '/',
  about: '/about',
  signin: '/sign-in',
  register: '/register',
  services: '/services',
  contact: '/contact',
  verifyEmail: '/verify-email',
  logout: '/logout',
  // Doctor
  dashboard: '/dashboard',
  profileDoctor: '/profile-doctor',
  settings: '/settings',
  // Admin
  dashboard_admin: '/dashboard-admin',
  userManage: '/user-manage',
  profileAdmin: '/profile-admin',
  settingsAdmin: '/settings-admin',
  // User
  profile: '/profile'
} as const
export default path
