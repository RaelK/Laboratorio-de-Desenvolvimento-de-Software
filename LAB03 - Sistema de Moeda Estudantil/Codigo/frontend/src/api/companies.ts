import { api } from './client'
import type { EmpresaParceira, EmpresaCreate } from '../types'

export async function listCompanies(): Promise<EmpresaParceira[]> {
  const { data } = await api.get('/empresas')
  return data
}
export async function getCompany(id: number|string): Promise<EmpresaParceira> {
  const { data } = await api.get(`/empresas/${id}`)
  return data
}
export async function createCompany(payload: EmpresaCreate): Promise<EmpresaParceira> {
  const { data } = await api.post('/empresas', payload)
  return data
}
export async function updateCompany(id: number|string, payload: EmpresaCreate): Promise<EmpresaParceira> {
  const { data } = await api.put(`/empresas/${id}`, payload)
  return data
}
export async function deleteCompany(id: number) {
  await api.delete(`/empresas/${id}`)
}
