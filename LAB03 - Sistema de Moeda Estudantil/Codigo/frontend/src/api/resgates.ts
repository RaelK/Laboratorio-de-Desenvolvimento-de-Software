import { api } from './client'

export interface ResgateRequest {
  alunoId: number
  vantagemId: number
}

export async function realizarResgate(data: ResgateRequest) {
  const response = await api.post('/resgates', data)
  return response.data
}

export async function listarVantagens() {
  const response = await api.get('/vantagens')
  return response.data
}