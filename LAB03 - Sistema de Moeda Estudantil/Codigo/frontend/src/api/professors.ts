import { api } from './client'
import type { Professor } from '../types'

export async function getProfessor(id: number | string): Promise<Professor> {
    const { data } = await api.get(`/professores/${id}`)
    return data
}

// se quiser listar depois:
export async function listProfessors(): Promise<Professor[]> {
    const { data } = await api.get('/professores')
    return data
}