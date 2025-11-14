import { api } from './client'
import type { Transacao } from '../types'

export type TransferPayload = {
  professorId: number
  alunoId: number
  valor: number
  descricao: string
}

/**
 * Envia moedas do professor para o aluno
 * Compatível com DTO do backend: TransacaoCreateDTO
 */
export async function transferirMoedas(payload: TransferPayload): Promise<Transacao> {
  // backend espera idProfessor e idAluno
  const body = {
    idProfessor: payload.professorId,
    idAluno: payload.alunoId,
    valor: payload.valor,
    descricao: payload.descricao,
  }

  console.log("Enviando payload para backend:", body)

  const { data } = await api.post('/transacoes/enviar', body)
  return data
}

export async function getExtratoAluno(id: number | string): Promise<Transacao[]> {
  const { data } = await api.get(`/alunos/${id}/extrato`)
  return data
}

export async function getExtratoProfessor(id: number | string): Promise<Transacao[]> {
  const { data } = await api.get(`/transacoes/professor/${id}`)
  return data
}
