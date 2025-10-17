import { api } from './client'

export type InstituicaoEnsino = { id: number; nome: string }

export async function listInstitutions(): Promise<InstituicaoEnsino[]> {
  try {
    const { data } = await api.get('/instituicoes')
    return data
  } catch (e) {
    // Fallback alinhado ao data.sql do backend
    return [
      { id: 1, nome: 'Universidade Exemplo' },
      { id: 2, nome: 'Instituto Técnico Central' },
      { id: 3, nome: 'Faculdade Estadual de Tecnologia' },
    ]
  }
}
