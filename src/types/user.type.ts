export type RoleType = 'user' | 'admin' | 'doctor'
export type EducationLevelType = 'High School' | 'Associate' | 'Bachelor' | 'Master' | 'PhD'

export type CreateUserInput = {
  email: string
  password: string
  firstName: string
  lastName: string
  fullName: string
  birth: string
  phone: string
  address: string
  avatar: string
  role: RoleType
  disabled: boolean
  isVerified: boolean
  updatedAt: string
  createdAt: string
}
export type UpdateInfoUserInput = {
  firstName: string
  lastName: string
  fullName: string
  birth: string
  phone: string
  address: string
  avatar: string
  role: RoleType
  disabled: boolean
  isVerified: boolean
  updatedAt: string
  createdAt: string
}

export interface User {
  id: string
  key?: string
  email: string
  profile: {
    firstName: string
    lastName: string
    fullName: string
    birth: string
    phone: string
    address: string
    avatar: string
  }
  role: RoleType
  disabled: boolean
  isVerified: boolean
  updatedAt: string
  createdAt: string
}
