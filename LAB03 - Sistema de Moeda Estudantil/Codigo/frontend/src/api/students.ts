import { api } from './client'
import type { Aluno, AlunoCreate } from '../types'

export async function listStudents(): Promise<Aluno[]> {
  const { data } = await api.get('/alunos')
  return data
}
export async function getStudent(id: number|string): Promise<Aluno> {
  const { data } = await api.get(`/alunos/${id}`)
  return data
}
export async function createStudent(payload: AlunoCreate): Promise<Aluno> {
  const { data } = await api.post('/alunos', payload)
  return data
}
export async function updateStudent(id: number|string, payload: AlunoCreate): Promise<Aluno> {
  const { data } = await api.put(`/alunos/${id}`, payload)
  return data
}
export async function deleteStudent(id: number) {
  await api.delete(`/alunos/${id}`)
}
