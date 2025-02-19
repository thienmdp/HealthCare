export type RoleType = 'USER' | 'ADMIN' | 'DOCTOR'
export type EducationLevelType = 'High School' | 'Associate' | 'Bachelor' | 'Master' | 'PhD'
export type StatusAccountType = 'UNVERIFY' | 'BLOCK' | 'ACTIVE'

export type CreateUserInput = {
  email: string
  full_name: string
  phone_number: string
  password: string
  address: string
  date_of_birth: string
  experience: string
  gender: string
  specialization: string
  workplace: string
  roles: RoleType
  license_number: string // CCCD
  placeOfBirth: string // noi sinh
  placeOfGraduation: string // noi tn
  yearOfGraduation: string // nam tn
  highestDegree: string // bang cap cao nhat
}
export type UpdateInfoUserInput = {
  full_name?: string
  phone_number?: string
  address?: string
  date_of_birth?: string
  experience?: string
  gender?: string
  specialization?: string
  workplace?: string
  roles?: RoleType
  license_number?: string
  placeOfBirth?: string
  placeOfGraduation?: string
  yearOfGraduation?: string
  highestDegree?: string
}

export interface User {
  id: string
  key?: string
  email: string
  full_name: string
  phone_number: string
  address: string
  picture?: string
  medias: {
    mimeType: 'IMAGES'
    mediaUrl: string
  }[]

  date_of_birth: string
  experience: string
  certificates: []
  courseProgresses: []
  gender: string
  profession: string
  specialization: string
  workplace: string
  roles: RoleType
  status: StatusAccountType
  updateAt: string
  // new type
  license_number: string
  educationLevel: string
  yearOfGraduation: string
  placeOfGraduation: string
  placeOfBirth: string
  highestDegree: string
}
