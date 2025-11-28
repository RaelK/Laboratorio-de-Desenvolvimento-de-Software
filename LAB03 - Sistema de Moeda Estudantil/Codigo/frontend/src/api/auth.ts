import { api } from './client'

export type UserType = 'STUDENT' | 'PROFESSOR' | 'COMPANY'

export interface LoginRequest {
  login: string
  password: string
  userType: UserType
}

export interface LoginResponse {
  token: string
  userType: UserType
  userId: number
  name: string
  email: string
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const { data: response } = await api.post('/auth/login', data)
  return response
}
